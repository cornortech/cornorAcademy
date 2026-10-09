"use client";

import { useState } from "react";
import { RefreshCw, Video, Radio } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { CourseTable } from "./CourseTable";
import {
  useGetAllCourses,
  useDeleteCourse,
} from "@/api/course";

export function CourseManagement() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courseType, setCourseType] = useState<"all" | "live" | "video">("all");

  const {
    data: courses = [],
    isLoading: loading,
    error: queryError,
    refetch,
  } = useGetAllCourses();
  const deleteCourseMutation = useDeleteCourse();
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    enrolled: course.enrolledStudentsCount || 0,
    isOngoing: course.isOngoing,
    startTime: new Date(course.startDate).toISOString(),
    description: course.description,
    thumbnail: course.thumbnail || "",
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
            onClick={async () => {
              setIsRefreshing(true);
              await refetch();
              setIsRefreshing(false);
            }}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/upload-video-course")}
          >
            <Video className="h-4 w-4 mr-1" />
            Upload Video Course
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/admin/schedule-live-class")}
          >
            <Radio className="h-4 w-4 mr-1" />
            Schedule Live Class
          </Button>
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
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
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
          onDelete={(id: string) => handleDeleteCourse(id)}
          isFetching={isRefreshing}
        />
      )}
    </div>
  );
}
