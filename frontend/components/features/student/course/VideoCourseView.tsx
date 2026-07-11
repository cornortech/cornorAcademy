"use client";

import { useState, useCallback, useMemo } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LessonSidebar } from "./LessonSidebar";
import { VideoLessonPlayer } from "./VideoLessonPlayer";
import { CompletionCelebration } from "./CompletionCelebration";
import { useVideoShortcuts } from "@/hooks/use-video-shortcuts";
import { useUpdateLastWatched, useMarkLessonComplete } from "@/api/course";
import { CourseAnnouncementsList } from "./CourseAnnouncementsList";
import type { Lesson, CourseProgress } from "@/types";

interface VideoCourseViewProps {
  courseId: string;
  courseTitle: string;
  lessons: Lesson[];
  progress: CourseProgress;
}

export function VideoCourseView({
  courseId,
  courseTitle,
  lessons,
  progress,
}: VideoCourseViewProps) {
  const [currentLessonId, setCurrentLessonId] = useState<string>(
    () => progress.lastWatchedLessonId || lessons[0]?.id || ""
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const [certUrl, setCertUrl] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const updateLastWatched = useUpdateLastWatched();
  const markComplete = useMarkLessonComplete();

  const currentLesson = useMemo(
    () => lessons.find((l) => l.id === currentLessonId) || lessons[0],
    [lessons, currentLessonId]
  );

  const completedLessonIds = useMemo(
    () => new Set(progress.progress.filter((p) => p.completed).map((p) => p.lessonId)),
    [progress.progress]
  );

  const currentIndex = useMemo(
    () => lessons.findIndex((l) => l.id === currentLessonId),
    [lessons, currentLessonId]
  );

  const hasNext = currentIndex < lessons.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleSelectLesson = useCallback(
    (lesson: Lesson) => {
      setCurrentLessonId(lesson.id);
      updateLastWatched.mutate({ lessonId: lesson.id, courseId });
    },
    [courseId, updateLastWatched]
  );

  const handleNext = useCallback(() => {
    if (hasNext) {
      const next = lessons[currentIndex + 1];
      setCurrentLessonId(next.id);
      updateLastWatched.mutate({ lessonId: next.id, courseId });
    }
  }, [hasNext, lessons, currentIndex, courseId, updateLastWatched]);

  const handlePrevious = useCallback(() => {
    if (hasPrevious) {
      const prev = lessons[currentIndex - 1];
      setCurrentLessonId(prev.id);
      updateLastWatched.mutate({ lessonId: prev.id, courseId });
    }
  }, [hasPrevious, lessons, currentIndex, courseId, updateLastWatched]);

  const handleMarkComplete = useCallback(async () => {
    if (!currentLesson || isCompleting) return;
    setIsCompleting(true);
    try {
      const result = await markComplete.mutateAsync(currentLesson.id);
      if (result.certificateUrl) {
        setCertUrl(result.certificateUrl);
        setShowCelebration(true);
      } else if (result.percentage === 100) {
        setShowCelebration(true);
      } else {
        handleNext();
      }
    } finally {
      setIsCompleting(false);
    }
  }, [currentLesson, isCompleting, markComplete, handleNext]);

  useVideoShortcuts({
    onPlayPause: () => {},
    onNext: handleNext,
    onPrevious: handlePrevious,
    onMarkComplete: handleMarkComplete,
    enabled: true,
  });

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No lessons yet</h2>
          <p className="text-muted-foreground mb-4">This course has no lessons available.</p>
          <Button asChild>
            <Link href="/student">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        
        <header className="border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/student">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
              <div className="h-5 w-px bg-border" />
              <span className="text-sm font-medium truncate max-w-md">
                {courseTitle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Space</kbd>
              <span>Play/Pause</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">→</kbd>
              <span>Navigate</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <LessonSidebar
              lessons={lessons}
              progress={progress.progress}
              currentLessonId={currentLessonId}
              percentage={progress.percentage}
              completedLessons={progress.completedLessons}
              totalLessons={progress.totalLessons}
              onSelectLesson={handleSelectLesson}
            />

            <div className="lg:col-span-3 space-y-6">
              <div>
                <VideoLessonPlayer
                  lesson={currentLesson}
                  isCompleted={completedLessonIds.has(currentLesson.id)}
                  hasNext={hasNext}
                  onMarkComplete={handleMarkComplete}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  isCompleting={isCompleting}
                />
              </div>
              <CourseAnnouncementsList courseId={courseId} />
            </div>
          </div>
        </div>
      </div>

      {showCelebration && (
        <CompletionCelebration
          certificateUrl={certUrl}
          courseTitle={courseTitle}
          onDismiss={() => setShowCelebration(false)}
        />
      )}
    </>
  );
}
