"use client";

import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { StudentDialog } from "./StudentDialog";
import { StudentList } from "./StudentList";
import { Student } from "@/types";

interface Props {
  students?: Student[];
}

export function StudentManagement({ students: propStudents }: Props) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    if (propStudents && propStudents.length > 0) {
      setStudents(propStudents.map((s) => ({
        id: s.id,
        uid: s.uid,
        name: s.name,
        email: s.email,
        phoneNumber: s.phoneNumber || "",
        gender: s.gender || "",
        dob: s.dob || "",
        address: s.address || "",
        city: s.city || "",
        district: s.district || "",
        pincode: s.pincode || "",
        country: s.country || "",
        about: s.about || "",
        educationInstitute: (s as any).educationInstitute || "",
        qualification: (s as any).qualification || "",
        status: s.status || "active",
        courses: 0,
        avatar: "/placeholder.svg",
      })));
    }
  }, [propStudents]);

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
