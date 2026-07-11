"use client";

import { Loader2, Pin, Megaphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetCourseAnnouncements } from "@/api/announcement";

interface CourseAnnouncementsListProps {
  courseId: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CourseAnnouncementsList({ courseId }: CourseAnnouncementsListProps) {
  const { data: announcements, isLoading, error } = useGetCourseAnnouncements(courseId);

  if (isLoading) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Course Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !announcements) {
    return null;
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">

      <CardHeader>
        <CardTitle>Course Announcements</CardTitle>
        <CardDescription>Important updates from your instructor</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex items-start gap-4 p-4 border border-border/50 rounded-lg"
          >
            <div className="shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                {announcement.isPinned ? (
                  <Pin className="h-4 w-4 text-primary" />
                ) : (
                  <Megaphone className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                {announcement.isPinned && (
                  <span className="text-xs font-medium text-primary">Pinned</span>
                )}
                <h4 className="font-medium">{announcement.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDate(announcement.publishDate)}
              </p>
              <p className="text-sm">{announcement.message}</p>
              {announcement.externalLinks && announcement.externalLinks.length > 0 && (
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {announcement.externalLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline truncate max-w-[200px]"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      
    </Card>
  );
}
