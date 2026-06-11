import { CreateCourseMediaRequest, UpdateCourseMediaRequest, CourseMedia, ApiResponse } from "../types/courseMedia";

const API_BASE_URL = "http://localhost:3001";

class CourseMediaApiService {
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

  async createCourseMedia(mediaData: CreateCourseMediaRequest): Promise<ApiResponse<CourseMedia>> {
    return this.request<ApiResponse<CourseMedia>>("/course-media", {
      method: "POST",
      body: JSON.stringify(mediaData),
    });
  }

  async getAllCourseMediaByCourseId(courseId: string): Promise<CourseMedia[]> {
    return this.request<CourseMedia[]>(`/course-media/${courseId}`);
  }

  async getCourseMediaById(mediaId: string): Promise<CourseMedia> {
    return this.request<CourseMedia>(`/course-media/${mediaId}`);
  }

  async updateCourseMedia(mediaId: string, mediaData: UpdateCourseMediaRequest): Promise<ApiResponse<CourseMedia>> {
    return this.request<ApiResponse<CourseMedia>>(`/course-media/${mediaId}`, {
      method: "PUT",
      body: JSON.stringify(mediaData),
    });
  }

  async deleteCourseMedia(mediaId: string): Promise<ApiResponse<CourseMedia>> {
    return this.request<ApiResponse<CourseMedia>>(`/course-media/${mediaId}`, {
      method: "DELETE",
    });
  }
}

export const courseMediaApi = new CourseMediaApiService();
