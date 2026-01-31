import React from 'react';
import { AgentCard } from './AgentCard';
import { SwarmAgentMetadata, SwarmAgentState } from '../../background/swarm/types';

interface AgentGridProps {
  agents: (SwarmAgentState & { metadata: SwarmAgentMetadata })[];
}

export const AgentGrid: React.FC<AgentGridProps> = ({ agents }) => {
  if (agents.length === 0) {
    return (
      <div className="bg-eko-grey/30 border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-eko-purple/10 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-eko-purple/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500">No agents currently deployed</p>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {agents.map((agent) => (
        <AgentCard key={agent.metadata.id} agent={agent} />
      ))}
    </div>
  );
};
