import { CreateAnnouncementRequest, UpdateAnnouncementRequest, Announcement, ApiResponse } from "../types/announcement";

const API_BASE_URL = "http://localhost:3001";

class AnnouncementApiService {
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

  async createCourseAnnouncement(teacherId: string, courseId: string, announcementData: CreateAnnouncementRequest): Promise<ApiResponse<Announcement>> {
    return this.request<ApiResponse<Announcement>>(`/${teacherId}/courses/${courseId}/announcement`, {
      method: "POST",
      body: JSON.stringify(announcementData),
    });
  }

  async getAllCourseAnnouncementById(courseId: string): Promise<Announcement[]> {
    return this.request<Announcement[]>(`/course/${courseId}/announcement`);
  }

  async updateCourseAnnouncement(announcementId: string, announcementData: UpdateAnnouncementRequest): Promise<ApiResponse<Announcement>> {
    return this.request<ApiResponse<Announcement>>(`/course/${announcementId}`, {
      method: "PUT",
      body: JSON.stringify(announcementData),
    });
  }

  async deleteCourseAnnouncement(announcementId: string): Promise<ApiResponse<Announcement>> {
    return this.request<ApiResponse<Announcement>>(`/course/${announcementId}`, {
      method: "DELETE",
    });
  }
}

export const announcementApi = new AnnouncementApiService();
