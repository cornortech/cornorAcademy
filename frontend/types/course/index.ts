import { Teacher } from '../user';

export type CourseStatus =
  | "active"
  | "completed"
  | "draft"
  | "in-progress"
  | "upcoming";
export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseMaterialType =
  | "video"
  | "pdf"
  | "code"
  | "image"
  | "audio"
  | "archive"
  | "other";

export interface CourseModule {
  title: string;
  lessons: number;
  duration: string;
}

export type CourseCategory =
  | "WebDevelopment"
  | "ui"
  | "DataScience"
  | "DigitalMarketing";
export type CourseLanguage = "nepali" | "english";

export interface CourseCurriculumItem {
  id: string;
  title: string;
  noOfLesson: number;
  duration: number; // in hours
  content: string[];
}

export interface TeacherInfo {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  includes: string[];
  whatYouWillLearn: string[];
  meetingUrl?: string;
  meetingTime?: Date;
  language: CourseLanguage;
  level: CourseLevel;
  thumbnail: string;
  category: CourseCategory;
  startDate: Date;
  duration: number; // in weeks
  price: number;
  curriculum: CourseCurriculumItem[];
  teacher: TeacherInfo | null;
  enrolledStudentsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Legacy interface for backward compatibility
export interface LegacyCourse {
  id: string | number;
  title: string;
  description: string;
  longDescription: string;
  instructor: Teacher;
  price: number;
  originalPrice: number;
  duration: string;
  level: CourseLevel;
  language: string;
  students: number;
  rating: number;
  reviews: number;
  status: CourseStatus;
  certificate: boolean;
  thumbnail: string;
  modules: CourseModule[];
  features: string[];
  requirements: string[];
  outcomes: string[];
}

export interface TeachingCourse {
  id: number;
  title: string;
  students: number;
  totalLessons: number;
  completedLessons: number;
  avgProgress: number;
  nextClass: string;
  status: "active" | "completed";
  startTime: string;
}

export interface UpcomingClass {
  id: number;
  title: string;
  course: string;
  courseId: number;
  date: string;
  time: string;
  duration: string;
  students: number;
  meetingLink: string;
}

export interface CourseMaterial {
  id: number;
  title: string;
  type: CourseMaterialType;
  duration?: string; // For videos
  size?: string; // For files
  pages?: number; // For PDFs
  completed: boolean;
  url: string;
  description: string;
  transcript?: string; // For videos
}

export interface EnrolledCourse {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  thumbnail: string;
  status: "in-progress" | "completed";
  lastAccessed: string;
  startTime: string;
  nextClassTime: string;
  meetingLink: string;
}

export interface AdminManagedCourse {
  id: number;
  title: string;
  instructor: string;
  instructorId: number;
  students: number;
  price: number;
  status: "active" | "completed" | "draft";
  created: string;
  completion: number;
  rating: number;
  enrolled: number;
  startTime: string;
  description: string;
}

export interface StudentProgressRecord {
  id: number;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  attendance: number;
  assignments: string;
  avatar: string;
}

export interface UploadedResource {
  id: number;
  name: string;
  type: CourseMaterialType;
  size: string;
  folder: string;
  uploadDate: string;
  downloads: number;
  description: string;
}