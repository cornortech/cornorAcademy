import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import {
  EnrolledCourseItem,
  CreateEnrolledCourseInput,
  CourseMediaItem,
  CreateCourseMediaInput,
  UpdateCourseMediaInput,
  Lesson,
  CourseProgress,
  MarkCompleteResponse,
} from "@/types";
import axiosInstance from "@/lib/api/axios";

const createCourseSchema = z.object({
  title: z.string().min(3, "Course title is required"),
  description: z.string().min(10, "Course description is required"),
  requirements: z.array(z.string()).min(2, "Requirements is required"),
  includes: z.array(z.string()).min(2, "Course include is required"),
  whatYouWillLearn: z.array(z.string()),
  meetingUrl: z.string(),
  meetingTime: z.date(),
  language: z.enum(["nepali", "english"]),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  thumbnail: z.string(),
  category: z.enum(["WebDevelopment", "ui", "DataScience", "DigitalMarketing"]),
  startDate: z.date(),
  duration: z.number(),
  price: z.number().min(1, "Price is required"),
  curriculum: z.array(
    z.object({
      title: z.string().min(2, "curriculum is required "),
      noOfLesson: z.number(),
      duration: z.number(),
      content: z.array(z.string()),
    })
  ),
  teacherId: z.string().uuid(),
});

const updateCourseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  whatYouWillLearn: z.array(z.string()).optional(),
  meetingUrl: z.string().optional(),
  meetingTime: z.date().optional(),
  language: z.enum(["nepali", "english"]).optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  thumbnail: z.string().optional(),
  category: z
    .enum(["WebDevelopment", "ui", "DataScience", "DigitalMarketing"])
    .optional(),
  startDate: z.date().optional(),
  duration: z.number().optional(),
  price: z.number().optional(),
  curriculum: z.array(
    z.object({
      title: z.string().optional(),
      noOfLesson: z.number().optional(),
      content: z.array(z.string()).optional(),
    })
  ),
  teacherId: z.string().uuid().optional(),
});

const updateCourseStatusSchema = z.object({
  status: z.enum(["upcoming", "active", "completed"]),
});

const searchCoursesSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

const createEnrolledCourseSchema = z.object({
  studentId: z.string().uuid(),
  courseId: z.string().uuid(),
});

const createCourseMediaSchema = z.object({
  courseId: z.string(),
  title: z.string().min(3, "Proper course tile is needed"),
  description: z.string().min(3).max(500),
  duration: z.number().optional(),
  pathURL: z.string(),
  type: z.enum([
    "pdf",
    "video",
    "img",
    "code",
    "docx",
    "xlsx",
    "txt",
    "jpg",
    "png",
    "mp3",
    "mp4",
    "zip",
    "exe",
    "other",
  ]),
});

const updateCourseMediaSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(3).max(500).optional(),
  pathURL: z.string().optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type UpdateCourseStatusInput = z.infer<typeof updateCourseStatusSchema>;
export type SearchCoursesInput = z.infer<typeof searchCoursesSchema>;

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  includes: string[];
  whatYouWillLearn: string[];
  meetingUrl?: string;
  meetingTime?: Date;
  language: "nepali" | "english";
  level: "beginner" | "intermediate" | "advanced";
  thumbnail: string;
  category: "WebDevelopment" | "ui" | "DataScience" | "DigitalMarketing";
  startDate: Date;
  duration: number;
  price: number;
  isOngoing: boolean;
  status: "upcoming" | "active" | "completed";
  curriculum: {
    id: string;
    title: string;
    noOfLesson: number;
    content: string[];
  }[];
  teacher: {
    id: string;
    name: string;
  } | null;
  enrolledStudentsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const API_BASE_URL = "http://localhost:4000";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const courseQueryKeys = {
  all: ["courses"] as const,
  lists: () => [...courseQueryKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...courseQueryKeys.lists(), filters] as const,
  details: () => [...courseQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...courseQueryKeys.details(), id] as const,
  categories: (category: string) =>
    [...courseQueryKeys.all, "category", category] as const,
  teachers: (teacherId: string) =>
    [...courseQueryKeys.all, "teacher", teacherId] as const,
  statuses: (status: string) =>
    [...courseQueryKeys.all, "status", status] as const,
  search: (query: string) => [...courseQueryKeys.all, "search", query] as const,
};

export function useGetAllCourses() {
  return useQuery({
    queryKey: courseQueryKeys.lists(),
    queryFn: () => apiRequest<Course[]>("/course"),
  });
}

export function useGetCourseById(id: string) {
  return useQuery({
    queryKey: courseQueryKeys.detail(id),
    queryFn: () => apiRequest<Course>(`/course/${id}`),
    enabled: !!id,
  });
}

export function useGetCoursesByCategory(
  category: "WebDevelopment" | "ui" | "DataScience" | "DigitalMarketing"
) {
  return useQuery({
    queryKey: courseQueryKeys.categories(category),
    queryFn: () => apiRequest<Course[]>(`/course/category/${category}`),
    enabled: !!category,
  });
}

export function useGetCoursesByTeacher(teacherId: string) {
  return useQuery({
    queryKey: courseQueryKeys.teachers(teacherId),
    queryFn: () => apiRequest<Course[]>(`/course/teacher/${teacherId}`),
    enabled: !!teacherId,
  });
}

