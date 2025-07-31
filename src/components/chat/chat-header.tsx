import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { Agent } from "@/types/agents"

interface ChatHeaderProps {
  agent: Agent
}

export default function ChatHeader({ agent }: ChatHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </a>
            </Button>
            
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">{agent.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{agent.type}</Badge>
                  <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <a href="/admin">
                Admin Panel
              </a>
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
        
        {agent.description && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
        )}
      </div>
    </header>
  )
}
