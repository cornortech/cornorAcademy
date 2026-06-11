"use client"

import { Plus, X, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUpload } from "@/components/shared/FileUpload"
import type { Part } from "../CreateVideoCourseForm"

interface CurriculumStepProps {
  parts: Part[]
  onPartsChange: (parts: Part[]) => void
}

export function CurriculumStep({ parts, onPartsChange }: CurriculumStepProps) {
  const addPart = () => onPartsChange([...parts, { title: "", videoUrl: "", duration: 0 }])

  const removePart = (index: number) => onPartsChange(parts.filter((_, i) => i !== index))

  const updatePart = (index: number, field: keyof Part, value: string | number) => {
    const next = parts.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    onPartsChange(next)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Course Parts</Label>
        <Button type="button" variant="outline" size="sm" onClick={addPart}>
          <Plus className="h-4 w-4 mr-1" />
          Add Part
        </Button>
      </div>

      {parts.map((part, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Part {index + 1}</span>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => removePart(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              value={part.title}
              onChange={(e) => updatePart(index, "title", e.target.value)}
              placeholder="e.g. Introduction to HTML"
            />
          </div>

          <FileUpload
            accept="video/*"
            label="Video"
            onUploadComplete={(url) => updatePart(index, "videoUrl", url)}
          />

          <div className="space-y-2">
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              value={part.duration || ""}
              onChange={(e) => updatePart(index, "duration", Number(e.target.value))}
              placeholder="30"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
