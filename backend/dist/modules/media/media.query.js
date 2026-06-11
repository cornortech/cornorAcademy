"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseMediaQueryHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const getAllCourseMediaByCourseId = async ({ req }) => {
    try {
        // const teacherId = req.user.id;
        const { courseId } = req.params;
        const courseMedia = await db_1.default.courseMedia.findMany({
            where: {
                courseId,
            },
        });
        return {
            status: 200,
            body: courseMedia.map(media => ({
                id: media.id,
                courseId: media.courseId,
                title: media.title,
                description: media.description,
                duration: media.duration,
                pathURL: media.pathURL,
                size: media.size,
                type: media.type,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Failed to fetch course media by course ID", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const getCourseMediaById = async ({ req }) => {
    try {
        const { mediaId } = req.params;
        const media = await db_1.default.courseMedia.findUnique({
            where: {
                id: mediaId,
            },
        });
        if (!media) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course Media not found",
                },
            };
        }
        return {
            status: 200,
            body: {
                id: media.id,
                courseId: media.courseId,
                title: media.title,
                description: media.description,
                duration: media.duration,
                pathURL: media.pathURL,
                size: media.size,
                type: media.type,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt, //announcement add admin
            },
        };
    }
    catch (error) {
        console.error("Failed to fetch course media by ID", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.courseMediaQueryHandlers = {
    getAllCourseMediaByCourseId,
    getCourseMediaById,
};
