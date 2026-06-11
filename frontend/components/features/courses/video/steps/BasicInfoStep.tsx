"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUpload } from "@/components/shared/FileUpload"

interface BasicInfoStepProps {
  title: string
  onTitleChange: (v: string) => void
  thumbnail: string
  onThumbnailChange: (v: string) => void
}

export function BasicInfoStep({ title, onTitleChange, thumbnail, onThumbnailChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Course Title *</Label>
        <Input value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="e.g. Complete Web Development Bootcamp" />
      </div>
      <FileUpload
        accept="image/*"
        label="Thumbnail"
        onUploadComplete={onThumbnailChange}
      />
    </div>
  )
}
