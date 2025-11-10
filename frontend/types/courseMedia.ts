import { Course } from "./course";

export interface courseMedia {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number;
  pathURL: string;
  size: number;
  type: Media;
  course: Course;
}

export type Media =
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
