"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Plus, Users, Eye, MessageSquare } from "lucide-react"
import { Agent } from "@/types/agents"
import AgentDetailsDialog from "./agent-details-dialog"
import CreateAgentDialog from "./create-agent-dialog"

interface AgentsListProps {
  initialAgents: Agent[]
}

export default function AgentsList({ initialAgents }: AgentsListProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showAgentDetails, setShowAgentDetails] = useState<boolean>(false)
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false)

  const refreshAgents = async () => {
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch('/api/agents')
      
      if (!response.ok) {
        throw new Error('Failed to fetch agents')
      }
      
      const data = await response.json()
      setAgents(data.agents)
    } catch (err) {
      setError(`Failed to refresh agents: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const loadAgentDetails = async (agentId: string) => {
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch(`/api/agents/${agentId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch agent details')
      }
      
      const data = await response.json()
      setSelectedAgent(data.agent)
      setShowAgentDetails(true)
    } catch (err) {
      setError(`Failed to load agent details: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleAgentCreated = (newAgent: Agent) => {
    setAgents(prevAgents => [...prevAgents, newAgent])
    setShowCreateForm(false)
  }

  return (
    <>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshAgents} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Agents List */}
      <div className="grid gap-4">
        {loading && agents.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading agents...</p>
            </CardContent>
          </Card>
        ) : agents.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Agents Found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first agent to get started
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            </CardContent>
          </Card>
        ) : (
          agents.map((agent) => (
            <Card key={agent.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{agent.name}</h3>
                      <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                      <Badge variant="outline">
                        {agent.type}
                      </Badge>
                    </div>
                    
                    {agent.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {agent.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/chat/${agent.id}`}>
                        <MessageSquare className="h-4 w-4" />
                      </a>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadAgentDetails(agent.id)}
                      disabled={loading}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Agent Details Dialog */}
      <AgentDetailsDialog 
        agent={selectedAgent}
        open={showAgentDetails}
        onOpenChange={setShowAgentDetails}
      />

      {/* Create Agent Dialog */}
      <CreateAgentDialog 
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        onAgentCreated={handleAgentCreated}
      />
    </>
  )
}
