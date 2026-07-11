import { Course, CourseCategory, CourseCurriculumItem } from "@/types";

const API_BASE_URL = "http://localhost:4000";

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

export interface CreateEnrolledCourseRequest {
  courseId: string;
  studentId: string;
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: Date;
  course: Course;
}

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

  async createCourse(
    courseData: CreateCourseRequest
  ): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>("/course", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  }

  async getAllCourses(): Promise<Course[]> {
    return this.request<Course[]>("/course");
  }

  async getCourseById(id: string): Promise<Course> {
    return this.request<Course>(`/course/${id}`);
  }

  async updateCourse(
    id: string,
    courseData: UpdateCourseRequest
  ): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/course/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id: string): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/course/${id}`, {
      method: "DELETE",
    });
  }

  async getCoursesByCategory(category: CourseCategory): Promise<Course[]> {
    return this.request<Course[]>(`/course/category/${category}`);
  }

  async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return this.request<Course[]>(`/course/teacher/${teacherId}`);
  }

  async getCoursesByStatus(
    status: "upcoming" | "active" | "completed"
  ): Promise<Course[]> {
    return this.request<Course[]>(`/course/status/${status}`);
  }

  async updateCourseStatus(
    id: string,
    status: UpdateCourseStatusRequest
  ): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/course/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify(status),
    });
  }

  async searchCourses(query: string): Promise<Course[]> {
    return this.request<Course[]>(
      `/course/search/${encodeURIComponent(query)}`
    );
  }
}

export const courseApi = new CourseApiService();

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

  async createEnrolledCourse(
    enrollmentData: CreateEnrolledCourseRequest
  ): Promise<ApiResponse<EnrolledCourse>> {
    return this.request<ApiResponse<EnrolledCourse>>("/enrolled", {
      method: "POST",
      body: JSON.stringify(enrollmentData),
    });
  }

  async getAllEnrolledCoursesById(
    studentId: string
  ): Promise<EnrolledCourse[]> {
    return this.request<EnrolledCourse[]>(`/enrolled/${studentId}`);
  }
}

export const enrolledCourseApi = new EnrolledCourseApiService();

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

  async createCourseMedia(
    mediaData: CreateCourseMediaRequest
  ): Promise<ApiResponse<CourseMedia>> {
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

  async updateCourseMedia(
    mediaId: string,
    mediaData: UpdateCourseMediaRequest
  ): Promise<ApiResponse<CourseMedia>> {
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
