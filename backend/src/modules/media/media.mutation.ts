import { AppRouteMutationImplementation } from "@ts-rest/express";
import { courseMediaContract } from "../../contract/media/media.contract";
import prisma from "../../libs/db";
import { any } from "zod";

const createCourseMedia: AppRouteMutationImplementation<
typeof courseMediaContract.createCourseMedia
> = async ({ req }) => {
    try {

        const 
        { 
            courseId, 
            title, 
            description, 
            duration, 
            pathURL, 
            size,
            type 
        } = req.body;

        await prisma.courseMedia.create({
            data: {
                courseId,
                title,
                description,
                duration,
                pathURL,
                size,
                type,
            },
            include: {
                course: true,
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Media Uploaded Succesfully",
            },
        };

    } catch (error) {
        console.error("Failed to create new media", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const updateCourseMedia:AppRouteMutationImplementation<
typeof courseMediaContract.updateCourseMedia
> = async ( { req } ) => {
    try {

        const { mediaId } = req.params;

        const 
        { 
            title, 
            description, 
            duration, 
            pathURL, 
            size, 
            type 
        } = req.body;

        const existingMedia = await prisma.courseMedia.findUnique({
            where: { 
                id: mediaId,
            },
        });

        if (!existingMedia) {
            return {
                status: 404,
                body: {
                    success: false,
                    error: "Media not found",
                },
            };
        };

        const updateData: any = {};
        if(title !== undefined) updateData.title = title;
        if(description !== undefined) updateData.description = description;
        if (duration !== undefined) updateData.duration = duration;
        if(pathURL !== undefined) updateData.pathURL = pathURL;
        if (size !== undefined) updateData.size = size;
        if (type !== undefined) updateData.type = type;

        await prisma.courseMedia.update({
            where: { 
                id: mediaId 
            },
            data: updateData,
        });

        return {
            status: 200,
            body: {
                success: true,
                message: "Media updated successfully",
            },  
        };

    } catch (error) {
        console.error("Failed to update course media", error);
        return {
            status: 500,
            body: {
                success: false,
                error: "Internal Server Error",
            },
        };
    }
};

const deleteCourseMedia: AppRouteMutationImplementation<
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
                error: "Internal Server Error",
            },
        };
    }
};

export const courseMediaMutationHandlers = {
    createCourseMedia,
    updateCourseMedia,
    deleteCourseMedia,
}  