"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function connectToDatabase() {
    await prisma.$connect();
    console.log("✅ Connected to Postgres");
}
;
exports.default = prisma;
