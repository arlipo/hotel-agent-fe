// Hotel Agents API Types
// Based on swagger.json specification

export type AgentType = 'Sales' | 'Support' | 'Marketing';
export type AgentStatus = 'Active' | 'Inactive';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  description?: string;
}

export interface AgentInput {
  name: string;
  type: AgentType;
  status: AgentStatus;
  description?: string;
}

export interface AgentQuestion {
  question: string;
}

export interface AgentAnswer {
  answer: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

// API Response Types
export interface GetAgentsResponse {
  agents: Agent[];
}

export interface GetAgentResponse {
  agent: Agent;
}

export interface CreateAgentResponse {
  agent: Agent;
}