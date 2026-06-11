import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUpcomingClasses } from "@/lib/data";
import { Calendar } from "lucide-react";
import Link from "next/link";

export function UpcomingClassesWidget() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Classes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockUpcomingClasses.map((class_) => (
          <div
            key={class_.id}
            className="p-3 border border-border/50 rounded-lg space-y-2"
          >
            <h4 className="font-medium text-sm">{class_.title}</h4>
            <p className="text-xs text-muted-foreground">{class_.course}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {class_.date} at {class_.time}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              asChild
            >
              <Link href={class_.meetingLink as any} target="_blank">
                Join Meeting
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
