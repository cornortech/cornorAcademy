"use client";

import { Button } from "@/components/ui/button";

import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CourseSummary from "@/components/enrollments/CourseSummary";
import PaymentForm from "@/components/enrollments/PaymentForm";

export default function EnrollmentPage() {
  const params = useParams<{ courseId: string }>();

  // Mock course data - in real app, fetch based on courseId
  const course = {
    id: params.courseId,
    title: "Web Development Fundamentals",
    instructor: "Dr. Sarah Johnson",
    price: 299,
    originalPrice: 399,
    duration: "12 weeks",
    students: 1247,
    rating: 4.8,
    reviews: 324,
    image: "/web-development-course.png",
    features: [
      "24/7 Access to Course Materials",
      "Live Weekly Sessions",
      "1-on-1 Mentorship",
      "Project-Based Learning",
      "Certificate of Completion",
      "Lifetime Access",
      "Community Support",
      "Mobile App Access",
    ],
    curriculum: [
      "HTML & CSS Fundamentals",
      "JavaScript Essentials",
      "Responsive Design",
      "Version Control with Git",
      "Frontend Frameworks",
      "Backend Basics",
      "Database Integration",
      "Deployment & Hosting",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Corner Academy</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">
              Complete Your Enrollment
            </h1>
            <p className="text-muted-foreground">
              Secure your spot in this popular course
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Summary */}
            <CourseSummary params={{ courseId: course.id }} />

            {/* Payment Form */}
            <PaymentForm params={{ courseId: course.id }} />
          </div>
        </div>
      </div>
    </div>
  );
}
