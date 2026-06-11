"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseMediaSchema = exports.deleteCourseMediaParamsSchema = exports.updateCourseMediaSchema = exports.updateCourseMediaParamsSchema = exports.getCourseMediaByIdResponseSchema = exports.getCourseMediaByIdSchema = exports.getAllCourseMediaByCourseIdResponseSchema = exports.getAllCourseMediaByCourseIdSchema = exports.createCourseMediaSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCourseMediaSchema = zod_1.default.object({
    courseId: zod_1.default.string(),
    title: zod_1.default.string().min(3, "Proper course tile is needed"),
    description: zod_1.default.string().min(3).max(500),
    duration: zod_1.default.number().optional(),
    pathURL: zod_1.default.string(),
    size: zod_1.default.number(),
    type: zod_1.default.enum([
        'pdf',
        'video',
        'img',
        'code',
        'docx',
        'xlsx',
        'txt',
        'jpg',
        'png',
        'mp3',
        'mp4',
        'zip',
        'exe',
        'other'
    ]),
});
exports.getAllCourseMediaByCourseIdSchema = zod_1.default.object({
    courseId: zod_1.default.string(),
});
exports.getAllCourseMediaByCourseIdResponseSchema = zod_1.default.array(zod_1.default.object({
    id: zod_1.default.string(),
    courseId: zod_1.default.string(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    duration: zod_1.default.number().nullable(),
    pathURL: zod_1.default.string(),
    size: zod_1.default.number(),
    type: zod_1.default.enum([
        'pdf',
        'video',
        'img',
        'code',
        'docx',
        'xlsx',
        'txt',
        'jpg',
        'png',
        'mp3',
        'mp4',
        'zip',
        'exe',
        'other'
    ]),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
}));
exports.getCourseMediaByIdSchema = zod_1.default.object({
    mediaId: zod_1.default.string(),
});
exports.getCourseMediaByIdResponseSchema = zod_1.default.object({
    id: zod_1.default.string(),
    courseId: zod_1.default.string(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    duration: zod_1.default.number().nullable(),
    pathURL: zod_1.default.string(),
    size: zod_1.default.number(),
    type: zod_1.default.enum([
        'pdf',
        'video',
        'img',
        'code',
        'docx',
        'xlsx',
        'txt',
        'jpg',
        'png',
        'mp3',
        'mp4',
        'zip',
        'exe',
        'other'
    ]),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
});
exports.updateCourseMediaParamsSchema = zod_1.default.object({
    mediaId: zod_1.default.string(),
});
exports.updateCourseMediaSchema = zod_1.default.object({
    title: zod_1.default.string().min(3).optional(),
    description: zod_1.default.string().min(3).max(500).optional(),
    duration: zod_1.default.number().optional(),
    pathURL: zod_1.default.string().optional(),
    size: zod_1.default.number().optional(),
    type: zod_1.default.enum([
        'pdf',
        'video',
        'img',
        'code',
        'docx',
        'xlsx',
        'txt',
        'jpg',
        'png',
        'mp3',
        'mp4',
        'zip',
        'exe',
        'other'
    ]),
});
exports.deleteCourseMediaParamsSchema = zod_1.default.object({
    mediaId: zod_1.default.string(),
});
exports.deleteCourseMediaSchema = zod_1.default.object({});
