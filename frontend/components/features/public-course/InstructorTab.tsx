import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Users } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface TabProps {
  course: any;
}

export function InstructorTab({ course }: TabProps) {
  return (
    <TabsContent value="instructor">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={course.instructor.avatar} />
              <AvatarFallback>
                {getInitials(course.instructor.name)}
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
                  <Users className="h-4 w-4" />
                  <span>
                    {course.instructor.totalStudents?.toLocaleString()} students
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
}
