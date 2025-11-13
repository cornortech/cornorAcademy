import { StatsCard } from "@/components/shared/stats-card";
import { Student } from "@/types";
import { Award, BookOpen, Clock, TrendingUp } from "lucide-react";

interface StudentStatsProps {
  student: Pick<
    Student,
    | "enrolledCourses"
    | "completedCourses"
    | "totalLearningHours"
    | "currentStreak"
  >;
}

export function StudentStats({ student }: StudentStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Enrolled Courses"
        value={student.enrolledCourses.length}
        icon={BookOpen}
      />
      <StatsCard
        title="Completed"
        value={student.completedCourses.length}
        icon={Award}
      />
      <StatsCard
        title="Learning Hours"
        value={student.totalLearningHours}
        icon={Clock}
      />
      <StatsCard
        title="Current Streak"
        value={`${student.currentStreak} days`}
        icon={TrendingUp}
      />
    </div>
  );
}
