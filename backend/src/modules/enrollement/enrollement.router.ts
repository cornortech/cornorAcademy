import { initServer } from "@ts-rest/express";
import { enrollementRequestContract } from "../../contract/enrollement/enrollement.contract";
import { enrolledCourseMutationHandlers } from "./enrollement.mutation";
import { enrolledCourseQueryHandlers } from "./enrollement.query";

const s = initServer();

export const enrollementRequestRouter = s.router(enrollementRequestContract,{
    createEnrollementRequestForStudent: enrolledCourseMutationHandlers.createEnrollementRequestForStudent,

    updateEnrollementRequestForAdmin: enrolledCourseMutationHandlers.updateEnrollementRequestForAdmin,

    getAllEnrollementRequest: enrolledCourseQueryHandlers.getAllEnrollementRequest,
});