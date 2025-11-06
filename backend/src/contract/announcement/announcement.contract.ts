import { initContract } from "@ts-rest/core";
import 
{
    createCourseAnnouncementParamSchema,
    createCourseAnnouncementSchema,
    deleteCourseAnnouncementSchema,
    getAllCourseAnnouncementByIdParamSchema,
    getAllCourseAnnouncementByIdResponseSchema,
    updateCourseAnnoucementParamsSchema,
    updateCourseAnnouncementSchema,
} from "./announcement.schema";

import {
    errorSchema,
    successSchema
} from "../common.schema";

const c = initContract();

export const announcementContract = c.router({
    createCourseAnnouncement: {
        method: "POST",
        path: "/:teacherId/courses/:courseid/announcement",
        pathParams: createCourseAnnouncementParamSchema,
        body: createCourseAnnouncementSchema,
        summary: "Create a new announcement by teacher",
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    getAllCourseAnnouncementById: {
        method: "GET",
        path: "/course/:courseId/announcement",
        pathParams: getAllCourseAnnouncementByIdParamSchema,
        summary: "Get all announcements for a specific course",
        responses: {
            200: getAllCourseAnnouncementByIdResponseSchema,
            500: errorSchema,
        },
    },

    updateCourseAnnouncement: {
        method: "PUT",
        path: "/course/:announcementId",
        pathParams: updateCourseAnnoucementParamsSchema,
        body: updateCourseAnnouncementSchema,
        summary: "update course announceement for teacher",
        responses: {
            201: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    deleteCourseAnnouncement: {
        method: "DELETE",
        path: "/course/:announcementId",
        pathParams: deleteCourseAnnouncementSchema,
        summary: "Delete course announcement",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});