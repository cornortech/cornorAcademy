import z from "zod";

export const createCourseAnnouncementParamSchema = z.object({
    teacherId: z.string().uuid(),
    courseId: z.string().uuid(),
});

export const createCourseAnnouncementSchema = z.object({
    title: z.string().min(2, "Announcement Title is required"),
    message: z.string().min(5, "Announcement Message is required"),
});

export const getAllCourseAnnouncementByIdParamSchema = z.object({
    courseId: z.string().uuid(),
});

export const getAllCourseAnnouncementByIdResponseSchema = z.array(
    z.object({
        id: z.string().uuid(),
        courseId: z.string().uuid(),
        title: z.string(),
        message: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
);

export const updateCourseAnnoucementParamsSchema = z.object({
    announcementId: z.string().uuid(),
});

export const updateCourseAnnouncementSchema = z.object({
    title: z.string().optional(),
    message: z.string().optional(),
});

export const deleteCourseAnnouncementParamsSchema = z.object({
    announcementId: z.string().uuid(),
});

export const deleteCourseAnnouncementSchema = z.object({ });