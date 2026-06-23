"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course, EnrolledCourseItem } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

interface TeacherChartsProps {
  courses: Course[];
  enrollments: EnrolledCourseItem[];
}

interface ChartTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{
    dataKey?: string;
    name?: string;
    value?: number;
    color?: string;
  }>;
}

const currencyFormatter = new Intl.NumberFormat("en-NP", {
  maximumFractionDigits: 0,
});

const formatRevenue = (value: number) => `Rs ${currencyFormatter.format(value)}`;

function buildMonthlyData(enrollments: EnrolledCourseItem[]) {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    return {
      name: date.toLocaleString("en", { month: "short" }),
      month: date.getMonth(),
      year: date.getFullYear(),
      students: 0,
      revenue: 0,
    };
  });

  enrollments.forEach((enrollment) => {
    const rawDate = enrollment.createdAt ?? enrollment.course?.createdAt;
    const enrolledDate = rawDate ? new Date(rawDate) : null;
    if (!enrolledDate || Number.isNaN(enrolledDate.getTime())) return;

    const monthData = months.find(
      (item) =>
        item.month === enrolledDate.getMonth() &&
        item.year === enrolledDate.getFullYear()
    );
    if (!monthData) return;

    monthData.students += 1;
    if (enrollment.status === "approved") {
      monthData.revenue += enrollment.amount ?? enrollment.course?.price ?? 0;
    }
  });

  return months.map(({ name, students, revenue }) => ({ name, students, revenue }));
}

function buildCourseDistribution(courses: Course[], enrollments: EnrolledCourseItem[]) {
  return courses.map((course) => {
    const count = enrollments.filter((e) => e.course?.id === course.id).length;
    return { name: course.title, value: count };
  });
}

function ChartTooltip({ active, label, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((item) => (
        <div key={item.dataKey} className="flex min-w-44 items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </span>
          <span className="font-medium">
            {item.dataKey === "revenue"
              ? formatRevenue(Number(item.value ?? 0))
              : item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TeacherCharts({ courses, enrollments }: TeacherChartsProps) {
  const monthlyData = buildMonthlyData(enrollments);
  const courseDistribution = buildCourseDistribution(courses, enrollments);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">Monthly Enrollments & Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis yAxisId="students" stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
              <YAxis
                yAxisId="revenue"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `Rs ${Number(value) / 1000}k`}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.35)" }} />
              <Legend />
              <Bar yAxisId="students" dataKey="students" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Enrollments" />
              <Bar yAxisId="revenue" dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">Enrollments per Course</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={courseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {courseDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
