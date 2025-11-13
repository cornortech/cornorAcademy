import { initContract } from "@ts-rest/core";
import {
    createCourseSchema,
    deleteCourseSchema,
    getAllCoursesResponseSchema,
    getCourseByIdResponseSchema,
    getCourseByIdSchema,
    updateCourseParamsSchema,
    updateCourseSchema,
    getCoursesByCategorySchema,
    getCoursesByTeacherSchema,
    getCoursesByStatusSchema,
    updateCourseStatusParamsSchema,
    updateCourseStatusSchema,
    searchCoursesSchema
} from "./course.schema";
import { 
    errorSchema, 
    successSchema 
} from "../common.schema";

const c = initContract();

export const courseContract = c.router({
    createCourse: {
        method: "POST",
        path: "/course",
        body: createCourseSchema,
        summary: "📝 Create New Course - Create a new course with complete curriculum, pricing, and schedule information",
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    getAllCourses: {
        method: "GET",
        path: "/course",
        summary: "📚 Get All Courses - Retrieve complete list of all available courses with teacher information",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    getCourseById: {
        method: "GET",
        path: "/course/:id",
        pathParams: getCourseByIdSchema,
        summary: "🔍 Get Course By ID - Retrieve detailed course information including curriculum and teacher details",
        responses: {
            200: getCourseByIdResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    updateCourse: {
        method: "PUT",
        path: "/course/update/:id",
        pathParams: updateCourseParamsSchema,
        body: updateCourseSchema,
        summary: "✏️ Update Course - Update existing course information, curriculum, and pricing",
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
        summary: "🗑️ Delete Course - Permanently remove a course from the system",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    getCoursesByCategory: {
        method: "GET",
        path: "/course/category/:category",
        pathParams: getCoursesByCategorySchema,
        summary: "🏷️ Get Courses by Category - Filter courses by category (WebDevelopment, UI, DataScience, DigitalMarketing)",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    getCoursesByTeacher: {
        method: "GET",
        path: "/course/teacher/:teacherId",
        pathParams: getCoursesByTeacherSchema,
        summary: "👨‍🏫 Get Courses by Teacher - Retrieve all courses taught by a specific teacher",
        responses: {
            200: getAllCoursesResponseSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    getCoursesByStatus: {
        method: "GET",
        path: "/course/status/:status",
        pathParams: getCoursesByStatusSchema,
        summary: "📊 Get Courses by Status - Filter courses by status (upcoming/active/completed)",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    updateCourseStatus: {
        method: "PATCH",
        path: "/course/status/:id",
        pathParams: updateCourseStatusParamsSchema,
        body: updateCourseStatusSchema,
        summary: "🔄 Update Course Status - Change course status to upcoming, active, or completed",
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },

    searchCourses: {
        method: "GET",
        path: "/course/search/:query",
        pathParams: searchCoursesSchema,
        summary: "🔍 Search Courses - Search courses by title, description, or category with query term",
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },
});