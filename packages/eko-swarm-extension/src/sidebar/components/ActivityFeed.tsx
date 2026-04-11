import React, { useEffect, useRef } from 'react';
import { ActivityLog } from '../../background/swarm/types';

interface ActivityFeedProps {
  logs: ActivityLog[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (logs.length === 0) {
    return null;
  }

  return (
    <div className="bg-eko-grey/30 border border-white/5 rounded-xl p-3 flex flex-col gap-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-eko-purple/20">
      <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1 sticky top-0 bg-eko-dark/90 backdrop-blur-sm p-1 z-10">Activity Log</h3>
      {logs.map((log) => (
        <div key={log.id} className="text-xs font-mono border-l-2 pl-2 py-1"
          style={{
            borderColor: log.type === 'error' ? '#ef4444' : log.type === 'tool' ? '#3b82f6' : log.type === 'result' ? '#22c55e' : '#7c3aed'
          }}
        >
          <div className="flex justify-between items-center text-[10px] text-gray-500 mb-0.5">
            <span className="font-bold text-gray-400">{log.agentName}</span>
            <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
          </div>
          <div className={`
            ${log.type === 'thought' ? 'text-gray-400 italic' : ''}
            ${log.type === 'tool' ? 'text-blue-300' : ''}
            ${log.type === 'result' ? 'text-green-300' : ''}
            ${log.type === 'error' ? 'text-red-300' : ''}
          `}>
            {log.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
