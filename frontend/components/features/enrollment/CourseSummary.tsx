import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Clock } from "lucide-react";
import type { Course } from "@/types";

interface CourseSummaryProps {
  course: Course;
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes}m`;
}

export function CourseSummary({ course }: CourseSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <Card className="border-border/50 bg-card/50 backdrop-blur sticky top-24">
        <CardContent className="p-6">
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg mb-2">{course.title}</h3>
          <p className="text-muted-foreground mb-4">
            by {course.teacher?.name || "Instructor"}
          </p>

          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDuration(course.duration)}</span>
          </div>

          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">Rs {course.price}</span>
            <span className="text-sm text-muted-foreground">
              one-time payment
            </span>
          </div>
          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="font-semibold">What&apos;s included:</h4>
            {course.includes.slice(0, 4).map((feature: string, index: number) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
