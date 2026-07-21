"use client"

import { useState, useCallback, useRef } from "react"
import { auth } from "@/lib/firebase/config"

interface UploadResult {
  progress: number
  url: string
  publicId: string
}

export function useCloudinary() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const xhrRef = useRef<XMLHttpRequest | null>(null)

  const uploadFile = useCallback(async (file: File, folder?: string): Promise<UploadResult> => {
    setUploading(true)
    setProgress(0)

    try {
      const token = auth.currentUser ? await auth.currentUser.getIdToken() : ""

      const result = await new Promise<UploadResult>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhrRef.current = xhr

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100))
          }
        })

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText)
            resolve({ progress: 100, url: data.url, publicId: data.publicId })
          } else {
            let message = "Upload failed"
            try {
              const data = JSON.parse(xhr.responseText)
              message = data.error || message
            } catch {}
            reject(new Error(message))
          }
        })

        xhr.addEventListener("error", () => reject(new Error("Network error during upload")))
        xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")))

        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", folder || "cornor-academy")

        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || ""
        xhr.open("POST", `${baseURL}/api/upload`)
        if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`)
        xhr.send(formData)
      })

      return result
    } finally {
      setUploading(false)
      setProgress(0)
      xhrRef.current = null
    }
  }, [])

  const cancelUpload = useCallback(() => {
    xhrRef.current?.abort()
  }, [])

  return { uploadFile, uploading, progress, cancelUpload }
}
