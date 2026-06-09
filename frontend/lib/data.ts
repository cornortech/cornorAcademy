import type { LucideIcon } from "lucide-react";
import { Award, BookOpen, Users, TrendingUp } from "lucide-react";
import {
  Student,
  Teacher,
  Admin,
  Course,
  Certificate,
  StudentPayment,
  EnrolledCourse,
  Announcement,
  StudentProgressRecord,
  UploadedResource,
  AdminManagedCourse,
  EnrollmentRequest,
  CourseMaterial,
  TeachingCourse,
  UpcomingClass,
} from "@/types";

export const mockCourseImages = {
  webDevelopment:
    "https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg?auto=compress&cs=tinysrgb&w=1200",
  dataScience:
    "https://images.pexels.com/photos/7947996/pexels-photo-7947996.jpeg?auto=compress&cs=tinysrgb&w=1200",
  digitalMarketing:
    "https://images.pexels.com/photos/6483592/pexels-photo-6483592.jpeg?auto=compress&cs=tinysrgb&w=1200",
  uiUx:
    "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export interface LandingTestimonial {
  name: string;
  role: string;
  feedback: string;
  image?: string;
}

export const landingTestimonials: LandingTestimonial[] = [
  {
    name: "Mikel Shahi",
    role: "Frontend Development",
    feedback:
      "Cornor Academy helped me level up my front-end skills with practical projects and a focused curriculum.",
  },
  {
    name: "Sagar Sharma",
    role: "Fullstack Development",
    feedback:
      "The full-stack training was very practical and industry-aligned. I learned both frontend and backend confidently.",
  },
  {
    name: "Avishek Goutam",
    role: "Fullstack Development",
    feedback:
      "Great mentorship and real-world support made learning fullstack development smooth and effective.",
  },
];

export const mockAdmin: Admin = {
  id: "admin01",
  uid: "uid_admin_001",
  role: "admin",
  name: "Admin User",
  email: "admin@Cornoracademy.com",
  image: "/admin-image.png",
  status: "portalActivated",
  gender: "other",
  dob: "N/A",
  createdAt: "2023-01-01",
  updatedAt: "2024-01-01",
};

export const mockStudentData: Student = {
  id: "1",
  uid: "STU001",
  role: "student",
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  status: "registered",
  enrolledCourses: ["1", "2", "4"],
  completedCourses: ["3"],
  totalLearningHours: 156,
  currentStreak: 12,
  image: "/student-image.png",
  gender: "male",

  dob: "1995-03-15",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-20",
};

