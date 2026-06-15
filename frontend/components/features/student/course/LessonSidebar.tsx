"use client";

import { CheckCircle2, PlayCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { Lesson, ProgressItem } from "@/types";

interface LessonSidebarProps {
  lessons: Lesson[];
  progress: ProgressItem[];
  currentLessonId: string | null;
  percentage: number;
  completedLessons: number;
  totalLessons: number;
  onSelectLesson: (lesson: Lesson) => void;
}

export function LessonSidebar({
  lessons,
  progress,
  currentLessonId,
  percentage,
  completedLessons,
  totalLessons,
  onSelectLesson,
}: LessonSidebarProps) {
  const completedLessonIds = new Set(
    progress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  const firstIncompleteIndex = lessons.findIndex(
    (l) => !completedLessonIds.has(l.id)
  );

  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="bg-card border border-border/50 rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm">Course Progress</h3>
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {completedLessons}/{totalLessons} lessons completed ({percentage}%)
        </p>
      </div>

      <div className="bg-card border border-border/50 rounded-lg max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-3 border-b border-border/50">
          <h3 className="font-semibold text-sm">Lessons</h3>
        </div>
        <div className="divide-y divide-border/50">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.has(lesson.id);
            const isCurrent = lesson.id === currentLessonId;
            const isLocked = false;

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className={cn(
                  "w-full text-left px-3 py-3 flex items-start gap-3 transition-colors hover:bg-muted/50",
                  isCurrent && "bg-primary/5 border-l-2 border-l-primary",
                  !isCurrent && "border-l-2 border-l-transparent"
                )}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : isCurrent ? (
                    <PlayCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <span className="flex h-4 w-4 items-center justify-center text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm truncate",
                      isCompleted && "text-muted-foreground line-through",
                      isCurrent && "font-medium text-primary"
                    )}
                  >
                    {lesson.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {lesson.duration ? `${lesson.duration} min` : "No duration"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
