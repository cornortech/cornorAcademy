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



const app = express();

const WHITE_LISTED_ORIGINS = process.env.WHITE_LISTED_ORIGINS?.split(",") || [];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: WHITE_LISTED_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Swagger UI Configuration
const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 50px 0 }
    .swagger-ui .info .title { color: #1f2937; font-size: 2.5rem; }
  `,
  customSiteTitle: "Cornor Academy API Docs",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true,
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument, swaggerOptions));

// Root endpoint with API information
app.get("/", (req, res) => {
  res.json({
    message: "🎓 Cornor Academy Course Management API",
    version: "1.0.0",
    documentation: `${req.protocol}://${req.get('host')}/api-docs`,
    endpoints: {
      courses: "/course",
      media: "/course-media", 
      announcements: "/course/{courseId}/announcement"
    },
    status: "🟢 Online"
  });
});

// // your ts-rest routers
createExpressEndpoints(contract, router, app);
export default app;