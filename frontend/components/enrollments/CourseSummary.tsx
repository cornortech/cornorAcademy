import { Card, CardContent } from "../ui/card";
import { getCourseData } from "./../../data/mock/GetCourseData";
import { Check, Clock, Star, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

const CourseSummary = ({ params }: { params: { courseId: string } }) => {
  const course =  getCourseData(params.courseId);
  return (
    <div className="lg:col-span-1">
      <Card className="border-border/50 bg-card/50 backdrop-blur sticky top-8">
        <CardContent className="p-6">
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={course.imagesrc || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-bold text-lg mb-2">{course.title}</h3>
          <p className="text-muted-foreground mb-4">by {course.instructor.name}</p>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{course.rating}</span>
              <span className="text-sm text-muted-foreground ml-1">
                ({course.reviews})
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm">{course.students} students</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{course.duration}</span>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground line-through">
                ${course.originalPrice}
              </span>
              <Badge variant="destructive">25% OFF</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${course.price}</span>
              <span className="text-sm text-muted-foreground">
                one-time payment
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="font-semibold">What's included:</h4>
            {course.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSummary;
