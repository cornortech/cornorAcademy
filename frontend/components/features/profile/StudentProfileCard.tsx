import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";
import { getInitials } from "@/lib/utils";
import { Edit, Check, Camera } from "lucide-react";
import { ChangeEvent } from "react";

interface StudentProfileCardProps {
  user: Student;
  isEditing: boolean;
  onEditToggle: () => void;
  onImageChange: (file: File) => void;
}

export function StudentProfileCard({
  user,
  isEditing,
  onEditToggle,
  onImageChange,
}: StudentProfileCardProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="p-6 text-center space-y-4">
        <div className="relative inline-block mx-auto">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.image}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <div className="absolute bottom-0 right-0">
              <label
                htmlFor="avatar-upload"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>
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
      </CardContent>
    </Card>
  );
}
