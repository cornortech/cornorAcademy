export interface CreateAnnouncementRequest {
  title: string;
  message: string;
}

export interface UpdateAnnouncementRequest extends Partial<CreateAnnouncementRequest> {}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
