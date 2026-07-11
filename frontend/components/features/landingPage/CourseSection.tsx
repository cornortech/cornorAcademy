"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCourses } from "@/api/course";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { useSettings } from "@/contexts/SettingsContext";

const CourseSection = () => {
  const { formatPrice } = useSettings();
  const { data: courses, isLoading } = useGetAllCourses();

  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            Popular Courses
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Discover our most popular courses taught by industry experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border/50 bg-card/50 backdrop-blur">
                  <Skeleton className="aspect-video rounded-t-lg rounded-b-none" />
                  <CardHeader>
                    <Skeleton className="h-5 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : courses && courses.length > 0 ? (
            courses.slice(0, 3).map((course) => (
              <Card
                key={course.id}
                className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors"
              >
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>
                    By {course.teacher?.name || "Instructor"} -{" "}
                    {(course.enrolledStudentsCount || 0).toLocaleString()} students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>
                      {course.isOngoing
                        ? `${course.duration} weeks`
                        : `${course.duration}h`}
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/courses/${course.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No courses available at the moment.
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
