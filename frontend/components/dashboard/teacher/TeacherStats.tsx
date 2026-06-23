import { StatsCard } from "@/components/shared/stats-card";
import { Teacher, Course, EnrolledCourseItem } from "@/types";
import { Users, BookOpen, Video, TrendingUp } from "lucide-react";

interface TeacherStatsProps {
  teacher: Teacher | null;
  courses: Course[];
  enrollments?: EnrolledCourseItem[];
}

export function TeacherStats({ teacher, courses, enrollments }: TeacherStatsProps) {
  const studentIds = new Set(
    (enrollments ?? []).map((e) => e.student?.id).filter(Boolean)
  );
  const totalStudents = studentIds.size;
  const totalVideos = courses.filter((c) => !c.isOngoing).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Students"
        value={totalStudents}
        description="Across all courses"
        icon={Users}
      />
      <StatsCard
        title="Active Courses"
        value={courses.length}
        description="Currently teaching"
        icon={BookOpen}
      />
      <StatsCard
        title="Course Videos"
        value={totalVideos}
        description="Total uploaded"
        icon={Video}
      />
      <StatsCard
        title="Average Rating"
        value="N/A"
        description="Student feedback"
        icon={TrendingUp}
      />
    </div>
  );
}
