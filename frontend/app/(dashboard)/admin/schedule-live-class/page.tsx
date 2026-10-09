"use client"

import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveCourseForm } from "@/components/features/courses/live/LiveCourseForm"
import { useGetAllTeachers } from "@/api/teacher"
import Link from "next/link"

export default function AdminScheduleLiveClassPage() {
  const { data: teachers = [], isLoading } = useGetAllTeachers()
  const teacherOptions = teachers.map((t) => ({ id: t.id, name: t.name }))

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/admin?tab=courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <LiveCourseForm isAdmin teachers={teacherOptions} />
      )}
    </div>
  )
}
