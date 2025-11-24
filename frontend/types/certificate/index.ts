export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  instructor: string;
  completionDate: string;
  issueDate: string;
  grade: string;
  creditsEarned: number;
  status: "valid" | "invalid";
  skills: string[];
  validUntil?: string;
}