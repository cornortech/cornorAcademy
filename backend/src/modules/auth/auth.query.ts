import { AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";
import { authContract } from "../../contract/auth/auth.contract";
import prisma from "../../libs/db";

const getProfile: AppRouteImplementationOrOptions<
    typeof authContract.getProfile
> = async ({ req }) => {
    try {
        const user = req.user;

        if (!user) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "User not found"
                },
            };
        };

        let image: string | null = null;
        let status: "registered" | "portalActivated" | "portalDeactivated" | "rejected" | null = null;

        if (user.role === "student") {
            const student = await prisma.student.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    image: true,
                    status: true,
                },
            });
            if (student) {
                image = student.image;
                status = student.status;
            }
        } else if (user.role === "teacher") {
            const teacher = await prisma.teacher.findUnique({
                where:
                {
                    id: user.id
                }
            });
            if (teacher) {
                image = teacher.image;
                status = teacher.status;
            }
        }

        return {
            status: 200,
            body: {
                userId: user.id,
                uid: user.uid,
                email: user.email,
                image,
                status,
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

export const authQueryHandlers = {
    getProfile
}