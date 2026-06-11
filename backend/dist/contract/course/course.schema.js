"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCoursesSchema = exports.updateCourseStatusSchema = exports.updateCourseStatusParamsSchema = exports.getCoursesByStatusSchema = exports.getCoursesByTeacherSchema = exports.getCoursesByCategorySchema = exports.deleteCourseSchema = exports.createcourseAgreementSchema = exports.courseAgreementParamasSchema = exports.deleteCourseParamsSchema = exports.updateCourseSchema = exports.updateCourseParamsSchema = exports.getCourseByIdResponseSchema = exports.getCourseByIdSchema = exports.getAllCoursesResponseSchema = exports.createCourseSchema = exports.CourseCurriculumParamsSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CourseCurriculumParamsSchema = zod_1.default.object({
    courseId: zod_1.default.string(),
});
exports.createCourseSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, "Course title is required"),
    description: zod_1.default.string().min(10, "Course description is required"),
    requirements: zod_1.default.array(zod_1.default.string()).min(2, "Requirements is required"),
    includes: zod_1.default.array(zod_1.default.string()).min(2, "Course include is required"),
    whatYouWillLearn: zod_1.default.array(zod_1.default.string()),
    meetingUrl: zod_1.default.string(),
    meetingTime: zod_1.default.date(),
    language: zod_1.default.enum(['nepali', 'english']),
    level: zod_1.default.enum(['beginner', 'intermediate', 'advanced']),
    thumbnail: zod_1.default.string(),
    category: zod_1.default.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
    startDate: zod_1.default.date(),
    duration: zod_1.default.number(),
    price: zod_1.default.number().min(1, "Price is required"),
    curriculum: zod_1.default.array(zod_1.default.object({
        title: zod_1.default.string().min(2, "curriculum is required "),
        noOfLesson: zod_1.default.number(),
        duration: zod_1.default.number(),
        content: zod_1.default.array(zod_1.default.string()),
    })),
    teacherId: zod_1.default.string().uuid(),
});
exports.getAllCoursesResponseSchema = zod_1.default.array(zod_1.default.object({
    id: zod_1.default.string().uuid(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    requirements: zod_1.default.array(zod_1.default.string()),
    includes: zod_1.default.array(zod_1.default.string()),
    whatYouWillLearn: zod_1.default.array(zod_1.default.string()),
    meetingUrl: zod_1.default.string().optional(),
    meetingTime: zod_1.default.date().optional(),
    language: zod_1.default.enum(['nepali', 'english']),
    level: zod_1.default.enum(['beginner', 'intermediate', 'advanced']),
    thumbnail: zod_1.default.string(),
    category: zod_1.default.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
    startDate: zod_1.default.date(),
    duration: zod_1.default.number(),
    price: zod_1.default.number(),
    curriculum: zod_1.default.array(zod_1.default.object({
        id: zod_1.default.string().uuid(),
        title: zod_1.default.string(),
        noOfLesson: zod_1.default.number(),
        content: zod_1.default.array(zod_1.default.string()),
        duration: zod_1.default.number(),
    })),
    teacher: zod_1.default.object({
        id: zod_1.default.string().uuid(),
        name: zod_1.default.string(),
        bio: zod_1.default.string(),
        expertise: zod_1.default.string(),
    }).nullable(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
}));
exports.getCourseByIdSchema = zod_1.default.object({
    courseId: zod_1.default.string().uuid(),
});
exports.getCourseByIdResponseSchema = zod_1.default.object({
    id: zod_1.default.string().uuid(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    requirements: zod_1.default.array(zod_1.default.string()),
    includes: zod_1.default.array(zod_1.default.string()),
    whatYouWillLearn: zod_1.default.array(zod_1.default.string()),
    meetingUrl: zod_1.default.string().optional(),
    meetingTime: zod_1.default.date().optional(),
    language: zod_1.default.enum(['nepali', 'english']),
    level: zod_1.default.enum(['beginner', 'intermediate', 'advanced']),
    thumbnail: zod_1.default.string(),
    category: zod_1.default.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
    startDate: zod_1.default.date(),
    duration: zod_1.default.number(),
    price: zod_1.default.number(),
    curriculum: zod_1.default.array(zod_1.default.object({
        id: zod_1.default.string().uuid(),
        title: zod_1.default.string(),
        noOfLesson: zod_1.default.number(),
        content: zod_1.default.array(zod_1.default.string()),
    })),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
    teacher: zod_1.default.object({
        id: zod_1.default.string().uuid(),
        name: zod_1.default.string(),
        bio: zod_1.default.string(),
        expertise: zod_1.default.string(),
    }).nullable(),
});
exports.updateCourseParamsSchema = zod_1.default.object({
    courseId: zod_1.default.string().uuid(),
});
exports.updateCourseSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    requirements: zod_1.default.array(zod_1.default.string()).optional(),
    includes: zod_1.default.array(zod_1.default.string()).optional(),
    whatYouWillLearn: zod_1.default.array(zod_1.default.string()).optional(),
    meetingUrl: zod_1.default.string().optional(),
    meetingTime: zod_1.default.date().optional(),
    language: zod_1.default.enum(['nepali', 'english']).optional(),
    level: zod_1.default.enum(['beginner', 'intermediate', 'advanced']).optional(),
    thumbnail: zod_1.default.string().optional(),
    category: zod_1.default.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']).optional(),
    startDate: zod_1.default.date().optional(),
    duration: zod_1.default.number().optional(),
    price: zod_1.default.number().optional(),
    curriculum: zod_1.default.array(zod_1.default.object({
        title: zod_1.default.string().optional(),
        noOfLesson: zod_1.default.number().optional(),
        content: zod_1.default.array(zod_1.default.string()).optional(),
    })),
    teacherId: zod_1.default.string().uuid().optional(),
});
exports.deleteCourseParamsSchema = zod_1.default.object({
    courseId: zod_1.default.string().uuid(),
});
exports.courseAgreementParamasSchema = zod_1.default.object({
    studentId: zod_1.default.string(),
});
exports.createcourseAgreementSchema = zod_1.default.object({
    agreementURL: zod_1.default.string(),
});
exports.deleteCourseSchema = zod_1.default.object({
    id: zod_1.default.string().uuid(),
});
exports.getCoursesByCategorySchema = zod_1.default.object({
    category: zod_1.default.enum(['WebDevelopment', 'ui', 'DataScience', 'DigitalMarketing']),
});
exports.getCoursesByTeacherSchema = zod_1.default.object({
    teacherId: zod_1.default.string().uuid(),
});
exports.getCoursesByStatusSchema = zod_1.default.object({
    status: zod_1.default.enum(['upcoming', 'active', 'completed']),
});
exports.updateCourseStatusParamsSchema = zod_1.default.object({
    id: zod_1.default.string().uuid(),
});
exports.updateCourseStatusSchema = zod_1.default.object({
    status: zod_1.default.enum(['upcoming', 'active', 'completed']),
});
exports.searchCoursesSchema = zod_1.default.object({
    query: zod_1.default.string().min(1, "Search query is required"),
});
