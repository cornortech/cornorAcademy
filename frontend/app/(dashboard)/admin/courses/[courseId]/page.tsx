"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursePaymentStats } from "@/components/dashboard/admin/courses/detail/CoursePaymentStats";
import { PaymentTable } from "@/components/dashboard/admin/courses/detail/PaymentTable";
import { PaymentSummary } from "@/components/dashboard/admin/courses/detail/PaymentSummary";
import { mockStudentPayments } from "@/lib/data";
import { CourseDetailHeader } from "@/components/dashboard/admin/courses/detail/CourseDetailHeader";
import { PaymentSearchFilter } from "@/components/dashboard/admin/courses/detail/PaymentSearchFilter";

export default function AdminCourseDetailPage() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  const studentPayments = mockStudentPayments;

  const filteredPayments = studentPayments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const completedPayments = studentPayments.filter(
    (p) => p.status === "completed"
  ).length;
  const totalAmountReceived = studentPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = studentPayments.filter(
    (p) => p.status === "pending"
  ).length;

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
          completedPayments={completedPayments}
          pendingAmount={pendingAmount}
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

            <PaymentSearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />

            <PaymentTable payments={filteredPayments} />
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <PaymentSummary
              coursePrice={course.price}
              completedPayments={completedPayments}
              totalRevenue={totalAmountReceived}
              totalStudents={course.totalStudents}
              pendingAmount={pendingAmount}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
