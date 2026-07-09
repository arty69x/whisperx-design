import * as React from "react"
import { cn } from "@/lib/utils"

type Tone = "pink" | "orange" | "blue" | "success" | "warning" | "neutral"

const tones: Record<Tone, string> = {
  pink: "bg-primary/15 text-brand-pink ring-primary/30",
  orange: "bg-brand-orange/15 text-brand-orange ring-brand-orange/30",
  blue: "bg-brand-blue/15 text-brand-blue ring-brand-blue/30",
  success: "bg-success/15 text-success ring-success/30",
  warning: "bg-warning/15 text-warning ring-warning/30",
  neutral: "bg-secondary text-muted-foreground ring-border",
}

export interface WpxBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function WpxBadge({ tone = "neutral", className, ...props }: WpxBadgeProps) {
  return (
    <span
      className={cn(
        "box-border inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
