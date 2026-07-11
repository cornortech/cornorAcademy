import { z } from "zod";

const announcementTargetSchema = z.enum([
  "EVERYONE",
  "ALL_STUDENTS",
  "ALL_TEACHERS",
  "SPECIFIC_COURSE",
  "INDIVIDUAL_USER",
  "COURSE_STUDENTS",
]);

const attachmentSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  type: z.string().min(1),
  size: z.number().positive().optional(),
});

export const createAnnouncementSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  attachments: z.array(attachmentSchema).optional(),
  externalLinks: z.array(z.string().url("Invalid URL")).optional(),
  isPinned: z.boolean().optional(),
  publishDate: z.string().optional(),
  expiryDate: z.string().optional(),
  target: announcementTargetSchema,
  courseId: z.string().uuid().optional(),
  targetUserId: z.string().uuid().optional(),
  sendEmail: z.boolean().optional(),
});

export const updateAnnouncementSchema = z.object({
  title: z.string().min(2).optional(),
  message: z.string().min(5).optional(),
  attachments: z.array(attachmentSchema).optional(),
  externalLinks: z.array(z.string().url("Invalid URL")).optional(),
  isPinned: z.boolean().optional(),
  publishDate: z.string().optional(),
  expiryDate: z.string().nullable().optional(),
  target: announcementTargetSchema.optional(),
  courseId: z.string().uuid().nullable().optional(),
  targetUserId: z.string().uuid().nullable().optional(),
});
