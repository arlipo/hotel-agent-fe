import { NextRequest, NextResponse } from 'next/server'
import { getAgentById } from '@/services/agents'

// GET /api/agents/[id] - Get agent by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Agent ID is required' }, 
        { status: 400 }
      )
    }

    const result = await getAgentById(id)
    
    if (result.resultType === 'success') {
      return NextResponse.json({ agent: result.returned })
    } else {
      return NextResponse.json(
        { error: result.message }, 
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch agent' }, 
      { status: 500 }
    )
  }
}
