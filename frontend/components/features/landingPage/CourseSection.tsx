import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Play, Star } from "lucide-react";

import Link from "next/link";

const CourseSection = () => {
  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            {"Popular Courses"}
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {"Discover our most popular courses taught by industry experts."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Web Development Fundamentals",
              instructor: "Sarah Johnson",
              students: 2840,
              rating: 4.9,
              duration: "12 weeks",
              level: "Beginner",
              price: "$299",
            },
            {
              title: "Data Science & Analytics",
              instructor: "Dr. Michael Chen",
              students: 1920,
              rating: 4.8,
              duration: "16 weeks",
              level: "Intermediate",
              price: "$399",
            },
            {
              title: "Digital Marketing Mastery",
              instructor: "Emma Rodriguez",
              students: 3150,
              rating: 4.9,
              duration: "10 weeks",
              level: "Beginner",
              price: "$249",
            },
          ].map((course, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors"
            >
              <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>
                  {"By "}
                  {course.instructor} • {course.students.toLocaleString()}{" "}
                  students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{course.duration}</span>
                  <span className="font-semibold text-foreground">
                    {course.price}
                  </span>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/courses/${index + 1}`}>{"View Details"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">
              {"View All Courses"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
