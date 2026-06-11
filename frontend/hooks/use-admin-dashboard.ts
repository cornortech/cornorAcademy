"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/api/auth.service"
import type { Admin, Student, Teacher, EnrolledCourseItem } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

interface AdminDashboardData {
  admin: Admin | null
  students: Student[]
  teachers: Teacher[]
  enrollments: EnrolledCourseItem[]
  loading: boolean
  error: string | null
}

export function useAdminDashboard(): AdminDashboardData {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [enrollments, setEnrollments] = useState<EnrolledCourseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        const adminData = await authService.getUserDetails("admin") as Admin | null
        if (cancelled) return
        setAdmin(adminData)

        const [studentsRes, teachersRes, enrollmentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/student`).then(r => r.json()).catch(() => []),
          fetch(`${API_BASE_URL}/teacher`).then(r => r.json()).catch(() => []),
          fetch(`${API_BASE_URL}/enrollement/`).then(r => r.json()).catch(() => []),
        ])
        if (cancelled) return

        setStudents(Array.isArray(studentsRes) ? studentsRes : [])
        setTeachers(Array.isArray(teachersRes) ? teachersRes : [])
        setEnrollments(Array.isArray(enrollmentsRes) ? enrollmentsRes : [])
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

  return { admin, students, teachers, enrollments, loading, error }
}
