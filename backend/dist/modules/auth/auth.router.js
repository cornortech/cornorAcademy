"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("@ts-rest/express");
const auth_contract_1 = require("../../contract/auth/auth.contract");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const auth_query_1 = require("./auth.query");
const auth_mutation_1 = require("./auth.mutation");
const s = (0, express_1.initServer)();
exports.authRouter = s.router(auth_contract_1.authContract, {
    uploadLegalAgreement: {
        middleware: [auth_middleware_1.authenticate],
        handler: auth_mutation_1.authMutationHandlers.uploadLegalAgreement,
    },
    getProfile: {
        middleware: [auth_middleware_1.authenticate],
        handler: auth_query_1.authQueryHandlers.getProfile
    },
    updateStudentDetails: {
        middleware: [auth_middleware_1.authenticate],
        handler: auth_mutation_1.authMutationHandlers.updateStudentDetails,
    },
});
