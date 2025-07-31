import { Button } from "@/components/ui/button"
import AvailableAgents from "@/components/ui/available-agents"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { Settings } from "lucide-react"

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Hotel Agent</h1>
              <p className="text-muted-foreground">Luxury Customer Support</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <a href="/admin">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </a>
              </Button>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Available Agents Section */}
        <div className="max-w-2xl mx-auto">
          <AvailableAgents />
        </div>
      </div>
    </div>
  )
}
