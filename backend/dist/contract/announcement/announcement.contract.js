"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementContract = void 0;
const core_1 = require("@ts-rest/core");
const announcement_schema_1 = require("./announcement.schema");
const common_schema_1 = require("../common.schema");
const c = (0, core_1.initContract)();
exports.announcementContract = c.router({
    getAllCourseAnnouncementById: {
        method: "GET",
        path: "/course/:courseId/announcement",
        pathParams: announcement_schema_1.getAllCourseAnnouncementByIdParamSchema,
        summary: "📰 Get Course Announcements - Retrieve all announcements for a specific course",
        responses: {
            200: announcement_schema_1.getAllCourseAnnouncementByIdResponseSchema,
            500: common_schema_1.errorSchema,
        },
    },
    createCourseAnnouncement: {
        method: "POST",
        path: "/:teacherId/courses/:courseid/announcement",
        pathParams: announcement_schema_1.createCourseAnnouncementParamSchema,
        body: announcement_schema_1.createCourseAnnouncementSchema,
        summary: "📢 Create Course Announcement - Create important announcements for course students",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateCourseAnnouncement: {
        method: "PUT",
        path: "/course/:announcementId",
        pathParams: announcement_schema_1.updateCourseAnnoucementParamsSchema,
        body: announcement_schema_1.updateCourseAnnouncementSchema,
        summary: "✏️ Update Course Announcement - Edit existing course announcement content",
        responses: {
            201: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    deleteCourseAnnouncement: {
        method: "DELETE",
        path: "/course/:announcementId",
        pathParams: announcement_schema_1.deleteCourseAnnouncementParamsSchema,
        body: announcement_schema_1.deleteCourseAnnouncementSchema,
        summary: "🗑️ Delete Course Announcement - Remove an announcement from the course",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
