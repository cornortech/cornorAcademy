import { initContract } from "@ts-rest/core";
import { createStudentSchema, deleteStudentParamsSchema, deleteStudentSchema, getAllStudentsResponseSchema, getStudentByIdResponseSchema, getStudentByIdSchema, updateStudentParamsSchema, updateStudentSchema } from "./student.schema";
import { errorSchema, successSchema } from "../common.schema";

const c = initContract();

export const studentContract = c.router({

    getAllStudents: {
        method: "GET",
        path: "/student",
        summary: "Get all students profile",
        responses: {
            200: getAllStudentsResponseSchema,
            500: errorSchema,
        },
    },

    getStudentById: {
        method: "GET",
        path: "/student/:studentId",
        pathParams: getStudentByIdSchema,
        summary: "Get student pofile by id",
        responses: {
            200: getStudentByIdResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    createStudent: {
        method: "POST",
        path: "/student",
        body: createStudentSchema,
        summary: "Create new student profile",
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema
        },
    },

    updateStudent: {
        method: "PUT",
        path: "/student/:studentId",
        pathParams: updateStudentParamsSchema,
        body: updateStudentSchema,
        summary: "Update student profile by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    deleteStudent: {
        method: "DELETE",
        path: "/student/:studentId",
        pathParams: deleteStudentParamsSchema,
        body: deleteStudentSchema,
        summary: "Delete student profile by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});