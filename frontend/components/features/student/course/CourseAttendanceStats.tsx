import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CourseAttendanceStatsProps {
  totalClasses: number;
  attended: number;
  missed: number;
  percentage: number;
}

export function CourseAttendanceStats({
  totalClasses,
  attended,
  missed,
  percentage,
}: CourseAttendanceStatsProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>My Attendance</CardTitle>
        <CardDescription>
          Track your class attendance for this course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {percentage}%
            </div>
            <div className="text-sm text-muted-foreground">Attendance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{totalClasses}</div>
            <div className="text-sm text-muted-foreground">Total Classes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{attended}</div>
            <div className="text-sm text-muted-foreground">Attended</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{missed}</div>
            <div className="text-sm text-muted-foreground">Missed</div>
          </div>
        </div>
        <Progress value={percentage} className="h-3" />
      </CardContent>
    </Card>
  );
}
