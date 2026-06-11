export interface CreateCourseRequest {
  title: string;
  description: string;
  requirements: string[];
  includes: string[];
  whatYouWillLearn: string[];
  meetingUrl: string;
  meetingTime: Date;
  language: "nepali" | "english";
  level: "beginner" | "intermediate" | "advanced";
  thumbnail: string;
  category: CourseCategory;
  startDate: Date;
  duration: number;
  price: number;
  curriculum: Omit<CourseCurriculumItem, "id">[];
  teacherId: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {}

export interface UpdateCourseStatusRequest {
  status: "upcoming" | "active" | "completed";
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export type CourseCategory =
  | "WebDevelopment"
  | "ui"
  | "DataScience"
  | "DigitalMarketing";

export type CourseLanguage = "nepali" | "english";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseCurriculumItem {
  id: string;
  title: string;
  noOfLesson: number;
  duration: number;
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
  duration: number;
  price: number;
  curriculum: CourseCurriculumItem[];
  teacher: TeacherInfo | null;
  enrolledStudentsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}