export const mockTeacherData: Teacher = {
  id: "1",
  uid: "TCH001",
  role: "teacher",
  name: "Dr. Sarah Johnson",
  title: "Senior Full-Stack Developer",
  email: "sarah.johnson@Cornoracademy.com",
  bio: "Experienced full-stack developer and passionate educator with 12+ years in the tech industry.",
  status: "portalActivated",
  image: "/teacher-image.png",
  gender: "female",
  dob: "1985-07-22",
  createdAt: "2023-01-01",
  updatedAt: "2024-01-20",
};

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description:
      "Master the fundamentals of web development with HTML, CSS, JavaScript, and modern frameworks.",
    longDescription:
      "This comprehensive course covers everything you need to know to become a proficient web developer. Starting with the basics of HTML and CSS, you'll progress through JavaScript fundamentals, responsive design principles, and modern development tools. By the end of this course, you'll have built multiple projects and have the skills to create professional websites and web applications.",
    instructor: mockTeacherData,
    price: 299,
    originalPrice: 399,
    duration: "12 weeks",
    level: "beginner",
    language: "english",
    students: 2840,
    rating: 4.9,
    reviews: 1250,
    status: "portalActivated",
    certificate: true,
    thumbnail: mockCourseImages.webDevelopment,
    modules: [
      {
        title: "Introduction to Web Development",
        lessons: 8,
        duration: "2 hours",
      },
      { title: "HTML Fundamentals", lessons: 12, duration: "3 hours" },
      { title: "CSS Styling and Layout", lessons: 15, duration: "4 hours" },
      { title: "JavaScript Basics", lessons: 18, duration: "5 hours" },
      { title: "Responsive Design", lessons: 10, duration: "3 hours" },
      { title: "Modern Development Tools", lessons: 8, duration: "2 hours" },
      { title: "Final Project", lessons: 5, duration: "4 hours" },
    ],
    features: [
      "76 video lessons",
      "23 hours of content",
      "7 hands-on projects",
      "Lifetime access",
      "Certificate of completion",
      "Direct instructor support",
      "Mobile and desktop access",
      "30-day money-back guarantee",
    ],
    requirements: [
      "No prior programming experience required",
      "A computer with internet connection",
      "Willingness to learn and practice",
    ],
    outcomes: [
      "Build responsive websites from scratch",
      "Understand HTML, CSS, and JavaScript fundamentals",
      "Use modern development tools and workflows",
      "Create interportalActivated web applications",
      "Deploy projects to the web",
      "Start a career in web development",
    ],
  },
  {
    id: "2",
    title: "Data Science & Analytics",
    description:
      "Learn data science fundamentals, statistical analysis, and machine learning with Python. Work with real datasets and build predictive models.",
    longDescription:
      "Dive deep into the world of data science with this comprehensive course. You will learn Python programming, statistical analysis, data visualization, and machine learning algorithms. Through hands-on projects with real-world datasets, you will develop the skills needed to extract insights from data and build predictive models.",
    instructor: mockTeacherData,
    price: 399,
    originalPrice: 499,
    duration: "16 weeks",
    level: "intermediate",
    students: 1920,
    rating: 4.8,
    reviews: 890,
    language: "english",
    status: "portalActivated",
    certificate: true,
    modules: [
      { title: "Python for Data Science", lessons: 15, duration: "4 hours" },
      { title: "Statistical Analysis", lessons: 12, duration: "3.5 hours" },
      { title: "Data Visualization", lessons: 10, duration: "3 hours" },
      { title: "Machine Learning Basics", lessons: 18, duration: "5 hours" },
      { title: "Advanced ML Algorithms", lessons: 14, duration: "4 hours" },
      { title: "Real-world Projects", lessons: 8, duration: "6 hours" },
    ],
    features: [
      "77 video lessons",
      "25.5 hours of content",
      "5 real-world projects",
      "Jupyter notebooks included",
      "Certificate of completion",
      "Career guidance",
      "Community access",
      "30-day money-back guarantee",
    ],
    requirements: [
      "Basic programming knowledge helpful",
      "High school level mathematics",
      "Computer with Python installation capability",
    ],
    outcomes: [
      "Master Python for data analysis",
      "Perform statistical analysis on datasets",
      "Create compelling data visualizations",
      "Build machine learning models",
      "Work with real-world data problems",
      "Launch a career in data science",
    ],
    thumbnail: mockCourseImages.dataScience,
  },
  {
    id: "3",
    title: "Digital Marketing Mastery",
    description:
      "Master digital marketing strategies including SEO, social media, content marketing, and paid advertising. Grow your business or career.",
    longDescription:
      "This comprehensive digital marketing course covers all aspects of modern marketing. From SEO and content marketing to social media advertising and analytics, you will learn proven strategies to grow businesses online. Perfect for entrepreneurs, marketers, and business owners.",
    instructor: mockTeacherData,
    price: 249,
    originalPrice: 349,
    duration: "10 weeks",
    level: "beginner",
    students: 3150,
    rating: 4.9,
    reviews: 1680,
    language: "english",
    status: "completed",
    certificate: true,
    modules: [
      {
        title: "Digital Marketing Fundamentals",
        lessons: 8,
        duration: "2.5 hours",
      },
      {
        title: "Search Engine Optimization",
        lessons: 12,
        duration: "3.5 hours",
      },
      { title: "Content Marketing Strategy", lessons: 10, duration: "3 hours" },
      { title: "Social Media Marketing", lessons: 14, duration: "4 hours" },
      { title: "Paid Advertising", lessons: 11, duration: "3.5 hours" },
      {
        title: "Analytics and Optimization",
        lessons: 9,
        duration: "2.5 hours",
      },
    ],
    features: [
      "64 video lessons",
      "19 hours of content",
      "6 marketing campaigns",
      "Templates and tools included",
      "Certificate of completion",
      "Live Q&A sessions",
      "Marketing toolkit",
      "30-day money-back guarantee",
    ],
    requirements: [
      "No prior marketing experience required",
      "Basic computer skills",
      "Access to social media platforms",
    ],
    outcomes: [
      "Create effective marketing strategies",
      "Master SEO and content marketing",
      "Run successful social media campaigns",
      "Set up and optimize paid ads",
      "Analyze marketing performance",
      "Grow your business or career",
    ],
    thumbnail: mockCourseImages.digitalMarketing,
  },
];

