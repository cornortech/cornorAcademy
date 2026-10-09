import { useQuery } from "@tanstack/react-query"

export interface TeacherListItem {
  id: string
  uid: string
  name: string
  email: string
  image: string
  bio: string
  noOfYearsExperience: number
  expertise: string
  dob: string
  gender: "male" | "female" | "other"
  status: "registered" | "portalActivated" | "portalDeactivated" | "rejected"
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

export const teacherQueryKeys = {
  all: ["teachers"] as const,
  lists: () => [...teacherQueryKeys.all, "list"] as const,
}

export function useGetAllTeachers() {
  return useQuery({
    queryKey: teacherQueryKeys.lists(),
    queryFn: () => apiRequest<TeacherListItem[]>("/teacher"),
  })
}
