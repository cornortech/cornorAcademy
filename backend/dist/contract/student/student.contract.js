"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentContract = void 0;
const core_1 = require("@ts-rest/core");
const student_schema_1 = require("./student.schema");
const common_schema_1 = require("../common.schema");
const c = (0, core_1.initContract)();
exports.studentContract = c.router({
    getAllStudents: {
        method: "GET",
        path: "/student",
        summary: "Get all students profile",
        responses: {
            200: student_schema_1.getAllStudentsResponseSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getStudentById: {
        method: "GET",
        path: "/student/:studentId",
        pathParams: student_schema_1.getStudentByIdSchema,
        summary: "Get student pofile by id",
        responses: {
            200: student_schema_1.getStudentByIdResponseSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    createStudent: {
        method: "POST",
        path: "/student",
        body: student_schema_1.createStudentSchema,
        summary: "Create new student profile",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema
        },
    },
    updateStudent: {
        method: "PUT",
        path: "/student/:studentId",
        pathParams: student_schema_1.updateStudentParamsSchema,
        body: student_schema_1.updateStudentSchema,
        summary: "Update student profile by id",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    deleteStudent: {
        method: "DELETE",
        path: "/student/:studentId",
        pathParams: student_schema_1.deleteStudentParamsSchema,
        body: student_schema_1.deleteStudentSchema,
        summary: "Delete student profile by id",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
