import z from "zod";

export const announcementAttachmentSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  type: z.string().min(1),
  size: z.number().positive().optional(),
});

export const announcementTargetSchema = z.enum([
  "EVERYONE",
  "ALL_STUDENTS",
  "ALL_TEACHERS",
  "SPECIFIC_COURSE",
  "INDIVIDUAL_USER",
]);

export const platformAnnouncementIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export const platformAnnouncementQuerySchema = z.object({
  target: announcementTargetSchema.optional(),
  isPinned: z.coerce.boolean().optional(),
  courseId: z.string().uuid().optional(),
  creatorRole: z.string().optional(),
  search: z.string().optional(),
});

export const createPlatformAnnouncementSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  attachments: z.array(announcementAttachmentSchema).optional(),
  externalLinks: z.array(z.string().url("Invalid URL")).optional(),
  isPinned: z.boolean().optional(),
  publishDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  target: announcementTargetSchema,
  courseId: z.string().uuid().optional(),
  targetUserId: z.string().uuid().optional(),
  sendEmail: z.boolean().optional(),
});

export const updatePlatformAnnouncementSchema = z.object({
  title: z.string().min(2).optional(),
  message: z.string().min(5).optional(),
  attachments: z.array(announcementAttachmentSchema).optional(),
  externalLinks: z.array(z.string().url("Invalid URL")).optional(),
  isPinned: z.boolean().optional(),
  publishDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().nullable().optional(),
  target: announcementTargetSchema.optional(),
  courseId: z.string().uuid().nullable().optional(),
  targetUserId: z.string().uuid().nullable().optional(),
});

export const platformAnnouncementResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  message: z.string(),
  attachments: z.array(announcementAttachmentSchema).nullable().optional(),
  externalLinks: z.array(z.string()).nullable().optional(),
  isPinned: z.boolean(),
  publishDate: z.date(),
  expiryDate: z.date().nullable(),
  createdById: z.string(),
  creatorRole: z.string(),
  target: announcementTargetSchema,
  courseId: z.string().uuid().nullable(),
  targetUserId: z.string().uuid().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const platformAnnouncementListResponseSchema = z.array(platformAnnouncementResponseSchema);
