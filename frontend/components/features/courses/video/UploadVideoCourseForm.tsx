"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StepIndicator } from "@/components/shared/StepIndicator"
import { BasicInfoStep } from "./steps/BasicInfoStep"
import { CurriculumStep } from "./steps/CurriculumStep"
import { PricingStep } from "./steps/PricingStep"
import axiosInstance from "@/lib/api/axios"

export interface Part {
  title: string
  videoUrl: string
  duration: number
}

export function UploadVideoCourseForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [parts, setParts] = useState<Part[]>([{ title: "", videoUrl: "", duration: 0 }])
  const [price, setPrice] = useState("")

  const validateStep = () => {
    if (step === 1) {
      if (!title.trim()) { toast.error("Title is required"); return false }
      return true
    }
    if (step === 2) {
      const invalid = parts.some((p, i) => !p.title.trim() || !p.videoUrl)
      if (invalid) { toast.error("All parts need a title and video"); return false }
      return true
    }
    if (step === 3) {
      if (!price) { toast.error("Price is required"); return false }
      if (Number(price) < 0) { toast.error("Price cannot be negative"); return false }
      return true
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1)
  }

  const handleBack = () => setStep((s) => s - 1)

  const handleSubmit = async () => {
    if (!validateStep()) return
    setLoading(true)
    try {
      await axiosInstance.post("/api/teacher/course", {
        type: "video",
        title,
        thumbnail,
        parts: parts.map((p) => ({ title: p.title, videoUrl: p.videoUrl, duration: p.duration })),
        price: Number(price),
      })
      toast.success("Video course created successfully")
      router.push("/teacher?tab=courses")
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to create course")
    } finally {
      setLoading(false)
    }
  }

  const stepLabels = ["Basic Info", "Curriculum", "Pricing"]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Video Course</h1>

      <StepIndicator steps={3} current={step} labels={stepLabels} />

      <Card>
        <CardContent className="pt-6">
          {step === 1 && (
            <BasicInfoStep
              title={title}
              onTitleChange={setTitle}
              thumbnail={thumbnail}
              onThumbnailChange={setThumbnail}
            />
          )}
          {step === 2 && (
            <CurriculumStep
              parts={parts}
              onPartsChange={setParts}
            />
          )}
          {step === 3 && (
            <PricingStep
              price={price}
              onPriceChange={setPrice}
            />
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button type="button" variant="outline" className="flex-1" onClick={handleBack} disabled={loading}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" className="flex-1" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button type="button" className="flex-1" onClick={handleSubmit} disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating...</> : "Create Course"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
