import { initContract } from "@ts-rest/core";
import { createStudentSchema, deleteStudentSchema, getAllStudentsResponseSchema, getStudentByIdResponseSchema, getStudentByIdSchema, updateStudentParamsSchema, updateStudentSchema } from "./student.schema";
import { errorSchema, successSchema } from "../common.schema";

const c = initContract();

export const studentContract = c.router({
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

    getAllStudents: { 
        method: "GET",
        path: "/student",
        summary: "Get full students profile from the lists",
        responses: {
            200: getAllStudentsResponseSchema,
            500: errorSchema,
        },
    },

    getStudentById: {
        method: "GET",
        path: "/student/:id",
        pathParams: getStudentByIdSchema,
        summary: "Get student pofile from by id",
        responses: {
            200: getStudentByIdResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    updateStudent: {
        method: "PUT",
        path: "/student/update/:id",
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
        path: "/student/:id",
        pathParams: deleteStudentSchema,
        summary: "Delete student profile by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});