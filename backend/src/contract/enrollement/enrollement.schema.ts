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

export const getAllEnrollementRequestByStatusSchema = z.object({
    status: z.enum(['requested', 'approved', 'rejected']).optional(),
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    pageSize: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
});

export const getAllEnrollementRequestResponseSchema = z.object({
    enrollementData: z.array(
        z.object({
            id: z.string(),
            paymentURL: z.string(),
            status: z.enum(['requested', 'approved', 'rejected']),
            rejectionReason: z.string().optional(),
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
                }),
        })
    ),
    pagination: z.object({
        page: z.number(),
        pageSize: z.number(),
        total: z.number(),
        totalPages: z.number(),
    }),
});

export const getAllEnrollementRequestForStudentParamsSchema = z.object({
    studentId: z.string(),
});

export const getAllEnrollementRequestForStudentByStatusSchema = z.object({
    status: z.enum(['requested', 'approved', 'rejected']).optional(),
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    pageSize: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
});

export const getAllEnrollementRequestForStudentResponseSchema = z.object({
    enrollementData: z.array(
        z.object({
            id: z.string(),
            studentId: z.string(),
            paymentURL: z.string(),
            status: z.enum(['requested', 'approved', 'rejected']),
            rejectionReason: z.string().nullable(),
            course: z.object({
                id: z.string().uuid(),
                title: z.string(),
                teacher: z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                }).nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
            }),
        })
    ),
    pagination: z.object({
        page: z.number(),
        pageSize: z.number(),
        total: z.number(),
        totalPages: z.number(),
    }),
});

export const searchEnrollementForStudentSchema = z.object({
    search: z.string().optional(),
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    pageSize: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
});