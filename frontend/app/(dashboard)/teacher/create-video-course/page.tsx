"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateVideoCourseForm } from "@/components/features/courses/video/CreateVideoCourseForm"
import Link from "next/link"

export default function CreateVideoCoursePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/teacher">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <CreateVideoCourseForm />
    </div>
  )
}
