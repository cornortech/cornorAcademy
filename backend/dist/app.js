"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_2 = require("@ts-rest/express");
const contract_1 = require("./contract");
const modules_1 = require("./modules");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./libs/swagger");
const cors_1 = __importDefault(require("cors"));
const payment_1 = __importDefault(require("./routes/payment"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const lesson_1 = __importDefault(require("./routes/lesson"));
const progress_1 = __importDefault(require("./routes/progress"));
const certificate_1 = __importDefault(require("./routes/certificate"));
const auth_1 = __importDefault(require("./routes/auth"));
const enrollment_1 = __importDefault(require("./routes/enrollment"));
const settings_1 = __importDefault(require("./routes/settings"));
const app = (0, express_1.default)();
const WHITE_LISTED_ORIGINS = process.env.WHITE_LISTED_ORIGINS?.split(",") || [];
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: WHITE_LISTED_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
const swaggerOptions = {
    customCss: `.swagger-ui .topbar { display: none } .swagger-ui .info { margin: 50px 0 } .swagger-ui .info .title { color: #1f2937; font-size: 2.5rem; }`,
    customSiteTitle: "Cornor Academy API Docs",
    customfavIcon: "/favicon.ico",
    swaggerOptions: { persistAuthorization: true, displayRequestDuration: true, filter: true, tryItOutEnabled: true }
};
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.openApiDocument, swaggerOptions));
app.use("/payment", payment_1.default);
app.use("/api", teacher_1.default);
app.use("/api", lesson_1.default);
app.use("/api", progress_1.default);
app.use("/api", certificate_1.default);
app.use("/settings", settings_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "Cornor Academy Course Management API",
        version: "1.0.0",
        documentation: `${req.protocol}://${req.get('host')}/api-docs`,
        endpoints: { courses: "/course", media: "/course-media", announcements: "/course/{courseId}/announcement" },
        status: "Online"
    });
});
(0, express_2.createExpressEndpoints)(contract_1.contract, modules_1.router, app);
app.use("/auth", auth_1.default);
app.use(enrollment_1.default);
app.use((err, _req, res, _next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({ success: false, error: "Invalid JSON" });
    }
    console.error("Unhandled error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
});
exports.default = app;
