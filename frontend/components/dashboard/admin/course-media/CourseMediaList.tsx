"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Video, Image, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseMediaDialog } from "./CourseMediaDialog";
import { CourseMedia } from "@/lib/types/courseMedia";

interface CourseMediaListProps {
  courseId: string;
}

const getMediaIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4" />;
    case "pdf":
      return <FileText className="h-4 w-4" />;
    case "image":
      return <Image className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export function CourseMediaList({ courseId }: CourseMediaListProps) {
  const [media, setMedia] = useState<CourseMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadMedia();
  }, [courseId]);

  const loadMedia = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error("Failed to load course media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (mediaId: string) => {
    try {
      await loadMedia();
    } catch (error) {
      console.error("Failed to delete media:", error);
    }
  };

  if (loading) {
    return <div>Loading media...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Course Media</h3>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getMediaIcon(item.type)}
                <span className="ml-2">{item.title}</span>
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => window.open(item.url, "_blank")}>
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {item.description}
              </p>
              <Badge variant="secondary">{item.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {media.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No media uploaded yet. Click "Add Media" to get started.
        </div>
      )}

      <CourseMediaDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        courseId={courseId}
        onSuccess={loadMedia}
      />
    </div>
  );
}
