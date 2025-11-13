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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// // your ts-rest routers
createExpressEndpoints(contract, router, app);
export default app;