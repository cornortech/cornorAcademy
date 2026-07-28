"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { StatsOverview } from "@/components/dashboard/admin/stats-overview";
import { StudentManagement } from "@/components/dashboard/admin/students/StudentManagement";
import { TeacherManagement } from "@/components/dashboard/admin/teachers/TeacherManagement";
import { CourseManagement } from "@/components/dashboard/admin/courses/CourseManagement";
import { EnrollmentRequests } from "@/components/dashboard/admin/enrollment/EnrollmentRequests";
import { AdminAnnouncementsTab } from "@/components/features/admin/announcements/AdminAnnouncementsTab";
import { SettingsPanel } from "@/components/dashboard/admin/settings/SettingsPanel";
import { AdminSidebar } from "@/components/dashboard/admin/AdminSidebar";
import { AdminCharts } from "@/components/dashboard/admin/AdminCharts";
import { useAdminDashboard } from "@/hooks/use-admin-dashboard";
import { useGetAllCourses } from "@/api/course";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const { students, teachers, enrollments, loading, error } = useAdminDashboard();
  const { data: courses = [] } = useGetAllCourses();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  const approvedEnrollments = enrollments.filter((enrollment) => enrollment.status === "approved");
  const totalRevenue = approvedEnrollments.reduce(
    (sum, enrollment) => sum + (enrollment.amount ?? enrollment.course?.price ?? 0),
    0
  );
  const now = new Date();
  const monthlyRevenue = approvedEnrollments.reduce((sum, enrollment) => {
    const enrollmentDate = new Date(enrollment.createdAt ?? enrollment.course?.createdAt ?? now);

    if (
      enrollmentDate.getMonth() !== now.getMonth() ||
      enrollmentDate.getFullYear() !== now.getFullYear()
    ) {
      return sum;
    }

    return sum + (enrollment.amount ?? enrollment.course?.price ?? 0);
  }, 0);

  const systemStats = {
    totalUsers: students.length + teachers.length,
    totalStudents: students.length,
    totalTeachers: teachers.length,
    totalCourses: courses.length,
    activeCourses: courses.filter((c) => !c.isOngoing || c.status !== "completed").length,
    totalRevenue,
    monthlyRevenue,
    completionRate: 0,
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-balance mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Overview of your platform performance.</p>
            </div>
            <div className="mb-8">
              <StatsOverview {...systemStats} />
            </div>
            <AdminCharts
              totalStudents={students.length}
              totalTeachers={teachers.length}
              enrollments={enrollments}
            />
          </>
        );
      case "students":
        return <StudentManagement students={students} />;
      case "teachers":
        return <TeacherManagement teachers={teachers} />;
      case "courses":
        return <CourseManagement />;
      case "enrollment-requests":
        return <EnrollmentRequests enrollments={enrollments} />;
      case "announcements":
        return <AdminAnnouncementsTab />;
      case "settings":
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <main className={cn(
        "p-6 lg:p-8 transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden mb-4 p-2 rounded-md cursor-pointer text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        {renderContent()}
      </main>
    </div>
  );
}
