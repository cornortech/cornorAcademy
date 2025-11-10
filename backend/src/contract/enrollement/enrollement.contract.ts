import { initContract } from "@ts-rest/core";
import { errorSchema, successSchema } from "../common.schema";
import {  createEnrollementRequestForStudentSchema, getAllEnrollementRequestResponseSchema, getEnrollementRequestByStatusSchema, updateEnrollementRequestForAdminSchema } from "./enrollement.schema";

const c = initContract();

export const enrollementRequestContract = c.router({

    getAllEnrollementRequest: {
        method: "GET",
        path: "/enrollement/",
        query: getEnrollementRequestByStatusSchema,
        summary: "Get all enrollement request of course applied by student",
        responses: {
            200: getAllEnrollementRequestResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    createEnrollementRequestForStudent: {
        method: "POST",
        path: "/enrollement",
        body: createEnrollementRequestForStudentSchema,
        summary: "Create enrollment of course by student",
        responses: {
            201: successSchema,
            400: successSchema,
            500: successSchema,
        },
    },

    updateEnrollementRequestForAdmin: {
        method: "PUT",
        path: "/enrollement",
        body: updateEnrollementRequestForAdminSchema,
        summary: "Update enrollement request of course by admin",
        responses: {
            201: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});