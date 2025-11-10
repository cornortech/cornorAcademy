import { AppRouteQueryImplementation } from "@ts-rest/express";
import { enrollementRequestContract } from "../../contract/enrollement/enrollement.contract";
import prisma from "../../libs/db";

const getAllEnrollementRequest: AppRouteQueryImplementation<
    typeof enrollementRequestContract.getAllEnrollementRequest
> = async ({ req }) => {
    try {

        const { status } = req.query;

        const enrollementRequest = await prisma.enrolledCourses.findMany({
            where: status ? { status } : {},
            include: {
                course: {
                    include: {
                        teacher: true
                    }
                },
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return {
            status: 200,
            body: enrollementRequest.map((enrollement) => ({
                id: enrollement.id,
                paymentURL: enrollement.paymentURL,
                status: enrollement.status,
                course: {
                    id: enrollement.course.id,
                    title: enrollement.course.title,
                    description: enrollement.course.description,
                    teacher: enrollement.course.teacher
                        ? {
                            id: enrollement.course.teacher.id,
                            name: enrollement.course.teacher.name,
                        } : null,
                    createdAt: enrollement.course.createdAt,
                },
                student: {
                    id: enrollement.student.id,
                    name: enrollement.student.name,
                    email: enrollement.student.email,
                },
            })),
        };
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

export const enrolledCourseQueryHandlers = {
    getAllEnrollementRequest,
} 