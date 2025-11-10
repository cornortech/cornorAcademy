import { Student } from "./user";

export interface courseAgreement {
  id: string;
  studentId: string;
  agreementURL: string;
  student: Student;
}
