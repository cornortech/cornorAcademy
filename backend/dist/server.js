"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./libs/db");
const PORT = process.env.PORT || 4000;
async function startServer() {
    // Start server first for Swagger documentation access
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📚 Swagger Documentation: http://localhost:${PORT}/api-docs`);
        console.log(`📊 API Information: http://localhost:${PORT}/`);
    });
    // Try database connection (non-blocking)
    try {
        await (0, db_1.connectToDatabase)();
        console.log(`✅ Database connected successfully`);
    }
    catch (err) {
        console.error("⚠️ Database connection failed:", err);
        console.log("📝 Note: Server is still running for API documentation and testing");
        console.log("🔧 APIs will return database errors until DB is connected");
    }
}
startServer();
