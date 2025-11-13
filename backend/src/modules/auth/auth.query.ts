import { AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";
import { authContract } from "../../contract/auth/auth.contract";

const getProfile: AppRouteImplementationOrOptions<
typeof authContract.getProfile
> = async ({ req }) => {
    try {
        const user = req.user;
        if (!user) {
            return {
                status: 404,
                body: {
                    success: true,
                    error: "User not found"
                },
            };
        };

        return {
            status: 200,
            body: {
                email: user.email,
                uid: user.uid,
                userId: user.id,
                role: user.role,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error."
            },
        };
    }
};

export const authQueryHandler = {
    getProfile
}