import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { ArrowLeft } from "lucide-react"

export default function AdminHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Hotel Agent Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Demo
              </a>
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
