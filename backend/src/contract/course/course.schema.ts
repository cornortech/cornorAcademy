import z from "zod";

export const CourseCurriculumParamsSchema = z.object({
    courseId: z.string(),
});

export const createCourseSchema = z.object({
    title: z.string().min(3, "Course title is required"),
    description: z.string().min(10, "Course description is required"),
    requirements: z.array(z.string()).min(2, "Requirements is required"),
    includes: z.array(z.string()).min(2, "Course include is required"),
    whatYouWillLearn: z.array(z.string()),
    meetingUrl: z.string(),
    meetingTime: z.date(),
    language: z.enum(['nepali', 'english']),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    thumbnail: z.string(),
    category: z.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
    startDate: z.date(),
    duration: z.number(),
    price: z.number().min(1, "Price is required"),
    curriculum: z.array(
        z.object({
            title: z.string().min(2, "curriculum is required "),
            noOfLesson: z.number(),
            duration: z.number(),
            content: z.array(z.string()),
        }),
    ),
    teacherId: z.string().uuid(),
});

export const getAllCoursesResponseSchema = z.array(
    z.object({
        id: z.string().uuid(),
        title: z.string(),
        description: z.string(),
        requirements: z.array(z.string()),
        includes: z.array(z.string()),
        whatYouWillLearn: z.array(z.string()),
        meetingUrl: z.string().optional(),
        meetingTime: z.date().optional(),
        language: z.enum(['nepali', 'english']),
        level: z.enum(['beginner', 'intermediate', 'advanced']),
        thumbnail: z.string(),
        category: z.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
        startDate: z.date(),
        duration: z.number(),
        price: z.number(),
        isOngoing: z.boolean(),
        status: z.enum(['upcoming', 'active', 'completed']),
        enrolledStudentsCount: z.number(),
        curriculum: z.array(
            z.object({
                id: z.string().uuid(),
                title: z.string(),
                noOfLesson: z.number(),
                content: z.array(z.string()),
                duration:z.number(),
            }),
        ),
        teacher: z.object({
            id: z.string().uuid(),
            name: z.string(),
            bio: z.string(),
            expertise: z.string(),
        }).nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
);

export const getCourseByIdSchema = z.object({
    courseId: z.string().uuid(),
});

export const getCourseByIdResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    requirements: z.array(z.string()),
    includes: z.array(z.string()),
    whatYouWillLearn: z.array(z.string()),
    meetingUrl: z.string().optional(),
    meetingTime: z.date().optional(),
    language: z.enum(['nepali', 'english']),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    thumbnail: z.string(),
    category: z.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
    startDate: z.date(),
    duration: z.number(),
    price: z.number(),
    isOngoing: z.boolean(),
    status: z.enum(['upcoming', 'active', 'completed']),
    curriculum: z.array(
        z.object({
            id: z.string().uuid(),
            title: z.string(),
            noOfLesson: z.number(),
            content: z.array(z.string()),
        }),
    ),
    createdAt: z.date(),
    updatedAt: z.date(),
    teacher: z.object({
        id: z.string().uuid(),
        name: z.string(),
        bio: z.string(),
        expertise: z.string(),
    }).nullable(),
});

export const updateCourseParamsSchema = z.object({
    courseId: z.string().uuid(),
});

export const updateCourseSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    includes: z.array(z.string()).optional(),
    whatYouWillLearn: z.array(z.string()).optional(),
    meetingUrl: z.string().optional(),
    meetingTime: z.date().optional(),
    language: z.enum(['nepali', 'english']).optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    thumbnail: z.string().optional(),
    category: z.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']).optional(),
    startDate: z.date().optional(),
    duration: z.number().optional(),
    price: z.number().optional(),
    curriculum: z.array(
        z.object({
            title: z.string().optional(),
            noOfLesson: z.number().optional(),
            content: z.array(z.string()).optional(),
        }),
    ),
    teacherId: z.string().uuid().optional(),
});

export const deleteCourseParamsSchema = z.object({
    courseId: z.string().uuid(),
});


export const courseAgreementParamasSchema = z.object({
    studentId: z.string(),
});

export const createcourseAgreementSchema = z.object({
    agreementURL: z.string(),
});

export const deleteCourseSchema = z.object({
    id: z.string().uuid(),
});

export const getCoursesByCategorySchema = z.object({
    category: z.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
});

export const getCoursesByTeacherSchema = z.object({
    teacherId: z.string().uuid(),
});

export const getCoursesByStatusSchema = z.object({
    status: z.enum(['upcoming', 'active', 'completed']),
});

export const updateCourseStatusParamsSchema = z.object({
    id: z.string().uuid(),
});

export const updateCourseStatusSchema = z.object({
    status: z.enum(['upcoming', 'active', 'completed']),
});

export const searchCoursesSchema = z.object({
    query: z.string().min(1, "Search query is required"),
});