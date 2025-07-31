import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquareX, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <MessageSquareX className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Agent Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The agent you&apos;re looking for doesn&apos;t exist or is not available.
          </p>
          
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <a href="/admin">
                View All Agents
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
