"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "@/components/shared/FileUpload"
import type { Course } from "@/types"
import type { UpdateCourseInput } from "@/api/course"

interface TeacherCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course
  onSubmit: (data: UpdateCourseInput) => void
  isLoading?: boolean
}

function formatDateForInput(date: Date | string | undefined): string {
  if (!date) return ""
  const d = new Date(date)
  return d.toISOString().split("T")[0]
}

function formatDateTimeForInput(date: Date | string | undefined): string {
  if (!date) return ""
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function TeacherCourseDialog({
  open,
  onOpenChange,
  course,
  onSubmit,
  isLoading = false,
}: TeacherCourseDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    includes: "",
    whatYouWillLearn: "",
    price: "",
    duration: "",
    startDate: "",
    meetingTime: "",
    meetingUrl: "",
    category: "WebDevelopment" as string,
    level: "beginner" as string,
    language: "english" as string,
    thumbnail: "",
  })

  useEffect(() => {
    if (course && open) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        requirements: course.requirements?.join(", ") || "",
        includes: course.includes?.join(", ") || "",
        whatYouWillLearn: course.whatYouWillLearn?.join(", ") || "",
        price: course.price?.toString() || "",
        duration: course.duration?.toString() || "",
        startDate: formatDateForInput(course.startDate),
        meetingTime: formatDateTimeForInput(course.meetingTime),
        meetingUrl: course.meetingUrl || "",
        category: course.category || "WebDevelopment",
        level: course.level || "beginner",
        language: course.language || "english",
        thumbnail: course.thumbnail || "",
      })
    }
  }, [course, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.price) {
      return
    }

    const submitData: UpdateCourseInput = {
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
      includes: formData.includes
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      whatYouWillLearn: formData.whatYouWillLearn
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean),
      price: Number(formData.price),
      duration: Number(formData.duration) || 0,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      meetingTime: formData.meetingTime
        ? new Date(formData.meetingTime)
        : undefined,
      meetingUrl: formData.meetingUrl || undefined,
      category: formData.category as UpdateCourseInput["category"],
      level: formData.level as UpdateCourseInput["level"],
      language: formData.language as UpdateCourseInput["language"],
      thumbnail: formData.thumbnail || undefined,
      curriculum: [],
    }

    onSubmit(submitData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Update course information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title *</Label>
            <Input
              id="title"
              placeholder="Enter course title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Course description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (comma separated)</Label>
            <Input
              id="requirements"
              placeholder="e.g., Basic computer knowledge, Internet connection"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="includes">What&apos;s Included (comma separated)</Label>
            <Input
              id="includes"
              placeholder="e.g., Video lectures, PDF notes, Certificate"
              value={formData.includes}
              onChange={(e) =>
                setFormData({ ...formData, includes: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatYouWillLearn">
              Learning Outcomes (comma separated)
            </Label>
            <Input
              id="whatYouWillLearn"
              placeholder="e.g., Build websites, Understand JavaScript"
              value={formData.whatYouWillLearn}
              onChange={(e) =>
                setFormData({ ...formData, whatYouWillLearn: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (Rs) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="299"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (weeks)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="12"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingTime">Meeting Time</Label>
              <Input
                id="meetingTime"
                type="datetime-local"
                value={formData.meetingTime}
                onChange={(e) =>
                  setFormData({ ...formData, meetingTime: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData({ ...formData, category: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WebDevelopment">
                    Web Development
                  </SelectItem>
                  <SelectItem value="ui">UI/UX Design</SelectItem>
                  <SelectItem value="DataScience">Data Science</SelectItem>
                  <SelectItem value="DigitalMarketing">
                    Digital Marketing
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(v) => setFormData({ ...formData, level: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(v) =>
                  setFormData({ ...formData, language: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="nepali">Nepali</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              {formData.thumbnail ? (
                <div className="relative rounded-lg overflow-hidden border">
                  <img
                    src={formData.thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-24 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => setFormData({ ...formData, thumbnail: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : null}
              <FileUpload
                accept="image/*"
                label={formData.thumbnail ? "Replace thumbnail" : "Upload thumbnail"}
                onUploadComplete={(url) => setFormData({ ...formData, thumbnail: url })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingUrl">Meeting URL</Label>
            <Input
              id="meetingUrl"
              placeholder="https://meet.google.com/abc-defg-hij"
              value={formData.meetingUrl}
              onChange={(e) =>
                setFormData({ ...formData, meetingUrl: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
