"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentCourseHeader } from "@/components/features/student/course/StudentCourseHeader";
import { CourseMaterialsList } from "@/components/features/student/course/CourseMaterialsList";
import { CourseAnnouncementsList } from "@/components/features/student/course/CourseAnnouncementsList";
import { CourseAttendanceStats } from "@/components/features/student/course/CourseAttendanceStats";
import {
  mockEnrolledCourses,
  mockRecentAnnouncements,
  getMaterialsForCourse,
} from "@/lib/data";
import { CourseDiscussionsPanel } from "@/components/features/student/course/CourseDiscussionsPanel";

export default function StudentCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const course = mockEnrolledCourses.find((c) => c.id === parseInt(courseId));
  const materials = getMaterialsForCourse(courseId);
  const announcements = mockRecentAnnouncements.filter(
    (a) => a.courseId === courseId
  );

  const attendanceData = {
    totalClasses: 12,
    attended: 11,
    missed: 1,
    percentage: 92,
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course not found</h1>
          <p className="text-muted-foreground">
            The course you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentCourseHeader
        courseId={courseId}
        title={course.title}
        instructor={course.instructor}
        instructorAvatar="/instructor-avatar.png"
        status={course.status}
        progress={course.progress}
        completedLessons={course.completedLessons}
        totalLessons={course.totalLessons}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="materials">Materials & Videos</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="attendance">My Attendance</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="materials">
            <CourseMaterialsList courseId={courseId} materials={materials} />
          </TabsContent>

          <TabsContent value="announcements">
            <CourseAnnouncementsList announcements={announcements} />
          </TabsContent>

          <TabsContent value="attendance">
            <CourseAttendanceStats {...attendanceData} />
          </TabsContent>

          <TabsContent value="discussions">
            <CourseDiscussionsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
