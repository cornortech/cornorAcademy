import { getCourseData } from "@/data/mock/GetCourseData";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star, Users } from "lucide-react";

const InstructorTab = ({ params }: { params: { courseId: string } }) => {
  const course = getCourseData(params.courseId);
  return (
    <TabsContent value="instructor">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={course.instructor.avatar || "/placeholder.svg"}
              />
              <AvatarFallback>
                {course.instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-xl">
                {course.instructor.name}
              </CardTitle>
              <CardDescription className="text-base mb-2">
                {course.instructor.title}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.instructor.rating} rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {course.instructor.students.toLocaleString()} students
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {course.instructor.bio}
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default InstructorTab;
