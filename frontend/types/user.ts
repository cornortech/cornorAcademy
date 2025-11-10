export type UserStatus =
  | "registered"
  | "portalActivated"
  | "portalDeactivated"
  | "rejected";

export type Gender = "male" | "female" | "other";

export type UserRole = "student" | "teacher" | "admin";

export interface BaseUser {
    id: string;
    uid?: string;
    name: string;
    email: string;
    avatar?: string;
    status?: UserStatus;
    createdAt?: string;
    updatedAt?: string;
    //   gender: "Male" | "Female" | "Other";
    //   image: string;
    //   dob: Date;
    //   address: string;
    //   city: string;
    //   district: string;
    //   pincode: string;
    //   country: string;
    //   about: string;
    //   educationInstiture: string;
    //   qualification: string;
  //   status: UserStatus;
  //   enrolledCourses: enrolledCourses;
  //   courseAgreement: courseAgreement;
}

// Student Interface
export interface Student extends BaseUser {
    role: "Student";
    phoneNumber?: string;
    gender?: Gender;
    dob?: string;
    address?: string;
    city?: string;
    district?: string;
    pincode?: string;
    country?: string;
    about?: string;
    educationInstitute?: string;
    qualification?: string;
    enrolledCourses: string[]; //Course IDs
    completedCourses: string[];
    totalLearningHours: number;
    currentStreak: number;
}

// Teacher Interface
export interface Teacher extends BaseUser {
    role: "teacher";
    title?: string;
    bio?: string;
    noOfYearsExperience?: number;
    expertise?: string;
    dob?: string;
    gender: Gender;
    status?: UserStatus;
    totalStudents?: number;
    activeCourses?: string[];
}

//Admin Interface
export interface Admin extends BaseUser {
    role: "admin";
    course: string[];
}

export type User = Student | Teacher | Admin;

// Form data types
export interface StudentFormData {
    name: string;
  email: string;
  phoneNumber?: string;
  gender?: Gender;
  dob?: string;
  address?: string;
  city?: string;
  district?: string;
  pincode?: string;
  country?: string;
  about?: string;
  educationInstitute?: string;
  qualification?: string;
}

export interface TeacherFormData {
  name: string;
  email: string;
  bio: string;
  noOfYearsExperience: number;
  expertise: string;
  dob?: string;
  gender?: Gender;
}
