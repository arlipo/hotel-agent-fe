import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { Agent } from "@/types/agents"

interface AdminStatsProps {
  agents: Agent[]
}

export default function AdminStats({ agents }: AdminStatsProps) {
  const activeAgents = agents.filter(a => a.status === 'Active').length

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          <span className="font-medium">{agents.length} Agents</span>
        </div>
        <Badge variant="secondary">
          Active: {activeAgents}
        </Badge>
      </div>
    </div>
  )
}
