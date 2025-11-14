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
  async createCourse(courseData: CreateCourseRequest): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>("/api/course", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  }

  // 📚 Get All Courses
  async getAllCourses(): Promise<Course[]> {
    return this.request<Course[]>("/api/course");
  }

  // 🔍 Get Course By ID
  async getCourseById(id: string): Promise<Course> {
    return this.request<Course>(`/api/course/${id}`);
  }

  // ✏️ Update Course
  async updateCourse(id: string, courseData: UpdateCourseRequest): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/api/course/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    });
  }

  // 🗑️ Delete Course
  async deleteCourse(id: string): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/api/course/${id}`, {
      method: "DELETE",
    });
  }

  // 🏷️ Get Courses by Category
  async getCoursesByCategory(category: CourseCategory): Promise<Course[]> {
    return this.request<Course[]>(`/api/course/category/${category}`);
  }

  // 👨‍🏫 Get Courses by Teacher
  async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return this.request<Course[]>(`/api/course/teacher/${teacherId}`);
  }

  // 📊 Get Courses by Status
  async getCoursesByStatus(status: "upcoming" | "active" | "completed"): Promise<Course[]> {
    return this.request<Course[]>(`/api/course/status/${status}`);
  }

  // 🔄 Update Course Status
  async updateCourseStatus(id: string, status: UpdateCourseStatusRequest): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/api/course/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify(status),
    });
  }

  // 🔍 Search Courses
  async searchCourses(query: string): Promise<Course[]> {
    return this.request<Course[]>(`/api/course/search/${encodeURIComponent(query)}`);
  }
}

export const courseApi = new CourseApiService();