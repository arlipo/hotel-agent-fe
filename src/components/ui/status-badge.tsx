import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type StatusType = "pending" | "in-progress" | "completed" | "cancelled" | "urgent"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-warning text-warning-foreground hover:bg-warning/80"
  },
  "in-progress": {
    label: "In Progress", 
    className: "bg-info text-info-foreground hover:bg-info/80"
  },
  completed: {
    label: "Completed",
    className: "bg-success text-success-foreground hover:bg-success/80"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground hover:bg-muted/80"
  },
  urgent: {
    label: "Urgent",
    className: "bg-error text-error-foreground hover:bg-error/80 animate-pulse"
  }
} as const

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge 
      variant="secondary"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  )
}
