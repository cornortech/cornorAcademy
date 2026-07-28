import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CourseViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: {
    id: string;
    title: string;
    instructor: string;
    price: number;
    description: string;
    thumbnail?: string;
    isOngoing: boolean;
    status: string;
    created: string;
    enrolled: number;
    completion: number;
    rating?: number;
    startTime?: string;
  };
}

export function CourseViewDialog({ open, onOpenChange, course }: CourseViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">

        <DialogHeader>
          <DialogTitle>{course.title}</DialogTitle>
          <DialogDescription>Course details overview</DialogDescription>
        </DialogHeader>

        {course.thumbnail && (
          <div className="w-full h-48 rounded-md overflow-hidden bg-muted">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Type</span>
            <Badge variant={course.isOngoing ? "default" : "secondary"}>
              {course.isOngoing ? "Live" : "Video"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Instructor</span>
            <span className="font-medium">{course.instructor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium">Rs {course.price}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={course.status === "active" ? "default" : "secondary"}>
              {course.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Enrolled Students</span>
            <span className="font-medium">{course.enrolled}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-medium">{course.completion}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Rating</span>
            <span className="font-medium">{course.rating ?? "Not rated yet"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Created</span>
            <span className="font-medium">{course.created}</span>
          </div>
          {course.description && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-muted-foreground mb-1">Description</p>
              <p className="text-sm leading-relaxed">{course.description}</p>
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
}
