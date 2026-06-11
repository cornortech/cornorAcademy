"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseAnnouncementSchema = exports.deleteCourseAnnouncementParamsSchema = exports.updateCourseAnnouncementSchema = exports.updateCourseAnnoucementParamsSchema = exports.getAllCourseAnnouncementByIdResponseSchema = exports.getAllCourseAnnouncementByIdParamSchema = exports.createCourseAnnouncementSchema = exports.createCourseAnnouncementParamSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCourseAnnouncementParamSchema = zod_1.default.object({
    teacherId: zod_1.default.string().uuid(),
    courseId: zod_1.default.string().uuid(),
});
exports.createCourseAnnouncementSchema = zod_1.default.object({
    title: zod_1.default.string().min(2, "Announcement Title is required"),
    message: zod_1.default.string().min(5, "Announcement Message is required"),
});
exports.getAllCourseAnnouncementByIdParamSchema = zod_1.default.object({
    courseId: zod_1.default.string().uuid(),
});
exports.getAllCourseAnnouncementByIdResponseSchema = zod_1.default.array(zod_1.default.object({
    id: zod_1.default.string().uuid(),
    courseId: zod_1.default.string().uuid(),
    title: zod_1.default.string(),
    message: zod_1.default.string(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
}));
exports.updateCourseAnnoucementParamsSchema = zod_1.default.object({
    announcementId: zod_1.default.string().uuid(),
});
exports.updateCourseAnnouncementSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    message: zod_1.default.string().optional(),
});
exports.deleteCourseAnnouncementParamsSchema = zod_1.default.object({
    announcementId: zod_1.default.string().uuid(),
});
exports.deleteCourseAnnouncementSchema = zod_1.default.object({});
