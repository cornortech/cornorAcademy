"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ArrayFieldProps {
  label: string
  items: string[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, value: string) => void
  placeholder?: string
}

export function ArrayField({ label, items, onAdd, onRemove, onChange, placeholder }: ArrayFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={placeholder || `Item ${index + 1}`}
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
