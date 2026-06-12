import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";
import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import { CourseHeader } from "@/components/features/public-course/CourseHeader";
import { OverviewTab } from "@/components/features/public-course/OverviewTab";
import { CurriculumTab } from "@/components/features/public-course/CurriculumTab";
import { InstructorTab } from "@/components/features/public-course/InstructorTab";
import { CourseSidebar } from "@/components/features/public-course/CourseSidebar";
import { CourseDetailContent } from "@/components/features/public-course/CourseDetailContent";
import { courseApi } from "@/lib/api/course";
import { getCourseImage } from "@/lib/course-images";
import type { Course, CourseCurriculumItem } from "@/types";

interface InstructorInfo {
  id: string;
  uid: string;
  name: string;
  email: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  role: "teacher";
  gender: "other";
  dob: string;
}

interface FrontendCourse {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: InstructorInfo;
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
  isOngoing: boolean;
  modules: { title: string; lessons: number; duration: string; content: string[]; }[];
  features: string[];
  requirements: string[];
  outcomes: string[];
}

function transformCourseForFrontend(backendCourse: Course): FrontendCourse {
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
      image: "",
      status: "portalActivated",
      createdAt: "",
      updatedAt: "",
      role: "teacher",
      gender: "other",
      dob: "",
    },
    price: backendCourse.price,
    originalPrice: backendCourse.price * 1.2,
    duration: `${backendCourse.duration} weeks`,
    level: backendCourse.level,
    language: backendCourse.language,
    students: backendCourse.enrolledStudentsCount || 0,
    rating: 0,
    reviews: 0,
    status: backendCourse.status === "active" ? "active" : "draft",
    certificate: true,
    thumbnail: getCourseImage({
      thumbnail: backendCourse.thumbnail,
      category: backendCourse.category,
      title: backendCourse.title,
    }),
    isOngoing: backendCourse.isOngoing ?? false,
    modules: backendCourse.curriculum.map((item: CourseCurriculumItem) => ({
      title: item.title,
      lessons: item.noOfLesson,
      duration: `${item.duration} hours`,
      content: item.content || [],
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

  const backendCourse = await courseApi.getCourseById(courseId).catch(() => null);

  if (!backendCourse) {
    notFound();
  }

  const course = transformCourseForFrontend(backendCourse);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader showNav={true} showBackButton={false} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{course.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CourseHeader course={course} />
            <CourseDetailContent
              courseId={courseId}
              thumbnail={course.thumbnail}
              title={course.title}
            >
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
            </CourseDetailContent>
          </div>
          <CourseSidebar course={course} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
