import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { AgentGrid } from './components/AgentGrid';
import { ActivityFeed } from './components/ActivityFeed';
import { useMessageBridge } from './hooks/useMessageBridge';
import { ActivityLog } from '../../background/swarm/types';

export const App: React.FC = () => {
  const { sendMessage, lastMessage } = useMessageBridge();
  const [status, setStatus] = useState<'connecting' | 'active' | 'error'>('connecting');
  const [taskPrompt, setTaskPrompt] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [swarmState, setSwarmState] = useState<any>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    // Initial connection check
    sendMessage({ type: 'PING' }).then((response) => {
      if (response && response.type === 'PONG') {
        setStatus('active');
        // Get initial swarm state
        sendMessage({ type: 'GET_SWARM_STATE' }).then(res => {
          if (res && res.type === 'SWARM_STATE') {
            setSwarmState(res.state);
          }
        });
      } else {
        setStatus('error');
      }
    }).catch(() => setStatus('error'));
  }, [sendMessage]);

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'SWARM_STATE_UPDATE') {
        setSwarmState(lastMessage.state);
      } else if (lastMessage.type === 'SWARM_ACTIVITY' && lastMessage.log) {
        setLogs(prev => [...prev, lastMessage.log]);
      }
    }
  }, [lastMessage]);

  const handleDeploy = async () => {
    if (!taskPrompt.trim() || isDeploying) return;

    setIsDeploying(true);
    try {
      await sendMessage({ type: 'RUN_TASK', prompt: taskPrompt });
      setTaskPrompt('');
    } finally {
      setIsDeploying(false);
    }
  };

  const agents = swarmState?.agents ? Object.values(swarmState.agents) : [];

  return (
    <Layout>
      <Header title="EKO SWARM" version="v0.0.1" />
      <MainContent>
        <div className="space-y-4">
          <section className="bg-eko-grey/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
            <h2 className="text-xs font-semibold text-eko-purple uppercase tracking-wider mb-2">System Status</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">Core Engine</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                status === 'active'
                  ? 'bg-green-500/10 text-green-500 border-green-500/20'
                  : status === 'connecting'
                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  : 'bg-red-500/10 text-red-500 border-red-500/20'
              }`}>
                {status.toUpperCase()}
              </span>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">Active Agents</h2>
            {/* @ts-ignore */}
            <AgentGrid agents={agents} />
          </section>

          <section className="space-y-2">
            <ActivityFeed logs={logs} />
          </section>
        </div>
      </MainContent>

      <footer className="p-4 bg-eko-grey/20 border-t border-white/5">
        <div className="relative">
          <input
            type="text"
            value={taskPrompt}
            onChange={(e) => setTaskPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDeploy()}
            disabled={isDeploying}
            placeholder={isDeploying ? "Deploying task..." : "Deploy task to swarm..."}
            className="w-full bg-eko-grey border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-eko-purple/50 transition-colors placeholder:text-gray-600 disabled:opacity-50"
          />
          <button
            onClick={handleDeploy}
            disabled={isDeploying || !taskPrompt.trim()}
            className="absolute right-2 top-1.5 px-2 py-1 bg-eko-purple rounded text-[10px] font-bold text-white cursor-pointer hover:bg-eko-purple/80 active:scale-95 transition-all disabled:bg-gray-700 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isDeploying ? '...' : 'GO'}
          </button>
        </div>
      </footer>
    </Layout>
  );
};
