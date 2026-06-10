import type { LucideIcon } from "lucide-react";

export type UserRole = "student" | "teacher" | "admin";
export type UserStatus =
  | "registered"
  | "rejected"
  | "portalActivated"
  | "portalDeactivated";
export type Gender = "male" | "female" | "other";
export type CourseStatus =
  | "active"
  | "completed"
  | "draft"
  | "in-progress"
  | "upcoming";
export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface LoginResponse {
  uid: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  redirectionUrl?: string;
  image?: string;
}

export interface BaseUser {
  id: string;
  uid: string;
  name: string;
  email: string;
  image?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  gender: Gender;
  dob: string;
}

export interface Student extends BaseUser {
  role: "student";
  phoneNumber?: string;
  address?: string;
  city?: string;
  district?: string;
  pincode?: string;
  country?: string;
  about?: string;
  educationInstitute?: string;
  qualification?: string;
  enrolledCourses: string[]; // Array of Course IDs
  completedCourses: string[];
  totalLearningHours: number;
  currentStreak: number;
}

export interface Teacher extends BaseUser {
  role: "teacher";
  title?: string;
  bio?: string;
  noOfYearsExperience?: number;
  expertise?: string;
  totalStudents?: number;
  totalVideos?: number;
  activeCourses?: string[]; // Array of Course IDs
}

export interface Admin extends BaseUser {
  role: "admin";
}

export type User = Student | Teacher | Admin;

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

export interface StudentPayment {
  id: number;
  studentName: string;
  studentEmail: string;
  amount: number;
  status: "completed" | "partial" | "pending";
  paymentMethod: string;
  date: string;
  transactionId: string;
  image: string;
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
  image: string;
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

export type AnnouncementType =
  | "important"
  | "update"
  | "maintenance"
  | "event"
  | "general"
  | "assignment"
  | "schedule";

export interface Announcement {
  id: number;
  title: string;
  message: string;
  time: string;
  type: AnnouncementType;
  date: string;
  course?: string;
  courseId?: string;
  courseName?: string;
  recipients?: number;
}

export interface EnrollmentRequest {
  id: number;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseId: number;
  paymentScreenshotUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  amount: number;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  instructor: string;
  completionDate: string;
  issueDate: string;
  grade: string;
  creditsEarned: number;
  status: "valid" | "invalid";
  skills: string[];
  validUntil?: string;
}

// Enrolled Course Types
export interface EnrolledCourseItem {
  id: string;
  course: {
    id: string;
    title: string;
    description: string;
    teacher: {
      id: string;
      name: string;
    } | null;
    student: {
      id: string;
      name: string;
    };
    createdAt: Date;
  };
}

export interface CreateEnrolledCourseInput {
  studentId: string;
  courseId: string;
}

// Course Media Types
export interface CourseMediaItem {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number | null;
  pathURL: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseMediaInput {
  courseId: string;
  title: string;
  description: string;
  duration?: number;
  pathURL: string;
  type:
    | "pdf"
    | "video"
    | "img"
    | "code"
    | "docx"
    | "xlsx"
    | "txt"
    | "jpg"
    | "png"
    | "mp3"
    | "mp4"
    | "zip"
    | "exe"
    | "other";
}

export interface UpdateCourseMediaInput {
  title?: string;
  description?: string;
  pathURL?: string;
}

// Announcement Types
export interface CourseAnnouncementItem {
  id: string;
  courseId: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseAnnouncementInput {
  title: string;
  message: string;
}

export interface UpdateCourseAnnouncementInput {
  title?: string;
  message?: string;
}

// ===== Footer Types =====
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CompanyInfo {
  email: string;
  socialLinks: SocialLink[];
}

// ===== Landing Page Types =====
export interface LandingStat {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  trend: string;
}