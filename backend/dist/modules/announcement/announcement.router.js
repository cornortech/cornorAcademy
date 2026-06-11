"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementRouter = void 0;
const express_1 = require("@ts-rest/express");
const announcement_contract_1 = require("../../contract/announcement/announcement.contract");
const announcement_mutation_1 = require("./announcement.mutation");
const announcement_query_1 = require("./announcement.query");
const s = (0, express_1.initServer)();
exports.announcementRouter = s.router(announcement_contract_1.announcementContract, {
    createCourseAnnouncement: announcement_mutation_1.announcementMutationHandlers.createCourseAnnouncement,
    getAllCourseAnnouncementById: announcement_query_1.announcementQueryHandlers.getCourseAnnouncementById,
    updateCourseAnnouncement: announcement_mutation_1.announcementMutationHandlers.updateCourseAnnouncement,
    deleteCourseAnnouncement: announcement_mutation_1.announcementMutationHandlers.deleteCourseAnnouncement,
});
