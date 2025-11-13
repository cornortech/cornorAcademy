import { AppRouteQueryImplementation } from "@ts-rest/express";
import { announcementContract } from "../../contract/announcement/announcement.contract";
import prisma from "../../libs/db";

const getCourseAnnouncementById: AppRouteQueryImplementation<
    typeof announcementContract.getAllCourseAnnouncementById
> = async ({ req }) => {
    try {

        const { courseId } = req.params;

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                teacherId: true,
            },
        });

        const announcements = await prisma.announcement.findMany({
            where: {
                courseId,
            },
            include: {
                course: {
                    select: {
                        teacherId: true,
                    }
                }
            }
        });

        return {
            status: 200,
            body: announcements.map(announcement => ({
                id: announcement.id,
                courseId: announcement.courseId,
                title: announcement.title,
                message: announcement.message,
                createdAt: announcement.createdAt,
                updatedAt: announcement.updatedAt,
            })),
        };

    } catch (error) {
        console.error("Error fetching announcements:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error" || error,
            },
        };
    }
};

export const announcementQueryHandlers = {
    getCourseAnnouncementById,
}