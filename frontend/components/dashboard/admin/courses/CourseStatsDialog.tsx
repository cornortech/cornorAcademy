"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981"];

interface CourseStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: {
    id: string;
    title: string;
    instructor: string;
    price: number;
    description: string;
    thumbnail?: string;
    isOngoing: boolean;
    status: string;
    created: string;
    enrolled: number;
    completion: number;
    rating?: number;
  };
}

export function CourseStatsDialog({ open, onOpenChange, course }: CourseStatsDialogProps) {
  const hasRating = course.rating != null;

  const ratingDistribution = hasRating
    ? [
        { name: "5 Star", value: Math.round(course.enrolled * 0.5) },
        { name: "4 Star", value: Math.round(course.enrolled * 0.3) },
        { name: "3 Star", value: Math.round(course.enrolled * 0.15) },
      ]
    : [];

  const enrollmentData = [
    { name: "Enrolled", value: course.enrolled },
    { name: "Completed", value: Math.round(course.enrolled * (course.completion / 100)) },
    { name: "In Progress", value: course.enrolled - Math.round(course.enrolled * (course.completion / 100)) },
  ];

  const estimatedRevenue = course.enrolled * course.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        
        <DialogHeader>
          <DialogTitle>{course.title} — Stats</DialogTitle>
          <DialogDescription>Performance metrics and enrollment data</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold">{course.enrolled}</p>
              <p className="text-xs text-muted-foreground mt-1">Enrolled</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold">{course.completion}%</p>
              <p className="text-xs text-muted-foreground mt-1">Completion</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold">{hasRating ? course.rating : "—"}</p>
              <p className="text-xs text-muted-foreground mt-1">{hasRating ? "Rating" : "Not rated yet"}</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold">Rs {estimatedRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Est. Revenue</p>
            </div>
          </div>

          <div className={`grid gap-6 ${hasRating ? "sm:grid-cols-2" : ""}`}>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
              <p className="text-sm font-medium mb-3">Enrollment Status</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {enrollmentData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {hasRating && (
              <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                <p className="text-sm font-medium mb-3">Rating Distribution</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={ratingDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {ratingDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Overall Completion</p>
              <span className="text-sm font-bold">{course.completion}%</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${course.completion}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{Math.round(course.enrolled * (course.completion / 100))} completed</span>
              <span>{course.enrolled - Math.round(course.enrolled * (course.completion / 100))} remaining</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Instructor: {course.instructor}</span>
            <Badge variant={course.isOngoing ? "default" : "secondary"}>
              {course.isOngoing ? "Live" : "Video"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
