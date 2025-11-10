import { initServer } from "@ts-rest/express";
import { courseContract } from "../../contract/course/course.contract";
import { courseMutationHandlers } from "./course.mutation";
import { courseQueryHandlers } from "./course.query";

const s = initServer();

export const courseRouter = s.router(courseContract, {
    createCourse: courseMutationHandlers.createCourse,

    updateCourse: courseMutationHandlers.updateCourse,

    getAllCourses: courseQueryHandlers.getAllCourses,

    getCourseById: courseQueryHandlers.getCourseById,

    deleteCourse: courseQueryHandlers.deleteCourse,

    createCourseAgreement: courseMutationHandlers.createCourseAgreement,
});