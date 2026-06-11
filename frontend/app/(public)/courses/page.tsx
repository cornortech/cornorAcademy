import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/shared/footer";
import PublicHeader from "@/components/shared/public-header";
import { courseApi } from "@/lib/api/course";
import { getCourseImage } from "@/lib/course-images";
import { Course } from "@/types";
import { Clock, Star, Users } from "lucide-react";
import Link from "next/link";

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
      <PublicHeader showNav={false} showBackButton={true} />
      <main className="container mx-auto flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="mt-2 text-muted-foreground">
            Browse available programs and choose your next class.
          </p>
        </div>

        {courses.length === 0 ? (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-10 text-center text-muted-foreground">
              No courses available right now.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={getCourseImage({
                      thumbnail: course.thumbnail,
                      category: course.category,
                      title: course.title,
                    })}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.5</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-xl">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration} weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.enrolledStudentsCount || 0} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold">
                      Rs {course.price}
                    </span>
                    <Button asChild>
                      <Link href={`/courses/${course.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
