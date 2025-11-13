// openapi.ts
import { generateOpenApi } from "@ts-rest/open-api";
import { contract } from "../contract";

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Cornor Academy API",
    version: "1.0.0",
    description: "Complete API documentation for Cornor Academy Course Management System including Course Management, Course Media, and Course Announcements APIs",
  },
  baseUrl: "http://localhost:4000",
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
    {
      url: "https://api.cornoracademy.com",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "Course Management",
      description: "APIs for managing courses - create, read, update, delete, search, and filter courses",
    },
    {
      name: "Course Media",
      description: "APIs for managing course media files - upload, retrieve, update, and delete media",
    },
    {
      name: "Course Announcements",
      description: "APIs for managing course announcements - create, read, update, and delete announcements",
    },
    {
      name: "Students",
      description: "Student management APIs",
    },
    {
      name: "Teachers",
      description: "Teacher management APIs",
    },
    {
      name: "Enrollments",
      description: "Course enrollment management APIs",
    },
    {
      name: "Authentication",
      description: "User authentication and authorization APIs",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT Bearer token",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          error: {
            type: "string",
            example: "Error message",
          },
        },
      },
      Success: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "Operation completed successfully",
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
});
