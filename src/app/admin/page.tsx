import { getAllAgents } from '@/services/agents'
import AdminHeader from '@/components/admin/admin-header'
import AdminStats from '@/components/admin/admin-stats'
import AgentsList from '@/components/admin/agents-list'
import { Agent } from '@/types/agents'

async function getAgentsData(): Promise<Agent[]> {
  try {
    const result = await getAllAgents()
    
    if (result.resultType === 'success') {
      return result.returned
    } else {
      console.error('Failed to load agents:', result.message)
      return []
    }
  } catch (error) {
    console.error('Failed to load agents:', error)
    return []
  }
}

export default async function AdminPage() {
  const agents = await getAgentsData()

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <AdminStats agents={agents} />
        
        <AgentsList initialAgents={agents} />
      </div>
    </div>
  )
}
