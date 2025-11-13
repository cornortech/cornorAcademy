import { initServer } from "@ts-rest/express";
import { courseMediaContract } from "../../contract/media/media.contract";
import { courseMediaMutationHandlers } from "./media.mutation";
import { courseMediaQueryHandlers } from "./media.query";

const s = initServer();

export const courseMediaRouter = s.router(courseMediaContract, {
    createCourseMedia: courseMediaMutationHandlers.createCourseMedia,

    getAllCourseMediaByCourseId: courseMediaQueryHandlers.getAllCourseMediaByCourseId,

    getCourseMediaById: courseMediaQueryHandlers.getCourseMediaById,

    updateCourseMedia: courseMediaMutationHandlers.updateCourseMedia,

    deleteCourseMedia: courseMediaQueryHandlers.deleteCourseMedia,
})