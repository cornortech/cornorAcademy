"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLegalAgreementSchema = exports.registerTeacherSchema = exports.updateStudentDetailsSchema = exports.getProfileSchema = exports.logout = exports.loginResponseSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    uid: zod_1.default.string().min(1), // Firebase UID
    name: zod_1.default.string().min(1),
    email: zod_1.default.string().email(),
    phoneNumber: zod_1.default.string().min(8),
    gender: zod_1.default.enum(["male", "female", "other"]),
    image: zod_1.default.string(),
    dob: zod_1.default.string(),
    address: zod_1.default.string(),
    city: zod_1.default.string(),
    district: zod_1.default.string(),
    pincode: zod_1.default.string(),
    country: zod_1.default.string(),
    about: zod_1.default.string(),
    educationInstitute: zod_1.default.string(),
    qualification: zod_1.default.string(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.loginResponseSchema = zod_1.default.object({
    uid: zod_1.default.string(),
    id: zod_1.default.string(),
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    status: zod_1.default
        .enum(["registered", "portalActivated", "portalDeactivated", "rejected"])
        .optional(),
    role: zod_1.default.enum(["student", "teacher", "admin"]),
    redirectionUrl: zod_1.default.string().optional(),
});
exports.logout = zod_1.default.object({});
exports.getProfileSchema = zod_1.default.object({
    userId: zod_1.default.string(),
    uid: zod_1.default.string(),
    email: zod_1.default.string().email(),
    image: zod_1.default.string().nullable(),
    status: zod_1.default
        .enum(["registered", "portalActivated", "portalDeactivated", "rejected"])
        .nullable(),
    role: zod_1.default.enum(["student", "teacher", "admin"]),
});
exports.updateStudentDetailsSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email(),
    phoneNumber: zod_1.default.string().optional(),
    gender: zod_1.default.enum(["male", "female", "other"]),
    image: zod_1.default.string().nullable().optional(),
    dob: zod_1.default.string().optional(),
    address: zod_1.default.string().optional(),
    city: zod_1.default.string().optional(),
    district: zod_1.default.string().optional(),
    pincode: zod_1.default.string().optional(),
    country: zod_1.default.string().optional(),
    about: zod_1.default.string().optional(),
    educationInstitute: zod_1.default.string().optional(),
    qualification: zod_1.default.string().optional(),
});
exports.registerTeacherSchema = zod_1.default.object({
    uid: zod_1.default.string().min(1),
    name: zod_1.default.string().min(1),
    email: zod_1.default.string().email(),
    image: zod_1.default.string(),
    bio: zod_1.default.string(),
    noOfYearsExperience: zod_1.default.number().int().min(0),
    expertise: zod_1.default.string(),
    dob: zod_1.default.string(),
    gender: zod_1.default.enum(["male", "female", "other"]),
});
exports.uploadLegalAgreementSchema = zod_1.default.object({
    agreementURL: zod_1.default.string(),
});
