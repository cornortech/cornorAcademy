"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockEnrolledCourses } from "@/lib/data";
import { CheckCircle, LogIn, Play, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const StudentSearchFilter = () => {
  const [courseFilter, setCourseFilter] = useState("all");
  const [searchCourse, setSearchCourse] = useState("");

  const filteredCourses = mockEnrolledCourses.filter((course) => {
    const matchesStatus =
      courseFilter === "all" || course.status === courseFilter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchCourse.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchCourse.toLowerCase());
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
              <Input
                placeholder="Search courses or instructors..."
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {(searchCourse || courseFilter !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchCourse("");
                  setCourseFilter("all");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Display filtered courses */}
      <div className="space-y-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="border-border/50 bg-card/50 backdrop-blur"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="lg:w-2/3 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground">
                          by {course.instructor}
                        </p>
                      </div>
                      <Badge
                        variant={
                          course.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {course.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </Badge>
                    </div>

                    <div className="p-2 bg-primary/10 rounded border border-primary/20">
                      <p className="text-sm font-medium text-primary">
                        Course Started: {course.startTime}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {course.progress}% complete
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {course.status === "completed" ? (
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Course completed
                          </span>
                        ) : (
                          <span>Next: {course.nextLesson}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {course.status !== "completed" &&
                          course.meetingLink && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <LogIn className="h-4 w-4 mr-1" />
                                  Join Class
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Join {course.title}</DialogTitle>
                                  <DialogDescription>
                                    {course.nextClassTime}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <p className="text-sm">
                                    Class Link:{" "}
                                    <a
                                      href={course.meetingLink}
                                      className="text-primary hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {course.meetingLink}
                                    </a>
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button asChild>
                                    <Link
                                      href={course.meetingLink}
                                      target="_blank"
                                    >
                                      Join Meeting
                                    </Link>
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        <Button variant="default" size="sm" asChild>
                          <Link href={`/student/course/${course.id}`}>
                            <Video className="h-4 w-4 mr-1" />
                            {course.status === "completed"
                              ? "Review Course"
                              : "Continue Learning"}
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last accessed: {course.lastAccessed}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No courses match your filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentSearchFilter;
