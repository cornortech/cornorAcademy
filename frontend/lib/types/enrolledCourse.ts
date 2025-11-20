export interface CreateEnrolledCourseRequest {
  courseId: string;
  studentId: string;
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: Date;
  course: Course; // Assuming Course type is available
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

// Import Course type if needed
import { Course } from "./course";
