"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileUpload } from "@/components/shared/FileUpload"
import { ArrayField } from "@/components/shared/ArrayField"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetCourseById } from "@/api/course"
import axiosInstance from "@/lib/api/axios"

interface TeacherInfo {
  id: string
  name: string
}

interface LiveCourseFormProps {
  courseId?: string
  isAdmin?: boolean
  teachers?: TeacherInfo[]
  onSuccess?: () => void
}

export function LiveCourseForm({ courseId, isAdmin, teachers = [], onSuccess }: LiveCourseFormProps) {
  const router = useRouter()
  const isEditMode = !!courseId
  const { data: courseData, isLoading: courseLoading } = useGetCourseById(courseId || "")

  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [title, setTitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [whatYoullLearn, setWhatYoullLearn] = useState<string[]>([""])
  const [meetingUrl, setMeetingUrl] = useState("")
  const [selectedTeacherId, setSelectedTeacherId] = useState("")

  useEffect(() => {
    if (isEditMode && courseData && !initialized) {
      setTitle(courseData.title || "")
      setThumbnail(courseData.thumbnail || "")
      setPrice(courseData.price?.toString() || "")
      setDescription(courseData.description || "")
      setWhatYoullLearn(
        courseData.whatYouWillLearn?.length > 0
          ? courseData.whatYouWillLearn
          : [""]
      )
      setMeetingUrl(courseData.meetingUrl || "")
      if (courseData.startDate) {
        const d = new Date(courseData.startDate)
        setStartDate(d.toISOString().split("T")[0])
        setStartTime(
          `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
        )
      }
      setInitialized(true)
    }
  }, [isEditMode, courseData, initialized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !startDate || !startTime || !price) {
      toast.error("Please fill in all required fields")
      return
    }
    if (isAdmin && !selectedTeacherId) {
      toast.error("Please select a teacher")
      return
    }

    setLoading(true)
    try {
      const startDateTime = new Date(`${startDate}T${startTime}`)
      const payload: Record<string, any> = {
        title,
        thumbnail,
        startDate: startDateTime.toISOString(),
        price: Number(price),
        description,
        whatYouWillLearn: whatYoullLearn.filter(Boolean),
        meetingUrl,
      }

      if (isAdmin && selectedTeacherId) {
        payload.teacherId = selectedTeacherId
      }

      if (isEditMode) {
        await axiosInstance.put(`/api/teacher/course/${courseId}`, payload)
        toast.success("Live class updated successfully")
      } else {
        await axiosInstance.post("/api/teacher/course", { type: "live", ...payload })
        toast.success("Live class created successfully")
      }
      if (onSuccess) {
        onSuccess()
      } else {
        router.push(isAdmin ? "/admin?tab=courses" : "/teacher?tab=upcoming")
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || `Failed to ${isEditMode ? "update" : "create"} course`)
    } finally {
      setLoading(false)
    }
  }

  const addLearnItem = () => setWhatYoullLearn([...whatYoullLearn, ""])
  const removeLearnItem = (i: number) => setWhatYoullLearn(whatYoullLearn.filter((_, idx) => idx !== i))
  const updateLearnItem = (i: number, v: string) => {
    const next = [...whatYoullLearn]
    next[i] = v
    setWhatYoullLearn(next)
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
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-3xl font-bold">{isEditMode ? "Edit Live Class" : "Schedule Live Class"}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course title" />
          </div>
          {isAdmin && teachers.length > 0 && (
            <div className="space-y-2">
              <Label>Assign Teacher *</Label>
              <Select value={selectedTeacherId} onValueChange={setSelectedTeacherId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <FileUpload
            accept="image/*"
            label="Thumbnail"
            onUploadComplete={setThumbnail}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date *</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Start Time *</Label>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label>Price (Rs) *</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Syllabus / Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe what the course covers..." />
          </div>
          <ArrayField
            label="What You'll Learn"
            items={whatYoullLearn}
            onAdd={addLearnItem}
            onRemove={removeLearnItem}
            onChange={updateLearnItem}
            placeholder="e.g. Build real-world projects"
          />
          <div className="space-y-2">
            <Label>Meeting URL (Private)</Label>
            <Input value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="Zoom / Google Meet link" />
            <p className="text-xs text-muted-foreground">Hidden from students. Will be emailed before class.</p>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {isEditMode ? "Updating..." : "Creating..."}</> : isEditMode ? "Update Live Class" : "Create Live Class"}
      </Button>
    </form>
  )
}
