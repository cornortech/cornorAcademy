"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCourses } from "@/api/course";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDuration } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const CourseSection = () => {
  const { formatPrice } = useSettings();
  const { data: courses, isLoading } = useGetAllCourses();

  return (
    <section
      id="courses"
      className="py-20"
      aria-labelledby="courses-heading"
      role="region"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            id="courses-heading"
            className="text-3xl lg:text-4xl font-bold text-balance mb-4"
          >
            Popular Courses
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Discover our most popular courses taught by industry experts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border/50 bg-card/50 backdrop-blur">
                  <Skeleton className="aspect-video rounded-t-lg rounded-b-none" />
                  <CardHeader>
                    <Skeleton className="h-5 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : courses && courses.length > 0 ? (
            courses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={index}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors h-full">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>
                      By {course.teacher?.name || "Instructor"} &middot;{" "}
                      {(course.enrolledStudentsCount || 0).toLocaleString()} students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>
                        {course.isOngoing
                          ? `${course.duration} weeks`
                          : formatDuration(course.duration)}
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatPrice(course.price)}
                      </span>
                    </div>
                    <Button className="w-full" asChild aria-label={`View details for ${course.title}`}>
                      <Link href={`/courses/${course.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No courses available at the moment.
            </div>
          )}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="outline" size="lg" asChild aria-label="View all courses">
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseSection;
