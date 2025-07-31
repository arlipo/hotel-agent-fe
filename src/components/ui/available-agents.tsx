"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users } from "lucide-react"
import { Agent } from "@/types/agents"

export default function AvailableAgents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    loadAgents()
  }, [])

  const loadAgents = async () => {
    try {
      const response = await fetch('/api/agents')
      
      if (!response.ok) {
        throw new Error('Failed to fetch agents')
      }
      
      const data = await response.json()
      setAgents(data.agents.filter((agent: Agent) => agent.status === 'Active'))
    } catch (err) {
      setError(`Failed to load agents: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Available Agents
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Loading available agents...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No active agents available</p>
            <Button variant="outline" className="mt-2" asChild>
              <a href="/admin">Create an Agent</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{agent.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {agent.type}
                    </Badge>
                  </div>
                  {agent.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {agent.description}
                    </p>
                  )}
                </div>
                
                <Button size="sm" asChild>
                  <a href={`/chat/${agent.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
