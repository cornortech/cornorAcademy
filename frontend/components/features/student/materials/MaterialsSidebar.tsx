import { CheckCircle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CourseMaterial } from "@/types";

interface MaterialsSidebarProps {
  courseTitle: string;
  instructor: string;
  progress: number;
  materials: CourseMaterial[];
  selectedMaterialId: number;
  onMaterialSelect: (id: number) => void;
}

export function MaterialsSidebar({
  courseTitle,
  instructor,
  progress,
  materials,
  selectedMaterialId,
  onMaterialSelect,
}: MaterialsSidebarProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">{courseTitle}</CardTitle>
        <CardDescription>by {instructor}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Course Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Course Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Separator />

          {/* Materials List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Course Materials</h4>
            <ScrollArea className="h-[400px]">
              <div className="space-y-1">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => onMaterialSelect(material.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedMaterialId === material.id
                        ? "border-primary bg-primary/5"
                        : "border-border/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="shrink-0">
                        {material.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {material.title}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span className="capitalize">{material.type}</span>
                          {material.duration && (
                            <>
                              <span>•</span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {material.duration}
                              </span>
                            </>
                          )}
                          {material.size && (
                            <>
                              <span>•</span>
                              <span>{material.size}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
