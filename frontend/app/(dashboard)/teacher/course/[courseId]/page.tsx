"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { TeacherCourseNavHeader } from "@/components/features/teacher/course/TeacherCourseNavHeader";
import { TeacherCourseHeader } from "@/components/features/teacher/course/TeacherCourseHeader";
import { StudentProgressList } from "@/components/features/teacher/course/StudentProgressList";
import { ResourceManagement } from "@/components/features/teacher/course/ResourceManagement";
import { AttendanceTracker } from "@/components/features/teacher/course/AttendanceTracker";
import { AnnouncementManager } from "@/components/features/teacher/course/AnnouncementManager";
import { useGetCourseById } from "@/api/course";

export default function TeacherCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const { data: course, isLoading } = useGetCourseById(courseId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <Skeleton className="h-32 w-full rounded-lg mb-8" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <TeacherCourseNavHeader courseId={courseId} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TeacherCourseHeader
          title={course.title}
          students={course.enrolledStudentsCount || 0}
          status={course.status}
          completedLessons={0}
          totalLessons={0}
          avgProgress={0}
          nextClass=""
        />

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students & Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources & Materials</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Tracking</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <StudentProgressList students={[]} />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceManagement resources={[]} />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceTracker
              courseId={courseId}
              courseTitle={course.title}
              students={[]}
            />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementManager courseId={courseId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
