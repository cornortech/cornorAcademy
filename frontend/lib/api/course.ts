import { Course, CourseCategory, CourseCurriculumItem } from "@/types";

const API_BASE_URL = "http://localhost:3001";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

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

// Enrolled Course Interfaces
export interface CreateEnrolledCourseRequest {
  courseId: string;
  studentId: string;
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: Date;
  course: Course; // Assuming Course type is available
}

// Course Media Interfaces
export interface CreateCourseMediaRequest {
  courseId: string;
  title: string;
  description: string;
  url: string;
  type: "video" | "pdf" | "image" | "other";
}

export interface UpdateCourseMediaRequest
  extends Partial<CreateCourseMediaRequest> {}

export interface CourseMedia {
  id: string;
  courseId: string;
  title: string;
  description: string;
  url: string;
  type: "video" | "pdf" | "image" | "other";
  uploadedAt: Date;
}

// Announcement Interfaces
export interface CreateAnnouncementRequest {
  title: string;
  content: string;
}

export interface UpdateAnnouncementRequest
  extends Partial<CreateAnnouncementRequest> {}

export interface Announcement {
  id: string;
  courseId: string;
  teacherId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

class CourseApiService {
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

  // 📝 Create New Course
  async createCourse(
    courseData: CreateCourseRequest
  ): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>("/course", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  }

  // 📚 Get All Courses
  async getAllCourses(): Promise<Course[]> {
    return this.request<Course[]>("/course");
  }

  // 🔍 Get Course By ID
  async getCourseById(id: string): Promise<Course> {
    return this.request<Course>(`/course/${id}`);
  }

  // ✏️ Update Course
  async updateCourse(
    id: string,
    courseData: UpdateCourseRequest
  ): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/course/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    });
  }

  // 🗑️ Delete Course
  async deleteCourse(id: string): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/course/${id}`, {
      method: "DELETE",
    });
  }

  // 🏷️ Get Courses by Category
  async getCoursesByCategory(category: CourseCategory): Promise<Course[]> {
    return this.request<Course[]>(`/course/category/${category}`);
  }

  // 👨‍🏫 Get Courses by Teacher
  async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return this.request<Course[]>(`/course/teacher/${teacherId}`);
  }

  // 📊 Get Courses by Status
  async getCoursesByStatus(
    status: "upcoming" | "active" | "completed"
  ): Promise<Course[]> {
    return this.request<Course[]>(`/course/status/${status}`);
  }

  // 🔄 Update Course Status
  async updateCourseStatus(
    id: string,
    status: UpdateCourseStatusRequest
  ): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/course/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify(status),
    });
  }

  // 🔍 Search Courses
  async searchCourses(query: string): Promise<Course[]> {
    return this.request<Course[]>(
      `/course/search/${encodeURIComponent(query)}`
    );
  }
}

export const courseApi = new CourseApiService();

// Enrolled Course API Service
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

  // Create enrollment in a course by a student
  async createEnrolledCourse(
    enrollmentData: CreateEnrolledCourseRequest
  ): Promise<ApiResponse<EnrolledCourse>> {
    return this.request<ApiResponse<EnrolledCourse>>("/enrolled", {
      method: "POST",
      body: JSON.stringify(enrollmentData),
    });
  }

  // Get all enrolled courses of student by student id
  async getAllEnrolledCoursesById(
    studentId: string
  ): Promise<EnrolledCourse[]> {
    return this.request<EnrolledCourse[]>(`/enrolled/${studentId}`);
  }
}

export const enrolledCourseApi = new EnrolledCourseApiService();

// Course Media API Service
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

  // 📎 Upload Course Media
  async createCourseMedia(
    mediaData: CreateCourseMediaRequest
  ): Promise<ApiResponse<CourseMedia>> {
    return this.request<ApiResponse<CourseMedia>>("/course-media", {
      method: "POST",
      body: JSON.stringify(mediaData),
    });
  }

  // 📁 Get All Course Media
  async getAllCourseMediaByCourseId(courseId: string): Promise<CourseMedia[]> {
    return this.request<CourseMedia[]>(`/course-media/${courseId}`);
  }

  // 📄 Get Specific Media
  async getCourseMediaById(mediaId: string): Promise<CourseMedia> {
    return this.request<CourseMedia>(`/course-media/${mediaId}`);
  }

  // ✏️ Update Course Media
  async updateCourseMedia(
    mediaId: string,
    mediaData: UpdateCourseMediaRequest
  ): Promise<ApiResponse<CourseMedia>> {
    return this.request<ApiResponse<CourseMedia>>(`/course-media/${mediaId}`, {
      method: "PUT",
      body: JSON.stringify(mediaData),
    });
  }

  // 🗑️ Delete Course Media
  async deleteCourseMedia(mediaId: string): Promise<ApiResponse<CourseMedia>> {
    return this.request<ApiResponse<CourseMedia>>(`/course-media/${mediaId}`, {
      method: "DELETE",
    });
  }
}

export const courseMediaApi = new CourseMediaApiService();

// Announcement API Service
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

  // 📢 Create Course Announcement
  async createCourseAnnouncement(
    teacherId: string,
    courseId: string,
    announcementData: CreateAnnouncementRequest
  ): Promise<ApiResponse<Announcement>> {
    return this.request<ApiResponse<Announcement>>(
      `/${teacherId}/courses/${courseId}/announcement`,
      {
        method: "POST",
        body: JSON.stringify(announcementData),
      }
    );
  }

  // 📰 Get Course Announcements
  async getAllCourseAnnouncementById(
    courseId: string
  ): Promise<Announcement[]> {
    return this.request<Announcement[]>(`/course/${courseId}/announcement`);
  }

  // ✏️ Update Course Announcement
  async updateCourseAnnouncement(
    announcementId: string,
    announcementData: UpdateAnnouncementRequest
  ): Promise<ApiResponse<Announcement>> {
    return this.request<ApiResponse<Announcement>>(
      `/course/${announcementId}`,
      {
        method: "PUT",
        body: JSON.stringify(announcementData),
      }
    );
  }

  // 🗑️ Delete Course Announcement
  async deleteCourseAnnouncement(
    announcementId: string
  ): Promise<ApiResponse<Announcement>> {
    return this.request<ApiResponse<Announcement>>(
      `/course/${announcementId}`,
      {
        method: "DELETE",
      }
    );
  }
}

export const announcementApi = new AnnouncementApiService();
