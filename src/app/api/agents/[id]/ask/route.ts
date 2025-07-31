import { NextRequest, NextResponse } from 'next/server'
import { askAgent } from '@/services/agents'

// POST /api/agents/[id]/ask - Ask question to agent
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { question } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Agent ID is required' }, 
        { status: 400 }
      )
    }

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question is required and must be a non-empty string' }, 
        { status: 400 }
      )
    }

    const result = await askAgent(id, question.trim())
    
    if (result.resultType === 'success') {
      return NextResponse.json({ answer: result.returned })
    } else {
      return NextResponse.json(
        { error: result.message }, 
        { status: 500 }
      )
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to ask agent' }, 
      { status: 500 }
    )
  }
}
