"use client"

import StudentStatsCard from "@/components/dashboard/student/student-stats-card";
import { UpcomingClassesWidget } from "@/components/features/student/dashboard/UpcomingClassesWidget";
import { MyCoursesList } from "@/components/features/student/dashboard/MyCourseList";
import RecentAnnouncementWidget from "@/components/features/student/dashboard/RecentAnnouncementsWidget";
import { StudentProfileTab } from "@/components/dashboard/student/StudentProfileTab";
import { useStudentDashboard } from "@/hooks/use-student-dashboard";
import { useSearchParams } from "next/navigation";

export default function StudentDashboard() {
  const { student, enrollments, announcements, loading, error } = useStudentDashboard();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

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

  const renderContent = () => {
    switch (tab) {
      case "courses":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">My Courses</h1>
              <p className="text-muted-foreground">Your enrolled courses and progress.</p>
            </div>
            <MyCoursesList enrollments={enrollments} />
          </>
        );

      case "upcoming":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Upcoming Classes</h1>
              <p className="text-muted-foreground">Your scheduled classes and meetings.</p>
            </div>
            <div className="max-w-2xl">
              <UpcomingClassesWidget />
            </div>
          </>
        );

      case "profile":
        return <StudentProfileTab />;

      default:
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
  };

  return <>{renderContent()}</>;
}
