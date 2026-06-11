import { CourseManagement } from "@/components/dashboard/admin/courses/CourseManagement";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminCoursesPage() {
  return (
    <>
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseManagement />
      </div>
    </>
  );
}
