import { initContract } from "@ts-rest/core";

import {
  getProfileSchema,
  loginResponseSchema,
  loginSchema,
  registerSchema,
  updateStudentDetailsSchema,
} from "./auth.schema";

import { errorSchema, successSchema } from "../common.schema";
import z from "zod";

const c = initContract();

export const authContract = c.router({
  getProfile: {
    method: "GET",
    path: "/auth/me",
    summary: "Get user profile",
    responses: {
      200: getProfileSchema,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  registerStudent: {
    method: "POST",
    path: "/auth/register",
    body: registerSchema,
    summary: "Regsiter new student self",
    responses: {
      201: successSchema.extend({
        studentId: z.string(),
      }),
      400: errorSchema,
      500: errorSchema,
    },
  },

  updateStudentDetails: {
    method: 'PUT',
    path: '/update',
    body: updateStudentDetailsSchema,
    summary: "Update student details (self)",
    responses: {
      200: successSchema,
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },

  login: {
    method: "POST",
    path: "/auth/login",
    body: loginSchema,
    summary: "User Login",
    responses: {
      200: loginResponseSchema,
      400: errorSchema,
      401: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
  },
});