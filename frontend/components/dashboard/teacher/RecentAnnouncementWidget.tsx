import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRecentAnnouncements } from "@/lib/data";

const RecentAnnouncementWidget = () => {
  const recentAnnouncements = mockRecentAnnouncements;
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">Recent Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-3 border border-border/50 rounded-lg space-y-2"
          >
            <h4 className="font-medium text-sm">{announcement.title}</h4>
            <p className="text-xs text-muted-foreground">
              {announcement.course}
            </p>
            <p className="text-xs">{announcement.message}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{announcement.date}</span>
              <span>{announcement.recipients} recipients</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentAnnouncementWidget;
