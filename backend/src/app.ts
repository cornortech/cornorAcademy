import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { createExpressEndpoints } from "@ts-rest/express";
import { contract } from "./contract";
import { router } from "./modules";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./libs/swagger";
import cors from "cors";
import paymentRouter from "./routes/payment";
import khaltiRouter from "./routes/khalti";
import teacherRouter from "./routes/teacher";
import lessonRouter from "./routes/lesson";
import progressRouter from "./routes/progress";
import certificateRouter from "./routes/certificate";
import authRouter from "./routes/auth";
import enrollmentRouter from "./routes/enrollment";
import settingsRouter from "./routes/settings";
import mediaRouter from "./routes/media";

const app = express();

const WHITE_LISTED_ORIGINS = process.env.WHITE_LISTED_ORIGINS?.split(",") || [];

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument, swaggerOptions));

app.use("/payment", paymentRouter);
app.use("/payment", khaltiRouter);
app.use("/api", teacherRouter);
app.use("/api", lessonRouter);
app.use("/api", progressRouter);
app.use("/api", certificateRouter);
app.use("/api", mediaRouter);
app.use("/settings", settingsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Cornor Academy Course Management API",
    version: "1.0.0",
    documentation: `${req.protocol}://${req.get('host')}/api-docs`,
    endpoints: { courses: "/course", media: "/course-media", announcements: "/course/{courseId}/announcement" },
    status: "Online"
  });
});

createExpressEndpoints(contract, router, app);

app.use("/auth", authRouter);
app.use(enrollmentRouter);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ success: false, error: "Invalid JSON" });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ success: false, error: "Internal server error" });
});

export default app;
