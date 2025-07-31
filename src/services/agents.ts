import {
  Agent,
  AgentInput,
  AgentQuestion,
  AgentAnswer,
  ApiError,
  GetAgentsResponse,
  GetAgentResponse,
  CreateAgentResponse,
} from '@/types/agents';
import { Probably } from '@/types/common';
import { tryCatchAsync } from '@/utils/probablyUtils';

// Get configuration from environment variables
const getBaseUrl = (): string => {
  return process.env.API_BASE_URL || 'http://localhost:3000';
};

// Generic API request function
async function makeApiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  adminToken?: string
): Promise<T> {
  const baseUrl = getBaseUrl().replace(/\/$/, ''); // Remove trailing slash
  const url = `${baseUrl}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Add Bearer token for authenticated requests if provided
  if (adminToken) {
    headers['Authorization'] = `Bearer ${adminToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(`API Error (${response.status}): ${errorData.error}${errorData.details ? ` - ${errorData.details}` : ''}`);
  }

  return response.json();
}

// API Functions

// Get all agents (admin token optional for demo)
export async function getAllAgents(adminToken?: string): Promise<Probably<Agent[]>> {
  return tryCatchAsync(async () => {
    const response = await makeApiRequest<GetAgentsResponse>('/api/agents', {}, adminToken);
    return response.agents;
  }, 'Failed to get all agents: ');
}

// Get agent by ID (admin token optional for demo)
export async function getAgentById(id: string, adminToken?: string): Promise<Probably<Agent>> {
  return tryCatchAsync(async () => {    
    const response = await makeApiRequest<GetAgentResponse>(`/api/agents/${id}`, {}, adminToken);
    return response.agent;
  }, 'Failed to get agent by ID: ');
}

// Create new agent (admin token optional for demo)
export async function createAgent(agentInput: AgentInput, adminToken?: string): Promise<Probably<Agent>> {
  return tryCatchAsync(async () => {
    const response = await makeApiRequest<CreateAgentResponse>('/api/agents', {
      method: 'POST',
      body: JSON.stringify(agentInput),
    }, adminToken);
    
    return response.agent;
  }, 'Failed to create agent: ');
}

// Ask question to agent (no auth required for public chat)
export async function askAgent(agentId: string, question: string): Promise<Probably<string>> {
  return tryCatchAsync(async () => {
    const questionData: AgentQuestion = { question: question.trim() };
    
    const response = await makeApiRequest<AgentAnswer>(
      `/api/agents/${agentId}/ask`,
      {
        method: 'POST',
        body: JSON.stringify(questionData),
      }
      // No admin token for public chat
    );
    
    return response.answer;
  }, 'Failed to ask agent: ');
}

// Helper function to check if admin token is available
export function hasAdminToken(adminToken?: string): boolean {
  return !!(adminToken && adminToken.trim().length > 0);
}