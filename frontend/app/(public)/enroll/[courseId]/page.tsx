import { CourseSummary } from "@/components/features/enrollment/CourseSummary";
import { PaymentForm } from "@/components/features/enrollment/PaymentForm";
import PublicHeader from "@/components/shared/public-header";
import { getCourseById } from "@/lib/data";
import { notFound } from "next/navigation";

interface EnrollmentPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function EnrollmentPage({ params }: EnrollmentPageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) notFound();

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
              Secure your spot in "{course.title}"
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CourseSummary course={course} />
            <PaymentForm course={course} />
          </div>
        </div>
      </main>
    </div>
  );
}
