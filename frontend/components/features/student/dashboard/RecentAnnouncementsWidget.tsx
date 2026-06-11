import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseAnnouncementItem } from "@/types";

interface Props {
  announcements: CourseAnnouncementItem[];
}

const RecentAnnouncements = ({ announcements }: Props) => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">Recent Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.length > 0 ? (
          announcements.slice(0, 5).map((announcement) => (
            <div key={announcement.id} className="p-3 border border-border/50 rounded-lg space-y-2">
              <h4 className="font-medium text-sm">{announcement.title}</h4>
              <p className="text-xs text-muted-foreground">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs">{announcement.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No announcements yet</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAnnouncements;
