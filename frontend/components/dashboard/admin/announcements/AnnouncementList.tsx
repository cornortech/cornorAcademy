import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AnnouncementList() {
  const announcements = [
    {
      id: 1,
      title: "Platform Maintenance Scheduled",
      content:
        "We will be performing scheduled maintenance on the platform this weekend from 2 AM to 6 AM UTC. Services may be unavailable during this time.",
      type: "maintenance",
      visibility: "all",
      date: "2024-01-20",
      author: "Admin",
    },
    {
      id: 2,
      title: "New Course: Advanced AI & Machine Learning",
      content:
        "We are excited to announce a brand new course on Advanced AI and Machine Learning, taught by industry experts. Enrollment is now open!",
      type: "event",
      visibility: "all",
      date: "2024-01-18",
      author: "Admin",
    },
    {
      id: 3,
      title: "Important: Update Your Profile Information",
      content:
        "Please update your profile information to ensure accuracy in your certificates and course records. Visit your profile settings to make changes.",
      type: "important",
      visibility: "all",
      date: "2024-01-15",
      author: "Admin",
    },
  ];

  return (
    <div className="grid gap-4">
      {announcements.map((announcement) => (
        <Card
          key={announcement.id}
          className="border-border/50 bg-card/50 backdrop-blur"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-bold text-lg">{announcement.title}</h4>
                  <Badge
                    variant={
                      announcement.type === "important"
                        ? "destructive"
                        : announcement.type === "maintenance"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {announcement.type}
                  </Badge>
                  <Badge variant="outline">{announcement.visibility}</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {announcement.content}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Posted by {announcement.author}</span>
                  <span>{announcement.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 ml-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
