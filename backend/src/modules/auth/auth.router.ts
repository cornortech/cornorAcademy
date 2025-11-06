import { initServer } from "@ts-rest/express";
import { authContract } from "../../contract/auth/auth.contract";
import { authenticate } from "../../middleware/auth.middleware";
import { authQueryHandler } from "./auth.query";

const s = initServer();

export const authRouter = s.router(authContract, {
    getProfile: {
        middleware: [authenticate],
        handler: authQueryHandler.getProfile
    }
});