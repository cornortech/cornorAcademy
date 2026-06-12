"use client"

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "@/lib/api/auth.service";
import type { Course, Student } from "@/types";
import { CourseSummary } from "@/components/features/enrollment/CourseSummary";
import { PaymentForm } from "@/components/features/enrollment/PaymentForm";
import PublicHeader from "@/components/shared/public-header";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function EnrollmentContent({ course, student }: { course: Course; student: Student }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <CourseSummary course={course} />
      <PaymentForm course={course} studentId={student.id} />
    </div>
  );
}

export default function EnrollmentPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const [courseRes, studentData] = await Promise.all([
          fetch(`${API_BASE_URL}/course/${courseId}`).then((r) => {
            if (!r.ok) throw new Error("Course not found");
            return r.json();
          }),
          authService.getUserDetails("student"),
        ]);
        setCourse(courseRes as Course);
        setStudent(studentData as Student);
      } catch (err: any) {
        setError(err.message || "Failed to load enrollment data");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [courseId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader showNav={false} showBackButton={true} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-muted-foreground">Loading enrollment details...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !course || !student) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader showNav={false} showBackButton={true} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-500">{error || "Failed to load enrollment data"}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader showNav={false} showBackButton={true} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">
              Complete Your Enrollment
            </h1>
            <p className="text-muted-foreground">
              Secure your spot in &ldquo;{course.title}&rdquo;
            </p>
          </div>
          <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading payment form...</div>}>
            <EnrollmentContent course={course} student={student} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
