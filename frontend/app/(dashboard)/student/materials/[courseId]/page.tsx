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
import { mockEnrolledCourses, getMaterialsForCourse } from "@/lib/data";
import { MaterialInfoTabs } from "@/components/features/student/materials/MaterialInfoTable";

export default function MaterialsViewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const materialId = searchParams.get("material");

  const [selectedMaterial, setSelectedMaterial] = useState(
    materialId ? parseInt(materialId) : 1
  );

  // Fetch data from centralized source
  const course = mockEnrolledCourses.find((c) => c.id === parseInt(courseId));
  const materials = getMaterialsForCourse(courseId);
  const currentMaterial =
    materials.find((m) => m.id === selectedMaterial) || materials[0];

  const handleMaterialSelect = (id: number) => {
    setSelectedMaterial(id);
  };

  const markAsCompleted = (materialId: number) => {
    console.log(`Marking material ${materialId} as completed`);
  };

  const nextMaterial = () => {
    const currentIndex = materials.findIndex((m) => m.id === selectedMaterial);
    if (currentIndex < materials.length - 1) {
      setSelectedMaterial(materials[currentIndex + 1].id);
    }
  };

  const previousMaterial = () => {
    const currentIndex = materials.findIndex((m) => m.id === selectedMaterial);
    if (currentIndex > 0) {
      setSelectedMaterial(materials[currentIndex - 1].id);
    }
  };

  const currentIndex = materials.findIndex((m) => m.id === selectedMaterial);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < materials.length - 1;

  if (!course || !currentMaterial) {
    return <div>Course or material not found</div>;
  }

  const renderMaterialContent = () => {
    switch (currentMaterial.type) {
      case "video":
        return (
          <VideoPlayer
            title={currentMaterial.title}
            duration={currentMaterial.duration || ""}
            completed={currentMaterial.completed}
            onMarkComplete={() => markAsCompleted(currentMaterial.id)}
          />
        );
      case "pdf":
        return (
          <PDFViewer
            title={currentMaterial.title}
            description={currentMaterial.description}
            size={currentMaterial.size || ""}
            pages={currentMaterial.pages || 0}
            completed={currentMaterial.completed}
            onMarkComplete={() => markAsCompleted(currentMaterial.id)}
          />
        );
      case "code":
        return (
          <CodeViewer
            title={currentMaterial.title}
            description={currentMaterial.description}
            size={currentMaterial.size || ""}
            completed={currentMaterial.completed}
            onMarkComplete={() => markAsCompleted(currentMaterial.id)}
          />
        );
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            Unsupported material type
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Header */}
      <MaterialsNavHeader courseId={courseId} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MaterialsSidebar
              courseTitle={course.title}
              instructor={course.instructor}
              progress={course.progress}
              materials={materials}
              selectedMaterialId={selectedMaterial}
              onMaterialSelect={handleMaterialSelect}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Material Title + Navigation */}
            <MaterialContentHeader
              title={currentMaterial.title}
              description={currentMaterial.description}
              onPrevious={previousMaterial}
              onNext={nextMaterial}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />

            {/* Material Viewer */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                {renderMaterialContent()}
              </CardContent>
            </Card>

            {/* Info Tabs */}
            <MaterialInfoTabs
              materialType={currentMaterial.type}
              description={currentMaterial.description}
              duration={currentMaterial.duration}
              size={currentMaterial.size}
              transcript={currentMaterial.transcript}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
