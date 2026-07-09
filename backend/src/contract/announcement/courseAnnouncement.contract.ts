import { initContract } from "@ts-rest/core";
import z from "zod";
import {
  courseAnnouncementParamsSchema,
  courseAnnouncementTeacherParamsSchema,
  courseAnnouncementIdParamsSchema,
  createCourseAnnouncementSchema,
  updateCourseAnnouncementSchema,
  courseAnnouncementListResponseSchema,
} from "./courseAnnouncement.schema";
import { errorSchema, successSchema } from "../common.schema";

const c = initContract();

export const courseAnnouncementContract = c.router({
  getCourseAnnouncements: {
    method: "GET",
    path: "/course/:courseId/announcement",
    pathParams: courseAnnouncementParamsSchema,
    summary: "Get announcements for a course",
    responses: {
      200: courseAnnouncementListResponseSchema,
      500: errorSchema,
    },
  },

  createCourseAnnouncement: {
    method: "POST",
    path: "/:teacherId/courses/:courseId/announcement",
    pathParams: courseAnnouncementTeacherParamsSchema,
    body: createCourseAnnouncementSchema,
    summary: "Create a course announcement (teacher only)",
    responses: {
      201: successSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },

  updateCourseAnnouncement: {
    method: "PUT",
    path: "/course/:announcementId",
    pathParams: courseAnnouncementIdParamsSchema,
    body: updateCourseAnnouncementSchema,
    summary: "Update a course announcement",
    responses: {
      200: successSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  deleteCourseAnnouncement: {
    method: "DELETE",
    path: "/course/:announcementId",
    pathParams: courseAnnouncementIdParamsSchema,
    body: z.object({}),
    summary: "Delete a course announcement",
    responses: {
      200: successSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
});
