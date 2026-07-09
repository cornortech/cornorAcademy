import { initServer } from "@ts-rest/express";
import { platformAnnouncementContract } from "../../contract/announcement/platformAnnouncement.contract";
import { platformAnnouncementMutationHandlers } from "./platformAnnouncement.mutation";
import { platformAnnouncementQueryHandlers } from "./platformAnnouncement.query";

const s = initServer();

export const platformAnnouncementRouter = s.router(platformAnnouncementContract, {
  getAllAnnouncements: platformAnnouncementQueryHandlers.getAllAnnouncements,
  getAnnouncementById: platformAnnouncementQueryHandlers.getAnnouncementById,
  createAnnouncement: platformAnnouncementMutationHandlers.createAnnouncement,
  updateAnnouncement: platformAnnouncementMutationHandlers.updateAnnouncement,
  deleteAnnouncement: platformAnnouncementMutationHandlers.deleteAnnouncement,
});
