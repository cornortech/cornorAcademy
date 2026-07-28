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
  | "upcoming"
  | "portalActivated";
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
  enrolledCourses: string[];
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
  isApproved?: boolean;
  totalStudents?: number;
  totalVideos?: number;
  activeCourses?: string[];
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
  duration: number;
  content: string[];
}

export interface TeacherInfo {
  id: string;
  name: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  videoUrl: string;
  order: number;
  duration: number;
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
  isOngoing: boolean;
  status: CourseStatus;
  curriculum: CourseCurriculumItem[];
  lessons?: CourseLesson[];
  teacher: TeacherInfo | null;
  enrolledStudentsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

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
  status: "active" | "completed" | "portalActivated";
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
  duration?: string;
  size?: string;
  pages?: number;
  completed: boolean;
  url: string;
  description: string;
  transcript?: string;
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
  status: "active" | "completed" | "draft" | "portalActivated";
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

export type AnnouncementTarget =
  | "EVERYONE"
  | "ALL_STUDENTS"
  | "ALL_TEACHERS"
  | "SPECIFIC_COURSE"
  | "INDIVIDUAL_USER"
  | "COURSE_STUDENTS";

export interface AnnouncementAttachment {
  name: string;
  url: string;
  type: string;
  size?: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  attachments: AnnouncementAttachment[] | null;
  externalLinks: string[];
  isPinned: boolean;
  publishDate: string;
  expiryDate: string | null;
  createdById: string;
  creatorRole: string;
  target: AnnouncementTarget;
  courseId: string | null;
  courseName: string | null;
  targetUserId: string | null;
  createdAt: string;
  updatedAt: string;
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

export interface EnrolledCourseItem {
  id: string;
  status: "requested" | "approved" | "rejected";
  paymentURL?: string;
  createdAt?: Date | string;
  amount?: number;
  course: {
    id: string;
    title: string;
    description: string;
    price?: number;
    thumbnail?: string;
    teacher: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
  };
  student: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateEnrolledCourseInput {
  studentId: string;
  courseId: string;
}

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

export interface CreateAnnouncementInput {
  title: string;
  message: string;
  attachments?: AnnouncementAttachment[];
  externalLinks?: string[];
  isPinned?: boolean;
  publishDate?: string;
  expiryDate?: string;
  target?: AnnouncementTarget;
  courseId?: string;
  targetUserId?: string;
  sendEmail?: boolean;
}

export interface UpdateAnnouncementInput {
  title?: string;
  message?: string;
  attachments?: AnnouncementAttachment[];
  externalLinks?: string[];
  isPinned?: boolean;
  publishDate?: string;
  expiryDate?: string | null;
  target?: AnnouncementTarget;
  courseId?: string | null;
  targetUserId?: string | null;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CompanyInfo {
  email: string;
  socialLinks: SocialLink[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string;
  order: number;
  duration: number;
  createdAt: Date;
}

export interface ProgressItem {
  id: string;
  lessonId: string;
  enrollmentId: string;
  completed: boolean;
  completedAt: string | null;
  lesson: { id: string; title: string; order: number };
}

export interface CourseProgress {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  lastWatchedLessonId: string | null;
  progress: ProgressItem[];
}

export interface MarkCompleteResponse {
  success: boolean;
  message: string;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  certificateUrl: string | null;
}
