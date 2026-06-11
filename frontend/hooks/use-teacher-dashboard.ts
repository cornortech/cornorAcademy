"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/api/auth.service"
import type { Teacher, Course, CourseAnnouncementItem } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

interface TeacherDashboardData {
  teacher: Teacher | null
  courses: Course[]
  announcements: CourseAnnouncementItem[]
  loading: boolean
  error: string | null
}

export function useTeacherDashboard(): TeacherDashboardData {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [announcements, setAnnouncements] = useState<CourseAnnouncementItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        const teacherData = await authService.getUserDetails("teacher") as Teacher | null
        if (cancelled) return
        if (!teacherData) {
          setLoading(false)
          return
        }
        setTeacher(teacherData)

        const coursesRes = await fetch(`${API_BASE_URL}/course/teacher/${teacherData.id}`).then(r => r.json()).catch(() => [] as Course[])
        if (cancelled) return

        const courseList = Array.isArray(coursesRes) ? coursesRes : []
        setCourses(courseList)

        const announcementPromises = courseList.map((c: any) =>
          fetch(`${API_BASE_URL}/course/${c.id}/announcement`)
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

  return { teacher, courses, announcements, loading, error }
}
