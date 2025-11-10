import { initContract } from "@ts-rest/core";
import { errorSchema, successSchema } from "../common.schema";
import { createCourseMediaSchema, deleteCourseMediaSchema, getAllCourseMediaByCourseIdResponseSchema, getAllCourseMediaByCourseIdSchema, getCourseMediaByIdResponseSchema, getCourseMediaByIdSchema, updateCourseMediaParamsSchema, updateCourseMediaSchema } from "./media.schema";

const c = initContract();

export const courseMediaContract = c.router({

    getAllCourseMediaByCourseId: {
        method: "GET",
        path: "/course-media/:courseId",
        pathParams: getAllCourseMediaByCourseIdSchema,
        summary: "Get all course media by course ID",
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
        summary: "Get course media by media ID",
        responses: {
            200: getCourseMediaByIdResponseSchema,
            400: errorSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    createCourseMedia: {
        method: "POST",
        path: "/course-media",
        body: createCourseMediaSchema,
        summary: "Create new course media upload for teacher",
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    updateCourseMedia: {
        method: "PUT",
        path: "/course-media/:mediaId",
        pathParams: updateCourseMediaParamsSchema,
        body: updateCourseMediaSchema,
        summary: "Update course media",
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
        summary: "Delete course media by ID",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});