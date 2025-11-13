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

const deleteCourseAnnouncement:AppRouteQueryImplementation<
typeof announcementContract.deleteCourseAnnouncement
> = async ({ req }) => {
    try {

        const { announcementId } = req.params;

        const deleteAnnouncement = await prisma.announcement.findFirst({
            where:  {
               id: announcementId, 
            },
        });

        if(!deleteAnnouncement) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Cannot find announcement",
                },
            };
        };

        await prisma.announcement.delete({
            where: {
                id: announcementId,
            },
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Announcement deleted successfully",
            },
        };

    } catch (error) {
        console.error("Failed to delete", error);
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
    deleteCourseAnnouncement,
}