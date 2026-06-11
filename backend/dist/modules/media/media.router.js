"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseMediaRouter = void 0;
const express_1 = require("@ts-rest/express");
const media_contract_1 = require("../../contract/media/media.contract");
const media_mutation_1 = require("./media.mutation");
const media_query_1 = require("./media.query");
const s = (0, express_1.initServer)();
exports.courseMediaRouter = s.router(media_contract_1.courseMediaContract, {
    createCourseMedia: media_mutation_1.courseMediaMutationHandlers.createCourseMedia,
    getAllCourseMediaByCourseId: media_query_1.courseMediaQueryHandlers.getAllCourseMediaByCourseId,
    getCourseMediaById: media_query_1.courseMediaQueryHandlers.getCourseMediaById,
    updateCourseMedia: media_mutation_1.courseMediaMutationHandlers.updateCourseMedia,
    deleteCourseMedia: media_mutation_1.courseMediaMutationHandlers.deleteCourseMedia,
});
