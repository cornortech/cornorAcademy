import { AppRouteQueryImplementation } from "@ts-rest/express";
import { enrolledCourseContract } from "../../contract/enrollement/enrolled.contract";
import prisma from "../../libs/db";

const getAllEnrolledCoursesById:AppRouteQueryImplementation<
typeof enrolledCourseContract.getAllEnrolledCoursesById
> = async({ req }) => {
    try {

        const { studentId } = req.params;

        const enrolledCourses = await prisma.enrolledCourses.findMany({
            where: {
                studentId
            },
            include : {
                course: {
                    include: {
                        teacher: true
                    }
                },
                student: true,
            },
        });

        if(enrolledCourses.length === 0) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "No enrolled courses found",
                },
            };
        }

        return {
            status: 200,
            body: enrolledCourses.map((enrolled) => ({
                id: enrolled.id,
                course: {
                    id: enrolled.course.id,
                    title: enrolled.course.title,
                    description: enrolled.course.description,
                    teacher: enrolled.course.teacher
                    ? {
                        id: enrolled.course.teacher.id,
                        name: enrolled.course.teacher.name,
                    } : null,
                    student: {
                        id: enrolled.student.id,
                        name: enrolled.student.name,
                    },
                    createdAt: enrolled.createdAt,
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
    getAllEnrolledCoursesById,
} 