import z from "zod";

export const createEnrolledCourseSchema = z.object({
    studentId: z.string().uuid(),
    courseId: z.string().uuid(),
});

export const getAllEnrolledCoursesByIdSchema = z.object({
    studentId: z.string().uuid(),
});

export const getAllEnrolledCoursesByIdResponseSchema = z.array(
    z.object({
        id: z.string().uuid(),
        course: z.object({
            id: z.string().uuid(),
            title: z.string(),
            description: z.string(),
            teacher: z.object({
                id: z.string().uuid(),
                name: z.string(),
            }).nullable(),
            student: z.object(
                {
                    id: z.string().uuid(),
                    name: z.string(),
                },
            ),
            createdAt: z.date(),
        }),
    }),
);