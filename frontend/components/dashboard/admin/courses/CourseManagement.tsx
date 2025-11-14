"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { CourseDialog } from "./CourseDialog";
import { CourseTable } from "./CourseTable";

export function CourseManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock teachers data for the dialog
  const teachers = [
    {
      id: 1,
      uid: "TCH001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@Cornoracademy.com",
    },
    {
      id: 2,
      uid: "TCH002",
      name: "Dr. Michael Chen",
      email: "michael.chen@Cornoracademy.com",
    },
  ];

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "Dr. Sarah Johnson",
      instructorId: 1,
      students: 67,
      price: 299,
      status: "active",
      created: "2023-12-01",
      completion: 85,
      rating: 4.8,
      enrolled: 67,
      startTime: "2024-01-20T14:00",
      description: "Learn web development from scratch",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "Dr. Sarah Johnson",
      instructorId: 1,
      students: 45,
      price: 399,
      status: "active",
      created: "2023-11-15",
      completion: 72,
      rating: 4.7,
      enrolled: 45,
      startTime: "2024-01-21T10:00",
      description: "Advanced topics in JavaScript",
    },
    {
      id: 3,
      title: "React Development Mastery",
      instructor: "Dr. Sarah Johnson",
      instructorId: 1,
      students: 44,
      price: 499,
      status: "completed",
      created: "2023-10-01",
      completion: 100,
      rating: 4.9,
      enrolled: 44,
      startTime: "2023-12-01T09:00",
      description: "Master React and its ecosystem",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      instructor: "Dr. Michael Chen",
      instructorId: 2,
      students: 38,
      price: 449,
      status: "active",
      created: "2023-12-15",
      completion: 45,
      rating: 4.6,
      enrolled: 38,
      startTime: "2024-01-22T11:00",
      description: "Introduction to data science principles",
    },
  ]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCourse = (formData: any) => {
    const instructor = teachers.find(
      (t) => t.id === parseInt(formData.instructorId)
    );
    const newCourse = {
      id: Math.max(...courses.map((c) => c.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      instructor: instructor?.name || "Unknown",
      instructorId: parseInt(formData.instructorId),
      price: parseInt(formData.price),
      startTime: formData.startTime,
      status: "active",
      created: new Date().toISOString().split("T")[0],
      completion: 0,
      rating: 0,
      enrolled: 0,
      students: 0,
    };
    setCourses([...courses, newCourse]);
    setIsCreateDialogOpen(false);
    alert("Course created successfully!");
  };

  const handleUpdateCourse = (id: number, formData: any) => {
    setCourses(
      courses.map((c) =>
        c.id === id
          ? {
              ...c,
              title: formData.title || c.title,
              description: formData.description || c.description,
              price: parseInt(formData.price) || c.price,
              startTime: formData.startTime || c.startTime,
            }
          : c
      )
    );
    alert("Course updated successfully!");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id));
    alert("Course deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Course Management</h3>
          <p className="text-muted-foreground">
            Create and manage courses, assign teachers
          </p>
        </div>
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

      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchPlaceholder="Search courses..."
        filterOptions={[
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
        ]}
      />

      <CourseTable
        courses={filteredCourses}
        onUpdate={handleUpdateCourse}
        onDelete={handleDeleteCourse}
        teachers={teachers}
      />
    </div>
  );
}
