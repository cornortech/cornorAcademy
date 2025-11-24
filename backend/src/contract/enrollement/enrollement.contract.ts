import { initContract } from "@ts-rest/core";
import { errorSchema, successSchema } from "../common.schema";
import {  createEnrollementRequestForStudentSchema, getAllEnrollementRequestForStudentByStatusSchema, getAllEnrollementRequestForStudentParamsSchema, getAllEnrollementRequestForStudentResponseSchema, getAllEnrollementRequestResponseSchema, getAllEnrollementRequestByStatusSchema, searchEnrollementForStudentSchema, updateEnrollementRequestForAdminSchema } from "./enrollement.schema";

const c = initContract();

export const enrollementRequestContract = c.router({

    getAllEnrollementRequest: {
        method: "GET",
        path: "/enrollement/",
        query: getAllEnrollementRequestByStatusSchema,
        summary: "Get all enrollement request of course applied by student",
        responses: {
            200: getAllEnrollementRequestResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    getAllEnrollementRequestForStudent: {
        method: 'GET',
        path: "/enrollement/:studentId",
        pathParams: getAllEnrollementRequestForStudentParamsSchema,
        query: getAllEnrollementRequestForStudentByStatusSchema,
        summary: "Get all enrollement request of single student by id",
        responses: {
            200: getAllEnrollementRequestForStudentResponseSchema,
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

    searchEnrollementForStudent: {
        method: 'GET',
        path: "/enrollement/:studentId/search",
        query: searchEnrollementForStudentSchema,
        summary: "Get searched course enrollement for student",
        responses: {
            200: getAllEnrollementRequestForStudentResponseSchema,
            500: errorSchema,
        },
    },
});