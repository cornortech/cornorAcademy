import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CourseDiscussionsPanel() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Course Discussions</CardTitle>
        <CardDescription>
          Engage with your instructor and fellow students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No discussions yet</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to start a discussion in this course!
          </p>
          <Button>Start Discussion</Button>
        </div>
      </CardContent>
    </Card>
  );
}
