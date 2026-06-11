"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, X, FileVideo, Image } from "lucide-react"
import { useCloudinary } from "@/hooks/use-cloudinary"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  label?: string
  onUploadComplete: (url: string) => void
  className?: string
}

export function FileUpload({ accept = "image/*", label = "Upload file", onUploadComplete, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const { uploadFile, uploading } = useCloudinary()

  const isVideo = accept.includes("video")

  const handleFile = useCallback(async (file: File) => {
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    const result = await uploadFile(file)
    setProgress(100)
    onUploadComplete(result.url)
  }, [uploadFile, onUploadComplete])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const clear = () => {
    setPreview(null)
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium">{label}</p>}

      {preview ? (
        <div className="relative rounded-lg overflow-hidden border bg-muted">
          {isVideo ? (
            <video src={preview} className="w-full h-40 object-cover" controls />
          ) : (
            <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80"
            onClick={clear}
          >
            <X className="h-4 w-4" />
          </Button>
          {uploading && <Progress value={progress} className="absolute bottom-0" />}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
        >
          {isVideo ? <FileVideo className="h-8 w-8 mx-auto mb-2 text-muted-foreground" /> : <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />}
          <p className="text-sm text-muted-foreground">
            {uploading ? "Uploading..." : `Drop or click to upload ${isVideo ? "video" : "image"}`}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
