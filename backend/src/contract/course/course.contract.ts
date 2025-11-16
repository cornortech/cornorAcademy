import { initContract } from "@ts-rest/core";
import {
    createCourseSchema,
    deleteCourseSchema,
    getAllCoursesResponseSchema,
    getCourseByIdResponseSchema,
    getCourseByIdSchema,
    updateCourseParamsSchema,
<<<<<<< HEAD
    updateCourseSchema
=======
    updateCourseSchema,
    getCoursesByCategorySchema,
    getCoursesByTeacherSchema,
    getCoursesByStatusSchema,
    updateCourseStatusParamsSchema,
    updateCourseStatusSchema,
    searchCoursesSchema
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Make new course for students to enroll",
=======
        summary: "📝 Create New Course - Create a new course with complete curriculum, pricing, and schedule information",
>>>>>>> Course/Enrollment
        responses: {
            201: successSchema,
            400: errorSchema,
            500: errorSchema,
        },
    },

    getAllCourses: {
        method: "GET",
        path: "/course",
<<<<<<< HEAD
        summary: "Get all available courses from the lists",
=======
        summary: "📚 Get All Courses - Retrieve complete list of all available courses with teacher information",
>>>>>>> Course/Enrollment
        responses: {
            200: getAllCoursesResponseSchema,
            500: errorSchema,
        },
    },

    getCourseById: {
        method: "GET",
        path: "/course/:id",
        pathParams: getCourseByIdSchema,
<<<<<<< HEAD
        summary: "Get required course by id",
=======
        summary: "🔍 Get Course By ID - Retrieve detailed course information including curriculum and teacher details",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Update course by id",
=======
        summary: "✏️ Update Course - Update existing course information, curriculum, and pricing",
>>>>>>> Course/Enrollment
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
<<<<<<< HEAD
        summary: "Delete available course list by id",
=======
        summary: "🗑️ Delete Course - Permanently remove a course from the system",
>>>>>>> Course/Enrollment
        responses: {
            200: successSchema,
            404: errorSchema,
            500: errorSchema,
        },
    },
<<<<<<< HEAD
=======

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
>>>>>>> Course/Enrollment
});