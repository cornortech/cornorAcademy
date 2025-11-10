import { initContract } from "@ts-rest/core";
import {
    courseAgreementParamasSchema,
    createcourseAgreementSchema,
    createCourseSchema,
    deleteCourseSchema,
    getAllCoursesResponseSchema,
    getCourseByIdResponseSchema,
    getCourseByIdSchema,
    updateCourseParamsSchema,
    updateCourseSchema
} from "./course.schema";
import {
    errorSchema,
    successSchema
} from "../common.schema";

const c = initContract();

export const courseContract = c.router({

    getAllCourses: {
        method: "GET",
        path: "/course",
        summary: "Get all available courses from the lists",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    getCourseById: {
        method: "GET",
        path: "/course/:id",
        pathParams: getCourseByIdSchema,
        summary: "Get required course by id",
        responses: {
            200: getCourseByIdResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    createCourse: {
        method: "POST",
        path: "/course",
        body: createCourseSchema,
        summary: "Make new course for students to enroll",
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    updateCourse: {
        method: "PUT",
        path: "/course/update/:id",
        pathParams: updateCourseParamsSchema,
        body: updateCourseSchema,
        summary: "Update course by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    deleteCourse: {
        method: "DELETE",
        path: "/course/:id",
        pathParams: deleteCourseSchema,
        summary: "Delete available course list by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    createCourseAgreement: {
        method: "POST",
        path: "/agreement/:studentId",
        pathParams: courseAgreementParamasSchema,
        body: createcourseAgreementSchema,
        summary: "Make agreement for student who are enrolling",
        responses: {
            201: successSchema,
            500: errorSchema,
        },
    },
});