"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseQueryHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const getAllCourses = async (req) => {
    try {
        const courses = await db_1.default.course.findMany({
            include: {
                teacher: true,
                courseCurriculum: true,
                _count: {
                    select: {
                        enrolledCourses: true
                    },
                },
            },
        });
        return {
            status: 200,
            body: courses.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                requirements: course.requirements,
                includes: course.includes,
                whatYouWillLearn: course.whatYouWillLearn,
                meetingUrl: course.meetingUrl,
                meetingTime: course.meetingTime,
                language: course.language,
                level: course.level,
                thumbnail: course.thumbnail,
                category: course.category,
                startDate: course.startDate,
                duration: course.duration,
                price: course.price,
                curriculum: course.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: course.teacher
                    ? {
                        id: course.teacher.id,
                        name: course.teacher.name,
                        bio: course.teacher.bio,
                        expertise: course.teacher.expertise,
                    }
                    : null,
                enrolledStudentsCount: course._count.enrolledCourses,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const getCourseById = async ({ req }) => {
    try {
        const { courseId } = req.params;
        const courseById = await db_1.default.course.findUnique({
            where: { id: courseId },
            include: {
                teacher: true,
                courseCurriculum: true,
            },
        });
        if (!courseById) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Required Course Not Found",
                },
            };
        }
        return {
            status: 200,
            body: {
                id: courseById.id,
                title: courseById.title,
                description: courseById.description,
                requirements: courseById.requirements,
                includes: courseById.includes,
                whatYouWillLearn: courseById.whatYouWillLearn,
                meetingUrl: courseById.meetingUrl,
                meetingTime: courseById.meetingTime,
                language: courseById.language,
                level: courseById.level,
                thumbnail: courseById.thumbnail,
                category: courseById.category,
                startDate: courseById.startDate,
                duration: courseById.duration,
                price: courseById.price,
                curriculum: courseById.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: courseById.teacher
                    ? {
                        id: courseById.teacher.id,
                        name: courseById.teacher.name,
                        bio: courseById.teacher.bio,
                        expertise: courseById.teacher.expertise,
                    }
                    : null,
                createdAt: courseById.createdAt,
                updatedAt: courseById.updatedAt,
            },
        };
    }
    catch (error) {
        console.error("Error fetching course by ID:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const getCoursesByCategory = async ({ req }) => {
    try {
        const { category } = req.params;
        const courses = await db_1.default.course.findMany({
            where: { category: category },
            include: {
                teacher: true,
                courseCurriculum: true,
                _count: {
                    select: {
                        enrolledCourses: true,
                    },
                },
            },
        });
        return {
            status: 200,
            body: courses.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                requirements: course.requirements,
                includes: course.includes,
                whatYouWillLearn: course.whatYouWillLearn,
                meetingUrl: course.meetingUrl,
                meetingTime: course.meetingTime,
                language: course.language,
                level: course.level,
                thumbnail: course.thumbnail,
                category: course.category,
                startDate: course.startDate,
                duration: course.duration,
                price: course.price,
                curriculum: course.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: course.teacher
                    ? {
                        id: course.teacher.id,
                        name: course.teacher.name,
                        bio: course.teacher.bio,
                        expertise: course.teacher.expertise,
                    }
                    : null,
                enrolledStudentsCount: course._count.enrolledCourses,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching courses by category:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const getCoursesByTeacher = async ({ req }) => {
    try {
        const { teacherId } = req.params;
        const teacherExists = await db_1.default.teacher.findUnique({
            where: { id: teacherId },
        });
        if (!teacherExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Teacher not found",
                },
            };
        }
        const courses = await db_1.default.course.findMany({
            where: { teacherId },
            include: {
                teacher: true,
                courseCurriculum: true,
                _count: {
                    select: {
                        enrolledCourses: true,
                    },
                },
            },
        });
        return {
            status: 200,
            body: courses.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                requirements: course.requirements,
                includes: course.includes,
                whatYouWillLearn: course.whatYouWillLearn,
                meetingUrl: course.meetingUrl,
                meetingTime: course.meetingTime,
                language: course.language,
                level: course.level,
                thumbnail: course.thumbnail,
                category: course.category,
                startDate: course.startDate,
                duration: course.duration,
                price: course.price,
                curriculum: course.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: course.teacher
                    ? {
                        id: course.teacher.id,
                        name: course.teacher.name,
                        bio: course.teacher.bio,
                        expertise: course.teacher.expertise,
                    }
                    : null,
                enrolledStudentsCount: course._count.enrolledCourses,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching courses by teacher:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const getCoursesByStatus = async ({ req }) => {
    try {
        const { status } = req.params;
        const courses = await db_1.default.course.findMany({
            where: { status: status },
            include: {
                teacher: true,
                courseCurriculum: true,
                _count: {
                    select: {
                        enrolledCourses: true,
                    },
                },
            },
        });
        return {
            status: 200,
            body: courses.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                requirements: course.requirements,
                includes: course.includes,
                whatYouWillLearn: course.whatYouWillLearn,
                meetingUrl: course.meetingUrl,
                meetingTime: course.meetingTime,
                language: course.language,
                level: course.level,
                thumbnail: course.thumbnail,
                category: course.category,
                startDate: course.startDate,
                duration: course.duration,
                price: course.price,
                curriculum: course.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: course.teacher
                    ? {
                        id: course.teacher.id,
                        name: course.teacher.name,
                        bio: course.teacher.bio,
                        expertise: course.teacher.expertise,
                    }
                    : null,
                enrolledStudentsCount: course._count.enrolledCourses,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching courses by status:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const searchCourses = async ({ req }) => {
    try {
        const { query } = req.params;
        const courses = await db_1.default.course.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                teacher: true,
                courseCurriculum: true,
                _count: {
                    select: {
                        enrolledCourses: true,
                    },
                },
            },
        });
        return {
            status: 200,
            body: courses.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                requirements: course.requirements,
                includes: course.includes,
                whatYouWillLearn: course.whatYouWillLearn,
                meetingUrl: course.meetingUrl,
                meetingTime: course.meetingTime,
                language: course.language,
                level: course.level,
                thumbnail: course.thumbnail,
                category: course.category,
                startDate: course.startDate,
                duration: course.duration,
                price: course.price,
                curriculum: course.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: course.teacher
                    ? {
                        id: course.teacher.id,
                        name: course.teacher.name,
                        bio: course.teacher.bio,
                        expertise: course.teacher.expertise,
                    }
                    : null,
                enrolledStudentsCount: course._count.enrolledCourses,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error searching courses:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.courseQueryHandlers = {
    getAllCourses,
    getCourseById,
    getCoursesByCategory,
    getCoursesByTeacher,
    getCoursesByStatus,
    searchCourses,
};
