import { AppRouteQueryImplementation } from "@ts-rest/express";
import { courseContract } from "../../contract/course/course.contract";
import prisma from "../../libs/db";
import { title } from "process";

const getAllCourses: AppRouteQueryImplementation<
    typeof courseContract.getAllCourses
> = async (req) => {
    try {
        const courses = await prisma.course.findMany({
            include: {
                teacher: true,
                courseCurriculum: true,
                _count: {
                    select: {
                        enrolledCourses: true
                    },
                },
            },
        });

        return {
            status: 200,
            body: courses.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                requirements: course.requirements,
                includes: course.includes,
                whatYouWillLearn: course.whatYouWillLearn,
                meetingUrl: course.meetingUrl,
                meetingTime: course.meetingTime,
                language: course.language,
                level: course.level,
                thumbnail: course.thumbnail,
                category: course.category,
                startDate: course.startDate,
                duration: course.duration,
                price: course.price,
                curriculum: course.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: course.teacher
                    ? {
                        id: course.teacher.id,
                        name: course.teacher.name,
                    }
                    : null,
                enrolledStudentsCount: course._count.enrolledCourses,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
            })),
        };

    } catch (error) {
        console.error("Error fetching courses:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const getCourseById: AppRouteQueryImplementation<
    typeof courseContract.getCourseById
> = async ({ req }) => {
    try {

        const { id } = req.params;

        const courseById = await prisma.course.findUnique({
            where: { id },
            include: {
                teacher: true,
                courseCurriculum: true,
            },
        });

        if (!courseById) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Required Course Not Found",
                },
            };
        }

        return {
            status: 200,
            body: {
                id: courseById.id,
                title: courseById.title,
                description: courseById.description,
                requirements: courseById.requirements,
                includes: courseById.includes,
                whatYouWillLearn: courseById.whatYouWillLearn,
                meetingUrl: courseById.meetingUrl,
                meetingTime: courseById.meetingTime,
                language: courseById.language,
                level: courseById.level,
                thumbnail: courseById.thumbnail,
                category: courseById.category,
                startDate: courseById.startDate,
                duration: courseById.duration,
                price: courseById.price,
                curriculum: courseById.courseCurriculum.map((c) => ({
                    id: c.id,
                    title: c.title,
                    noOfLesson: c.noOfLesson,
                    duration: c.duration,
                    content: c.content,
                })),
                teacher: courseById.teacher
                    ? {
                        id: courseById.teacher.id,
                        name: courseById.teacher.name,
                    }
                    : null,
                createdAt: courseById.createdAt,
                updatedAt: courseById.updatedAt,
            },
        };
    } catch (error) {
        console.error("Error fetching course by ID:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const deleteCourse: AppRouteQueryImplementation<
    typeof courseContract.deleteCourse
> = async ({ req }) => {
    try {

        const { id } = req.params;

        const courseExists = await prisma.course.findUnique({
            where: {
                id
            }
        });

        if (!courseExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course Not Found",
                },
            };
        }

        await prisma.course.delete({
            where: {
                id
            },
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Course Deleted Successfully",
            },
        }

    } catch (error) {

        console.error("Error deleting course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

export const courseQueryHandlers = {
    getAllCourses,
    getCourseById,
    deleteCourse,
}