export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: "JavaScript Functions",
    thumbnail: mockCourseImages.webDevelopment,
    status: "in-progress",
    lastAccessed: "2 hours ago",
    startTime: "2024-01-20 14:00",
    nextClassTime: "Today at 2:00 PM",
    meetingLink: "https://meet.example.com/web-dev-class",
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    instructor: "Dr. Michael Chen",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    nextLesson: "Data Visualization",
    thumbnail: mockCourseImages.dataScience,
    status: "in-progress",
    lastAccessed: "1 day ago",
    startTime: "2024-01-15 10:00",
    nextClassTime: "Tomorrow at 10:00 AM",
    meetingLink: "https://meet.example.com/data-sci-class",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    instructor: "Emma Rodriguez",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    nextLesson: "Course Completed",
    thumbnail: mockCourseImages.digitalMarketing,
    status: "completed",
    lastAccessed: "3 days ago",
    startTime: "2023-12-01 09:00",
    nextClassTime: "Course Completed",
    meetingLink: "",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    instructor: "David Kim",
    progress: 20,
    totalLessons: 28,
    completedLessons: 6,
    nextLesson: "Color Theory",
    thumbnail: mockCourseImages.uiUx,
    status: "in-progress",
    lastAccessed: "5 days ago",
    startTime: "2024-01-10 11:00",
    nextClassTime: "Jan 25 at 11:00 AM",
    meetingLink: "https://meet.example.com/ui-ux-class",
  },
];

export const mockStudentPayments: StudentPayment[] = [
  {
    id: 1,
    studentName: "John Smith",
    studentEmail: "john.smith@email.com",
    amount: 299,
    status: "completed",
    paymentMethod: "Credit Card",
    date: "2024-01-15",
    transactionId: "TXN001",
    image: "/student-image.png",
  },
  {
    id: 2,
    studentName: "Sarah Wilson",
    studentEmail: "sarah.wilson@email.com",
    amount: 224.25,
    status: "partial",
    paymentMethod: "PayPal",
    date: "2024-01-14",
    transactionId: "TXN002",
    image: "/student-image-2.png",
  },
  {
    id: 3,
    studentName: "Michael Brown",
    studentEmail: "michael.brown@email.com",
    amount: 299,
    status: "completed",
    paymentMethod: "Bank Transfer",
    date: "2024-01-10",
    transactionId: "TXN003",
    image: "/student-image-3.png",
  },
  {
    id: 4,
    studentName: "Emma Davis",
    studentEmail: "emma.davis@email.com",
    amount: 0,
    status: "pending",
    paymentMethod: "-",
    date: "-",
    transactionId: "-",
    image: "/student-image-4.png",
  },
  {
    id: 5,
    studentName: "Alex Johnson",
    studentEmail: "alex.johnson@email.com",
    amount: 299,
    status: "completed",
    paymentMethod: "Credit Card",
    date: "2024-01-08",
    transactionId: "TXN004",
    image: "/student-image-5.png",
  },
];

export const mockAdminManagedCourses: AdminManagedCourse[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    instructor: "Dr. Sarah Johnson",
    instructorId: 1,
    students: 67,
    price: 299,
    status: "portalActivated",
    created: "2023-12-01",
    completion: 85,
    rating: 4.8,
    enrolled: 67,
    startTime: "2024-01-20 14:00",
    description: "Learn web development from scratch",
  },
  // ... other managed course objects
];

export const mockEnrollmentRequests: EnrollmentRequest[] = [
  {
    id: 1,
    studentName: "John Smith",
    studentEmail: "john.smith@email.com",
    courseTitle: "Web Development Fundamentals",
    courseId: 1,
    paymentScreenshotUrl: "/generic-payment-screenshot.png",
    status: "pending",
    createdAt: "2024-01-20",
    amount: 299,
  },
  // ... other requests
];

export const mockStudentProgress: StudentProgressRecord[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    progress: 85,
    lastportalActivated: "2 hours ago",
    attendance: 92,
    assignments: "8/10",
    image: "/student-image.png",
  },
  // ... other progress records
];

export interface LandingStat {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  trend: string;
}

export const landingStats: LandingStat[] = [
  {
    icon: Users,
    label: "Active Students",
    value: "1000+",
    description: "Worldwide community of dedicated learners",
    trend: "+240% YoY",
  },
  {
    icon: Award,
    label: "Expert Teachers",
    value: "12+",
    description: "Experienced industry instructors",
    trend: "Avg. 12+ years experience",
  },
  {
    icon: BookOpen,
    label: "Courses Available",
    value: "15+",
    description: "High-quality learning paths across domains",
    trend: "New courses monthly",
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "98%",
    description: "Strong learner outcomes and completion",
    trend: "+5% from last year",
  },
];

