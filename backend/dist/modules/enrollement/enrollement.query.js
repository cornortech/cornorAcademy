"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseQueryHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const getAllEnrollementRequest = async ({ req }) => {
    try {
        const { status } = req.query;
        const enrollementRequest = await db_1.default.enrolledCourses.findMany({
            where: status ? { status } : {},
            include: {
                course: {
                    include: {
                        teacher: true
                    }
                },
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return {
            status: 200,
            body: enrollementRequest.map((enrollement) => ({
                id: enrollement.id,
                paymentURL: enrollement.paymentURL,
                status: enrollement.status,
                createdAt: enrollement.createdAt,
                course: {
                    id: enrollement.course.id,
                    title: enrollement.course.title,
                    description: enrollement.course.description,
                    price: enrollement.course.price,
                    teacher: enrollement.course.teacher
                        ? {
                            id: enrollement.course.teacher.id,
                            name: enrollement.course.teacher.name,
                        } : null,
                    createdAt: enrollement.course.createdAt,
                },
                student: {
                    id: enrollement.student.id,
                    name: enrollement.student.name,
                    email: enrollement.student.email,
                },
            })),
        };
    }
    catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.enrolledCourseQueryHandlers = {
    getAllEnrollementRequest,
};
