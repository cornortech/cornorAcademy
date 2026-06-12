"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useGetEnrolledCoursesByStudentId } from "@/api/course";

interface CourseDetailContentProps {
  courseId: string;
  thumbnail: string;
  title: string;
  children: React.ReactNode;
}

export function CourseDetailContent({
  courseId,
  thumbnail,
  title,
  children,
}: CourseDetailContentProps) {
  const { userData, userRole } = useAuth();
  const isStudent = userRole === "student";
  const { data: enrollments } = useGetEnrolledCoursesByStudentId(
    isStudent ? userData?.id ?? "" : ""
  );

  const currentEnrollment = enrollments?.find(
    (e) => e.course.id === courseId
  );
  const isEnrolled = !!currentEnrollment && currentEnrollment.status === "approved";
  const isPending = !!currentEnrollment && currentEnrollment.status === "requested";

  return (
    <>
      <Card className="mb-8">
        <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            {isEnrolled ? (
              <Button size="lg" className="rounded-full h-16 w-16">
                <Play className="h-6 w-6" />
              </Button>
            ) : (
              <div className="text-center">
                <Button size="lg" className="rounded-full h-16 w-16" asChild>
                  <Link href={`/enroll/${courseId}`}>
                    {isPending ? (
                      <Badge variant="secondary" className="text-sm">Pending</Badge>
                    ) : (
                      <Lock className="h-6 w-6" />
                    )}
                  </Link>
                </Button>
                <p className="text-white text-sm mt-3 font-medium">
                  {isPending
                    ? "Awaiting approval"
                    : "Enroll to watch this course"}
                </p>
              </div>
            )}
          </div>
          {isEnrolled && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-green-600 hover:bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Enrolled
              </Badge>
            </div>
          )}
        </div>
      </Card>
      {children}
    </>
  );
}
