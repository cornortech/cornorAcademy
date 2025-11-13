import { initServer } from "@ts-rest/express";
import { courseContract } from "../../contract/course/course.contract";
import { courseMutationHandlers } from "./course.mutation";
import { courseQueryHandlers } from "./course.query";

const s = initServer();

export const courseRouter = s.router(courseContract, {
    // Course Management APIs
    createCourse: courseMutationHandlers.createCourse,
    getAllCourses: courseQueryHandlers.getAllCourses,
    getCourseById: courseQueryHandlers.getCourseById,
    updateCourse: courseMutationHandlers.updateCourse,
    deleteCourse: courseMutationHandlers.deleteCourse,
    getCoursesByCategory: courseQueryHandlers.getCoursesByCategory,
    getCoursesByTeacher: courseQueryHandlers.getCoursesByTeacher,
    getCoursesByStatus: courseQueryHandlers.getCoursesByStatus,
    updateCourseStatus: courseMutationHandlers.updateCourseStatus,
    searchCourses: courseQueryHandlers.searchCourses,

    // Course Agreement API
    createCourseAgreement: courseMutationHandlers.createCourseAgreement,
});