export const mockUploadedResources: UploadedResource[] = [
  {
    id: 1,
    name: "JavaScript Fundamentals.pdf",
    type: "pdf",
    size: "2.4 MB",
    folder: "Week 1 - Introduction",
    uploadDate: "2024-01-15",
    downloads: 45,
    description: "Complete guide to JavaScript basics...",
  },
  // ... other resources
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

export const mockTeachingCourses: TeachingCourse[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    students: 67,
    totalLessons: 24,
    completedLessons: 18,
    avgProgress: 75,
    nextClass: "Today, 2:00 PM",
    status: "portalActivated",
    startTime: "2024-01-20 14:00",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    students: 45,
    totalLessons: 20,
    completedLessons: 12,
    avgProgress: 60,
    nextClass: "Tomorrow, 10:00 AM",
    status: "portalActivated",
    startTime: "2024-01-21 10:00",
  },
  {
    id: 3,
    title: "React Development Mastery",
    students: 44,
    totalLessons: 28,
    completedLessons: 28,
    avgProgress: 100,
    nextClass: "Course Completed",
    status: "completed",
    startTime: "2023-12-01 09:00",
  },
];

export const mockUpcomingClasses: UpcomingClass[] = [
  {
    id: 1,
    title: "JavaScript Functions & Scope",
    course: "Web Development Fundamentals",
    courseId: 1,
    date: "Today",
    time: "2:00 PM",
    duration: "1.5 hours",
    students: 67,
    meetingLink: "https://meet.example.com/js-functions",
  },
  {
    id: 2,
    title: "Async Programming Workshop",
    course: "Advanced JavaScript Concepts",
    courseId: 2,
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "2 hours",
    students: 45,
    meetingLink: "https://meet.example.com/async-js",
  },
];

export const mockSystemActivity = [
  {
    id: 1,
    type: "user_registration",
    description: "New student registered: John Smith",
    timestamp: "2 hours ago",
    severity: "info",
  },
  {
    id: 2,
    type: "course_completion",
    description: "Course completed: React Development Mastery by Sarah Wilson",
    timestamp: "4 hours ago",
    severity: "success",
  },
  {
    id: 3,
    type: "payment_failed",
    description: "Payment failed for Emma Davis - Data Science Fundamentals",
    timestamp: "6 hours ago",
    severity: "warning",
  },
  {
    id: 4,
    type: "teacher_added",
    description: "New teacher added: Dr. Emily Davis",
    timestamp: "1 day ago",
    severity: "info",
  },
];

export const mockRecentAnnouncements: Announcement[] = [
  {
    id: 1,
    type: "assignment",
    title: "Assignment Deadline Extended",
    course: "Web Development Fundamentals",
    courseId: "1",
    message:
      "The JavaScript project deadline has been extended to next Monday.",
    time: "2 hours ago",
    date: "2025 Nov 11",
    recipients: 67,
  },
  {
    id: 2,
    type: "update",
    title: "New Learning Resources Added",
    course: "Advanced JavaScript Concepts",
    courseId: "2",
    message: "I've added additional practice exercises for async programming.",
    time: "1 day ago",
    date: "2025 Nov 1",
    recipients: 45,
  },
];

export const mockCourseAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Assignment Posted",
    message:
      "Complete the JavaScript project by Friday. Check the resources section for guidelines.",
    time: "2 hours ago",
    type: "assignment",
    date: "2024-01-20",
    courseId: "1",
    course: "Web Development Fundamentals",
    recipients: 67,
  },
  {
    id: 2,
    title: "Live Session Tomorrow",
    message:
      "Join us tomorrow at 2 PM for a live coding session on JavaScript functions.",
    time: "1 day ago",
    type: "schedule",
    date: "2024-01-19",
    courseId: "1",
    course: "Web Development Fundamentals",
    recipients: 67,
  },
];

// These functions simulate API calls, making it easy to swap them out later.
export const getAnnouncementsForCourse = (courseId: string): Announcement[] => {
  return mockCourseAnnouncements.filter((a) => a.courseId === courseId);
};

export const getCourseById = (id: string): Course | undefined => {
  const course = mockCourses.find((course) => course.id === id);
  return course;
};

export const getStudentById = (id: string): Student | undefined => {
  // In a real app, this would be a fetch. For now, we find in the mock array.
  // Assuming a full `mockStudents` array is populated.
  return undefined;
};

export const getMaterialsForCourse = (courseId: string): CourseMaterial[] => {
  return [
    {
      id: 1,
      title: "Introduction to HTML",
      type: "video",
      duration: "15:30",
      completed: true,
      url: "/videos/html-intro.mp4",
      description: "Learn the basics of HTML.",
    },
    {
      id: 2,
      title: "CSS Styling Basics",
      type: "video",
      duration: "22:45",
      completed: true,
      url: "#",
      description: "Master CSS fundamentals.",
    },
    {
      id: 3,
      title: "HTML Reference Guide",
      type: "pdf",
      size: "2.5 MB",
      pages: 45,
      completed: false,
      url: "#",
      description: "A comprehensive reference.",
    },
  ];
};
