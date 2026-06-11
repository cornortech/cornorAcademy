export interface CreateEnrolledCourseRequest {
  courseId: string;
  studentId: string;
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: Date;
  course: Course;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

import { Course } from "./course";
