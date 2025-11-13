import { initContract } from "@ts-rest/core";

import {
  getProfileSchema,
} from "./auth.schema";

import { errorSchema } from "../common.schema";

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
});
