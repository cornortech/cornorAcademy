import { Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TeacherCourseHeaderProps {
  title: string;
  students: number;
  status: string;
  completedLessons: number;
  totalLessons: number;
  avgProgress: number;
  nextClass: string;
}

export function TeacherCourseHeader({
  title,
  students,
  status,
  completedLessons,
  totalLessons,
  avgProgress,
  nextClass,
}: TeacherCourseHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-balance mb-2">{title}</h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {students} students enrolled
            </span>
            <Badge variant="secondary">
              {status === "completed" ? "Completed" : "Active"}
            </Badge>
          </div>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-1" />
          Edit Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Course Progress</span>
            <span>
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <Progress
            value={(completedLessons / totalLessons) * 100}
            className="h-3"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Avg Student Progress</span>
            <span>{avgProgress}%</span>
          </div>
          <Progress value={avgProgress} className="h-3" />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Next Class</div>
          <div className="text-sm text-muted-foreground">{nextClass}</div>
        </div>
      </div>
    </div>
  );
}
