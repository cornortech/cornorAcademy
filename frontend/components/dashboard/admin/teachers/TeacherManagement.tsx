"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { TeacherDialog } from "./TeacherDialog";
import { TeacherList } from "./TeacherList";

export function TeacherManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      uid: "TCH001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@Cornoracademy.com",
      bio: "Experienced full-stack developer",
      noOfYearsExperience: 12,
      expertise: "Web Development, JavaScript, React",
      dob: "1985-07-22",
      gender: "Female",
      status: "active",
      courses: 3,
      avatar: "/teacher-avatar.png",
    },
    {
      id: 2,
      uid: "TCH002",
      name: "Dr. Michael Chen",
      email: "michael.chen@Cornoracademy.com",
      bio: "Data Science expert",
      noOfYearsExperience: 10,
      expertise: "Python, Machine Learning, Data Analysis",
      dob: "1988-03-15",
      gender: "Male",
      status: "active",
      courses: 2,
      avatar: "/teacher-avatar-2.png",
    },
  ]);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || teacher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTeacher = (formData: any) => {
    const newTeacher = {
      id: Math.max(...teachers.map((t) => t.id), 0) + 1,
      uid: `TCH${String(
        Math.max(...teachers.map((t) => parseInt(t.uid.slice(3))), 0) + 1
      ).padStart(3, "0")}`,
      ...formData,
      noOfYearsExperience: parseInt(formData.noOfYearsExperience),
      status: "active",
      courses: 0,
      avatar: "/placeholder.svg",
    };
    setTeachers([...teachers, newTeacher]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateTeacher = (id: number, formData: any) => {
    setTeachers(
      teachers.map((t) =>
        t.id === id
          ? {
              ...t,
              ...formData,
              noOfYearsExperience: parseInt(formData.noOfYearsExperience),
            }
          : t
      )
    );
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Teacher Management</h3>
          <p className="text-muted-foreground">
            Manage all instructor accounts
          </p>
        </div>
        <TeacherDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateTeacher}
          trigger={
            <Button>
              <UserPlus className="h-4 w-4 mr-1" />
              Add Teacher
            </Button>
          }
        />
      </div>

      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchPlaceholder="Search teachers..."
      />

      <TeacherList
        teachers={filteredTeachers}
        onUpdate={handleUpdateTeacher}
        onDelete={handleDeleteTeacher}
      />
    </div>
  );
}
