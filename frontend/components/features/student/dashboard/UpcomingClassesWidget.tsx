import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function UpcomingClassesWidget() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
          <Calendar className="h-8 w-8" />
          <p className="text-sm">No upcoming classes</p>
        </div>
      </CardContent>
    </Card>
  );
}
