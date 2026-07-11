"use client";

import { useStudentDashboard } from "@/hooks/use-student-dashboard";
import { AnnouncementCard } from "@/components/shared/AnnouncementCard";

export function StudentAnnouncementsTab() {
  const { announcements, loading } = useStudentDashboard();

  if (loading) {
    return (
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-muted-foreground">Loading announcements...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-muted-foreground">Latest updates from your courses.</p>
      </div>
      {announcements.length > 0 ? (
        <div className="grid gap-4">
          {announcements.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">No announcements yet.</p>
      )}
    </div>
  );
}
