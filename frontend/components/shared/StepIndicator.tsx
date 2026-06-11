"use client"

import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  steps: number
  current: number
  labels?: string[]
}

export function StepIndicator({ steps, current, labels }: StepIndicatorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-10 rounded-full transition-colors",
              current >= i + 1 ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      {labels && (
        <p className="text-sm text-center text-muted-foreground">
          {labels[current - 1]}
        </p>
      )}
    </div>
  )
}
