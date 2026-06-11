"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnrollementRequestByStatusSchema = exports.getAllEnrollementRequestResponseSchema = exports.updateEnrollementRequestForAdminSchema = exports.createEnrollementRequestForStudentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createEnrollementRequestForStudentSchema = zod_1.default.object({
    studentId: zod_1.default.string().uuid(),
    courseId: zod_1.default.string().uuid(),
    paymentURL: zod_1.default.string(),
});
exports.updateEnrollementRequestForAdminSchema = zod_1.default.object({
    studentId: zod_1.default.string().uuid(),
    courseId: zod_1.default.string().uuid(),
    status: zod_1.default.enum(['requested', 'approved', 'rejected']),
    rejectionReason: zod_1.default.string().optional(),
});
exports.getAllEnrollementRequestResponseSchema = zod_1.default.array(zod_1.default.object({
    id: zod_1.default.string(),
    paymentURL: zod_1.default.string(),
    status: zod_1.default.enum(['requested', 'approved', 'rejected']),
    createdAt: zod_1.default.date(),
    course: zod_1.default.object({
        id: zod_1.default.string().uuid(),
        title: zod_1.default.string(),
        description: zod_1.default.string(),
        price: zod_1.default.number(),
        teacher: zod_1.default.object({
            id: zod_1.default.string().uuid(),
            name: zod_1.default.string(),
        }).nullable(),
        createdAt: zod_1.default.date(),
    }),
    student: zod_1.default.object({
        id: zod_1.default.string().uuid(),
        name: zod_1.default.string(),
        email: zod_1.default.string(),
    }),
}));
exports.getEnrollementRequestByStatusSchema = zod_1.default.object({
    status: zod_1.default.enum(['requested', 'approved', 'rejected']),
});
