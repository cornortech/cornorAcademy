export type CertificateStatus = 'valid' | 'invalid';

export interface Certificate {
  id: string
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  instructor: string
  completionDate: string
  issueDate: string
  grade: string
  creditsEarned: number
  status: CertificateStatus
  skills: string[]
  validUntil?: string
}

export interface CertificateVerificationResult {
  isValid: boolean
  certificate?: Certificate
  error?: string
}