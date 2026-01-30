import { SwarmAgent, SwarmState, SwarmAgentMetadata, AgentStatus } from './types';
import { Agent, Eko } from '@eko-ai/eko';

export class SwarmManager {
  private agents: Map<string, SwarmAgent> = new Map();
  private state: SwarmState = {
    agents: {},
    activeTasks: [],
    lastUpdated: Date.now(),
  };
  private eko: Eko;

  constructor(eko: Eko) {
    this.eko = eko;
    this.loadState();
  }

  public registerAgent(agent: Agent, metadata: SwarmAgentMetadata): void {
    this.agents.set(metadata.id, {
      instance: agent,
      metadata,
      state: { status: 'idle' },
    });
    // Also add to Eko core agents
    this.eko.addAgent(agent);
    this.updateState();
    this.saveState();
    this.broadcastState();
    console.log(`SwarmManager: Registered agent ${metadata.name} (${metadata.id})`);
  }

  public getAgent(id: string): SwarmAgent | undefined {
    return this.agents.get(id);
  }

  public updateAgentStatus(id: string, status: AgentStatus, lastAction?: string): void {
    const agent = this.agents.get(id);
    if (agent) {
      agent.state.status = status;
      agent.state.lastAction = lastAction;
      this.updateState();
      this.saveState();
      this.broadcastState();
    }
  }

  public getState(): SwarmState {
    return this.state;
  }

  private updateState(): void {
    const agentStates: Record<string, any> = {};
    this.agents.forEach((agent, id) => {
      agentStates[id] = {
        ...agent.state,
        metadata: agent.metadata,
      };
    });

    this.state = {
      ...this.state,
      agents: agentStates,
      lastUpdated: Date.now(),
    };
  }

  private saveState(): void {
    // @ts-ignore
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // @ts-ignore
      chrome.storage.local.set({ swarm_state: this.state });
    }
  }

  private loadState(): void {
    // @ts-ignore
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // @ts-ignore
      chrome.storage.local.get(['swarm_state'], (result) => {
        if (result.swarm_state) {
          // Restore basic metadata if needed, but instances are fresh
          console.log('SwarmManager: State loaded from storage');
        }
      });
    }
  }

  private broadcastState(): void {
    // @ts-ignore
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      // @ts-ignore
      chrome.runtime.sendMessage({ type: 'SWARM_STATE_UPDATE', state: this.state }).catch(() => {
        // Expected if no listeners are active
      });
    }
  }

  public async runTask(prompt: string): Promise<string> {
    console.log(`SwarmManager: Orchestrating task "${prompt}"`);

    // For now, we use Eko's built-in run which uses all registered agents
    // In future versions, we can add custom pre-routing logic here
    try {
      const result = await this.eko.run(prompt);
      return result.result || 'Task completed';
    } catch (error) {
      console.error('SwarmManager: Execution failed', error);
      throw error;
    }
  }
}
