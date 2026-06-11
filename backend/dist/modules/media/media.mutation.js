"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseMediaMutationHandlers = void 0;
const db_1 = __importDefault(require("../../libs/db"));
const createCourseMedia = async ({ req }) => {
    try {
        const { courseId, title, description, duration, pathURL, size, type } = req.body;
        await db_1.default.courseMedia.create({
            data: {
                courseId,
                title,
                description,
                duration,
                pathURL,
                size,
                type,
            },
            include: {
                course: true,
            },
        });
        return {
            status: 201,
            body: {
                success: true,
                message: "Media Uploaded Succesfully",
            },
        };
    }
    catch (error) {
        console.error("Failed to create new media", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const updateCourseMedia = async ({ req }) => {
    try {
        const { mediaId } = req.params;
        const { title, description, duration, pathURL, size, type } = req.body;
        const existingMedia = await db_1.default.courseMedia.findUnique({
            where: {
                id: mediaId,
            },
        });
        if (!existingMedia) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Media not found",
                },
            };
        }
        ;
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (description !== undefined)
            updateData.description = description;
        if (duration !== undefined)
            updateData.duration = duration;
        if (pathURL !== undefined)
            updateData.pathURL = pathURL;
        if (size !== undefined)
            updateData.size = size;
        if (type !== undefined)
            updateData.type = type;
        await db_1.default.courseMedia.update({
            where: {
                id: mediaId
            },
            data: updateData,
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Media updated successfully",
            },
        };
    }
    catch (error) {
        console.error("Failed to update course media", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
const deleteCourseMedia = async ({ req }) => {
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
        await db_1.default.courseMedia.delete({
            where: {
                id: mediaId,
            },
        });
        return {
            status: 200,
            body: {
                success: true,
                message: "Course Media deleted successfully",
            },
        };
    }
    catch (error) {
        console.error("Failed to delete course media", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};
exports.courseMediaMutationHandlers = {
    createCourseMedia,
    updateCourseMedia,
    deleteCourseMedia,
};
