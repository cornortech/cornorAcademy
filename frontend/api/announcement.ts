import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Announcement,
  CreateAnnouncementInput,
  UpdateAnnouncementInput,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  };
  const response = await fetch(url, config);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

export const announcementQueryKeys = {
  all: ["announcements"] as const,
  lists: () => [...announcementQueryKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...announcementQueryKeys.lists(), filters] as const,
  details: () => [...announcementQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...announcementQueryKeys.details(), id] as const,
  course: (courseId: string) =>
    [...announcementQueryKeys.all, "course", courseId] as const,
};

export function useGetAnnouncements(filters?: Record<string, unknown>) {
  const params = filters ? `?${new URLSearchParams(filters as any).toString()}` : "";
  return useQuery({
    queryKey: announcementQueryKeys.list(filters),
    queryFn: () => apiRequest<Announcement[]>(`/announcements${params}`),
  });
}

export function useGetAnnouncementById(id: string) {
  return useQuery({
    queryKey: announcementQueryKeys.detail(id),
    queryFn: () => apiRequest<Announcement>(`/announcements/${id}`),
    enabled: !!id,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAnnouncementInput) =>
      apiRequest<{ success: boolean; message?: string }>("/announcements", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: announcementQueryKeys.lists() });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnnouncementInput }) =>
      apiRequest<{ success: boolean; message?: string }>(`/announcements/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: announcementQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: announcementQueryKeys.lists() });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<{ success: boolean; message?: string }>(`/announcements/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: announcementQueryKeys.lists() });
    },
  });
}

export function useGetCourseAnnouncements(courseId: string) {
  return useQuery({
    queryKey: announcementQueryKeys.course(courseId),
    queryFn: () => apiRequest<Announcement[]>(`/course/${courseId}/announcement`),
    enabled: !!courseId,
  });
}

export function useCreateCourseAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      teacherId,
      courseId,
      data,
    }: {
      teacherId: string;
      courseId: string;
      data: CreateAnnouncementInput;
    }) =>
      apiRequest<{ success: boolean; message?: string }>(
        `/${teacherId}/courses/${courseId}/announcement`,
        { method: "POST", body: JSON.stringify(data) }
      ),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({
        queryKey: announcementQueryKeys.course(courseId),
      });
    },
  });
}

export function useUpdateCourseAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      announcementId,
      data,
    }: {
      announcementId: string;
      data: UpdateAnnouncementInput;
    }) =>
      apiRequest<{ success: boolean; message?: string }>(
        `/course/${announcementId}`,
        { method: "PUT", body: JSON.stringify(data) }
      ),
    onSuccess: (_, { announcementId }) => {
      queryClient.invalidateQueries({
        queryKey: announcementQueryKeys.detail(announcementId),
      });
      queryClient.invalidateQueries({
        queryKey: announcementQueryKeys.lists(),
      });
    },
  });
}

export function useDeleteCourseAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (announcementId: string) =>
      apiRequest<{ success: boolean; message?: string }>(
        `/course/${announcementId}`,
        { method: "DELETE" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: announcementQueryKeys.lists(),
      });
    },
  });
}
