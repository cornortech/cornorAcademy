"use client"

import { useRef, useEffect, useCallback } from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"

const ITEM_H = 40
const VISIBLE = 5
const PAD = Math.floor(VISIBLE / 2)

interface WheelColumnProps {
  selected: number
  items: number[]
  onSelect: (val: number) => void
}

function WheelColumn({ selected, items, onSelect }: WheelColumnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressScroll = useRef(false)

  const scrollToIdx = useCallback((idx: number, smooth: boolean) => {
    if (!ref.current) return
    ref.current.scrollTo({ top: idx * ITEM_H, behavior: smooth ? "smooth" : "instant" })
  }, [])

  useEffect(() => {
    scrollToIdx(selected, false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (suppressScroll.current) return
    scrollToIdx(selected, true)
  }, [selected, scrollToIdx])

  const handleScroll = useCallback(() => {
    suppressScroll.current = true
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (!ref.current) return
      const idx = Math.round(ref.current.scrollTop / ITEM_H)
      const clamped = Math.max(0, Math.min(items.length - 1, idx))
      onSelect(items[clamped])
      scrollToIdx(clamped, true)
      setTimeout(() => { suppressScroll.current = false }, 60)
    }, 80)
  }, [items, onSelect, scrollToIdx])

  return (
    <div className="relative flex-1 min-w-[64px]">
      <div
        ref={ref}
        className="h-[200px] overflow-y-auto no-scrollbar snap-y snap-mandatory"
        onScroll={handleScroll}
      >
        <div style={{ height: PAD * ITEM_H }} />
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center font-mono text-lg select-none snap-center"
            style={{ height: ITEM_H }}
          >
            {String(item).padStart(2, "0")}
          </div>
        ))}
        <div style={{ height: PAD * ITEM_H }} />
      </div>
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none border-y border-primary/20 bg-primary/5 rounded-md"
        style={{ height: ITEM_H }}
      />
    </div>
  )
}

interface DurationPickerProps {
  value: number
  onChange: (totalSeconds: number) => void
  label?: string
}

export function DurationPicker({ value, onChange, label = "Duration" }: DurationPickerProps) {
  const h = Math.floor(value / 3600)
  const m = Math.floor((value % 3600) / 60)
  const s = value % 60

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const seconds = Array.from({ length: 60 }, (_, i) => i)

  const set = (hh: number, mm: number, ss: number) => onChange(hh * 3600 + mm * 60 + ss)

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
        <div className="flex items-center gap-1 border rounded-lg p-3 bg-muted/10">
          <WheelColumn selected={h} items={hours} onSelect={(v) => set(v, m, s)} />
          <span className="text-xl font-bold text-muted-foreground px-0.5">:</span>
          <WheelColumn selected={m} items={minutes} onSelect={(v) => set(h, v, s)} />
          <span className="text-xl font-bold text-muted-foreground px-0.5">:</span>
          <WheelColumn selected={s} items={seconds} onSelect={(v) => set(h, m, v)} />
        </div>
      </div>
    </div>
  )
}
