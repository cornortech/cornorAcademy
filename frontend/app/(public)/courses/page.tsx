import Footer from "@/components/shared/footer";
import PublicHeader from "@/components/shared/public-header";
import { CourseCatalog } from "@/components/features/public-course/CourseCatalog";
import { courseApi } from "@/lib/api/course";
import { Course } from "@/types";

export const dynamic = "force-dynamic";

async function getCourses() {
  try {
    return await courseApi.getAllCourses();
  } catch (error) {
    console.error("Failed to load courses:", error);
    return [] as Course[];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader showNav={true} />
      <main className="container mx-auto flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="mt-2 text-muted-foreground">
            Browse available programs and choose your next class.
          </p>
        </div>
        <CourseCatalog courses={courses} />
      </main>
      <Footer />
    </div>
  );
}
