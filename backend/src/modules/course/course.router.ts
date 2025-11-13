import { initServer } from "@ts-rest/express";
import { courseContract } from "../../contract/course/course.contract";
import { courseMutationHandlers } from "./course.mutation";
import { courseQueryHandlers } from "./course.query";

const s = initServer();

export const courseRouter = s.router(courseContract, {
    createCourse: courseMutationHandlers.createCourse,

    updateCourse: courseMutationHandlers.updateCourse,

    updateCourseStatus: courseMutationHandlers.updateCourseStatus,

    getAllCourses: courseQueryHandlers.getAllCourses,

    getCourseById: courseQueryHandlers.getCourseById,

    getCoursesByCategory: courseQueryHandlers.getCoursesByCategory,

    getCoursesByTeacher: courseQueryHandlers.getCoursesByTeacher,

    getCoursesByStatus: courseQueryHandlers.getCoursesByStatus,

    searchCourses: courseQueryHandlers.searchCourses,

    deleteCourse: courseQueryHandlers.deleteCourse,
});