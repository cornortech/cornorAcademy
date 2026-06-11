"use client";

import { useState, useEffect } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { CourseDialog } from "./CourseDialog";
import { CourseTable } from "./CourseTable";
import {
  useGetAllCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  CreateCourseInput,
} from "@/api/course";
import { Course, CourseCategory } from "@/types";
import { getCourseImage } from "@/lib/course-images";

export function CourseManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courseType, setCourseType] = useState<"all" | "live" | "video">("all");

  const teachers = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      uid: "TCH001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@Cornoracademy.com",
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      uid: "TCH002",
      name: "Dr. Michael Chen",
      email: "michael.chen@Cornoracademy.com",
    },
  ];

  const {
    data: courses = [],
    isLoading: loading,
    error: queryError,
    refetch,
  } = useGetAllCourses();
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();

  const error = queryError?.message || null;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesType =
      courseType === "all" ? true :
      courseType === "live" ? course.isOngoing :
      !course.isOngoing;

    return matchesSearch && matchesType;
  });

  const handleCreateCourse = async (formData: any) => {
    try {
      const courseData: CreateCourseInput = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements || [],
        includes: formData.includes || [],
        whatYouWillLearn: formData.outcomes || [],
        meetingUrl: formData.meetingUrl || "",
        meetingTime: formData.startTime
          ? new Date(formData.startTime)
          : new Date(),
        language: "english",
        level: formData.level || "beginner",
        thumbnail: getCourseImage({
          thumbnail: formData.thumbnail,
          category: formData.category || "WebDevelopment",
          title: formData.title,
        }),
        category: formData.category || ("WebDevelopment" as CourseCategory),
        startDate: formData.startDate
          ? new Date(formData.startDate)
          : new Date(),
        duration: parseInt(formData.duration) || 12,
        price: parseInt(formData.price) || 299,
        curriculum: [],
        teacherId: formData.instructorId,
      };

      await createCourseMutation.mutateAsync(courseData);
      setIsCreateDialogOpen(false);
      alert("Course created successfully!");
    } catch (err) {
      console.error("Failed to create course:", err);
      alert("Failed to create course");
    }
  };

  const handleUpdateCourse = async (id: string, formData: any) => {
    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        startDate: formData.startDate
          ? new Date(formData.startDate)
          : undefined,
        duration: parseInt(formData.duration),
        level: formData.level,
        category: formData.category,
        curriculum: [],
      };

      await updateCourseMutation.mutateAsync({ id, data: updateData });
      alert("Course updated successfully!");
    } catch (err) {
      console.error("Failed to update course:", err);
      alert("Failed to update course");
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await deleteCourseMutation.mutateAsync(id);
      alert("Course deleted successfully!");
    } catch (err) {
      console.error("Failed to delete course:", err);
      alert("Failed to delete course");
    }
  };

  const transformedCourses = filteredCourses.map((course) => ({
    id: course.id,
    title: course.title,
    instructor: course.teacher?.name || "No instructor",
    instructorId: course.teacher?.id || "",
    students: 0,
    price: course.price,
    status: "active",
    created: new Date(course.createdAt).toLocaleDateString(),
    completion: 0,
    rating: 4.5,
    enrolled: 0,
    isOngoing: course.isOngoing,
    startTime: new Date(course.startDate).toISOString(),
    description: course.description,
    thumbnail: getCourseImage({
      thumbnail: course.thumbnail,
      category: course.category,
      title: course.title,
    }),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Course Management</h3>
          <p className="text-muted-foreground">
            Create and manage courses, assign teachers
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => refetch()}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <CourseDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            onSubmit={handleCreateCourse}
            teachers={teachers}
            trigger={
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Course
              </Button>
            }
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-1 border-b border-border/50">
        {(["all", "live", "video"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setCourseType(type)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              courseType === type
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {type === "all" ? "All Courses" : type === "live" ? "Live Classes" : "Video Courses"}
          </button>
        ))}
      </div>

      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchPlaceholder="Search courses..."
        filterOptions={[
          { value: "all", label: "All Status" },
          { value: "upcoming", label: "Upcoming" },
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
        ]}
      />

      {loading ? (
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
          Loading courses...
        </div>
      ) : (
        <CourseTable
          courses={transformedCourses}
          onUpdate={(id: string, formData: any) =>
            handleUpdateCourse(id, formData)
          }
          onDelete={(id: string) => handleDeleteCourse(id)}
          teachers={teachers}
        />
      )}
    </div>
  );
}
