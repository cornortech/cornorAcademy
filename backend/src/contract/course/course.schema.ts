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
        curriculum: z.array(
            z.object({
                id: z.string().uuid(),
                title: z.string(),
                noOfLesson: z.number(),
                content: z.array(z.string()),
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

export const deleteCourseSchema = z.object({});

export const getCoursesByCategoryParamsSchema = z.object({
    category: z.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
});

export const getCoursesByTeacherParamsSchema = z.object({
    teacherId: z.string().uuid(),
});

export const getCoursesByStatusParamsSchema = z.object({
    status: z.enum(['upcoming', 'active', 'completed']),
});

export const updateCourseStatusParamsSchema = z.object({
    courseId: z.string().uuid(),
});

export const updateCourseStatusSchema = z.object({
    status: z.enum(['upcoming', 'active', 'completed']),
});

export const searchCoursesParamsSchema = z.object({
    query: z.string().min(1, "Search query is required"),
});

export const courseAgreementParamasSchema = z.object({
    studentId: z.string(),
});

export const createcourseAgreementSchema = z.object({
    agreementURL: z.string(),
});

// Course Media Schemas
export const createCourseMediaSchema = z.object({
    courseId: z.string().uuid(),
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    duration: z.number().optional(),
    pathURL: z.string().url("Valid URL is required"),
    size: z.number().min(1, "File size is required"),
    type: z.enum(['pdf', 'video', 'img', 'code', 'docx', 'xlsx', 'txt', 'jpg', 'png', 'mp3', 'mp4', 'zip', 'exe', 'other']),
});

export const getCourseMediaParamsSchema = z.object({
    courseId: z.string().uuid(),
});

export const getMediaByIdParamsSchema = z.object({
    mediaId: z.string().uuid(),
});

export const updateCourseMediaParamsSchema = z.object({
    mediaId: z.string().uuid(),
});

export const updateCourseMediaSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    duration: z.number().optional(),
    pathURL: z.string().url().optional(),
    size: z.number().optional(),
    type: z.enum(['pdf', 'video', 'img', 'code', 'docx', 'xlsx', 'txt', 'jpg', 'png', 'mp3', 'mp4', 'zip', 'exe', 'other']).optional(),
});

export const deleteCourseMediaParamsSchema = z.object({
    mediaId: z.string().uuid(),
});

export const courseMediaResponseSchema = z.object({
    id: z.string().uuid(),
    courseId: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    duration: z.number().nullable(),
    pathURL: z.string(),
    size: z.number(),
    type: z.enum(['pdf', 'video', 'img', 'code', 'docx', 'xlsx', 'txt', 'jpg', 'png', 'mp3', 'mp4', 'zip', 'exe', 'other']),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Announcement Schemas
export const createAnnouncementParamsSchema = z.object({
    teacherId: z.string().uuid(),
    courseId: z.string().uuid(),
});

export const createAnnouncementSchema = z.object({
    title: z.string().min(1, "Title is required"),
    message: z.string().min(1, "Message is required"),
});

export const getAnnouncementsParamsSchema = z.object({
    courseId: z.string().uuid(),
});

export const updateAnnouncementParamsSchema = z.object({
    announcementId: z.string().uuid(),
});

export const updateAnnouncementSchema = z.object({
    title: z.string().optional(),
    message: z.string().optional(),
});

export const deleteAnnouncementParamsSchema = z.object({
    announcementId: z.string().uuid(),
});

export const announcementResponseSchema = z.object({
    id: z.string().uuid(),
    courseId: z.string().uuid(),
    title: z.string(),
    message: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    course: z.object({
        id: z.string().uuid(),
        title: z.string(),
    }),
});