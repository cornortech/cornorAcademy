import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(z.string()),
  includes: z.array(z.string()),
  whatYouWillLearn: z.array(z.string()),
  meetingUrl: z.string().url().optional(),
  meetingTime: z.date().optional(),
  language: z.enum(["nepali", "english"]),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  thumbnail: z.string().url(),
  category: z.enum(["WebDevelopment", "ui", "DataScience", "DigitalMarketing"]),
  startDate: z.date(),
  duration: z.number().positive(),
  price: z.number().positive(),
  curriculum: z.array(z.object({
    title: z.string().min(1),
    noOfLesson: z.number().positive(),
    duration: z.number().positive(),
    content: z.array(z.string()),
  })),
  teacherId: z.string().min(1),
});

export const updateCourseSchema = createCourseSchema.partial();

export const updateCourseStatusSchema = z.object({
  status: z.enum(["upcoming", "active", "completed"]),
});
