import { initServer } from "@ts-rest/express";
import { courseContract } from "../../contract/course/course.contract";
import { courseMutationHandlers } from "./course.mutation";
import { courseQueryHandlers } from "./course.query";

const s = initServer();

export const courseRouter = s.router(courseContract, {
    createCourse: courseMutationHandlers.createCourse,
<<<<<<< HEAD

    updateCourse: courseMutationHandlers.updateCourse,

    getAllCourses: courseQueryHandlers.getAllCourses,

    getCourseById: courseQueryHandlers.getCourseById,

    deleteCourse: courseQueryHandlers.deleteCourse,
=======
    updateCourse: courseMutationHandlers.updateCourse,
    updateCourseStatus: courseMutationHandlers.updateCourseStatus,
    deleteCourse: courseMutationHandlers.deleteCourse,
    getAllCourses: courseQueryHandlers.getAllCourses,
    getCourseById: courseQueryHandlers.getCourseById,
    getCoursesByCategory: courseQueryHandlers.getCoursesByCategory,
    getCoursesByTeacher: courseQueryHandlers.getCoursesByTeacher,
    getCoursesByStatus: courseQueryHandlers.getCoursesByStatus,
    searchCourses: courseQueryHandlers.searchCourses,
>>>>>>> Course/Enrollment
});