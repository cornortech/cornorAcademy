import { AppRouteMutationImplementation } from "@ts-rest/express";
import { enrollementRequestContract } from "../../contract/enrollement/enrollement.contract";
import prisma from "../../libs/db";

const createEnrollementRequestForStudent: AppRouteMutationImplementation<
    typeof enrollementRequestContract.createEnrollementRequestForStudent
> = async (req) => {
    try {

        const { studentId, courseId, paymentURL } = req.body;

        const enrolledExists = await prisma.enrolledCourses.findFirst({
            where: {
                studentId,
                courseId,
            },
        });

        if (enrolledExists) {
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Already enrolled in this course",
                },
            };
        }

        const enrolledData = await prisma.enrolledCourses.create({
            data: {
                studentId,
                courseId,
                paymentURL,
                status: "requested",
            },
            include: {
                student: true,
                course: true,
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Enrollement Succefully",
            },
        };

    } catch (error) {
        console.error("Error enrolling in course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const updateEnrollementRequestForAdmin: AppRouteMutationImplementation<
    typeof enrollementRequestContract.updateEnrollementRequestForAdmin
> = async ({ req }) => {
    try {

        const {
            studentId,
            courseId,
            status,
            rejectionReason,
        } = req.body;

        const existingEnrollment = await prisma.enrolledCourses.findFirst({
            where:
            {
                studentId,
                courseId
            },
        });

        if (!existingEnrollment) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Enrollment record not found",
                },
            };
        }

        await prisma.enrolledCourses.update({
            where: 
            { 
                id: existingEnrollment.id 
            },
            data: {
                status,
                rejectionReason: status === "rejected" ? rejectionReason : null,
            },
            include: {
                student: true,
                course: true,
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: `Enrollment ${status === "approved" ? "approved" : status === "rejected" ? "rejected" : "updated"} successfully`
            },
        };

    } catch (error) {
        console.error("Error updating enrollment:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error" || error,
            },
        };
    }
};

export const enrolledCourseMutationHandlers = {
    createEnrollementRequestForStudent,
    updateEnrollementRequestForAdmin,
}