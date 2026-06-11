"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherContract = void 0;
const core_1 = require("@ts-rest/core");
const common_schema_1 = require("../common.schema");
const teacher_schema_1 = require("./teacher.schema");
const c = (0, core_1.initContract)();
exports.teacherContract = c.router({
    getAllTeachers: {
        method: "GET",
        path: "/teacher",
        summary: "Get all teachers profile from the available lists",
        responses: {
            200: teacher_schema_1.getAllTeachersResponseSchema,
            500: common_schema_1.errorSchema,
        },
    },
    getTeacherById: {
        method: "GET",
        path: "/teacher/:teacherId",
        pathParams: teacher_schema_1.getTeacherByIdSchema,
        summary: "Get teacher profile taken from id",
        responses: {
            200: teacher_schema_1.getTeacherByIdResponseSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    createTeacher: {
        method: "POST",
        path: "/teacher",
        body: teacher_schema_1.createTeacherSchema,
        summary: "Create new teacher profile",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateTeacher: {
        method: "PUT",
        path: "/teacher/:teacherId",
        pathParams: teacher_schema_1.updateTeacherParamsSchema,
        body: teacher_schema_1.updateTeacherSchema,
        summary: "Update teacher profile by id",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    deleteTeacher: {
        method: "DELETE",
        path: "/teacher/:teacherId",
        pathParams: teacher_schema_1.deleteTeacherParamsSchema,
        body: teacher_schema_1.deleteTeacherSchema,
        summary: "Delete teacher profile by id",
        responses: {
            200: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
