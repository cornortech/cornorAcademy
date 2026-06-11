"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseMediaContract = void 0;
const core_1 = require("@ts-rest/core");
const common_schema_1 = require("../common.schema");
const media_schema_1 = require("./media.schema");
const c = (0, core_1.initContract)();
exports.courseMediaContract = c.router({
    createCourseMedia: {
        method: "POST",
        path: "/course-media",
        body: media_schema_1.createCourseMediaSchema,
        summary: "📎 Upload Course Media - Upload videos, PDFs, images, and other course materials",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getAllCourseMediaByCourseId: {
        method: "GET",
        path: "/course-media/:courseId",
        pathParams: media_schema_1.getAllCourseMediaByCourseIdSchema,
        summary: "📁 Get All Course Media - Retrieve all media files for a specific course",
        responses: {
            200: media_schema_1.getAllCourseMediaByCourseIdResponseSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getCourseMediaById: {
        method: "GET",
        path: "/course-media/:mediaId",
        pathParams: media_schema_1.getCourseMediaByIdSchema,
        summary: "📄 Get Specific Media - Get detailed information about a specific media file",
        responses: {
            200: media_schema_1.getCourseMediaByIdResponseSchema,
            400: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateCourseMedia: {
        method: "PUT",
        path: "/course-media/:mediaId",
        pathParams: media_schema_1.updateCourseMediaParamsSchema,
        body: media_schema_1.updateCourseMediaSchema,
        summary: "✏️ Update Course Media - Update media file title, description, or URL",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    deleteCourseMedia: {
        method: "DELETE",
        path: "/course-media/:mediaId",
        pathParams: media_schema_1.deleteCourseMediaParamsSchema,
        body: media_schema_1.deleteCourseMediaSchema,
        summary: "🗑️ Delete Course Media - Permanently remove a media file from course",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
