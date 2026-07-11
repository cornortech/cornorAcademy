"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course } from "@/types";
import { Clock, Search, Users } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useGetEnrolledCoursesByStudentId } from "@/api/course";

interface CourseCatalogProps {
  courses: Course[];
}

type CourseTypeFilter = "all" | "live" | "video";

export function CourseCatalog({ courses }: CourseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseType, setCourseType] = useState<CourseTypeFilter>("all");
  const { userData, userRole } = useAuth();
  const isStudent = userRole === "student";
  const { data: enrollments } = useGetEnrolledCoursesByStudentId(
    isStudent ? userData?.id ?? "" : ""
  );

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesType =
      courseType === "all"
        ? true
        : courseType === "live"
        ? course.isOngoing
        : !course.isOngoing;

    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Tabs
          value={courseType}
          onValueChange={(v) => setCourseType(v as CourseTypeFilter)}
        >
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="live">Live Classes</TabsTrigger>
            <TabsTrigger value="video">Video Courses</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredCourses.length === 0 ? (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-10 text-center text-muted-foreground">
            No courses found. Try adjusting your search or filter.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant={course.isOngoing ? "default" : "outline"}>
                      {course.isOngoing ? "Live" : "Video"}
                    </Badge>
                  </div>

                </div>
                <CardTitle className="line-clamp-2 text-xl">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.isOngoing ? `${course.duration} weeks` : `${course.duration}h`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.enrolledStudentsCount || 0} students
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold">
                    Rs {course.price}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/courses/${course.id}`}>View Details</Link>
                    </Button>
                    {(() => {
                      const currentEnrollment = enrollments?.find(
                        (e) => e.course.id === course.id
                      );
                      const hasPaid =
                        !!currentEnrollment &&
                        (currentEnrollment.status === "approved" ||
                          currentEnrollment.status === "requested");
                      return hasPaid ? (
                        <Button asChild>
                          <Link href={`/courses/${course.id}`}>
                            Start Class
                          </Link>
                        </Button>
                      ) : (
                        <Button asChild>
                          <Link href={`/enroll/${course.id}`}>
                            Join Course
                          </Link>
                        </Button>
                      );
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
