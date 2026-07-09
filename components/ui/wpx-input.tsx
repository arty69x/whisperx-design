import * as React from "react"
import { cn } from "@/lib/utils"

/** WhisperX Input — anatomy: root, label, input, helper, error. */
export interface WpxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helper?: string
  error?: string
}

export const WpxInput = React.forwardRef<HTMLInputElement, WpxInputProps>(
  ({ id, label, helper, error, className, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const describedBy = error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined

    return (
      <div className="box-border flex w-full flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "box-border w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
            "ring-1 ring-inset ring-border outline-none transition-[box-shadow]",
            "focus-visible:ring-2 focus-visible:ring-ring",
            error && "ring-destructive focus-visible:ring-destructive",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-destructive">
            {error}
          </p>
        ) : helper ? (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
            {helper}
          </p>
        ) : null}
      </div>
    )
  },
)
WpxInput.displayName = "WpxInput"
