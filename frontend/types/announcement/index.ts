export type AnnouncementType =
  | "important"
  | "update"
  | "maintenance"
  | "event"
  | "general"
  | "assignment"
  | "schedule";

export interface Announcement {
  id: number;
  title: string;
  message: string;
  time: string;
  type: AnnouncementType;
  date: string;
  course?: string;
  courseId?: string;
  courseName?: string;
  recipients?: number;
}

export interface CourseAnnouncementItem {
  id: string;
  courseId: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseAnnouncementInput {
  title: string;
  message: string;
}

export interface UpdateCourseAnnouncementInput {
  title?: string;
  message?: string;
}