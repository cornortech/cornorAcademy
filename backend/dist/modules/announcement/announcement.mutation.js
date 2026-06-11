"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementMutationHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const createCourseAnnouncement = async ({ req }) => {
    try {
        const { teacherId, courseId } = req.params;
        const { title, message } = req.body;
        const course = await db_1.default.course.findUnique({
            where: { id: courseId },
            select: { teacherId: true },
        });
        if (!course) {
            return {
                status: 404,
                body: { success: false, error: "Course not found" },
            };
        }
        const titleExists = await db_1.default.announcement.findFirst({
            where: {
                courseId,
                title,
            },
        });
        if (titleExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Announcement with this title already exists for the course",
                },
            };
        }
        ;
        await db_1.default.announcement.create({
            data: {
                courseId,
                title,
                message,
            },
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Announcement created successfully",
            },
        };
    }
    catch (error) {
        console.error("Error creating announcement:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const updateCourseAnnouncement = async ({ req }) => {
    try {
        const { announcementId } = req.params;
        const { title, message } = req.body;
        const announcementExists = await db_1.default.announcement.findUnique({
            where: {
                id: announcementId,
            },
        });
        if (!announcementExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Announcement doesn't exists try again",
                },
            };
        }
        ;
        await db_1.default.announcement.update({
            where: {
                id: announcementId,
            },
            data: {
                title,
                message,
            }
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Announcement Updated Successfully",
            },
        };
    }
    catch (error) {
        console.error("Failed to update Announcement", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const deleteCourseAnnouncement = async ({ req }) => {
    try {
        const { announcementId } = req.params;
        const deleteAnnouncement = await db_1.default.announcement.findFirst({
            where: {
                id: announcementId,
            },
        });
        if (!deleteAnnouncement) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Cannot find announcement",
                },
            };
        }
        ;
        await db_1.default.announcement.delete({
            where: {
                id: announcementId,
            },
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Announcement deleted successfully",
            },
        };
    }
    catch (error) {
        console.error("Failed to delete", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.announcementMutationHandlers = {
    createCourseAnnouncement,
    updateCourseAnnouncement,
    deleteCourseAnnouncement,
};
