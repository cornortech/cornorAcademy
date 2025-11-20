import {
  Play,
  Eye,
  Download,
  CheckCircle,
  Video,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Material {
  id: number;
  title: string;
  type: string;
  duration?: string;
  size?: string;
  completed: boolean;
  url: string;
}

interface CourseMaterialsListProps {
  courseId: string;
  materials: Material[];
}

export function CourseMaterialsList({
  courseId,
  materials,
}: CourseMaterialsListProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle>Course Materials</CardTitle>
        <CardDescription>
          Access all videos, documents, and resources for this course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {materials.map((material) => (
            <div
              key={material.id}
              className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  {material.type === "video" ? (
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Video className="h-5 w-5 text-blue-500" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{material.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {material.type === "video"
                      ? `Duration: ${material.duration}`
                      : `Size: ${material.size}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {material.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/student/materials/${courseId}?material=${material.id}`}
                  >
                    {material.type === "video" ? (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        {material.completed ? "Rewatch" : "Watch"}
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </>
                    )}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
