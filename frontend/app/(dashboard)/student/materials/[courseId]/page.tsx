"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { MaterialsNavHeader } from "@/components/features/student/materials/MaterialsNavHeader";
import { MaterialContentHeader } from "@/components/features/student/materials/MaterialContentHeader";
import { MaterialsSidebar } from "@/components/features/student/materials/MaterialsSidebar";
import { VideoPlayer } from "@/components/features/student/materials/VideoPlayer";
import { PDFViewer } from "@/components/features/student/materials/PDFViewer";
import { CodeViewer } from "@/components/features/student/materials/CodeViewer";
import { MaterialInfoTabs } from "@/components/features/student/materials/MaterialInfoTable";
import { useAuth } from "@/contexts/AuthContext";
import { useGetEnrolledCoursesByStudentId } from "@/api/course";
import { Skeleton } from "@/components/ui/skeleton";

export default function MaterialsViewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const materialId = searchParams.get("material");
  const { userData } = useAuth();
  const { data: enrollments, isLoading } = useGetEnrolledCoursesByStudentId(
    userData?.id ?? ""
  );

  const [selectedMaterial, setSelectedMaterial] = useState(
    materialId ? parseInt(materialId) : 1
  );

  const enrolledCourse = enrollments?.find(
    (e) => e.course.id === courseId
  );
  const courseTitle = enrolledCourse?.course.title || "Course";
  const instructor = enrolledCourse?.course.teacher?.name || "Instructor";
  const materials: any[] = [];
  const currentMaterial =
    materials.find((m) => m.id === selectedMaterial) || null;

  const handleMaterialSelect = (id: number) => {
    setSelectedMaterial(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-96 col-span-3 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!enrolledCourse) {
    return <div>Course or material not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <MaterialsNavHeader courseId={courseId} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MaterialsSidebar
              courseTitle={courseTitle}
              instructor={instructor}
              progress={0}
              materials={materials}
              selectedMaterialId={selectedMaterial}
              onMaterialSelect={handleMaterialSelect}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            {currentMaterial ? (
              <>
                <MaterialContentHeader
                  title={currentMaterial.title}
                  description={currentMaterial.description}
                  onPrevious={() => {}}
                  onNext={() => {}}
                  hasPrevious={false}
                  hasNext={false}
                />

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    {currentMaterial.type === "video" && (
                      <VideoPlayer
                        title={currentMaterial.title}
                        duration={currentMaterial.duration || ""}
                        completed={currentMaterial.completed}
                        onMarkComplete={() => {}}
                      />
                    )}
                    {currentMaterial.type === "pdf" && (
                      <PDFViewer
                        title={currentMaterial.title}
                        description={currentMaterial.description || ""}
                        size={currentMaterial.size || ""}
                        pages={currentMaterial.pages || 0}
                        completed={currentMaterial.completed}
                        onMarkComplete={() => {}}
                      />
                    )}
                    {currentMaterial.type === "code" && (
                      <CodeViewer
                        title={currentMaterial.title}
                        description={currentMaterial.description || ""}
                        size={currentMaterial.size || ""}
                        completed={currentMaterial.completed}
                        onMarkComplete={() => {}}
                      />
                    )}
                  </CardContent>
                </Card>

                <MaterialInfoTabs
                  materialType={currentMaterial.type}
                  description={currentMaterial.description}
                  duration={currentMaterial.duration}
                  size={currentMaterial.size}
                  transcript={currentMaterial.transcript}
                />
              </>
            ) : (
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-12 text-center text-muted-foreground">
                  <p>No materials available for this course yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
