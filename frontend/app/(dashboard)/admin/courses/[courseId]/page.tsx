"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursePaymentStats } from "@/components/dashboard/admin/courses/detail/CoursePaymentStats";
import { PaymentTable } from "@/components/dashboard/admin/courses/detail/PaymentTable";
import { PaymentSummary } from "@/components/dashboard/admin/courses/detail/PaymentSummary";
import { CourseDetailHeader } from "@/components/dashboard/admin/courses/detail/CourseDetailHeader";

export default function AdminCourseDetailPage() {
  const params = useParams();

  const course = {
    id: params.courseId,
    title: "Web Development Fundamentals",
    instructor: "Dr. Sarah Johnson",
    price: 299,
    totalStudents: 67,
    totalRevenue: 20033,
    completionRate: 85,
    rating: 4.8,
    status: "active",
  };

  return (
    <div className="min-h-screen bg-background">
      <CourseDetailHeader
        courseTitle={course.title}
        instructorName={course.instructor}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CoursePaymentStats
          totalRevenue={course.totalRevenue}
          totalStudents={course.totalStudents}
          completedPayments={0}
          pendingAmount={0}
        />

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payments">Student Payments</TabsTrigger>
            <TabsTrigger value="summary">Payment Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <p className="text-muted-foreground">
                  Track student payments and enrollment status
                </p>
              </div>
            </div>

            <PaymentTable payments={[]} />
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <PaymentSummary
              coursePrice={course.price}
              completedPayments={0}
              totalRevenue={0}
              totalStudents={course.totalStudents}
              pendingAmount={0}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
