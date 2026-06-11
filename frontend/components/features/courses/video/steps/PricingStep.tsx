"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PricingStepProps {
  price: string
  onPriceChange: (v: string) => void
  duration: string
  onDurationChange: (v: string) => void
}

export function PricingStep({ price, onPriceChange, duration, onDurationChange }: PricingStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Price (Rs) *</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="0"
        />
      </div>
      <div className="space-y-2">
        <Label>Course Duration (weeks) *</Label>
        <Input
          type="number"
          value={duration}
          onChange={(e) => onDurationChange(e.target.value)}
          placeholder="8"
        />
      </div>
    </div>
  )
}
