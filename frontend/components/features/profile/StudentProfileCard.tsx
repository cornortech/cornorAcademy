import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";
import { getInitials } from "@/lib/utils";
import { Edit, Check } from "lucide-react";

interface StudentProfileCardProps {
  user: Student;
  isEditing: boolean;
  onEditToggle: () => void;
  successMessage?: string;
}

export function StudentProfileCard({
  user,
  isEditing,
  onEditToggle,
  successMessage,
}: StudentProfileCardProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="p-6 text-center space-y-4">
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <Badge className="mt-2">{user.status}</Badge>
        </div>
        <div className="pt-4 space-y-2 border-t border-border/50">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Courses Enrolled:</span>
            <span className="font-medium">
              {user.enrolledCourses?.length ?? 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completed:</span>
            <span className="font-medium">
              {user.completedCourses?.length ?? 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Learning Hours:</span>
            <span className="font-medium">{user.totalLearningHours}</span>
          </div>
        </div>
        <Button className="w-full" onClick={onEditToggle}>
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
        {successMessage && (
          <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-2 rounded">
            <Check className="h-4 w-4" />
            <span>{successMessage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
