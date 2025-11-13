import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsOverview } from "@/components/dashboard/admin/stats-overview";
import { StudentManagement } from "@/components/dashboard/admin/students/StudentManagement";
import { TeacherManagement } from "@/components/dashboard/admin/teachers/TeacherManagement";
import { CourseManagement } from "@/components/dashboard/admin/courses/CourseManagement";
import { EnrollmentRequests } from "@/components/dashboard/admin/enrollment/EnrollmentRequests";
import { AnnouncementsPanel } from "@/components/dashboard/admin/announcements/AnnouncementsPanel";
import { SettingsPanel } from "@/components/dashboard/admin/settings/SettingsPanel";

export default function AdminDashboard() {
  const systemStats = {
    totalUsers: 1247,
    totalStudents: 156,
    totalTeachers: 23,
    totalCourses: 45,
    activeCourses: 32,
    totalRevenue: 125400,
    monthlyRevenue: 18750,
    completionRate: 78,
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage students, teachers, courses, and system settings.
        </p>
      </div>

      <div className="mb-8">
        <StatsOverview {...systemStats} />
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="enrollment-requests">
            Enrollment Requests
          </TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentManagement />
        </TabsContent>

        <TabsContent value="teachers">
          <TeacherManagement />
        </TabsContent>

        <TabsContent value="courses">
          <CourseManagement />
        </TabsContent>

        <TabsContent value="enrollment-requests">
          <EnrollmentRequests />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsPanel />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </>
  );
}
