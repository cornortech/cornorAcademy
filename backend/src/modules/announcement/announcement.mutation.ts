import { AppRouteMutationImplementation } from "@ts-rest/express";
import { announcementContract } from "../../contract/announcement/announcement.contract";
import prisma from "../../libs/db";

const createCourseAnnouncement: AppRouteMutationImplementation<
    typeof announcementContract.createCourseAnnouncement
> = async ({ req }) => {
    try {

        const { teacherId, courseId } = req.params;

        const {
            title,
            message
        } = req.body;

        const course = await prisma.course.findUnique({
            where: { id: courseId },
            select: { teacherId: true },
        });

        if (!course) {
            return {
                status: 404,
                body: { success: false, error: "Course not found" },
            };
        }

        const titleExists = await prisma.announcement.findFirst({
            where: {
                courseId,
                title,  
            },
        });

        if(titleExists){
            return {
                status: 400,
                body: {
                    success: false,
                    error: "Announcement with this title already exists for the course",
                },
            };
        };

        await prisma.announcement.create({
            data: {
                courseId,
                title,
                message,
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Announcement created successfully",
            },
        };

    } catch (error) {
        console.error("Error creating announcement:", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const updateCourseAnnouncement:AppRouteMutationImplementation<
typeof announcementContract.updateCourseAnnouncement
> = async ({ req }) => {
    try {

        const { announcementId } = req.params;

        const { title, message } = req.body;

        const announcementExists = await prisma.announcement.findUnique({
            where: {
                id: announcementId,
            },
        });

        if(!announcementExists) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Announcement doesn't exists try again",
                },
            };
        };

        await prisma.announcement.update({
            where: {
                id: announcementId,
            },
            data: {
                title,
                message,
            }
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Announcement Updated Successfully",
            },
        };


    } catch (error) {
        console.error("Failed to update Announcement", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const deleteCourseAnnouncement:AppRouteMutationImplementation<
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
                error: "Internal Server Error",
            },
        };
    }
};

export const announcementMutationHandlers = {
    createCourseAnnouncement,
    updateCourseAnnouncement,
    deleteCourseAnnouncement,
}