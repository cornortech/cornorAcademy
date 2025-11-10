import { recentAnnouncements } from "./announcement";
import { CourseCurriculum } from "./courseCurriculum";
import { courseMedia } from "./courseMedia";
import { Admin, Teacher } from "./user";

export type CourseStatus = "active" | "completed" | "On progress";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseModule {
  title: string
  lessons: number
  duration: string
}

export interface Course {
  id: string;
  teacherId: string | null;
  adminId?: string;
  title: string;
  description: string;
  requirements?: string[];
  originalPrice?: number;
  students?: number;
  certificate?:boolean;
  totalLessons?: number;
  completedLessons?:number;
  progress?: number;
  includes?: string[];
  enrolled?:number;
  completion?:number;
  nextClass:string;
  whatYouWillLearn?: string[];
  meetingUrl: string;
  meetingTime?: Date;
  isOngoing?: boolean;
  language: "nepali" | "english";
  level: CourseLevel;
  thumbnail?: string;
  category?: "WebDevelopment" | "ui" | "DataScience" | "DigitalMarketing";
  status: "upcoming" | "active" | "completed";
  startTime: string;
  duration: string;
  price: number;
  modules: CourseModule[];
  features: string[];
  outcomes: string[];
  teacher: Teacher;
  admin?: Admin;
  enrolledCourses?: string[];
  courseMedia?: courseMedia;
  announcements?: recentAnnouncements[];
  courseCurriculum?: CourseCurriculum;
}

export interface CourseFormData {
  title: string;
  description: string;
  price: number;
  duration: number;
  level: CourseLevel;
  teacherId: string | null;
  startTime?: string;
}

export interface CourseFilters {
  search: string;
  status: CourseStatus | "all";
  level?: CourseLevel | "all";
  minPrice?: number;
  maxPrice?: number;
}
