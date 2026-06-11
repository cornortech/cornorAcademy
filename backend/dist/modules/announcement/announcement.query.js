"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementQueryHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const getCourseAnnouncementById = async ({ req }) => {
    try {
        const { courseId } = req.params;
        const course = await db_1.default.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                teacherId: true,
            },
        });
        const announcements = await db_1.default.announcement.findMany({
            where: {
                courseId,
            },
            include: {
                course: {
                    select: {
                        teacherId: true,
                    }
                }
            }
        });
        return {
            status: 200,
            body: announcements.map(announcement => ({
                id: announcement.id,
                courseId: announcement.courseId,
                title: announcement.title,
                message: announcement.message,
                createdAt: announcement.createdAt,
                updatedAt: announcement.updatedAt,
            })),
        };
    }
    catch (error) {
        console.error("Error fetching announcements:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.announcementQueryHandlers = {
    getCourseAnnouncementById,
};
