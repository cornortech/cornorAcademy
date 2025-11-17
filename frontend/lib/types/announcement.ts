export interface CreateAnnouncementRequest {
  title: string;
  content: string;
}

export interface UpdateAnnouncementRequest extends Partial<CreateAnnouncementRequest> {}

export interface Announcement {
  id: string;
  courseId: string;
  teacherId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
