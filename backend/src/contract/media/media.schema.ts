import z from "zod";

export const createCourseMediaSchema = z.object({
    courseId: z.string(),
    title: z.string().min(3, "Proper course tile is needed"),
    description: z.string().min(3).max(500),
    duration: z.number().optional(),
    pathURL: z.string(),
    size: z.number(),
    type: z.enum([
        'pdf',
        'video',
        'img',
        'code',
        'docx',
        'xlsx',
        'txt',
        'jpg',
        'png',
        'mp3',
        'mp4',
        'zip',
        'exe',
        'other'
    ]),
});

export const getAllCourseMediaByCourseIdSchema = z.object({
    courseId: z.string(),
});

export const getAllCourseMediaByCourseIdResponseSchema = z.array(
    z.object({
        id: z.string(),
        courseId: z.string(),
        title: z.string(),
        description: z.string(),
        duration: z.number().nullable(),
        pathURL: z.string(),
        size: z.number(),
        type: z.enum([
            'pdf',
            'video',
            'img',
            'code',
            'docx',
            'xlsx',
            'txt',
            'jpg',
            'png',
            'mp3',
            'mp4',
            'zip',
            'exe',
            'other'
        ]),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
);

export const getCourseMediaByIdSchema = z.object({
    mediaId: z.string(),
});

export const getCourseMediaByIdResponseSchema = z.object({
    id: z.string(),
    courseId: z.string(),
    title: z.string(),
    description: z.string(),
    duration: z.number().nullable(),
    pathURL: z.string(),
    size: z.number(),
    type: z.enum([
        'pdf',
        'video',
        'img',
        'code',
        'docx',
        'xlsx',
        'txt',
        'jpg',
        'png',
        'mp3',
        'mp4',
        'zip',
        'exe',
        'other'
    ]),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const updateCourseMediaParamsSchema = z.object({
    mediaId: z.string(),
});

export const updateCourseMediaSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(3).max(500).optional(),
    duration: z.number().optional(),
    pathURL: z.string().optional(),
    size: z.number().optional(),
    type: z.enum([
        'pdf',
        'video',
        'img',
        'code',
        'docx',
        'xlsx',
        'txt',
        'jpg',
        'png',
        'mp3',
        'mp4',
        'zip',
        'exe',
        'other'
    ]),
});

export const deleteCourseMediaSchema = z.object({
    mediaId: z.string(),
});