import { initServer } from "@ts-rest/express";
import { enrollementRequestContract } from "../../contract/enrollement/enrollement.contract";
import { enrolledCourseMutationHandlers } from "./enrollement.mutation";
import { enrolledCourseQueryHandlers } from "./enrollement.query";
import { authenticate } from "../../middleware/auth.middleware";

const s = initServer();

export const enrollementRequestRouter = s.router(enrollementRequestContract,{
    createEnrollementRequestForStudent: {
        middleware: [authenticate],
        handler: enrolledCourseMutationHandlers.createEnrollementRequestForStudent,
    },

    updateEnrollementRequestForAdmin: {
        middleware: [authenticate],
        handler: enrolledCourseMutationHandlers.updateEnrollementRequestForAdmin,
    },

    getAllEnrollementRequest: {
        middleware: [authenticate],
        handler: enrolledCourseQueryHandlers.getAllEnrollementRequest,
    },
});