export function useGetCoursesByStatus(
  status: "upcoming" | "active" | "completed"
) {
  return useQuery({
    queryKey: courseQueryKeys.statuses(status),
    queryFn: () => apiRequest<Course[]>(`/course/status/${status}`),
    enabled: !!status,
  });
}

export function useSearchCourses(query: string) {
  return useQuery({
    queryKey: courseQueryKeys.search(query),
    queryFn: () =>
      apiRequest<Course[]>(`/course/search/${encodeURIComponent(query)}`),
    enabled: !!query,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseInput) =>
      apiRequest<ApiResponse<Course>>("/course", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.lists() });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseInput }) =>
      apiRequest<ApiResponse<Course>>(`/course/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.lists() });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<ApiResponse<Course>>(`/course/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.lists() });
    },
  });
}

export function useUpdateCourseStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseStatusInput }) =>
      apiRequest<ApiResponse<Course>>(`/course/status/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.lists() });
    },
  });
}

export const enrolledCourseQueryKeys = {
  all: ["enrolledCourses"] as const,
  lists: () => [...enrolledCourseQueryKeys.all, "list"] as const,
  list: (studentId: string) =>
    [...enrolledCourseQueryKeys.lists(), studentId] as const,
};

export const courseMediaQueryKeys = {
  all: ["courseMedia"] as const,
  lists: () => [...courseMediaQueryKeys.all, "list"] as const,
  list: (courseId: string) =>
    [...courseMediaQueryKeys.lists(), courseId] as const,
  details: () => [...courseMediaQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...courseMediaQueryKeys.details(), id] as const,
};

export function useGetEnrolledCoursesByStudentId(studentId: string) {
  return useQuery({
    queryKey: enrolledCourseQueryKeys.list(studentId),
    queryFn: () => apiRequest<EnrolledCourseItem[]>(`/enrolled/${studentId}`),
    enabled: !!studentId,
  });
}

export function useCreateEnrolledCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEnrolledCourseInput) =>
      apiRequest<ApiResponse<EnrolledCourseItem>>("/enrolled", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { studentId }) => {
      queryClient.invalidateQueries({
        queryKey: enrolledCourseQueryKeys.list(studentId),
      });
    },
  });
}

export function useGetCourseMediaByCourseId(courseId: string) {
  return useQuery({
    queryKey: courseMediaQueryKeys.list(courseId),
    queryFn: () => apiRequest<CourseMediaItem[]>(`/course-media/${courseId}`),
    enabled: !!courseId,
  });
}

export function useGetCourseMediaById(mediaId: string) {
  return useQuery({
    queryKey: courseMediaQueryKeys.detail(mediaId),
    queryFn: () => apiRequest<CourseMediaItem>(`/course-media/${mediaId}`),
    enabled: !!mediaId,
  });
}

export function useCreateCourseMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseMediaInput) =>
      apiRequest<ApiResponse<CourseMediaItem>>("/course-media", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({
        queryKey: courseMediaQueryKeys.list(courseId),
      });
    },
  });
}

export function useUpdateCourseMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mediaId,
      data,
    }: {
      mediaId: string;
      data: UpdateCourseMediaInput;
    }) =>
      apiRequest<ApiResponse<CourseMediaItem>>(`/course-media/${mediaId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { mediaId }) => {
      queryClient.invalidateQueries({
        queryKey: courseMediaQueryKeys.detail(mediaId),
      });
      queryClient.invalidateQueries({ queryKey: courseMediaQueryKeys.lists() });
    },
  });
}

export function useDeleteCourseMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mediaId: string) =>
      apiRequest<ApiResponse<CourseMediaItem>>(`/course-media/${mediaId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseMediaQueryKeys.lists() });
    },
  });
}

export const lessonQueryKeys = {
  all: ["lessons"] as const,
  list: (courseId: string) => [...lessonQueryKeys.all, courseId] as const,
};

export const progressQueryKeys = {
  all: ["progress"] as const,
  detail: (courseId: string) => [...progressQueryKeys.all, courseId] as const,
};

export function useGetLessonsByCourseId(courseId: string) {
  return useQuery({
    queryKey: lessonQueryKeys.list(courseId),
    queryFn: async () => {
      const res = await axiosInstance.get<Lesson[]>(`/api/lessons/${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
  });
}

export function useGetProgressByCourseId(courseId: string) {
  return useQuery({
    queryKey: progressQueryKeys.detail(courseId),
    queryFn: async () => {
      const res = await axiosInstance.get<CourseProgress>(`/api/progress/${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
  });
}

export function useMarkLessonComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lessonId: string) => {
      const res = await axiosInstance.post<MarkCompleteResponse>("/api/progress/complete", { lessonId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: progressQueryKeys.all });
    },
  });
}

export function useUpdateLastWatched() {
  return useMutation({
    mutationFn: async ({ lessonId, courseId }: { lessonId: string; courseId: string }) => {
      const res = await axiosInstance.post<{ success: boolean }>("/api/progress/last-watched", { lessonId, courseId });
      return res.data;
    },
  });
}

export function useSendLiveClassReminder() {
  return useMutation({
    mutationFn: async (courseId: string) => {
      const res = await axiosInstance.post<{ success: boolean }>(`/api/live-class/${courseId}/send-reminder`);
      return res.data;
    },
  });
}
