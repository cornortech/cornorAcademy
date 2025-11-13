import { initContract } from "@ts-rest/core";
import { errorSchema, successSchema } from "../common.schema";
import { createEnrolledCourseSchema, getAllEnrolledCoursesByIdResponseSchema, getAllEnrolledCoursesByIdSchema } from "./enrolled.schema";

const c = initContract();

export const enrolledCourseContract = c.router({
    createEnrolledCourse: {
        method: "POST",
        path: "/enrolled",
        body: createEnrolledCourseSchema,
        summary: "Create enrollment in a course by a student",
        responses: {
            201: successSchema,
            400: successSchema,
            500: successSchema,
        },
    },

    getAllEnrolledCoursesById: {
        method: "GET",
        path: "/enrolled/:studentId",
        pathParams: getAllEnrolledCoursesByIdSchema,
        summary: "Get all enrolled courses of student by student id",
        responses: {
            200: getAllEnrolledCoursesByIdResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
});