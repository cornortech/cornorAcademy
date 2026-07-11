"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { authService } from "@/lib/api/auth.service"
import { useAuth } from "@/contexts/AuthContext"
import { useGetEnrolledCoursesByStudentId } from "@/api/course"
import { announcementQueryKeys } from "@/api/announcement"
import type { Student, EnrolledCourseItem, Announcement } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

interface StudentDashboardData {
  student: Student | null
  enrollments: EnrolledCourseItem[]
  announcements: Announcement[]
  loading: boolean
  error: string | null
}

export function useStudentDashboard(): StudentDashboardData {
  const { userData } = useAuth()
  const studentId = userData?.id ?? ""

  const studentQuery = useQuery({
    queryKey: ["student-profile", studentId],
    queryFn: () => authService.getUserDetails("student") as Promise<Student | null>,
    enabled: !!studentId,
  })

  const enrollmentsQuery = useGetEnrolledCoursesByStudentId(studentId)

  const courseIds = useMemo(
    () => (enrollmentsQuery.data ?? []).map((e) => e.course?.id).filter(Boolean) as string[],
    [enrollmentsQuery.data]
  )

  const platformAnnouncementsQuery = useQuery({
    queryKey: [...announcementQueryKeys.all, "platform", "student"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/announcements`)
      if (!res.ok) return [] as Announcement[]
      return res.json() as Promise<Announcement[]>
    },
    enabled: !!studentId,
  })

  const courseAnnouncementsQuery = useQuery({
    queryKey: [...announcementQueryKeys.all, "student-dashboard", ...courseIds],
    queryFn: async () => {
      const results = await Promise.all(
        courseIds.map((id) =>
          fetch(`${API_BASE_URL}/course/${id}/announcement`)
            .then((r) => r.json())
            .catch(() => [] as Announcement[])
        )
      )
      return results.flat().filter(Boolean) as Announcement[]
    },
    enabled: courseIds.length > 0,
  })

  const platformAnnouncements = (platformAnnouncementsQuery.data ?? [])
    .filter((a) => a.target === "EVERYONE" || a.target === "ALL_STUDENTS" || (a.target === "INDIVIDUAL_USER" && a.targetUserId === studentId))

  const courseAnnouncements = courseAnnouncementsQuery.data ?? []

  const seen = new Set(platformAnnouncements.map((a) => a.id))
  const announcements = [
    ...platformAnnouncements,
    ...courseAnnouncements.filter((a) => !seen.has(a.id)),
  ]

  const loading =
    studentQuery.isLoading ||
    enrollmentsQuery.isLoading ||
    platformAnnouncementsQuery.isLoading ||
    (courseIds.length > 0 && courseAnnouncementsQuery.isLoading)

  const error =
    studentQuery.error?.message ??
    enrollmentsQuery.error?.message ??
    platformAnnouncementsQuery.error?.message ??
    courseAnnouncementsQuery.error?.message ??
    null

  return {
    student: (studentQuery.data as Student) ?? null,
    enrollments: (enrollmentsQuery.data as EnrolledCourseItem[]) ?? [],
    announcements,
    loading,
    error,
  }
}
