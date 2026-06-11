"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseContract = void 0;
const core_1 = require("@ts-rest/core");
const course_schema_1 = require("./course.schema");
const common_schema_1 = require("../common.schema");
const c = (0, core_1.initContract)();
exports.courseContract = c.router({
    createCourse: {
        method: "POST",
        path: "/course",
        body: course_schema_1.createCourseSchema,
        summary: "📝 Create New Course - Create a new course with complete curriculum, pricing, and schedule information",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getAllCourses: {
        method: "GET",
        path: "/course",
        summary: "📚 Get All Courses - Retrieve complete list of all available courses with teacher information",
        responses: {
            200: course_schema_1.getAllCoursesResponseSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getCourseById: {
        method: "GET",
        path: "/course/:courseId",
        pathParams: course_schema_1.getCourseByIdSchema,
        summary: "🔍 Get Course By ID - Retrieve detailed course information including curriculum and teacher details",
        responses: {
            200: course_schema_1.getCourseByIdResponseSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateCourse: {
        method: "PUT",
        path: "/course/:courseId",
        pathParams: course_schema_1.updateCourseParamsSchema,
        body: course_schema_1.updateCourseSchema,
        summary: "✏️ Update Course - Update existing course information, curriculum, and pricing",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    deleteCourse: {
        method: "DELETE",
        path: "/course/:courseId",
        pathParams: course_schema_1.deleteCourseParamsSchema,
        body: course_schema_1.deleteCourseSchema,
        summary: "🗑️ Delete Course - Permanently remove a course from the system",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    createCourseAgreement: {
        method: "POST",
        path: "/agreement/:studentId",
        pathParams: course_schema_1.courseAgreementParamasSchema,
        body: course_schema_1.createcourseAgreementSchema,
        summary: "Make agreement for student who are enrolling",
        responses: {
            201: common_schema_1.successSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getCoursesByCategory: {
        method: "GET",
        path: "/course/category/:category",
        pathParams: course_schema_1.getCoursesByCategorySchema,
        summary: "🏷️ Get Courses by Category - Filter courses by category (WebDevelopment, UI, DataScience, DigitalMarketing)",
        responses: {
            200: course_schema_1.getAllCoursesResponseSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getCoursesByTeacher: {
        method: "GET",
        path: "/course/teacher/:teacherId",
        pathParams: course_schema_1.getCoursesByTeacherSchema,
        summary: "👨‍🏫 Get Courses by Teacher - Retrieve all courses taught by a specific teacher",
        responses: {
            200: course_schema_1.getAllCoursesResponseSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getCoursesByStatus: {
        method: "GET",
        path: "/course/status/:status",
        pathParams: course_schema_1.getCoursesByStatusSchema,
        summary: "📊 Get Courses by Status - Filter courses by status (upcoming/active/completed)",
        responses: {
            200: course_schema_1.getAllCoursesResponseSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateCourseStatus: {
        method: "PATCH",
        path: "/course/status/:id",
        pathParams: course_schema_1.updateCourseStatusParamsSchema,
        body: course_schema_1.updateCourseStatusSchema,
        summary: "🔄 Update Course Status - Change course status to upcoming, active, or completed",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    searchCourses: {
        method: "GET",
        path: "/course/search/:query",
        pathParams: course_schema_1.searchCoursesSchema,
        summary: "🔍 Search Courses - Search courses by title, description, or category with query term",
        responses: {
            200: course_schema_1.getAllCoursesResponseSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
