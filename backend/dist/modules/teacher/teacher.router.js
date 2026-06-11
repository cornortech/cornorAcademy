"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
const express_1 = require("@ts-rest/express");
const teacher_contract_1 = require("../../contract/teacher/teacher.contract");
const teacher_mutation_1 = require("./teacher.mutation");
const teacher_query_1 = require("./teacher.query");
const s = (0, express_1.initServer)();
exports.teacherRouter = s.router(teacher_contract_1.teacherContract, {
    createTeacher: teacher_mutation_1.teacherMutationHandlers.createTeacher,
    getAllTeachers: teacher_query_1.teacherQueryHandlers.getAllTeachers,
    getTeacherById: teacher_query_1.teacherQueryHandlers.getTeacherById,
    updateTeacher: teacher_mutation_1.teacherMutationHandlers.updateTeacher,
    deleteTeacher: teacher_mutation_1.teacherMutationHandlers.deleteTeacher,
});
