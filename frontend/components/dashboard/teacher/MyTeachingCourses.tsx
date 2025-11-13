"use client";
import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
import { BarChart3, Edit, Eye, Play, Video } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Course } from "@/types";
import { mockCourses, mockTeachingCourses } from "@/lib/data";

const MyTeachingCourses = () => {
  const [isStartClassDialogOpen, setIsStartClassDialogOpen] = useState(false);
  const [classTitle, setClassTitle] = useState("");
  const [classUrl, setClassUrl] = useState("");
  const teachingCourses = mockTeachingCourses;
  return (
    <div className="space-y-6">
      {teachingCourses.map((course) => (
        <Card
          key={course.id}
          className="border-border/50 bg-card/50 backdrop-blur"
        >
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>

              <div className="lg:w-3/4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {course.students} enrolled students
                    </p>
                  </div>
                  <Badge
                    variant={
                      course.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {course.status === "completed" ? "Completed" : "Active"}
                  </Badge>
                </div>

                <div className="p-2 bg-primary/10 rounded border border-primary/20">
                  <p className="text-sm font-medium text-primary">
                    Course Started: {course.startTime}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Course Progress</span>
                      <span>
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <Progress
                      value={
                        (course.completedLessons / course.totalLessons) * 100
                      }
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Avg Student Progress</span>
                      <span>{course.avgProgress}%</span>
                    </div>
                    <Progress value={course.avgProgress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Next Class</div>
                    <div className="text-sm text-muted-foreground">
                      {course.nextClass}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {course.status !== "completed" && (
                    <Dialog
                      open={isStartClassDialogOpen}
                      onOpenChange={setIsStartClassDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Start Class
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Start Class - {course.title}
                          </DialogTitle>
                          <DialogDescription>
                            Configure class details before starting
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="class-title">Class Title</Label>
                            <Input
                              id="class-title"
                              placeholder="Enter class title"
                              value={classTitle}
                              onChange={(e) => setClassTitle(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="class-url">Meeting URL</Label>
                            <Input
                              id="class-url"
                              placeholder="Enter meeting URL"
                              value={classUrl}
                              onChange={(e) => setClassUrl(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => {
                              console.log("Starting class:", {
                                classTitle,
                                classUrl,
                              });
                              setIsStartClassDialogOpen(false);
                            }}
                          >
                            Start Class
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button variant="default" size="sm" asChild>
                    <Link href={`/dashboard/teacher/course/${course.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Manage Course
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Content
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyTeachingCourses;
