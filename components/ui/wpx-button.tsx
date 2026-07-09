"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"
import { tapTransition } from "@/lib/motion"

type Variant = "primary" | "secondary" | "ghost" | "outline"
type Size = "sm" | "md" | "lg"

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[var(--shadow-glow-pink)] hover:brightness-[0.98] active:brightness-[0.96]",
  secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent",
  outline:
    "bg-transparent text-foreground ring-1 ring-inset ring-border hover:ring-primary hover:text-primary",
}

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-4 py-2 rounded-lg gap-2",
  lg: "text-base px-6 py-3 rounded-xl gap-2.5",
}

export interface WpxButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant
  size?: Size
}

export const WpxButton = React.forwardRef<HTMLButtonElement, WpxButtonProps>(
  ({ children, variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={tapTransition}
        className={cn(
          "box-border inline-flex items-center justify-center font-semibold transition-[filter,background-color,color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)
WpxButton.displayName = "WpxButton"
