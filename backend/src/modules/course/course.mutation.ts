import { AppRouteMutationImplementation } from "@ts-rest/express";
import { courseContract } from "../../contract/course/course.contract";
import prisma from "../../libs/db";
import { title } from "process";

const createCourse: AppRouteMutationImplementation<
    typeof courseContract.createCourse
> = async (req) => {
    try {

        const
            {
                title,
                description,
                requirements,
                includes,
                whatYouWillLearn,
                meetingUrl,
                meetingTime,
                language,
                level,
                thumbnail,
                category,
                startDate,
                duration,
                price,
                curriculum,
                teacherId
            } = req.body;

        const adminId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

        const courseData = await prisma.course.create({
            data: {
                title,
                description,
                requirements,
                includes,
                whatYouWillLearn,
                meetingUrl,
                meetingTime,
                language,
                level,
                thumbnail,
                category,
                startDate,
                duration,
                price,
                teacherId,
                adminId,
                courseCurriculum: {
                    create: curriculum.map((c) => ({
                        title: c.title,
                        noOfLesson: c.noOfLesson,
                        duration: c.duration,
                        content: c.content,
                    })),
                },
            },
            include: {
                teacher: true,
                courseCurriculum: true,
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Course created successfully",
            },
        };
    } catch (error) {
        console.error("Error creating course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const updateCourse: AppRouteMutationImplementation<
    typeof courseContract.updateCourse
> = async ({ req }) => {
    try {

        const { id } = req.params;

        const
            {
                title,
                description,
                requirements,
                includes,
                whatYouWillLearn,
                meetingUrl,
                meetingTime,
                language,
                level,
                thumbnail,
                category,
                startDate,
                duration,
                price,
                teacherId
            } = req.body;

        const courseExists = await prisma.course.findUnique({
            where: { id },
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

        const courseUpdated = await prisma.course.update({
            where: {
                id
            },
            data: {
                title,
                description,
                requirements,
                includes,
                whatYouWillLearn,
                meetingUrl,
                meetingTime,
                language,
                level,
                thumbnail,
                category,
                startDate,
                duration,
                price,
                teacherId
            },
            include: {
                teacher: true,
            }
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Course updated successfully",
            },
        };
    } catch (error) {
        console.error("Error updating course:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error try again later",
            },
        };
    }
};

const updateCourseStatus: AppRouteMutationImplementation<
    typeof courseContract.updateCourseStatus
> = async ({ req }) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const courseExists = await prisma.course.findUnique({
            where: { id },
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

        await prisma.course.update({
            where: { id },
            data: { status },
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Course status updated successfully",
            },
        };
    } catch (error) {
        console.error("Error updating course status:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const deleteCourse: AppRouteMutationImplementation<
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

export const courseMutationHandlers = {
    createCourse,
    updateCourse,
    updateCourseStatus,
    deleteCourse,
}