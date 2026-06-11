"use client";

import { useState } from "react";
import { EnrolledCourseItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, LogIn, Video } from "lucide-react";
import Link from "next/link";

interface Props {
  enrollments: EnrolledCourseItem[];
}

export function MyCoursesList({ enrollments }: Props) {
  const [courseFilter, setCourseFilter] = useState("all");
  const [searchCourse, setSearchCourse] = useState("");

  const filteredCourses = enrollments.filter((enrollment) => {
    const course = enrollment.course;
    const matchesStatus = courseFilter === "all" || enrollment.status === courseFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchCourse.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <Button variant="outline" asChild>
          <Link href="/courses">Browse More</Link>
        </Button>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="Search courses..." value={searchCourse} onChange={(e) => setSearchCourse(e.target.value)} />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="requested">Requested</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {(searchCourse || courseFilter !== "all") && (
              <Button variant="outline" onClick={() => { setSearchCourse(""); setCourseFilter("all"); }}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((enrollment) => {
            const course = enrollment.course;
            const teacherName = course.teacher?.name || "Unknown";
            const status = enrollment.status;
            const isApproved = status === "approved";

            return (
              <Card key={enrollment.id} className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                          <p className="text-muted-foreground">by {teacherName}</p>
                        </div>
                        <Badge variant={isApproved ? "default" : "secondary"}>
                          {isApproved ? "In Progress" : status === "requested" ? "Pending" : "Rejected"}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" asChild>
                            <Link href={isApproved ? `/student/course/${course.id}` : "#"}>
                              <Video className="h-4 w-4 mr-1" />
                              {isApproved ? "Continue Learning" : "Awaiting Approval"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No courses match your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
