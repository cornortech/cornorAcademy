import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import { CourseHeader } from "@/components/features/public-course/CourseHeader";
import { OverviewTab } from "@/components/features/public-course/OverviewTab";
import { CurriculumTab } from "@/components/features/public-course/CurriculumTab";
import { InstructorTab } from "@/components/features/public-course/InstructorTab";
import { CourseSidebar } from "@/components/features/public-course/CourseSidebar";
import { getCourseById } from "@/lib/data";

interface CourseDetailsPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader showNav={false} showBackButton={true} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseHeader course={course} />
            <Card className="mb-8">
              <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                <Button size="lg" className="rounded-full h-16 w-16">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            </Card>
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              <OverviewTab course={course} />
              <CurriculumTab course={course} />
              <InstructorTab course={course} />
            </Tabs>
          </div>
          <CourseSidebar course={course} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
