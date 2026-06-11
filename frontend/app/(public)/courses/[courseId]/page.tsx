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
import { courseApi } from "@/lib/api/course";
import { getCourseImage } from "@/lib/course-images";
interface FrontendCourse {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: any;
  price: number;
  originalPrice: number;
  duration: string;
  level: string;
  language: string;
  students: number;
  rating: number;
  reviews: number;
  status: string;
  certificate: boolean;
  thumbnail: string;
  modules: { title: string; lessons: number; duration: string; }[];
  features: string[];
  requirements: string[];
  outcomes: string[];
}

function transformCourseForFrontend(backendCourse: any): FrontendCourse {
  return {
    id: backendCourse.id,
    title: backendCourse.title,
    description: backendCourse.description,
    longDescription: backendCourse.description,
    instructor: {
      id: backendCourse.teacher?.id || "",
      uid: "",
      name: backendCourse.teacher?.name || "Unknown Instructor",
      email: "",
      image: backendCourse.teacher?.image || "",
      status: "portalActivated",
      createdAt: "",
      updatedAt: "",
      role: "teacher" as const,
      gender: "other" as const,
      dob: "",
    },
    price: backendCourse.price,
    originalPrice: backendCourse.price * 1.2, // Example markup
    duration: `${backendCourse.duration} weeks`,
    level: backendCourse.level,
    language: backendCourse.language,
    students: backendCourse.enrolledStudentsCount || 0,
    rating: 4.5, // Default rating
    reviews: 150, // Default reviews
    status: backendCourse.status === "active" ? "active" : "draft",
    certificate: true,
    thumbnail: getCourseImage({
      thumbnail: backendCourse.thumbnail,
      category: backendCourse.category,
      title: backendCourse.title,
    }),
    modules: backendCourse.curriculum.map((item: any) => ({
      title: item.title,
      lessons: item.noOfLesson,
      duration: `${item.duration} hours`,
    })),
    features: backendCourse.includes,
    requirements: backendCourse.requirements,
    outcomes: backendCourse.whatYouWillLearn,
  };
}

interface CourseDetailsPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { courseId } = await params;
  
  try {
    const backendCourse = await courseApi.getCourseById(courseId);
    
    if (!backendCourse) {
      notFound();
    }

    const course = transformCourseForFrontend(backendCourse);

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <PublicHeader showNav={false} showBackButton={true} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseHeader course={course as any} />
              <Card className="mb-8">
                <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Button size="lg" className="rounded-full h-16 w-16">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </Card>
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>
                <OverviewTab course={course as any} />
                <CurriculumTab course={course as any} />
                <InstructorTab course={course as any} />
              </Tabs>
            </div>
            <CourseSidebar course={course as any} />
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching course:", error);
    notFound();
  }
}
