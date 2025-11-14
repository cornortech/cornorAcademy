import { MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  attendance: number;
  assignments: string;
  avatar: string;
}

interface StudentProgressListProps {
  students: Student[];
}

export function StudentProgressList({ students }: StudentProgressListProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Student Progress Overview</CardTitle>
        <CardDescription>
          Track your students' learning progress and engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={student.avatar || "/placeholder.svg"}
                    alt={student.name}
                  />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {student.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm font-medium">{student.progress}%</div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {student.attendance}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Attendance
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {student.assignments}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Assignments
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {student.lastActive}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last Active
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
