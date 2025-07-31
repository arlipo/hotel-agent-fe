import { NextRequest, NextResponse } from 'next/server'
import { getAllAgents, createAgent } from '@/services/agents'
import { AgentInput } from '@/types/agents'

// GET /api/agents - Get all agents
export async function GET() {
  try {
    const result = await getAllAgents()
    
    if (result.resultType === 'success') {
      return NextResponse.json({ agents: result.returned })
    } else {
      return NextResponse.json(
        { error: result.message }, 
        { status: 500 }
      )
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch agents' }, 
      { status: 500 }
    )
  }
}

// POST /api/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const agentInput: AgentInput = {
      name: body.name,
      type: body.type,
      status: body.status,
      description: body.description
    }

    // Basic validation
    if (!agentInput.name || !agentInput.type || !agentInput.status) {
      return NextResponse.json(
        { error: 'Name, type, and status are required' }, 
        { status: 400 }
      )
    }

    const result = await createAgent(agentInput)
    
    if (result.resultType === 'success') {
      return NextResponse.json({ agent: result.returned })
    } else {
      return NextResponse.json(
        { error: result.message }, 
        { status: 500 }
      )
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to create agent' }, 
      { status: 500 }
    )
  }
}
