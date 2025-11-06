import { initServer } from "@ts-rest/express";
import { enrolledCourseContract } from "../../contract/enrollement/enrolled.contract";
import { enrolledCourseMutationHandlers } from "./enrolled.mutation";
import { enrolledCourseQueryHandlers } from "./enrolled.query";

const s = initServer();

export const enrolledCourseRouter = s.router(enrolledCourseContract,{
    createEnrolledCourse: enrolledCourseMutationHandlers.createEnrolledCourse,

    getAllEnrolledCoursesById: enrolledCourseQueryHandlers.getAllEnrolledCoursesById,
});