"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import { CourseAnnouncementItem } from "@/types";

interface AnnouncementsTabProps {
  announcements: CourseAnnouncementItem[];
}

export function AnnouncementsTab({ announcements }: AnnouncementsTabProps) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-muted-foreground">Latest updates from your courses.</p>
      </div>
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-start gap-4 p-4 border border-border/50 rounded-lg"
              >
                <div className="shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Megaphone className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm">{announcement.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No announcements yet.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
