export interface EnrolledCourseItem {
  id: string;
  course: {
    id: string;
    title: string;
    description: string;
    teacher: {
      id: string;
      name: string;
    } | null;
    student: {
      id: string;
      name: string;
    };
    createdAt: Date;
  };
}

export interface CreateEnrolledCourseInput {
  studentId: string;
  courseId: string;
}