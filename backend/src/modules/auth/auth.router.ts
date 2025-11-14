import { initServer } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import { authenticate } from "../../middleware/auth.middleware";
import { authQueryHandlers } from "./auth.query";
import { authMutationHandlers } from "./auth.mutation";

const s = initServer();

export const authRouter = s.router(authContract, {

    registerStudent: authMutationHandlers.registerStudent,

    login: authMutationHandlers.login,

    getProfile: {
        middleware: [authenticate],
        handler: authQueryHandlers.getProfile
    },

    updateStudentDetails: {
        middleware: [authenticate],
        handler: authMutationHandlers.updateStudentDetails,
    },
});