import * as React from "react"
import { cn } from "@/lib/utils"

/** WhisperX Card — anatomy: root, header, body, footer. */
export function WpxCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "box-border rounded-2xl bg-card text-card-foreground ring-1 ring-border shadow-[var(--shadow-token-md)]",
        className,
      )}
      {...props}
    />
  )
}

export function WpxCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
}

export function WpxCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-xl font-bold tracking-tight text-balance", className)}
      {...props}
    />
  )
}

export function WpxCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground text-pretty", className)} {...props} />
}

export function WpxCardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6", className)} {...props} />
}

export function WpxCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 border-t border-border px-6 py-4", className)} {...props} />
}
