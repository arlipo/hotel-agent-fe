import { cn, formatTime } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
  className?: string
}

export function ChatMessage({ message, isUser, timestamp, className }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 px-4 py-2",
      isUser ? "justify-end" : "justify-start",
      className
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/hotel-bot-avatar.png" alt="Hotel Assistant" />
          <AvatarFallback className="bg-accent text-accent-foreground text-xs">
            HA
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[70%] space-y-1 flex flex-col",
        isUser ? "items-end" : "items-start"
      )}>
        <div 
          className={cn(
            "rounded-lg px-4 py-2 text-sm break-words",
            isUser && "ml-auto"
          )}
          style={{
            backgroundColor: isUser ? "var(--chat-user-bg)" : "var(--chat-bot-bg)",
            color: isUser ? "var(--chat-user-text)" : "var(--chat-bot-text)"
          }}
        >
          {message}
        </div>
        <p className="text-xs text-muted-foreground px-2">
          {formatTime(timestamp)}
        </p>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/user-avatar.png" alt="You" />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
