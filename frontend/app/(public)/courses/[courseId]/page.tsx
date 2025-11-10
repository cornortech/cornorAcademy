import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  ArrowLeft,
  Play,
  CheckCircle,
  Calendar,
  Download,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { getCourseData } from "@/data/mock/GetCourseData";
import CourseHeader from "@/components/course/CourseHeader";
import OverviewTab from "@/components/course/OverviewTab";
import CurriculumTab from "@/components/course/CurriculumTab";
import InstructorTab from "@/components/course/InstructorTab";
import CourseSidebar from "@/components/course/CourseSidebar";
import PublicHeader from "@/components/layouts/public-header";
import { mockCourses } from "@/data/mock/courses";

interface CourseDetailsPageProps {
  params: {
    courseId: string
  }
}


export function generateMetadata({ params }: CourseDetailsPageProps) {
  const course = mockCourses.find((c) => c.id === params.courseId)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: course.title,
    description: course.description,
  }
}

export default async function CourseDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  //   const course = mockCourses.find((c) => c.id === params.courseId)

  // if (!course) {
  //   notFound()
  // }
  const course = await getCourseData(params.courseId);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <PublicHeader showNav={false} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <CourseHeader course={course} />

            {/* Course Preview Video */}
            <Card className="mb-8">
              <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                <Button size="lg" className="rounded-full h-16 w-16">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            </Card>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <OverviewTab params={params} />

              <CurriculumTab params={params} />

              <InstructorTab params={params} />
            </Tabs>
          </div>

          {/* Sidebar */}
          <CourseSidebar params={params} />
        </div>
      </div>
    </div>
  );
}
