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
  userId: string; //DB ID
  uid: string; //Firebase UID
  email: string;
  role: "student" | "teacher" | "admin";
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  studentId: string;
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
}

export const authService = new AuthService();
