"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { authService } from "@/lib/api/auth.service"
import axiosInstance from "@/lib/api/axios"
import { useAuth } from "@/contexts/AuthContext"
import { useGetCoursesByTeacher } from "@/api/course"
import { announcementQueryKeys } from "@/api/announcement"
import type { Teacher, Course, Announcement, EnrolledCourseItem } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

interface TeacherDashboardData {
  teacher: Teacher | null
  courses: Course[]
  announcements: Announcement[]
  enrollments: EnrolledCourseItem[]
  loading: boolean
  error: string | null
}

export function useTeacherDashboard(): TeacherDashboardData {
  const { userData, userRole } = useAuth()
  const teacherId = userData?.id ?? ""
  const isTeacher = userRole === "teacher"

  const teacherQuery = useQuery({
    queryKey: ["teacher-profile", teacherId],
    queryFn: () => authService.getUserDetails("teacher") as Promise<Teacher | null>,
    enabled: !!teacherId && isTeacher,
  })

  const coursesQuery = useGetCoursesByTeacher(teacherId, isTeacher)

  const courseIds = useMemo(
    () => (coursesQuery.data ?? []).map((c: any) => c.id).filter(Boolean) as string[],
    [coursesQuery.data]
  )

  const platformAnnouncementsQuery = useQuery({
    queryKey: [...announcementQueryKeys.all, "platform", "teacher"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/announcements`)
      if (!res.ok) return [] as Announcement[]
      return res.json() as Promise<Announcement[]>
    },
    enabled: !!teacherId && isTeacher,
  })

  const courseAnnouncementsQuery = useQuery({
    queryKey: [...announcementQueryKeys.all, "teacher-dashboard", ...courseIds],
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

  const enrollmentsQuery = useQuery({
    queryKey: ["teacher-enrollments", teacherId],
    queryFn: async () => {
      const all = await axiosInstance
        .get("/enrollement/")
        .then((r) => r.data)
        .catch(() => [] as any[])
      const list = Array.isArray(all) ? all : []
      const teacherCourseIds = new Set(courseIds)
      return list.filter((e: any) => teacherCourseIds.has(e.course?.id)) as EnrolledCourseItem[]
    },
    enabled: !!teacherId && isTeacher && courseIds.length > 0,
  })

  const platformAnnouncements = (platformAnnouncementsQuery.data ?? [])
    .filter((a) => a.target === "EVERYONE" || a.target === "ALL_TEACHERS" || (a.target === "INDIVIDUAL_USER" && a.targetUserId === teacherId))

  const courseAnnouncements = courseAnnouncementsQuery.data ?? []

  const seen = new Set(platformAnnouncements.map((a) => a.id))
  const announcements = [
    ...platformAnnouncements,
    ...courseAnnouncements.filter((a) => !seen.has(a.id)),
  ]

  const enrollments = enrollmentsQuery.data ?? []

  const loading =
    teacherQuery.isLoading ||
    coursesQuery.isLoading ||
    platformAnnouncementsQuery.isLoading ||
    (courseIds.length > 0 && courseAnnouncementsQuery.isLoading) ||
    (courseIds.length > 0 && enrollmentsQuery.isLoading)

  const error =
    teacherQuery.error?.message ??
    coursesQuery.error?.message ??
    platformAnnouncementsQuery.error?.message ??
    courseAnnouncementsQuery.error?.message ??
    enrollmentsQuery.error?.message ??
    null

  return {
    teacher: (teacherQuery.data as Teacher) ?? null,
    courses: (coursesQuery.data as Course[]) ?? [],
    announcements,
    enrollments,
    loading,
    error,
  }
}
