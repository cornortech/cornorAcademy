"use client";

import { useParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { useGetCourseById, useGetLessonsByCourseId, useGetProgressByCourseId } from "@/api/course";
import { VideoCourseView } from "@/components/features/student/course/VideoCourseView";
import { LiveClassView } from "@/components/features/student/course/LiveClassView";

export default function StudentCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const { data: course, isLoading: courseLoading, error: courseError } = useGetCourseById(courseId);
  const { data: lessons, isLoading: lessonsLoading } = useGetLessonsByCourseId(courseId);
  const { data: progress, isLoading: progressLoading } = useGetProgressByCourseId(courseId);

  const isLoading = courseLoading || lessonsLoading || progressLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <h2 className="text-xl font-semibold">Course not found</h2>
          <p className="text-muted-foreground">
            The course you&apos;re looking for doesn&apos;t exist or you don&apos;t have access.
          </p>
        </div>
      </div>
    );
  }

  if (course.isOngoing) {
    return <LiveClassView course={course} />;
  }

  const safeLessons = lessons || [];
  const safeProgress = progress || {
    totalLessons: 0,
    completedLessons: 0,
    percentage: 0,
    lastWatchedLessonId: null,
    progress: [],
  };

  return (
    <VideoCourseView
      courseId={courseId}
      courseTitle={course.title}
      lessons={safeLessons}
      progress={safeProgress}
    />
  );
}
