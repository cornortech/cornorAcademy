import { AppRouteMutationImplementation } from "@ts-rest/express";
import { enrolledCourseContract } from "../../contract/enrollement/enrolled.contract";
import prisma from "../../libs/db";

const createEnrolledCourse:AppRouteMutationImplementation<
typeof enrolledCourseContract.createEnrolledCourse
> = async (req) => {
    try {

        const { studentId, courseId  } = req.body;

        const enrolledExists = await prisma.enrolledCourses.findFirst({
            where: {
                studentId,
                courseId
            },
        });

        if(enrolledExists) {
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
                courseId
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

    }  catch(error) {
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

export const enrolledCourseMutationHandlers = {
    createEnrolledCourse,
}