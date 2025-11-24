export interface CourseMediaItem {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number | null;
  pathURL: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseMediaInput {
  courseId: string;
  title: string;
  description: string;
  duration?: number;
  pathURL: string;
  type:
    | "pdf"
    | "video"
    | "img"
    | "code"
    | "docx"
    | "xlsx"
    | "txt"
    | "jpg"
    | "png"
    | "mp3"
    | "mp4"
    | "zip"
    | "exe"
    | "other";
}

export interface UpdateCourseMediaInput {
  title?: string;
  description?: string;
  pathURL?: string;
}