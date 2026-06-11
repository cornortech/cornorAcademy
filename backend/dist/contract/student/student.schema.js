"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentSchema = exports.deleteStudentParamsSchema = exports.updateStudentSchema = exports.updateStudentParamsSchema = exports.getStudentByIdResponseSchema = exports.getStudentByIdSchema = exports.getAllStudentsResponseSchema = exports.createStudentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createStudentSchema = zod_1.default.object({
    uid: zod_1.default.string().min(1), // Firebase UID
    name: zod_1.default.string().min(2, "Name is required"),
    email: zod_1.default.string().email("Email is required"),
    phoneNumber: zod_1.default.string().min(10, "Phone number is required"),
    gender: zod_1.default.enum(['male', 'female', 'other']),
    image: zod_1.default.string(),
    dob: zod_1.default.string(),
    address: zod_1.default.string().min(5, "Address is required"),
    city: zod_1.default.string().min(2, "City is required"),
    district: zod_1.default.string().min(3, "District is required"),
    pincode: zod_1.default.string().min(5, "Pincode is required"),
    country: zod_1.default.string().min(2, "Country is required"),
    about: zod_1.default.string().min(10, "About or bio is required"),
    educationInstitute: zod_1.default.string().min(2, "Education institute is required"),
    qualification: zod_1.default.string().min(2, "Qualification is required"),
});
exports.getAllStudentsResponseSchema = zod_1.default.array(zod_1.default.object({
    id: zod_1.default.string(),
    uid: zod_1.default.string(), // Firebase UID
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phoneNumber: zod_1.default.string(),
    gender: zod_1.default.enum(['male', 'female', 'other']),
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
    status: zod_1.default.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
}));
exports.getStudentByIdSchema = zod_1.default.object({
    studentId: zod_1.default.string(),
});
exports.getStudentByIdResponseSchema = zod_1.default.object({
    id: zod_1.default.string(),
    uid: zod_1.default.string(), // Firebase UID
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phoneNumber: zod_1.default.string(),
    gender: zod_1.default.enum(['male', 'female', 'other']),
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
    status: zod_1.default.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
});
exports.updateStudentParamsSchema = zod_1.default.object({
    studentId: zod_1.default.string(),
});
exports.updateStudentSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().optional(),
    phoneNumber: zod_1.default.string().optional(),
    gender: zod_1.default.enum(['male', 'female', 'other']).optional(),
    image: zod_1.default.string().optional(),
    dob: zod_1.default.string().optional(),
    address: zod_1.default.string().optional(),
    city: zod_1.default.string().optional(),
    district: zod_1.default.string().optional(),
    pincode: zod_1.default.string().optional(),
    country: zod_1.default.string().optional(),
    about: zod_1.default.string().optional(),
    educationInstitute: zod_1.default.string().optional(),
    qualification: zod_1.default.string().optional(),
    status: zod_1.default.enum(['registered', 'portalActivated', 'portalDeactivated', 'rejected']).optional(),
});
exports.deleteStudentParamsSchema = zod_1.default.object({
    studentId: zod_1.default.string(),
});
exports.deleteStudentSchema = zod_1.default.object({});
