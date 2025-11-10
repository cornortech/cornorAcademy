"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { StudentDialog } from "./StudentDialog";
import { StudentList } from "./StudentList";

export function StudentManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [students, setStudents] = useState([
    {
      id: 1,
      uid: "STU001",
      name: "John Smith",
      email: "john.smith@email.com",
      phoneNumber: "+1 (555) 123-4567",
      gender: "Male",
      dob: "1995-03-15",
      address: "123 Main Street",
      city: "New York",
      district: "Manhattan",
      pincode: "10001",
      country: "United States",
      about: "Passionate learner",
      educationInstitute: "NYU",
      qualification: "Bachelor's",
      status: "active",
      courses: 3,
      avatar: "/student-avatar.png",
    },
    // ... more students
  ]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateStudent = (formData: any) => {
    const newStudent = {
      id: Math.max(...students.map((s) => s.id), 0) + 1,
      uid: `STU${String(
        Math.max(...students.map((s) => parseInt(s.uid.slice(3))), 0) + 1
      ).padStart(3, "0")}`,
      ...formData,
      status: "pending",
      courses: 0,
      avatar: "/placeholder.svg",
    };
    setStudents([...students, newStudent]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateStudent = (id: number, formData: any) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, ...formData } : s)));
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Student Management</h3>
          <p className="text-muted-foreground">
            Manage all student accounts and enrollment
          </p>
        </div>
        <StudentDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateStudent}
          trigger={
            <Button>
              <UserPlus className="h-4 w-4 mr-1" />
              Add Student
            </Button>
          }
        />
      </div>

      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchPlaceholder="Search students..."
      />

      <StudentList
        students={filteredStudents}
        onUpdate={handleUpdateStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
}
