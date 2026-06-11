"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Edit, Eye, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Course } from "@/types";

interface Props {
  courses: Course[];
}

const MyTeachingCourses = ({ courses }: Props) => {
  return (
    <div className="space-y-6">
      {courses.length > 0 ? (
        courses.map((course) => {
          const totalLessons = course.curriculum?.reduce((sum, c) => sum + (c.noOfLesson || 0), 0) || 0;
          return (
            <Card key={course.id} className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover rounded-lg" />
                      ) : (
                        <Video className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div className="lg:w-3/4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                        <p className="text-muted-foreground">{course.duration} weeks</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Lessons</div>
                        <div className="text-sm text-muted-foreground">{totalLessons} total</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Students</div>
                        <div className="text-sm text-muted-foreground">{0} enrolled</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Price</div>
                        <div className="text-sm text-muted-foreground">Rs {course.price}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/teacher/course/${course.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Manage Course
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Content
                      </Button>
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
            <p className="text-muted-foreground">No courses yet. Create your first course!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyTeachingCourses;
