import { initContract } from "@ts-rest/core";
import z from "zod";
import {
  platformAnnouncementIdParamsSchema,
  platformAnnouncementQuerySchema,
  createPlatformAnnouncementSchema,
  updatePlatformAnnouncementSchema,
  platformAnnouncementListResponseSchema,
  platformAnnouncementResponseSchema,
} from "./platformAnnouncement.schema";
import { errorSchema, successSchema } from "../common.schema";

const c = initContract();

export const platformAnnouncementContract = c.router({
  getAllAnnouncements: {
    method: "GET",
    path: "/announcements",
    query: platformAnnouncementQuerySchema,
    summary: "Get all platform announcements (admin)",
    responses: {
      200: platformAnnouncementListResponseSchema,
      500: errorSchema,
    },
  },

  getAnnouncementById: {
    method: "GET",
    path: "/announcements/:id",
    pathParams: platformAnnouncementIdParamsSchema,
    summary: "Get a single announcement by ID",
    responses: {
      200: platformAnnouncementResponseSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  createAnnouncement: {
    method: "POST",
    path: "/announcements",
    body: createPlatformAnnouncementSchema,
    summary: "Create a platform announcement (admin only)",
    responses: {
      201: successSchema,
      400: errorSchema,
      500: errorSchema,
    },
  },

  updateAnnouncement: {
    method: "PUT",
    path: "/announcements/:id",
    pathParams: platformAnnouncementIdParamsSchema,
    body: updatePlatformAnnouncementSchema,
    summary: "Update a platform announcement",
    responses: {
      200: successSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  deleteAnnouncement: {
    method: "DELETE",
    path: "/announcements/:id",
    pathParams: platformAnnouncementIdParamsSchema,
    body: z.object({}),
    summary: "Delete a platform announcement",
    responses: {
      200: successSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
});
