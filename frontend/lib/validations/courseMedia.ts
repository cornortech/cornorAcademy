import { z } from "zod";

export const createCourseMediaSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url(),
  type: z.enum(["video", "pdf", "image", "other"]),
});

export const updateCourseMediaSchema = createCourseMediaSchema.partial();
