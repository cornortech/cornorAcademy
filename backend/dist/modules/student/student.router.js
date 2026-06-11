"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("@ts-rest/express");
const student_contract_1 = require("../../contract/student/student.contract");
const student_mutation_1 = require("./student.mutation");
const student_query_1 = require("./student.query");
const s = (0, express_1.initServer)();
exports.studentRouter = s.router(student_contract_1.studentContract, {
    createStudent: student_mutation_1.studentMutationHandlers.createStudent,
    updateStudent: student_mutation_1.studentMutationHandlers.updateStudent,
    getAllStudents: student_query_1.studentQueryHandlers.getAllStudents,
    getStudentById: student_query_1.studentQueryHandlers.getStudentById,
    deleteStudent: student_mutation_1.studentMutationHandlers.deleteStudent
});
