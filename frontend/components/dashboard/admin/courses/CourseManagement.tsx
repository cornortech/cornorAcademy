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

export function CourseManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Teachers data for the dialog (you might want to fetch this from API too)
  const teachers = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Using UUID format for backend
      uid: "TCH001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@Cornoracademy.com",
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa7", // Using UUID format for backend
      uid: "TCH002",
      name: "Dr. Michael Chen",
      email: "michael.chen@Cornoracademy.com",
    },
  ];

  // TanStack Query hooks
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

  // Filter courses based on search and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Note: Backend doesn't have status field, so we'll skip status filtering for now
    // const matchesStatus = filterStatus !== "all" ? course.status === filterStatus : true;

    return matchesSearch;
  });

  const handleCreateCourse = async (formData: any) => {
    try {
      // Transform form data to match backend API format
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
        language: "english", // Default value
        level: formData.level || "beginner",
        thumbnail: formData.thumbnail || "",
        category: formData.category || ("WebDevelopment" as CourseCategory),
        startDate: formData.startDate
          ? new Date(formData.startDate)
          : new Date(),
        duration: parseInt(formData.duration) || 12,
        price: parseInt(formData.price) || 299,
        curriculum: [], // You can add curriculum creation logic here
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
        curriculum: [], // Required field for update
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

  // Transform courses for the table component (backward compatibility)
  const transformedCourses = filteredCourses.map((course) => ({
    id: parseInt(course.id), // Convert string ID to number for table compatibility
    title: course.title,
    instructor: course.teacher?.name || "No instructor",
    instructorId: course.teacher?.id || "",
    students: 0, // Backend doesn't provide enrolled count
    price: course.price,
    status: "active", // Default status since backend doesn't have status
    created: new Date(course.createdAt).toLocaleDateString(),
    completion: 0, // You might want to calculate this based on enrolled students
    rating: 4.5, // Default rating
    enrolled: 0, // Backend doesn't provide enrolled count
    startTime: course.startDate.toISOString(),
    description: course.description,
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

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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
          onUpdate={(id: number, formData: any) =>
            handleUpdateCourse(id.toString(), formData)
          }
          onDelete={(id: number) => handleDeleteCourse(id.toString())}
          teachers={teachers}
        />
      )}
    </div>
  );
}
