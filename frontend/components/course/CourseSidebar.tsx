import { Card, CardContent } from "../ui/card";
import { getCourseData } from "@/data/mock/GetCourseData";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { CheckCircle, Download, MessageCircle, Play } from "lucide-react";
import { Separator } from "../ui/separator";

const CourseSidebar = ({ params }: { params: { courseId: string } }) => {
  const course = getCourseData(params.courseId);
  return (
    // {/*Course Sidebar */}
    <div className="lg:col-span-1">
      <Card className="sticky top-8">
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

          <Button
            variant="outline"
            className="w-full mb-6 bg-transparent"
            asChild
          >
            <Link href="#preview">
              <Play className="h-4 w-4 mr-2" />
              Preview Course
            </Link>
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

          <Separator className="my-6" />

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Wishlist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSidebar;
