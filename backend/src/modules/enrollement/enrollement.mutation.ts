import { AppRouteMutationImplementation } from "@ts-rest/express";
import { enrollementRequestContract } from "../../contract/enrollement/enrollement.contract";
import prisma from "../../libs/db";

const createEnrollementRequestForStudent: AppRouteMutationImplementation<
    typeof enrollementRequestContract.createEnrollementRequestForStudent
> = async ({ req }) => {
    try {
        if (req.user?.role !== "student") {
            return {
                status: 403,
                body: { success: false, error: "Only students can enroll" },
            };
        }

        const studentId = req.user.id;
        const { courseId, paymentURL } = req.body;

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

        await prisma.enrolledCourses.create({
            data: {
                studentId,
                courseId,
                paymentURL,
                status: "requested",
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Enrollment submitted successfully",
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
        if (!req.user || (req.user.role !== "admin" && req.user.role !== "teacher")) {
            return {
                status: 403,
                body: { success: false, error: "Only admin or teacher can update enrollments" },
            };
        }

        const {
            studentId,
            courseId,
            status,
            rejectionReason,
        } = req.body;

        if (req.user.role === "teacher") {
            const course = await prisma.course.findUnique({
                where: { id: courseId },
                select: { teacherId: true },
            });
            if (!course || course.teacherId !== req.user.id) {
                return {
                    status: 403,
                    body: { success: false, error: "You can only manage enrollments for your own courses" },
                };
            }
        }

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
                error: "Internal server error",
            },
        };
    }
};

export const enrolledCourseMutationHandlers = {
    createEnrollementRequestForStudent,
    updateEnrollementRequestForAdmin,
}