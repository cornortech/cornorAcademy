export type UserRole = "student" | "teacher" | "admin";
export type UserStatus =
  | "registered"
  | "rejected"
  | "portalActivated"
  | "portalDeactivated";
export type Gender = "male" | "female" | "other";

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole | "";
  phoneNumber: string;
  gender: Gender | "";
  image: File | null;
  dob: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
  country: string;
  about: string;
  educationInstitute: string;
  qualification: string;
  agreeToTerms: boolean;
}

export interface LoginResponse {
  uid: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  redirectionUrl?: string;
}

export interface BaseUser {
  id: string;
  uid: string;
  name: string;
  email: string;
  avatar?: string;
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