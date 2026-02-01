import { Eko, Agent, EkoConfig, AgentStreamMessage } from '@eko-ai/eko';
import { SwarmManager } from './swarm/SwarmManager';
import { ExtensionMessage, ActivityLog } from './swarm/types';

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
  private config: EkoConfig;

  private constructor() {
    // Configure Eko
    this.config = {
      llms: {
        default: {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet-latest',
          apiKey: 'dummy-key',
        },
      },
      agents: [],
      callback: {
        onMessage: async (msg: AgentStreamMessage) => {
          let type: ActivityLog['type'] | undefined;
          let content = '';
          let metadata = {};

          if (msg.type === 'text' || msg.type === 'thinking') {
            type = 'thought';
            content = msg.text || '';
          } else if (msg.type === 'tool_use') {
            type = 'tool';
            content = `Using tool ${msg.toolName}`;
            metadata = { toolName: msg.toolName, params: msg.params };
          } else if (msg.type === 'tool_result') {
            type = 'tool';
            content = `Tool ${msg.toolName} finished`;
            metadata = { toolName: msg.toolName, result: msg.toolResult };
          } else if (msg.type === 'agent_result') {
            type = 'result';
            content = msg.result || 'Agent finished';
          } else if (msg.type === 'error') {
            type = 'error';
            content = String(msg.error);
          }

          if (type) {
            this.swarm.addActivityLog({
              agentId: msg.agentName || 'system',
              agentName: msg.agentName || 'System',
              type,
              content,
              metadata,
            });
          }
        },
      },
    };

    this.eko = new Eko(this.config);

    // Initialize Swarm Manager
    this.swarm = new SwarmManager(this.eko);

    this.loadApiKey();

    // Register initial agents
    this.swarm.registerAgent(new PingAgent(), {
      id: 'ping-agent',
      name: 'PingAgent',
      description: 'System connectivity tester',
      color: '#7c3aed',
    });

    console.log('AgentHost: Eko Swarm initialized');
  }

  private loadApiKey(): void {
    // @ts-ignore
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // @ts-ignore
      chrome.storage.local.get(['apiKey'], (result) => {
        if (result.apiKey) {
          if (this.config.llms && this.config.llms.default) {
            this.config.llms.default.apiKey = result.apiKey;
            console.log('AgentHost: API Key loaded from storage');
          }
        }
      });
    }
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
        this.runTask(message.prompt).catch((error) => {
          console.error('AgentHost: Task failed', error);
        });
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
