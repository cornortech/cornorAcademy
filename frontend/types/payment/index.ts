export interface StudentPayment {
  id: number;
  studentName: string;
  studentEmail: string;
  amount: number;
  status: "completed" | "partial" | "pending";
  paymentMethod: string;
  date: string;
  transactionId: string;
  avatar: string;
}