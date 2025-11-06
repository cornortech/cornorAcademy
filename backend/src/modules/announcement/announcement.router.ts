import { initServer } from "@ts-rest/express";
import { announcementContract } from "../../contract/announcement/announcement.contract";
import { announcementMutationHandlers } from "./announcement.mutation";
import { announcementQueryHandlers } from "./announcement.query";

const s = initServer();

export const announcementRouter = s.router(announcementContract, {
    createCourseAnnouncement: announcementMutationHandlers.createCourseAnnouncement,

    getAllCourseAnnouncementById: announcementQueryHandlers.getCourseAnnouncementById,

    updateCourseAnnouncement: announcementMutationHandlers.updateCourseAnnouncement,

    deleteCourseAnnouncement: announcementQueryHandlers.deleteCourseAnnouncement,
});