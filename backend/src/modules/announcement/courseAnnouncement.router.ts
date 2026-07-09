import { initServer } from "@ts-rest/express";
import { courseAnnouncementContract } from "../../contract/announcement/courseAnnouncement.contract";
import { courseAnnouncementMutationHandlers } from "./courseAnnouncement.mutation";
import { courseAnnouncementQueryHandlers } from "./courseAnnouncement.query";

const s = initServer();

export const courseAnnouncementRouter = s.router(courseAnnouncementContract, {
  getCourseAnnouncements: courseAnnouncementQueryHandlers.getCourseAnnouncements,
  createCourseAnnouncement: courseAnnouncementMutationHandlers.createCourseAnnouncement,
  updateCourseAnnouncement: courseAnnouncementMutationHandlers.updateCourseAnnouncement,
  deleteCourseAnnouncement: courseAnnouncementMutationHandlers.deleteCourseAnnouncement,
});
