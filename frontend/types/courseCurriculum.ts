import { Course } from "./course";

export interface CourseCurriculum {
  id: string;
  courseId: string;
  title: string;
  noOfLesson: number;
  duration: number;
  content: string[];
  course: Course;
}
