"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/api/auth.service"
import type { Student, EnrolledCourseItem, CourseAnnouncementItem } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

interface StudentDashboardData {
  student: Student | null
  enrollments: EnrolledCourseItem[]
  announcements: CourseAnnouncementItem[]
  loading: boolean
  error: string | null
}

export function useStudentDashboard(): StudentDashboardData {
  const [student, setStudent] = useState<Student | null>(null)
  const [enrollments, setEnrollments] = useState<EnrolledCourseItem[]>([])
  const [announcements, setAnnouncements] = useState<CourseAnnouncementItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        const studentData = await authService.getUserDetails("student") as Student | null
        if (cancelled) return
        if (!studentData) {
          setLoading(false)
          return
        }

        setStudent(studentData)

        const [enrollmentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/enrolled/${studentData.id}`).then(r => r.json()).catch(() => [] as EnrolledCourseItem[]),
        ])
        if (cancelled) return

        const enrolledList = Array.isArray(enrollmentsRes) ? enrollmentsRes : []
        setEnrollments(enrolledList)

        const announcementPromises = enrolledList.map((e: any) =>
          fetch(`${API_BASE_URL}/course/${e.course?.id}/announcement`)
            .then(r => r.json())
            .catch(() => [] as CourseAnnouncementItem[])
        )
        const announcementResults = await Promise.all(announcementPromises)
        if (cancelled) return

        const allAnnouncements = announcementResults.flat().filter(Boolean)
        setAnnouncements(allAnnouncements)

        setLoading(false)
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Failed to load dashboard data")
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => { cancelled = true }
  }, [])

  return { student, enrollments, announcements, loading, error }
}
