import { StatsCard } from "@/components/shared/stats-card";
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

interface StatsOverviewProps {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  activeCourses: number;
  monthlyRevenue: number;
  totalRevenue: number;
  completionRate: number;
}

export function StatsOverview({
  totalStudents,
  totalTeachers,
  totalCourses,
  activeCourses,
  monthlyRevenue,
  totalRevenue,
  completionRate,
}: StatsOverviewProps) {
  const { formatPrice } = useSettings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Users"
        value={totalStudents + totalTeachers}
        description={`${totalStudents} students, ${totalTeachers} teachers`}
        icon={Users}
      />
      <StatsCard
        title="Active Courses"
        value={activeCourses}
        description={`${totalCourses} total courses`}
        icon={BookOpen}
      />
      <StatsCard
        title="Monthly Revenue"
        value={formatPrice(monthlyRevenue)}
        description={`${formatPrice(totalRevenue)} total`}
        icon={DollarSign}
      />
      <StatsCard
        title="Completion Rate"
        value={`${completionRate}%`}
        description="Average course completion"
        icon={TrendingUp}
      />
    </div>
  );
}
