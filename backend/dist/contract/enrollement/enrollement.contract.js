"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollementRequestContract = void 0;
const core_1 = require("@ts-rest/core");
const common_schema_1 = require("../common.schema");
const enrollement_schema_1 = require("./enrollement.schema");
const c = (0, core_1.initContract)();
exports.enrollementRequestContract = c.router({
    getAllEnrollementRequest: {
        method: "GET",
        path: "/enrollement/",
        query: enrollement_schema_1.getEnrollementRequestByStatusSchema,
        summary: "Get all enrollement request of course applied by student",
        responses: {
            200: enrollement_schema_1.getAllEnrollementRequestResponseSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    createEnrollementRequestForStudent: {
        method: "POST",
        path: "/enrollement",
        body: enrollement_schema_1.createEnrollementRequestForStudentSchema,
        summary: "Create enrollment of course by student",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.successSchema,
            500: common_schema_1.successSchema,
        },
    },
    updateEnrollementRequestForAdmin: {
        method: "PUT",
        path: "/enrollement",
        body: enrollement_schema_1.updateEnrollementRequestForAdminSchema,
        summary: "Update enrollement request of course by admin",
        responses: {
            201: common_schema_1.successSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
