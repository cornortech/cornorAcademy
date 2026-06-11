"use client"

import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { TeacherStats } from "@/components/dashboard/teacher/TeacherStats";
import MyTeachingCourses from "@/components/dashboard/teacher/MyTeachingCourses";
import { UpcomingClassesWidget } from "@/components/dashboard/teacher/UpcomingClassesWidget";
import RecentAnnouncementWidget from "@/components/dashboard/teacher/RecentAnnouncementWidget";
import { useTeacherDashboard } from "@/hooks/use-teacher-dashboard";

export default function TeacherDashboard() {
  const { teacher, courses, announcements, loading, error } = useTeacherDashboard();

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
          Welcome back, {teacher?.name || "Teacher"}!
        </h1>
        <p className="text-muted-foreground">
          Manage your courses and track student progress.
        </p>
      </div>

      <TeacherStats teacher={teacher} courses={courses} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-1" />
              Create New Course
            </Button>
          </div>

          <MyTeachingCourses courses={courses} />
        </div>

        <aside className="space-y-6">
          <UpcomingClassesWidget />
          <RecentAnnouncementWidget announcements={announcements} />
        </aside>
      </div>
    </>
  );
}
