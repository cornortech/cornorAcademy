"use client"

import StudentStatsCard from "@/components/dashboard/student/student-stats-card";
import { UpcomingClassesWidget } from "@/components/features/student/dashboard/UpcomingClassesWidget";
import { MyCoursesList } from "@/components/features/student/dashboard/MyCourseList";
import RecentAnnouncementWidget from "@/components/features/student/dashboard/RecentAnnouncementsWidget";
import { useStudentDashboard } from "@/hooks/use-student-dashboard";

export default function StudentDashboard() {
  const { student, enrollments, announcements, loading, error } = useStudentDashboard();

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

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">
          Welcome back, {student?.name || "Student"}!
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey and achieve your goals.
        </p>
      </div>

      <StudentStatsCard enrollments={enrollments} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MyCoursesList enrollments={enrollments} />
        <div className="space-y-6">
          <UpcomingClassesWidget />
          <RecentAnnouncementWidget announcements={announcements} />
        </div>
      </div>
    </>
  );
}
