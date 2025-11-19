import { initContract } from "@ts-rest/core";
import { errorSchema, successSchema } from "../common.schema";
import { createCourseMediaSchema, deleteCourseMediaParamsSchema, deleteCourseMediaSchema, getAllCourseMediaByCourseIdResponseSchema, getAllCourseMediaByCourseIdSchema, getCourseMediaByIdResponseSchema, getCourseMediaByIdSchema, updateCourseMediaParamsSchema, updateCourseMediaSchema } from "./media.schema";

const c = initContract();

export const courseMediaContract = c.router({
    createCourseMedia: {
        method: "POST",
        path: "/course-media",
        body: createCourseMediaSchema,
        summary: "📎 Upload Course Media - Upload videos, PDFs, images, and other course materials",
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    getAllCourseMediaByCourseId: {
        method: "GET",
        path: "/course-media/:courseId",
        pathParams: getAllCourseMediaByCourseIdSchema,
        summary: "📁 Get All Course Media - Retrieve all media files for a specific course",
        responses: {
            200: getAllCourseMediaByCourseIdResponseSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    getCourseMediaById: {
        method: "GET",
        path: "/course-media/:mediaId",
        pathParams: getCourseMediaByIdSchema,
        summary: "📄 Get Specific Media - Get detailed information about a specific media file",
        responses: {
            200: getCourseMediaByIdResponseSchema,
            400: errorSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    updateCourseMedia: {
        method: "PUT",
        path: "/course-media/:mediaId",
        pathParams: updateCourseMediaParamsSchema,
        body: updateCourseMediaSchema,
        summary: "✏️ Update Course Media - Update media file title, description, or URL",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    deleteCourseMedia: {
        method: "DELETE",
        path: "/course-media/:mediaId",
        pathParams: deleteCourseMediaParamsSchema,
        body: deleteCourseMediaSchema,
        summary: "🗑️ Delete Course Media - Permanently remove a media file from course",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});