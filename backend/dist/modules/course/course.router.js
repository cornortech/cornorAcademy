"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("@ts-rest/express");
const course_contract_1 = require("../../contract/course/course.contract");
const course_mutation_1 = require("./course.mutation");
const course_query_1 = require("./course.query");
const s = (0, express_1.initServer)();
exports.courseRouter = s.router(course_contract_1.courseContract, {
    createCourse: course_mutation_1.courseMutationHandlers.createCourse,
    updateCourse: course_mutation_1.courseMutationHandlers.updateCourse,
    updateCourseStatus: course_mutation_1.courseMutationHandlers.updateCourseStatus,
    deleteCourse: course_mutation_1.courseMutationHandlers.deleteCourse,
    getAllCourses: course_query_1.courseQueryHandlers.getAllCourses,
    getCourseById: course_query_1.courseQueryHandlers.getCourseById,
    getCoursesByCategory: course_query_1.courseQueryHandlers.getCoursesByCategory,
    getCoursesByTeacher: course_query_1.courseQueryHandlers.getCoursesByTeacher,
    getCoursesByStatus: course_query_1.courseQueryHandlers.getCoursesByStatus,
    searchCourses: course_query_1.courseQueryHandlers.searchCourses,
    createCourseAgreement: course_mutation_1.courseMutationHandlers.createCourseAgreement,
});
