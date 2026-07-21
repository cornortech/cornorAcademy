"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PricingStepProps {
  price: string
  onPriceChange: (v: string) => void
}

export function PricingStep({ price, onPriceChange }: PricingStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Price (Rs) *</Label>
        <Input
          type="number"
          min="0"
          step="1"
          value={price}
          onChange={(e) => {
            const val = e.target.value
            if (val === "" || Number(val) >= 0) onPriceChange(val)
          }}
          placeholder="0"
          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    </div>
  )
}
