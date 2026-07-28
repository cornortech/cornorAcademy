import { useState } from "react";
import { Eye, Trash2, BarChart3, FileEdit } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DeleteConfirmDialog } from "../shared/DeleteConfirmDialog";
import { CourseViewDialog } from "./CourseViewDialog";
import { CourseStatsDialog } from "./CourseStatsDialog";

interface CourseTableProps {
  courses: any[];
  onDelete: (id: string) => void;
  isFetching?: boolean;
}

export function CourseTable({
  courses,
  onDelete,
  isFetching = false,
}: CourseTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingCourse, setViewingCourse] = useState<any | null>(null);
  const [statsCourse, setStatsCourse] = useState<any | null>(null);

  return (
    <div style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 300ms" }}>
    <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-3 text-left font-medium">Course Title</th>
              <th className="px-6 py-3 text-left font-medium">Type</th>
              <th className="px-6 py-3 text-left font-medium">Instructor</th>
              <th className="px-6 py-3 text-left font-medium">Students</th>
              <th className="px-6 py-3 text-left font-medium">Price</th>
              <th className="px-6 py-3 text-left font-medium">Progress</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-border/50 last:border-b-0 hover:bg-accent/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium">{course.title}</td>
                <td className="px-6 py-4">
                  <Badge variant={course.isOngoing ? "default" : "secondary"}>
                    {course.isOngoing ? "Live" : "Video"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {course.instructor}
                </td>
                <td className="px-6 py-4">{course.enrolled}</td>
                <td className="px-6 py-4">Rs {course.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                    <span className="text-xs">{course.completion}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      course.status === "active" ? "default" : "secondary"
                    }
                  >
                    {course.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => setViewingCourse(course)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                          <Link href={`/teacher/edit-video-course/${course.id}`}>
                            <FileEdit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Course</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => setStatsCourse(course)}
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Stats</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => setDeletingId(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>

                    {viewingCourse?.id === course.id && (
                      <CourseViewDialog
                        open={true}
                        onOpenChange={(open) => !open && setViewingCourse(null)}
                        course={viewingCourse}
                      />
                    )}

                    {statsCourse?.id === course.id && (
                      <CourseStatsDialog
                        open={true}
                        onOpenChange={(open) => !open && setStatsCourse(null)}
                        course={statsCourse}
                      />
                    )}

                    <DeleteConfirmDialog
                      open={deletingId === course.id}
                      onOpenChange={(open) => !open && setDeletingId(null)}
                      title="Delete Course"
                      description={`Are you sure you want to delete ${course.title}? This action cannot be undone.`}
                      onConfirm={() => {
                        onDelete(course.id);
                        setDeletingId(null);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
}
