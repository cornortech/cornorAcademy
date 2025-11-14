import {
  ArrowLeft,
  Bell,
  BookOpen,
  LogOut,
  PlayCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { APP_NAME } from "@/lib/config";

interface StudentCourseHeaderProps {
  courseId: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  status: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export function StudentCourseHeader({
  courseId,
  title,
  instructor,
  instructorAvatar,
  status,
  progress,
  completedLessons,
  totalLessons,
}: StudentCourseHeaderProps) {
  return (
    <>
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/student">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">{APP_NAME}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Course Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">{title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={instructorAvatar} alt={instructor} />
                    <AvatarFallback>
                      {instructor.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>by {instructor}</span>
                </div>
                <Badge variant="secondary">
                  {status === "completed" ? "Completed" : "In Progress"}
                </Badge>
              </div>
            </div>
            <Button asChild>
              <Link href={`/dashboard/student/materials/${courseId}`}>
                <PlayCircle className="h-4 w-4 mr-1" />
                Continue Learning
              </Link>
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Course Progress</span>
              <span>
                {completedLessons}/{totalLessons} lessons completed
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {progress}% complete
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
