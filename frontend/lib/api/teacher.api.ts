import axiosInstance from "./axios"

export async function updateTeacherApproval(teacherId: string, isApproved: boolean) {
  const { data } = await axiosInstance.put(`/teacher/${teacherId}`, { isApproved })
  return data
}
