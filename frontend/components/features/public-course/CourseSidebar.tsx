import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Course } from "@/types";
import { CheckCircle, Download, MessageCircle, Play } from "lucide-react";
import Link from "next/link";

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold">${course.price}</span>
              <span className="text-lg text-muted-foreground line-through">
                ${course.originalPrice}
              </span>
            </div>
            <Badge variant="destructive" className="text-xs">
              25% OFF Limited Time
            </Badge>
          </div>
          <Button className="w-full mb-4" size="lg" asChild>
            <Link href={`/enroll/${course.id}`}>Enroll Now</Link>
          </Button>
          <Separator className="mb-6" />
          <div className="space-y-4">
            <h4 className="font-semibold">This course includes:</h4>
            <ul className="space-y-3">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
