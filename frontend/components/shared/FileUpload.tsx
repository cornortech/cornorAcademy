"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, X, FileVideo, Image } from "lucide-react"
import { toast } from "sonner"
import { useCloudinary } from "@/hooks/use-cloudinary"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  label?: string
  value?: string
  onUploadComplete: (url: string) => void
  className?: string
}

export function FileUpload({ accept = "image/*", label = "Upload file", value, onUploadComplete, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(value ?? null)
  const { uploadFile, uploading, progress, cancelUpload } = useCloudinary()

  const isVideo = accept.includes("video")

  const handleFile = useCallback(async (file: File) => {
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    try {
      const result = await uploadFile(file)
      onUploadComplete(result.url)
    } catch (err: any) {
      toast.error(err.message || "Upload failed")
      setPreview(null)
    }
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
    if (uploading) cancelUpload()
    setPreview(null)
    onUploadComplete("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium">{label}</p>}

      {(preview || value) ? (
        <div className="relative rounded-lg overflow-hidden border bg-muted">
          {isVideo ? (
            <video src={preview || value} className="w-full h-40 object-cover" controls />
          ) : (
            <img src={preview || value} alt="Preview" className="w-full h-40 object-cover" />
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
            {uploading ? `Uploading... ${progress}%` : `Drop or click to upload ${isVideo ? "video" : "image"}`}
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
