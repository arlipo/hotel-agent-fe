import { getAgentById } from '@/services/agents'
import ChatHeader from '@/components/chat/chat-header'
import ChatInterface from '@/components/chat/chat-interface'
import { Agent } from '@/types/agents'
import { notFound } from 'next/navigation'

async function getAgentData(id: string): Promise<Agent | null> {
  try {
    const result = await getAgentById(id)
    
    if (result.resultType === 'success') {
      return result.returned
    } else {
      console.error('Failed to load agent:', result.message)
      return null
    }
  } catch (error) {
    console.error('Failed to load agent:', error)
    return null
  }
}

interface ChatPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params
  const agent = await getAgentData(id)

  if (!agent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ChatHeader agent={agent} />
      
      <div className="container mx-auto px-4 py-8">
        <ChatInterface agent={agent} />
      </div>
    </div>
  )
}
