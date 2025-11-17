import axiosInstance from "./axios";
import { SignupFormData } from "@/types";

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

export interface UserProfile {
  id: string; //DB ID
  userId: string; //Firebase UID
  uid: string;
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

  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await axiosInstance.get<UserProfile>("/auth/me");
      return response.data;
    } catch (error: any) {
      console.error("Get profile error:", error.response?.data || error);
      throw error;
    }
  }

  async updateStudentProfile(
    payload: UpdateStudentPayload
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.put("/update", payload);
      return response.data;
    } catch (error: any) {
      console.error("Update profile error:", error.response?.data || error);
      throw error;
    }
  }
}

export const authService = new AuthService();
