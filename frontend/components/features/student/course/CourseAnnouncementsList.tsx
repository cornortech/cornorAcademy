import { FileText, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Announcement {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
}

interface CourseAnnouncementsListProps {
  announcements: Announcement[];
}

export function CourseAnnouncementsList({
  announcements,
}: CourseAnnouncementsListProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Course Announcements</CardTitle>
        <CardDescription>
          Important updates from your instructor
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg"
          >
            <div className="shrink-0">
              {announcement.type === "assignment" && (
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
              )}
              {announcement.type === "schedule" && (
                <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-orange-500" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-medium">{announcement.title}</h4>
              <p className="text-sm">{announcement.message}</p>
              <p className="text-xs text-muted-foreground">
                {announcement.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
