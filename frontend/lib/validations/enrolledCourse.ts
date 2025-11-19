import { z } from "zod";

export const createEnrolledCourseSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
});
