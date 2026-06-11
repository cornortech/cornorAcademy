"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContract = void 0;
const core_1 = require("@ts-rest/core");
const auth_schema_1 = require("./auth.schema");
const common_schema_1 = require("../common.schema");
const c = (0, core_1.initContract)();
exports.authContract = c.router({
    getProfile: {
        method: "GET",
        path: "/auth/me",
        summary: "Get user profile",
        responses: {
            200: auth_schema_1.getProfileSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    uploadLegalAgreement: {
        method: "POST",
        path: "/legal-agreement",
        body: auth_schema_1.uploadLegalAgreementSchema,
        summary: "Create student legal agreement",
        responses: {
            201: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
    updateStudentDetails: {
        method: "PUT",
        path: "/update",
        body: auth_schema_1.updateStudentDetailsSchema,
        summary: "Update student profile details (self)",
        responses: {
            200: common_schema_1.successSchema,
            400: common_schema_1.errorSchema,
            404: common_schema_1.errorSchema,
            500: common_schema_1.errorSchema,
        },
    },
});
