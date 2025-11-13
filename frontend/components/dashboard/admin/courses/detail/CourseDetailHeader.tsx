import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CourseDetailHeaderProps {
  courseTitle: string;
  instructorName: string;
}

export function CourseDetailHeader({
  courseTitle,
  instructorName,
}: CourseDetailHeaderProps) {
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
        <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
        <p className="text-muted-foreground">Instructor: {instructorName}</p>
      </div>
    </>
  );
}
