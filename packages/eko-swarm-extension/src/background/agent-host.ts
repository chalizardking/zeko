import { Eko, Agent } from '@eko-ai/eko';
import { SwarmManager } from './swarm/SwarmManager';
import { ExtensionMessage } from './swarm/types';

class PingAgent extends Agent {
  constructor() {
    super({
      name: 'PingAgent',
      description: 'A simple agent for testing connectivity',
      tools: [],
    });
  }

  async run(): Promise<string> {
    return 'PONG';
  }
}

export class AgentHost {
  private static instance: AgentHost;
  private eko: Eko;
  private swarm: SwarmManager;

  private constructor() {
    // Configure Eko
    this.eko = new Eko({
      llms: {
        default: {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet-latest',
          apiKey: 'dummy-key',
        },
      },
      agents: [],
    });

    // Initialize Swarm Manager
    this.swarm = new SwarmManager(this.eko);

    // Register initial agents
    this.swarm.registerAgent(new PingAgent(), {
      id: 'ping-agent',
      name: 'PingAgent',
      description: 'System connectivity tester',
      color: '#7c3aed',
    });

    console.log('AgentHost: Eko Swarm initialized');
  }

  public static getInstance(): AgentHost {
    if (!AgentHost.instance) {
      AgentHost.instance = new AgentHost();
    }
    return AgentHost.instance;
  }

  public async runTask(prompt: string): Promise<string> {
    return this.swarm.runTask(prompt);
  }

  public async handleMessage(message: ExtensionMessage): Promise<any> {
    switch (message.type) {
      case 'PING':
        return { type: 'PONG', data: 'Eko Swarm Extension Active' };

      case 'RUN_TASK':
        if (!message.prompt) return { error: 'Missing prompt' };
        this.runTask(message.prompt);
        return { type: 'AGENT_FEEDBACK', data: 'Task started' };

      case 'GET_SWARM_STATE':
        return { type: 'SWARM_STATE', state: this.swarm.getState() };

      default:
        // @ts-ignore
        return { error: `Unknown message type: ${message.type}` };
    }
  }

  public getEko(): Eko {
    return this.eko;
  }
}
