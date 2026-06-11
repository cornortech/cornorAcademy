"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollementRequestRouter = void 0;
const express_1 = require("@ts-rest/express");
const enrollement_contract_1 = require("../../contract/enrollement/enrollement.contract");
const enrollement_mutation_1 = require("./enrollement.mutation");
const enrollement_query_1 = require("./enrollement.query");
const s = (0, express_1.initServer)();
exports.enrollementRequestRouter = s.router(enrollement_contract_1.enrollementRequestContract, {
    createEnrollementRequestForStudent: enrollement_mutation_1.enrolledCourseMutationHandlers.createEnrollementRequestForStudent,
    updateEnrollementRequestForAdmin: enrollement_mutation_1.enrolledCourseMutationHandlers.updateEnrollementRequestForAdmin,
    getAllEnrollementRequest: enrollement_query_1.enrolledCourseQueryHandlers.getAllEnrollementRequest,
});
