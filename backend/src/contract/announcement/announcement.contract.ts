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
<<<<<<< HEAD
        summary: "Create a new announcement by teacher",
=======
        summary: "📢 Create Course Announcement - Create important announcements for course students",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Get all announcements for a specific course",
=======
        summary: "📰 Get Course Announcements - Retrieve all announcements for a specific course",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "update course announceement for teacher",
=======
        summary: "✏️ Update Course Announcement - Edit existing course announcement content",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Delete course announcement",
=======
        summary: "🗑️ Delete Course Announcement - Remove an announcement from the course",
>>>>>>> Course/Enrollment
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});