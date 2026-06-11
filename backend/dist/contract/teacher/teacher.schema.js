"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacherSchema = exports.deleteTeacherParamsSchema = exports.updateTeacherSchema = exports.updateTeacherParamsSchema = exports.getTeacherByIdResponseSchema = exports.getTeacherByIdSchema = exports.getAllTeachersResponseSchema = exports.createTeacherSchema = void 0;
const zod_1 = require("zod");
exports.createTeacherSchema = zod_1.z.object({
    uid: zod_1.z.string().min(1),
    name: zod_1.z.string().min(2, "Name Field is required"),
    email: zod_1.z.string().email("Email Field is required"),
    image: zod_1.z.string(),
    bio: zod_1.z.string().min(10, "Bio or about is required"),
    noOfYearsExperience: zod_1.z.number().min(0, "Number of experience is required"),
    expertise: zod_1.z.string().min(2, "Expertise is required"),
    dob: zod_1.z.string(),
    gender: zod_1.z.enum(['male', 'female', 'other']),
});
exports.getAllTeachersResponseSchema = zod_1.z.array(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    uid: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    image: zod_1.z.string(),
    bio: zod_1.z.string(),
    noOfYearsExperience: zod_1.z.number(),
    expertise: zod_1.z.string(),
    dob: zod_1.z.string(),
    gender: zod_1.z.enum(['male', 'female', 'other']),
    status: zod_1.z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
}));
exports.getTeacherByIdSchema = zod_1.z.object({
    teacherId: zod_1.z.string().uuid(),
});
exports.getTeacherByIdResponseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    uid: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    image: zod_1.z.string(),
    bio: zod_1.z.string(),
    noOfYearsExperience: zod_1.z.number(),
    expertise: zod_1.z.string(),
    dob: zod_1.z.string(),
    gender: zod_1.z.enum(['male', 'female', 'other']),
    status: zod_1.z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.updateTeacherParamsSchema = zod_1.z.object({
    teacherId: zod_1.z.string().uuid(),
});
exports.updateTeacherSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    noOfYearsExperience: zod_1.z.number().optional(),
    expertise: zod_1.z.string().optional(),
    dob: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['male', 'female', 'other']),
    status: zod_1.z.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']).optional(),
});
exports.deleteTeacherParamsSchema = zod_1.z.object({
    teacherId: zod_1.z.string().uuid(),
});
exports.deleteTeacherSchema = zod_1.z.object({});
