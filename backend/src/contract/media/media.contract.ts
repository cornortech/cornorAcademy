import { initContract } from "@ts-rest/core";
import { errorSchema, successSchema } from "../common.schema";
import { createCourseMediaSchema, deleteCourseMediaSchema, getAllCourseMediaByCourseIdResponseSchema, getAllCourseMediaByCourseIdSchema, getCourseMediaByIdResponseSchema, getCourseMediaByIdSchema, updateCourseMediaParamsSchema, updateCourseMediaSchema } from "./media.schema";

const c = initContract();

export const courseMediaContract = c.router({
    createCourseMedia: {
        method: "POST",
        path: "/course-media",
        body: createCourseMediaSchema,
<<<<<<< HEAD
        summary: "Create new course media upload for teacher",
=======
        summary: "📎 Upload Course Media - Upload videos, PDFs, images, and other course materials",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Get all course media by course ID",
=======
        summary: "📁 Get All Course Media - Retrieve all media files for a specific course",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Get course media by media ID",
=======
        summary: "📄 Get Specific Media - Get detailed information about a specific media file",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Update course media",
=======
        summary: "✏️ Update Course Media - Update media file title, description, or URL",
>>>>>>> Course/Enrollment
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    deleteCourseMedia: {
        method: "DELETE",
        path: "/course-media/:mediaId",
        pathParams: deleteCourseMediaSchema,
<<<<<<< HEAD
        summary: "Delete course media by ID",
=======
        summary: "🗑️ Delete Course Media - Permanently remove a media file from course",
>>>>>>> Course/Enrollment
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});