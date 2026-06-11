"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Pencil, Trash2, BookOpen } from "lucide-react"
import { toast } from "sonner"
import { useUpdateCourse, useDeleteCourse, type UpdateCourseInput } from "@/api/course"
import { DeleteConfirmDialog } from "@/components/dashboard/admin/shared/DeleteConfirmDialog"
import { TeacherCourseDialog } from "./TeacherCourseDialog"
import type { Course } from "@/types"

interface UpcomingClassesWidgetProps {
  courses: Course[]
}

export function UpcomingClassesWidget({ courses }: UpcomingClassesWidgetProps) {
  const liveClasses = courses.filter((c) => c.isOngoing && c.status === "upcoming")

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const updateCourse = useUpdateCourse()
  const deleteCourse = useDeleteCourse()

  const handleEdit = (course: Course) => {
    setSelectedCourse(course)
    setEditDialogOpen(true)
  }

  const handleDelete = (course: Course) => {
    setSelectedCourse(course)
    setDeleteDialogOpen(true)
  }

  const handleEditSubmit = async (data: UpdateCourseInput) => {
    if (!selectedCourse) return
    try {
      await updateCourse.mutateAsync({ id: selectedCourse.id, data })
      toast.success("Course updated successfully")
      setEditDialogOpen(false)
      setSelectedCourse(null)
    } catch {
      toast.error("Failed to update course")
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedCourse) return
    try {
      await deleteCourse.mutateAsync(selectedCourse.id)
      toast.success("Course deleted successfully")
      setDeleteDialogOpen(false)
      setSelectedCourse(null)
    } catch {
      toast.error("Failed to delete course")
    }
  }

  if (liveClasses.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No upcoming live classes scheduled
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {liveClasses.map((class_) => {
            const startDate = new Date(class_.startDate)
            const meetingTime = class_.meetingTime ? new Date(class_.meetingTime) : startDate

            return (
              <div
                key={class_.id}
                className="p-3 border border-border/50 rounded-lg space-y-2"
              >
                {class_.thumbnail ? (
                  <img
                    src={class_.thumbnail}
                    alt={class_.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-64 rounded-md bg-muted flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-muted-foreground" />
                  </div>
                )}
                <h4 className="font-medium text-sm">{class_.title}</h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {startDate.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {meetingTime.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {class_.enrolledStudentsCount || 0}
                  </span>
                </div>
                {class_.meetingUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <a href={class_.meetingUrl} target="_blank" rel="noopener noreferrer">
                      Start Class
                    </a>
                  </Button>
                )}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => handleEdit(class_)}
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(class_)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {selectedCourse && (
        <TeacherCourseDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          course={selectedCourse}
          onSubmit={handleEditSubmit}
          isLoading={updateCourse.isPending}
        />
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Course"
        description={`Are you sure you want to delete "${selectedCourse?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
