import {
  Certificate,
} from "@/types";

export interface LandingTestimonial {
  name: string;
  role: string;
  feedback: string;
  image?: string;
  rating: number;
}

export const landingTestimonials: LandingTestimonial[] = [
  {
    name: "Mikel Shahi",
    role: "Frontend Development",
    feedback:
      "Cornor Academy helped me level up my front-end skills with practical projects and a focused curriculum.",
    rating: 5,
  },
  {
    name: "Sagar Sharma",
    role: "Fullstack Development",
    feedback:
      "The full-stack training was very practical and industry-aligned. I learned both frontend and backend confidently.",
    rating: 5,
  },
  {
    name: "Avishek Goutam",
    role: "Fullstack Development",
    feedback:
      "Great mentorship and real-world support made learning fullstack development smooth and effective.",
    rating: 4,
  },
];

export const mockCertificates: Record<string, Certificate> = {
  "CA-2024-WD-001234": {
    id: "CA-2024-WD-001234",
    studentId: "1",
    studentName: "John Doe",
    courseId: "1",
    courseName: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    completionDate: "March 15, 2024",
    issueDate: "March 16, 2024",
    grade: "A+",
    creditsEarned: 12,
    status: "valid",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
  },
  "CA-2024-DS-005678": {
    id: "CA-2024-DS-005678",
    studentId: "2",
    studentName: "Jane Smith",
    courseId: "2",
    courseName: "Data Science & Analytics",
    instructor: "Dr. Michael Chen",
    completionDate: "February 28, 2024",
    issueDate: "March 1, 2024",
    grade: "A",
    creditsEarned: 16,
    status: "valid",
    skills: [
      "Python",
      "Pandas",
      "Machine Learning",
      "Data Visualization",
      "Statistics",
    ],
  },
  "CA-2023-DM-009876": {
    id: "CA-2023-DM-009876",
    studentId: "3",
    studentName: "Mike Johnson",
    courseId: "3",
    courseName: "Digital Marketing Mastery",
    instructor: "Emma Rodriguez",
    completionDate: "December 10, 2023",
    issueDate: "December 11, 2023",
    grade: "B+",
    creditsEarned: 10,
    status: "valid",
    skills: [
      "SEO",
      "Social Media Marketing",
      "Google Analytics",
      "Content Marketing",
      "PPC",
    ],
  },
};


