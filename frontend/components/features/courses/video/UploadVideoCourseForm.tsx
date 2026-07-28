"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StepIndicator } from "@/components/shared/StepIndicator"
import { BasicInfoStep } from "./steps/BasicInfoStep"
import { CurriculumStep } from "./steps/CurriculumStep"
import { PricingStep } from "./steps/PricingStep"
import { useGetCourseById } from "@/api/course"
import axiosInstance from "@/lib/api/axios"

export interface Part {
  title: string
  videoUrl: string
  duration: number
}

interface UploadVideoCourseFormProps {
  courseId?: string
}

export function UploadVideoCourseForm({ courseId }: UploadVideoCourseFormProps) {
  const router = useRouter()
  const isEditMode = !!courseId
  const { data: courseData, isLoading: courseLoading } = useGetCourseById(courseId || "")

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const [title, setTitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [parts, setParts] = useState<Part[]>([{ title: "", videoUrl: "", duration: 0 }])
  const [price, setPrice] = useState("")

  useEffect(() => {
    if (isEditMode && courseData && !initialized) {
      setTitle(courseData.title || "")
      setThumbnail(courseData.thumbnail || "")
      setPrice(courseData.price?.toString() || "")
      if (courseData.lessons && courseData.lessons.length > 0) {
        setParts(
          courseData.lessons
            .sort((a, b) => a.order - b.order)
            .map((l) => ({ title: l.title, videoUrl: l.videoUrl, duration: l.duration }))
        )
      }
      setInitialized(true)
    }
  }, [isEditMode, courseData, initialized])

  const validateStep = () => {
    if (step === 1) {
      if (!title.trim()) { toast.error("Title is required"); return false }
      return true
    }
    if (step === 2) {
      const invalid = parts.some((p) => !p.title.trim() || !p.videoUrl)
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
      const payload = {
        title,
        thumbnail,
        parts: parts.map((p) => ({ title: p.title, videoUrl: p.videoUrl, duration: p.duration })),
        price: Number(price),
      }

      if (isEditMode) {
        await axiosInstance.put(`/api/teacher/course/${courseId}`, payload)
        toast.success("Course updated successfully")
      } else {
        await axiosInstance.post("/api/teacher/course", { type: "video", ...payload })
        toast.success("Video course created successfully")
      }
      router.push("/teacher?tab=courses")
    } catch (err: any) {
      toast.error(err.response?.data?.error || `Failed to ${isEditMode ? "update" : "create"} course`)
    } finally {
      setLoading(false)
    }
  }

  if (isEditMode && courseLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-full" />
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const stepLabels = ["Basic Info", "Curriculum", "Pricing"]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{isEditMode ? "Edit Video Course" : "Upload Video Course"}</h1>

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
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {isEditMode ? "Updating..." : "Creating..."}</> : isEditMode ? "Update Course" : "Create Course"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
