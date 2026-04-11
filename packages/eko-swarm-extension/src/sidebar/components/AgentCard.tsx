import React from 'react';
import { SwarmAgentMetadata, SwarmAgentState } from '../../background/swarm/types';

interface AgentCardProps {
  agent: SwarmAgentState & { metadata: SwarmAgentMetadata };
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { metadata, status } = agent;
  const color = metadata.color || '#7c3aed';

  return (
    <div className="bg-eko-grey/40 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-eko-grey/60 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: color + '20', color: color }}
        >
          {metadata.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-white">{metadata.name}</div>
          <div className="text-[10px] text-gray-500 capitalize">{status}</div>
        </div>
      </div>
      {status === 'thinking' && (
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-eko-purple rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1 h-1 bg-eko-purple rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1 h-1 bg-eko-purple rounded-full animate-bounce"></div>
        </div>
      )}
    </div>
  );
};
