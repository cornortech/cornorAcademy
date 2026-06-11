"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseMutationHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const createEnrollementRequestForStudent = async (req) => {
    try {
        const { studentId, courseId, paymentURL } = req.body;
        const enrolledExists = await db_1.default.enrolledCourses.findFirst({
            where: {
                studentId,
                courseId,
            },
        });
        if (enrolledExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Already enrolled in this course",
                },
            };
        }
        const enrolledData = await db_1.default.enrolledCourses.create({
            data: {
                studentId,
                courseId,
                paymentURL,
                status: "requested",
            },
            include: {
                student: true,
                course: true,
            },
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Enrollement Succefully",
            },
        };
    }
    catch (error) {
        console.error("Error enrolling in course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const updateEnrollementRequestForAdmin = async ({ req }) => {
    try {
        const { studentId, courseId, status, rejectionReason, } = req.body;
        const existingEnrollment = await db_1.default.enrolledCourses.findFirst({
            where: {
                studentId,
                courseId
            },
        });
        if (!existingEnrollment) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Enrollment record not found",
                },
            };
        }
        await db_1.default.enrolledCourses.update({
            where: {
                id: existingEnrollment.id
            },
            data: {
                status,
                rejectionReason: status === "rejected" ? rejectionReason : null,
            },
            include: {
                student: true,
                course: true,
            },
        });
        return {
            status: 201,
            body: {
                success: true,
                message: `Enrollment ${status === "approved" ? "approved" : status === "rejected" ? "rejected" : "updated"} successfully`
            },
        };
    }
    catch (error) {
        console.error("Error updating enrollment:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error",
            },
        };
    }
};
exports.enrolledCourseMutationHandlers = {
    createEnrollementRequestForStudent,
    updateEnrollementRequestForAdmin,
};
