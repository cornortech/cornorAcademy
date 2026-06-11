"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateVideoCourseForm } from "@/components/features/courses/video/CreateVideoCourseForm"
import { UnverifiedDialog } from "@/components/dashboard/teacher/UnverifiedDialog"
import { useTeacherDashboard } from "@/hooks/use-teacher-dashboard"
import Link from "next/link"

export default function CreateVideoCoursePage() {
  const { teacher, loading } = useTeacherDashboard()
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)

  useEffect(() => {
    if (!loading && teacher && !teacher.isApproved) {
      setShowVerifyDialog(true)
    }
  }, [loading, teacher])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!teacher?.isApproved) {
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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/teacher?tab=courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Courses
          </Link>
        </Button>
      </div>
      <CreateVideoCourseForm />
    </div>
  )
}
