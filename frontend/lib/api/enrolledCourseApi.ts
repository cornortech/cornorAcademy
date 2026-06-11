import { CreateEnrolledCourseRequest, EnrolledCourse, ApiResponse } from "../types/enrolledCourse";

const API_BASE_URL = "http://localhost:3001";

class EnrolledCourseApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async createEnrolledCourse(enrollmentData: CreateEnrolledCourseRequest): Promise<ApiResponse<EnrolledCourse>> {
    return this.request<ApiResponse<EnrolledCourse>>("/enrolled", {
      method: "POST",
      body: JSON.stringify(enrollmentData),
    });
  }

  async getAllEnrolledCoursesById(studentId: string): Promise<EnrolledCourse[]> {
    return this.request<EnrolledCourse[]>(`/enrolled/${studentId}`);
  }
}

export const enrolledCourseApi = new EnrolledCourseApiService();
