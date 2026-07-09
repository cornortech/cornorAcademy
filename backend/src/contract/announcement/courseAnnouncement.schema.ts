import z from "zod";

export const announcementAttachmentSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  type: z.string().min(1),
  size: z.number().positive().optional(),
});

export const courseAnnouncementParamsSchema = z.object({
  courseId: z.string().uuid(),
});

export const courseAnnouncementTeacherParamsSchema = z.object({
  teacherId: z.string().uuid(),
  courseId: z.string().uuid(),
});

export const courseAnnouncementIdParamsSchema = z.object({
  announcementId: z.string().uuid(),
});

export const createCourseAnnouncementSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  attachments: z.array(announcementAttachmentSchema).optional(),
  externalLinks: z.array(z.string().url("Invalid URL")).optional(),
  isPinned: z.boolean().optional(),
  publishDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
});

export const updateCourseAnnouncementSchema = z.object({
  title: z.string().min(2).optional(),
  message: z.string().min(5).optional(),
  attachments: z.array(announcementAttachmentSchema).optional(),
  externalLinks: z.array(z.string().url("Invalid URL")).optional(),
  isPinned: z.boolean().optional(),
  publishDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().nullable().optional(),
});

export const courseAnnouncementResponseSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string(),
  message: z.string(),
  attachments: z.array(announcementAttachmentSchema).nullable().optional(),
  externalLinks: z.array(z.string()).nullable().optional(),
  isPinned: z.boolean(),
  publishDate: z.date(),
  expiryDate: z.date().nullable(),
  createdById: z.string(),
  creatorRole: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const courseAnnouncementListResponseSchema = z.array(courseAnnouncementResponseSchema);
