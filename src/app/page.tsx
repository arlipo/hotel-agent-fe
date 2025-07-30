"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { StatusBadge } from "@/components/ui/status-badge"
import { MessageSquare, Shield, Users, Star } from "lucide-react"

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Welcome to The Grand Hotel! How may I assist you today?",
      isUser: false,
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 2, 
      message: "I'd like to book a room for this weekend, please.",
      isUser: true,
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: 3,
      message: "I'd be happy to help you with your reservation. Let me check our availability for this weekend. What type of room would you prefer?",
      isUser: false,
      timestamp: new Date()
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      message,
      isUser: true,
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        message: "Thank you for your message. I'm processing your request...",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Hotel Agent</h1>
              <p className="text-muted-foreground">Luxury Customer Support & Admin Panel</p>
            </div>
            <Badge className="bg-accent text-accent-foreground">Demo</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <MessageSquare className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold">AI Chat</h3>
              <p className="text-sm text-muted-foreground">24/7 Customer Support</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">Enterprise Security</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold">Admin Panel</h3>
              <p className="text-sm text-muted-foreground">CRUD Operations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold">Premium</h3>
              <p className="text-sm text-muted-foreground">Luxury Experience</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Demo */}
          <Card className="flex flex-col h-[600px]">
            <CardHeader>
              <CardTitle>Live Chat Demo</CardTitle>
              <CardDescription>
                Experience our luxury customer support interface
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg.message}
                    isUser={msg.isUser}
                    timestamp={msg.timestamp}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-border bg-background">
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
            </CardContent>
          </Card>

          {/* Color Palette & Components Demo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Luxury Color Palette</CardTitle>
                <CardDescription>
                  Professional hotel industry colors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-primary text-primary-foreground">
                    <p className="font-medium">Primary</p>
                    <p className="text-sm opacity-90">Navy Blue</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
                    <p className="font-medium">Secondary</p>
                    <p className="text-sm opacity-90">Champagne</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent text-accent-foreground">
                    <p className="font-medium">Accent</p>
                    <p className="text-sm opacity-90">Rich Gold</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted text-muted-foreground">
                    <p className="font-medium">Muted</p>
                    <p className="text-sm opacity-90">Warm Gray</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Management</CardTitle>
                <CardDescription>
                  Hotel service request statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="pending" />
                  <StatusBadge status="in-progress" />
                  <StatusBadge status="completed" />
                  <StatusBadge status="cancelled" />
                  <StatusBadge status="urgent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UI Components</CardTitle>
                <CardDescription>
                  shadcn/ui with luxury styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                </div>
                <Separator />
                <Input placeholder="Luxury input field..." />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
