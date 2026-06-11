"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeacherCourseNavHeader } from "@/components/features/teacher/course/TeacherCourseNavHeader";
import { TeacherCourseHeader } from "@/components/features/teacher/course/TeacherCourseHeader";
import { StudentProgressList } from "@/components/features/teacher/course/StudentProgressList";
import { ResourceManagement } from "@/components/features/teacher/course/ResourceManagement";
import { AttendanceTracker } from "@/components/features/teacher/course/AttendanceTracker";
import { AnnouncementManager } from "@/components/features/teacher/course/AnnouncementManager";
import {
  mockTeachingCourses,
  mockStudentProgress,
  mockUploadedResources,
  mockRecentAnnouncements,
} from "@/lib/data";

export default function TeacherCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const course = mockTeachingCourses.find((c) => c.id === parseInt(courseId));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <TeacherCourseNavHeader courseId={courseId} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TeacherCourseHeader
          title={course.title}
          students={course.students}
          status={course.status}
          completedLessons={course.completedLessons}
          totalLessons={course.totalLessons}
          avgProgress={course.avgProgress}
          nextClass={course.nextClass}
        />

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students & Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources & Materials</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Tracking</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <StudentProgressList students={mockStudentProgress} />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceManagement resources={mockUploadedResources} />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceTracker
              courseId={courseId}
              courseTitle={course.title}
              students={mockStudentProgress}
            />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementManager announcements={mockRecentAnnouncements} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
