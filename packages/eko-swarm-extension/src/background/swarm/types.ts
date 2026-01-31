import { Agent } from '@eko-ai/eko';

export type AgentStatus = 'idle' | 'thinking' | 'busy' | 'error' | 'success';

export interface SwarmAgentMetadata {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface SwarmAgentState {
  status: AgentStatus;
  lastAction?: string;
  error?: string;
  progress?: number;
}

export interface SwarmAgent {
  instance: Agent;
  metadata: SwarmAgentMetadata;
  state: SwarmAgentState;
}

export interface SwarmState {
  agents: Record<string, SwarmAgentState & { metadata: SwarmAgentMetadata }>;
  activeTasks: string[];
  lastUpdated: number;
}

export interface ActivityLog {
  id: string;
  timestamp: number;
  agentId: string;
  agentName: string;
  type: 'thought' | 'tool' | 'result' | 'error';
  content: string;
  metadata?: any;
}

export type ExtensionMessageType =
  | 'PING'
  | 'PONG'
  | 'RUN_TASK'
  | 'GET_SWARM_STATE'
  | 'SWARM_STATE'
  | 'SWARM_STATE_UPDATE'
  | 'AGENT_FEEDBACK'
  | 'SWARM_ACTIVITY';

export interface ExtensionMessage {
  type: ExtensionMessageType;
  prompt?: string;
  taskId?: string;
  state?: SwarmState;
  data?: any;
  error?: string;
  log?: ActivityLog;
}
