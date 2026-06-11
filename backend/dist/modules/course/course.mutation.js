"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseMutationHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const createCourse = async (req) => {
    try {
        const { title, description, requirements, includes, whatYouWillLearn, meetingUrl, meetingTime, language, level, thumbnail, category, startDate, duration, price, curriculum, teacherId } = req.body;
        const admin = await db_1.default.admin.findFirst();
        const adminId = admin?.id || "";
        const courseData = await db_1.default.course.create({
            data: {
                title,
                description,
                requirements,
                includes,
                whatYouWillLearn,
                meetingUrl,
                meetingTime,
                language,
                level,
                thumbnail,
                category,
                startDate,
                duration,
                price,
                teacherId,
                adminId,
                courseCurriculum: {
                    create: curriculum.map((c) => ({
                        title: c.title,
                        noOfLesson: c.noOfLesson,
                        duration: c.duration,
                        content: c.content,
                    })),
                },
            },
            include: {
                teacher: true,
                courseCurriculum: true,
            },
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Course created successfully",
            },
        };
    }
    catch (error) {
        console.error("Error creating course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const updateCourse = async ({ req }) => {
    try {
        const { courseId } = req.params;
        const { title, description, requirements, includes, whatYouWillLearn, meetingUrl, meetingTime, language, level, thumbnail, category, startDate, duration, price, teacherId } = req.body;
        const courseExists = await db_1.default.course.findUnique({
            where: { id: courseId },
        });
        if (!courseExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course Not Found",
                },
            };
        }
        const courseUpdated = await db_1.default.course.update({
            where: {
                id: courseId,
            },
            data: {
                title,
                description,
                requirements,
                includes,
                whatYouWillLearn,
                meetingUrl,
                meetingTime,
                language,
                level,
                thumbnail,
                category,
                startDate,
                duration,
                price,
                teacherId
            },
            include: {
                teacher: true,
            }
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Course updated successfully",
            },
        };
    }
    catch (error) {
        console.error("Error updating course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error try again later",
            },
        };
    }
};
const createCourseAgreement = async ({ req }) => {
    try {
        const { studentId } = req.params;
        const { agreementURL, } = req.body;
        await db_1.default.courseAgreement.create({
            data: {
                studentId,
                agreementURL,
            },
            include: {
                student: true,
            }
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Agreement for course created successfully",
            },
        };
    }
    catch (error) {
        console.error("Failed to create agreement", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error",
            },
        };
    }
};
const updateCourseStatus = async ({ req }) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const courseExists = await db_1.default.course.findUnique({
            where: { id },
        });
        if (!courseExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course Not Found",
                },
            };
        }
        await db_1.default.course.update({
            where: { id },
            data: { status },
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Course status updated successfully",
            },
        };
    }
    catch (error) {
        console.error("Error updating course status:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const deleteCourse = async ({ req }) => {
    try {
        const { courseId } = req.params;
        const courseExists = await db_1.default.course.findUnique({
            where: {
                id: courseId,
            }
        });
        if (!courseExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course Not Found",
                },
            };
        }
        await db_1.default.course.delete({
            where: {
                id: courseId,
            },
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Course Deleted Successfully",
            },
        };
    }
    catch (error) {
        console.error("Error deleting course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.courseMutationHandlers = {
    createCourse,
    updateCourse,
    updateCourseStatus,
    deleteCourse,
    createCourseAgreement
};
