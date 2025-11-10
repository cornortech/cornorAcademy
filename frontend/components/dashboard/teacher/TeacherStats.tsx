import { StatsCard } from "@/components/shared/stats-card";
import { Teacher } from "@/types";
import { Users, BookOpen, Video, TrendingUp } from "lucide-react";

interface TeacherStatsProps {
  teacher: Pick<Teacher, "totalStudents" | "activeCourses"> & {
    avgRating?: number;
    totalVideos?: number;
  };
}

export function TeacherStats({ teacher }: TeacherStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Students"
        value={teacher.totalStudents || 0}
        description="Across all courses"
        icon={Users}
      />
      <StatsCard
        title="Active Courses"
        value={teacher.activeCourses?.length || 0}
        description="Currently teaching"
        icon={BookOpen}
      />
      <StatsCard
        title="Course Videos"
        value={teacher.totalVideos || 0}
        description="Total uploaded"
        icon={Video}
      />
      <StatsCard
        title="Average Rating"
        value={teacher.avgRating || "N/A"}
        description="Student feedback"
        icon={TrendingUp}
      />
    </div>
  );
}
