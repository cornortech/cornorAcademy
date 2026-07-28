"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UploadVideoCourseForm } from "@/components/features/courses/video/UploadVideoCourseForm"
import { UnverifiedDialog } from "@/components/dashboard/teacher/UnverifiedDialog"
import { useTeacherDashboard } from "@/hooks/use-teacher-dashboard"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"

export default function EditCoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { userRole } = useAuth()
  const isTeacher = userRole === "teacher"
  const { teacher, loading } = useTeacherDashboard()
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)

  useEffect(() => {
    if (isTeacher && !loading && teacher && !teacher.isApproved) {
      setShowVerifyDialog(true)
    }
  }, [isTeacher, loading, teacher])

  if (isTeacher && loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (isTeacher && !teacher?.isApproved) {
    return (
      <>
        <UnverifiedDialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog} />
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Button variant="ghost" asChild>
            <Link href="/teacher?tab=courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Courses
            </Link>
          </Button>
        </div>
      </>
    )
  }

  const backHref = isTeacher ? "/teacher?tab=courses" : "/admin?tab=courses"

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isTeacher ? "Back to My Courses" : "Back to Courses"}
          </Link>
        </Button>
      </div>
      <UploadVideoCourseForm courseId={courseId} />
    </div>
  )
}
