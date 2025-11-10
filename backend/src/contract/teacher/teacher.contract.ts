import { initContract } from "@ts-rest/core";
import { errorSchema, successSchema } from "../common.schema";
import { createTeacherSchema, deleteTeacherSchema, getAllTeachersResponseSchema, getTeacherByIdResponseSchema, getTeacherByIdSchema, updateTeacherParamsSchema, updateTeacherSchema } from "./teacher.schema";
import { updateStudentParamsSchema, updateStudentSchema } from "../student/student.schema";

const c = initContract();

export const teacherContract = c.router({

    getAllTeachers: {
        method: "GET",
        path: "/teacher",
        summary: "Get all teachers profile from the available lists",
        responses: {
            200: getAllTeachersResponseSchema,
            500: errorSchema,
        },
    },

    getTeacherById: {
        method: "GET",
        path: "/teacher/:id",
        pathParams: getTeacherByIdSchema,
        summary: "Get teacher profile taken from id",
        responses: {
            200: getTeacherByIdResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    createTeacher: {
        method: "POST",
        path: "/teacher",
        body: createTeacherSchema,
        summary: "Create new teacher profile",
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    updateTeacher: {
        method: "PUT",
        path: "/teacher/update/:id",
        pathParams: updateTeacherParamsSchema,
        body: updateTeacherSchema,
        summary: "Update teacher profile by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    deleteTeacher: {
        method: "DELETE",
        path: "/teacher/:id",
        pathParams: deleteTeacherSchema,
        summary: "Delete teacher profile by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});