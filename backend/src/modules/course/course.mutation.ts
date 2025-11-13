import { AppRouteMutationImplementation } from "@ts-rest/express";
import { courseContract } from "../../contract/course/course.contract";
import prisma from "../../libs/db";

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

        const { courseId } = req.params;

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
            where: { id: courseId },
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
                id: courseId,
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

const createCourseAgreement:AppRouteMutationImplementation<
typeof courseContract.createCourseAgreement
> = async({ req }) => {
    try {
        const { studentId } = req.params;

        const {
            agreementURL,
        } = req.body;

        await prisma.courseAgreement.create({
            data: {
                studentId,
                agreementURL,
            },
            include: {
                student: true,
            }
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Agreement for course created successfully",
            },
        };

    } catch (error) {
        console.error("Failed to create agreement", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal server error",
            },
        }
    }
};

const deleteCourse: AppRouteMutationImplementation<
    typeof courseContract.deleteCourse
> = async ({ req }) => {
    try {

        const { courseId } = req.params;

        const courseExists = await prisma.course.findUnique({
            where: {
                id: courseId,
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
                id: courseId,
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

const updateCourseStatus: AppRouteMutationImplementation<
    typeof courseContract.updateCourseStatus
> = async ({ req }) => {
    try {
        const { courseId } = req.params;
        const { status } = req.body;

        const courseExists = await prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!courseExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course not found",
                },
            };
        }

        await prisma.course.update({
            where: { id: courseId },
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

export const courseMutationHandlers = {
    createCourse,
    updateCourse,
    createCourseAgreement,
    deleteCourse,
    updateCourseStatus,
}