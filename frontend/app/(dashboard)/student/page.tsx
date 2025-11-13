import StudentStatsCard from "@/components/dashboard/student/student-stats-card";
import { mockStudentData } from "@/lib/data";
import { UpcomingClassesWidget } from "@/components/features/student/dashboard/UpcomingClassesWidget";
import { MyCoursesList } from "@/components/features/student/dashboard/MyCourseList";
import RecentAnnouncementWidget from "@/components/features/student/dashboard/RecentAnnouncementsWidget";

export default function StudentDashboard() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">
          Welcome back, {mockStudentData.name}!
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey and achieve your goals.
        </p>
      </div>

      <StudentStatsCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MyCoursesList />

        {/* Sidebar */}
        <div className="space-y-6">
          <UpcomingClassesWidget />
          <RecentAnnouncementWidget />
        </div>
      </div>
    </>
  );
}
