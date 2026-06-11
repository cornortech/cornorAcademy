import { generateOpenApi } from "@ts-rest/open-api";
import { contract } from "../contract";

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Cornor Academy - Course Management API",
    version: "1.0.0",
    description: `
# 🎓 Cornor Academy Course Management System

Complete API documentation for course creation, management, and media handling.

## 📋 Features
- **Course Management**: Create, read, update, delete courses
- **Media Management**: Upload and manage course materials  
- **Announcement System**: Course announcements and notifications
- **Search & Filter**: Advanced course search and filtering
- **Teacher Management**: Teacher-specific course operations

## 🔧 Base URLs
- **Public API**: \`https://xenogenetic-casimira-squarishly.ngrok-free.dev\`
- **Local Dev**: \`http://localhost:4000\`

## 📚 API Categories
- **Course APIs**: Complete course CRUD operations
- **Media APIs**: Course material management
- **Announcement APIs**: Course communication system

## 🔐 Authentication
Most write operations require JWT authentication. Include the token in the Authorization header:
\`Authorization: Bearer <your-jwt-token>\`

## 📊 Response Format
All responses follow a consistent format:
- **Success**: \`{ "success": true, "message": "..." }\`
- **Error**: \`{ "error": "Error Type", "message": "..." }\`

## 🎯 Getting Started
1. Start the backend server: \`npm run dev\`
2. Access this documentation: \`http://localhost:4000/api-docs\`
3. Test endpoints using the interactive interface below
4. Use provided schemas for frontend integration

---
*Generated on: ${new Date().toISOString().split('T')[0]}*
    `,
    contact: {
      name: "Cornor Academy Backend Team",
      email: "backend@cornoracademy.com"
    },
    license: {
      name: "MIT License",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local Development Server"
    },
    {
      url: "https://xenogenetic-casimira-squarishly.ngrok-free.dev",
      description: "Public Development Server (Ngrok Tunnel)"
    },
    {
      url: "https://api.cornoracademy.com",
      description: "Production Server"
    }
  ],
  tags: [
    {
      name: "Course Management",
      description: "Complete course CRUD operations and management"
    },
    {
      name: "Course Media",
      description: "Upload and manage course materials (videos, PDFs, etc.)"
    },
    {
      name: "Course Search",
      description: "Search and filter courses by various criteria"
    },
    {
      name: "Course Status",
      description: "Manage course status (upcoming, active, completed)"
    },
    {
      name: "Announcements",
      description: "Course announcements and notifications"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT token obtained from login endpoint"
      }
    },
    schemas: {
      Course: {
        type: "object",
        required: ["title", "description", "requirements", "includes", "language", "level", "category", "startDate", "duration", "price", "curriculum", "teacherId"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Unique course identifier"
          },
          title: {
            type: "string",
            minLength: 3,
            maxLength: 200,
            description: "Course title",
            example: "Complete Web Development Course"
          },
          description: {
            type: "string",
            minLength: 10,
            maxLength: 2000,
            description: "Detailed course description",
            example: "Learn full-stack web development from scratch with modern technologies"
          },
          requirements: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            description: "Course prerequisites",
            example: ["Basic computer knowledge", "Internet connection"]
          },
          includes: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            description: "What's included in the course",
            example: ["Video tutorials", "Source code", "Certificate"]
          },
          whatYouWillLearn: {
            type: "array",
            items: { type: "string" },
            description: "Learning outcomes",
            example: ["HTML5 & CSS3", "JavaScript ES6+", "React.js"]
          },
          meetingUrl: {
            type: "string",
            format: "uri",
            description: "Live class meeting URL",
            example: "https://zoom.us/j/1234567890"
          },
          meetingTime: {
            type: "string",
            format: "date-time",
            description: "Scheduled meeting time",
            example: "2025-12-01T10:00:00Z"
          },
          language: {
            type: "string",
            enum: ["nepali", "english"],
            description: "Course language"
          },
          level: {
            type: "string",
            enum: ["beginner", "intermediate", "advanced"],
            description: "Course difficulty level"
          },
          thumbnail: {
            type: "string",
            format: "uri",
            description: "Course thumbnail image URL",
            example: "https://example.com/course-thumbnail.jpg"
          },
          category: {
            type: "string",
            enum: ["WebDevelopment", "ui", "DataScience", "DigitalMarketing"],
            description: "Course category"
          },
          startDate: {
            type: "string",
            format: "date-time",
            description: "Course start date",
            example: "2025-12-15T00:00:00Z"
          },
          duration: {
            type: "number",
            minimum: 1,
            description: "Course duration in minutes",
            example: 120
          },
          price: {
            type: "number",
            minimum: 1,
            description: "Course price in NPR",
            example: 15000
          },
          curriculum: {
            type: "array",
            items: { "$ref": "#/components/schemas/Curriculum" },
            description: "Course curriculum modules"
          },
          teacherId: {
            type: "string",
            format: "uuid",
            description: "ID of the course teacher"
          },
          teacher: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string", example: "John Doe" }
            }
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Course creation timestamp"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Last update timestamp"
          }
        }
      },
      Curriculum: {
        type: "object",
        required: ["title", "noOfLesson", "duration", "content"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Curriculum module ID"
          },
          title: {
            type: "string",
            minLength: 2,
            description: "Module title",
            example: "Introduction to Web Development"
          },
          noOfLesson: {
            type: "number",
            minimum: 1,
            description: "Number of lessons in this module",
            example: 5
          },
          duration: {
            type: "number",
            minimum: 1,
            description: "Module duration in minutes",
            example: 300
          },
          content: {
            type: "array",
            items: { type: "string" },
            description: "List of lesson topics",
            example: ["HTML basics", "CSS styling", "JavaScript fundamentals"]
          }
        }
      },
      CourseMedia: {
        type: "object",
        required: ["courseId", "title", "description", "pathURL", "type"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Media file ID"
          },
          courseId: {
            type: "string",
            format: "uuid",
            description: "Associated course ID"
          },
          title: {
            type: "string",
            minLength: 3,
            description: "Media file title",
            example: "Introduction Video"
          },
          description: {
            type: "string",
            minLength: 3,
            maxLength: 500,
            description: "Media description",
            example: "Course introduction and overview"
          },
          duration: {
            type: "number",
            minimum: 0,
            description: "Media duration in seconds",
            example: 1200
          },
          pathURL: {
            type: "string",
            format: "uri",
            description: "File URL",
            example: "https://example.com/videos/intro.mp4"
          },
          type: {
            type: "string",
            enum: ["pdf", "video", "img", "code", "docx", "xlsx", "txt", "jpg", "png", "mp3", "mp4", "zip", "exe", "other"],
            description: "File type"
          },
          createdAt: {
            type: "string",
            format: "date-time"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },
      SuccessResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true
          },
          message: {
            type: "string",
            example: "Operation completed successfully"
          }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Validation failed"
          },
          message: {
            type: "string",
            example: "Course title is required"
          }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
});
