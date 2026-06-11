"use client";

import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { TeacherDialog } from "./TeacherDialog";
import { TeacherList } from "./TeacherList";
import { Teacher } from "@/types";
import { updateTeacherApproval } from "@/lib/api/teacher.api";

interface Props {
  teachers?: Teacher[];
}

export function TeacherManagement({ teachers: propTeachers }: Props) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    if (propTeachers && propTeachers.length > 0) {
      setTeachers(propTeachers.map((t) => ({
        id: t.id,
        uid: t.uid,
        name: t.name,
        email: t.email,
        bio: t.bio || "",
        noOfYearsExperience: t.noOfYearsExperience || 0,
        expertise: t.expertise || "",
        dob: t.dob || "",
        gender: t.gender || "",
        status: t.status || "active",
        isApproved: t.isApproved || false,
        courses: 0,
        avatar: "/placeholder.svg",
      })));
    }
  }, [propTeachers]);

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

  const handleToggleApproval = async (id: string, current: boolean) => {
    try {
      await updateTeacherApproval(id, !current);
      setTeachers(teachers.map((t) =>
        t.id === id ? { ...t, isApproved: !current } : t
      ));
      toast.success(`Teacher ${!current ? "verified" : "unverified"} successfully`);
    } catch {
      toast.error("Failed to update teacher verification");
    }
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
        onToggleApproval={handleToggleApproval}
      />
    </div>
  );
}
