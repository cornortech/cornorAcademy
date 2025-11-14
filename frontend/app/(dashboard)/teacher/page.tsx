import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { mockTeacherData } from "@/lib/data";
import { TeacherStats } from "@/components/dashboard/teacher/TeacherStats";
import MyTeachingCourses from "@/components/dashboard/teacher/MyTeachingCourses";
import { UpcomingClassesWidget } from "@/components/dashboard/teacher/UpcomingClassesWidget";
import RecentAnnouncementWidget from "@/components/dashboard/teacher/RecentAnnouncementWidget";

export default function TeacherDashboard() {
  const teacherData = mockTeacherData;

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">
          Welcome back, {teacherData.name}!
        </h1>
        <p className="text-muted-foreground">
          Manage your courses and track student progress.
        </p>
      </div>

      {/* Stats Cards */}
      <TeacherStats teacher={teacherData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-1" />
              Create New Course
            </Button>
          </div>

          <MyTeachingCourses />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <UpcomingClassesWidget />
          <RecentAnnouncementWidget />
        </aside>
      </div>
    </>
  );
}
