import axiosInstance from "./axios";
import {
  Admin,
  LoginResponse,
  Student,
  Teacher,
  UserRole,
  UserStatus,
} from "@/types";

export interface RegisterStudentPayload {
  name: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female" | "other";
  image?: string;
  dob: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
  country: string;
  about?: string;
  educationInstitute: string;
  qualification: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  userId: string;
  uid: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  studentId: string;
  verificationToken?: string;
}

export interface RegisterTeacherPayload {
  uid: string;
  name: string;
  email: string;
  image?: string;
  bio: string;
  noOfYearsExperience: string;
  expertise: string;
  dob: string;
  gender: "male" | "female" | "other";
}

export interface RegisterTeacherResponse {
  success: boolean;
  message: string;
  teacherId: string;
  verificationToken?: string;
}

export interface UpdateStudentPayload extends Partial<RegisterStudentPayload> {}

class AuthService {
  async registerStudent(
    payload: RegisterStudentPayload
  ): Promise<RegisterResponse> {
    try {
      console.log("Calling backend API:", "/auth/register");
      console.log("Payload:", payload);

      const response = await axiosInstance.post<RegisterResponse>(
        "/auth/register",
        payload
      );
      console.log("Backend response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Registration API error:", error.response?.data || error);
      throw error;
    }
  }

  async registerTeacher(
    payload: RegisterTeacherPayload
  ): Promise<RegisterTeacherResponse> {
    try {
      console.log("Calling backend API:", "/auth/register/teacher");
      console.log("Payload:", payload);

      const response = await axiosInstance.post<RegisterTeacherResponse>(
        "/auth/register/teacher",
        payload
      );
      console.log("Backend response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Teacher registration API error:", error.response?.data || error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await axiosInstance.get<UserProfile>("/auth/me");
      return response.data;
    } catch (error: any) {
      console.error("Get profile error:", error.response?.data || error);
      throw error;
    }
  }

  async getUserDetails(
    role: string
  ): Promise<Student | Teacher | Admin | null> {
    try {
      const profile = await this.getUserProfile();

      if (!profile || !profile.userId) {
        throw new Error("Could not fetch user profile ID");
      }

      let endpoint = "";
      switch (role) {
        case "student":
          endpoint = `/student/${profile.userId}`;
          break;
        case "teacher":
          endpoint = `/teacher/${profile.userId}`;
          break;
        case "admin":
          endpoint = "/auth/me";
          break;
        default:
          return null;
      }

      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${role} details:`, error);
      return null;
    }
  }

  async uploadLegalAgreement(agreementURL: string) {
    const response = await axiosInstance.post("/legal-agreement", {
      agreementURL,
    });
    return response.data;
  }

  async updateStudentProfile(data: Partial<Student>) {
    const response = await axiosInstance.put("/update", data);
    return response.data;
  }

  async sendVerificationEmail(uid: string, email: string, name: string): Promise<void> {
    await axiosInstance.post("/auth/send-verification", { uid, email, name });
  }

  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    const response = await axiosInstance.post<{ success: boolean; message: string }>(
      "/auth/verify-email",
      { token }
    );
    return response.data;
  }

  async resendVerification(email: string, uid?: string): Promise<void> {
    await axiosInstance.post("/auth/resend-verification", { email, uid });
  }
}

export const authService = new AuthService();
