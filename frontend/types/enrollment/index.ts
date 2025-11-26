export interface EnrollmentRequest {
  id: number;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseId: number;
  paymentScreenshotUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  amount: number;
}