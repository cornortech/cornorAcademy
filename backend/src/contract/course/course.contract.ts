import { initContract } from "@ts-rest/core";
import {
    courseAgreementParamasSchema,
    createcourseAgreementSchema,
    createCourseSchema,
    deleteCourseParamsSchema,
    deleteCourseSchema,
    getAllCoursesResponseSchema,
    getCourseByIdResponseSchema,
    getCourseByIdSchema,
    updateCourseParamsSchema,
    updateCourseSchema,
    getCoursesByCategoryParamsSchema,
    getCoursesByTeacherParamsSchema,
    getCoursesByStatusParamsSchema,
    updateCourseStatusParamsSchema,
    updateCourseStatusSchema,
    searchCoursesParamsSchema
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
        path: "/course/:courseId",
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
        path: "/course/update/:courseId",
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
        path: "/course/:courseId",
        pathParams: deleteCourseParamsSchema,
        body: deleteCourseSchema,
        summary: "Delete available course list by id",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    // Additional Course Management APIs
    getCoursesByCategory: {
        method: "GET",
        path: "/course/category/:category",
        pathParams: getCoursesByCategoryParamsSchema,
        summary: "Get courses by category",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    getCoursesByTeacher: {
        method: "GET",
        path: "/course/teacher/:teacherId",
        pathParams: getCoursesByTeacherParamsSchema,
        summary: "Get all courses by a specific teacher",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    getCoursesByStatus: {
        method: "GET",
        path: "/course/status/:status",
        pathParams: getCoursesByStatusParamsSchema,
        summary: "Get courses by status (upcoming, active, completed)",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    updateCourseStatus: {
        method: "PATCH",
        path: "/course/status/:courseId",
        pathParams: updateCourseStatusParamsSchema,
        body: updateCourseStatusSchema,
        summary: "Update course status",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    searchCourses: {
        method: "GET",
        path: "/course/search/:query",
        pathParams: searchCoursesParamsSchema,
        summary: "Search courses by title, description, or category",
        responses: {
            200: getAllCoursesResponseSchema,
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