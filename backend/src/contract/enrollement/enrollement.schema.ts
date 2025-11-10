import z from "zod";

export const createEnrollementRequestForStudentSchema = z.object({
    studentId: z.string().uuid(),
    courseId: z.string().uuid(),
    paymentURL: z.string(),
});

export const updateEnrollementRequestForAdminSchema = z.object({
    studentId: z.string().uuid(),
    courseId: z.string().uuid(),
    status: z.enum(['requested', 'approved', 'rejected']),
    rejectionReason: z.string().optional(),
});

export const getAllEnrollementRequestResponseSchema = z.array(
    z.object({
        id: z.string(),
        paymentURL: z.string(),
        status: z.enum(['requested', 'approved', 'rejected']),
        course: z.object({
            id: z.string().uuid(),
            title: z.string(),
            description: z.string(),
            teacher: z.object({
                id: z.string().uuid(),
                name: z.string(),
            }).nullable(),
            createdAt: z.date(),
        }),
        student: z.object(
            {
                id: z.string().uuid(),
                name: z.string(),
                email: z.string(),
            },
        ),
    }),
);

export const getEnrollementRequestByStatusSchema = z.object({
    status: z.enum(['requested', 'approved', 'rejected']),
});