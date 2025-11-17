export interface CreateCourseMediaRequest {
  courseId: string;
  title: string;
  description: string;
  url: string;
  type: "video" | "pdf" | "image" | "other";
}

export interface UpdateCourseMediaRequest extends Partial<CreateCourseMediaRequest> {}

export interface CourseMedia {
  id: string;
  courseId: string;
  title: string;
  description: string;
  url: string;
  type: "video" | "pdf" | "image" | "other";
  uploadedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
