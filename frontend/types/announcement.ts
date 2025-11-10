export type AnnouncementType =
  | "important"
  | "update"
  | "maintenance"
  | "event"
  | "general";

export type AnnouncementVisibility = "all" | "students" | "teachers";

export interface recentAnnouncements {
  id: number;
  title: string;
  message: string;
  visibility: AnnouncementVisibility;
  // course: string;
  courseId?: string;
  courseName?: string;
  date: string;
  time?: string;
}
