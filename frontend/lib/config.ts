export const APP_NAME = "Cornor Academy";

export const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
} as const;

export const COURSE_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export const DEMO_CREDENTIALS = {
  student: {
    email: "student@demo.com",
    password: "password",
  },
  teacher: {
    email: "teacher@demo.com",
    password: "password",
  },
  admin: {
    email: "admin@demo.com",
    password: "password",
  },
};
