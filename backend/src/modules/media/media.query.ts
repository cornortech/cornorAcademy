import { AppRouteQueryImplementation } from "@ts-rest/express";
import { courseMediaContract } from "../../contract/media/media.contract";
import prisma from "../../libs/db";

const getAllCourseMediaByCourseId: AppRouteQueryImplementation<
    typeof courseMediaContract.getAllCourseMediaByCourseId
> = async ({ req }) => {
    try {

        // const teacherId = req.user.id;

        const 
        { 
            courseId 
        } = req.params;

        const courseMedia = await prisma.courseMedia.findMany({
            where: {
                courseId,
            },
        });

        return {
            status: 200,
            body: courseMedia.map(media => ({
                id: media.id,
                courseId: media.courseId,
                title: media.title,
                description: media.description,
                duration: media.duration,
                pathURL: media.pathURL,
                size: media.size,
                type: media.type,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt,
            })),
        };

    } catch (error) {
        console.error("Failed to fetch course media by course ID", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const getCourseMediaById: AppRouteQueryImplementation<
    typeof courseMediaContract.getCourseMediaById
> = async ({ req }) => {
    try {

        const { mediaId } = req.params;

        const media = await prisma.courseMedia.findUnique({
            where: {
                id: mediaId,
            },
        });

        if (!media) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course Media not found",
                },
            };
        }

        return {
            status: 200,
            body: {
                id: media.id,
                courseId: media.courseId,
                title: media.title,
                description: media.description,
                duration: media.duration,
                pathURL: media.pathURL,
                size:  media.size,
                type: media.type,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt, //announcement add admin
            },
        };

    } catch (error) {
        console.error("Failed to fetch course media by ID", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const deleteCourseMedia: AppRouteQueryImplementation<
    typeof courseMediaContract.deleteCourseMedia
> = async ({ req }) => {
    try {

        const { mediaId } = req.params;

        const media = await prisma.courseMedia.findUnique({
            where: {
                id: mediaId,
            },
        });

        if (!media) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Course Media not found",
                },
            };
        }

        await prisma.courseMedia.delete({
            where: {
                id: mediaId,
            },
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Course Media deleted successfully",
            },
        };

    } catch (error) {
        console.error("Failed to delete course media", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error" || error,
            },
        };
    }
};

export const courseMediaQueryHandlers = {
    getAllCourseMediaByCourseId,
    getCourseMediaById,
    deleteCourseMedia,
}