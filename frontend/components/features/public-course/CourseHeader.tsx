import { Badge } from "@/components/ui/badge";
import { Course } from "@/types";
import { Clock, Star, Users, Calendar } from "lucide-react";

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary">{course.level}</Badge>
        <Badge variant="outline">{course.language}</Badge>
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
        {course.title}
      </h1>
      <p className="text-xl text-muted-foreground text-balance mb-6">
        {course.description}
      </p>
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">{course.rating}</span>
          <span>({course.reviews.toLocaleString()} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{course.students.toLocaleString()} students</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{course.duration}</span>
        </div>
      </div>
    </div>
  );
}
