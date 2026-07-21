"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Globe, GraduationCap, Radio } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/contexts/SettingsContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDuration } from "@/lib/utils";
import { useGetEnrolledCoursesByStudentId } from "@/api/course";

interface CourseSidebarProps {
  course: any;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const { formatPrice } = useSettings();
  const { userData, userRole } = useAuth();
  const isStudent = userRole === "student";
  const { data: enrollments } = useGetEnrolledCoursesByStudentId(
    isStudent ? userData?.id ?? "" : ""
  );

  const currentEnrollment = enrollments?.find(
    (e) => e.course.id === course.id
  );
  const isEnrolled = !!currentEnrollment && currentEnrollment.status === "approved";
  const isPending = !!currentEnrollment && currentEnrollment.status === "requested";

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 shrink-0" />
              <span className="text-sm">
                {course.isOngoing ? "Live Class" : "Video Course"}
              </span>
              <Badge variant={course.isOngoing ? "default" : "outline"} className="ml-auto text-xs">
                {course.isOngoing ? "Live" : "Video"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 shrink-0" />
              <span className="text-sm">{course.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0" />
              <span className="text-sm">{course.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span className="text-sm">{course.isOngoing ? `${course.duration} weeks` : formatDuration(course.duration)}</span>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            </div>
            <Badge variant="destructive" className="text-xs">
              25% OFF Limited Time
            </Badge>
          </div>

          {isEnrolled ? (
            <Button className="w-full mb-4" size="lg" asChild>
              <Link href={`/student/course/${course.id}`}>Continue Learning</Link>
            </Button>
          ) : isPending ? (
            <Button className="w-full mb-4" size="lg" variant="secondary" disabled>
              Awaiting Approval
            </Button>
          ) : (
            <Button className="w-full mb-4" size="lg" asChild>
              <Link href={`/enroll/${course.id}`}>Enroll Now</Link>
            </Button>
          )}

          <Separator className="mb-6" />
          <div className="space-y-4">
            <h4 className="font-semibold">This course includes:</h4>
            <ul className="space-y-3">
              {course.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
