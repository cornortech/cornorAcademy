"use client"

import { useState } from "react"
import axiosInstance from "@/lib/api/axios"

interface UploadResult {
  progress: number
  url: string
  publicId: string
}

export function useCloudinary() {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File, folder?: string): Promise<UploadResult> => {
    setUploading(true)

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const { data } = await axiosInstance.post("/api/upload", {
        file: base64,
        folder: folder || "cornor-academy",
      })

      return { progress: 100, url: data.url, publicId: data.publicId }
    } finally {
      setUploading(false)
    }
  }

  return { uploadFile, uploading }
}
