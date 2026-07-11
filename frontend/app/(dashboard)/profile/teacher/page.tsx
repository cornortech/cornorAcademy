"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfessionalInfoTab } from "@/components/features/profile/ProfessionalInfoTab";
import { Teacher } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/lib/api/auth.service";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileLayout } from "@/components/features/profile/ProfileLayout";
import { TeacherProfileCard } from "@/components/features/profile/TeacherProfileCard";
import { TeacherPersonalInfoTab } from "@/components/features/profile/TeacherPersonalInfoTab";

type TeacherForm = {
  name: string;
  email: string;
  bio: string;
  noOfYearsExperience: number;
  expertise: string;
  dob: string;
  gender: string;
};

const emptyTeacher: Teacher = {
  id: "",
  uid: "",
  role: "teacher",
  name: "",
  email: "",
  bio: "",
  status: "registered",
  image: "",
  gender: "other",
  dob: "",
  createdAt: "",
  updatedAt: "",
};

export default function TeacherProfile() {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState<Teacher>(emptyTeacher);

  const [formData, setFormData] = useState<TeacherForm>({
    name: "",
    email: "",
    bio: "",
    noOfYearsExperience: 0,
    expertise: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (!userData?.id) return;
    authService.getUserDetails("teacher").then((data) => {
      if (data) {
        const teacher = data as Teacher;
        setUser(teacher);
        setFormData({
          name: teacher.name || "",
          email: teacher.email || "",
          bio: teacher.bio || "",
          noOfYearsExperience: teacher.noOfYearsExperience || 0,
          expertise: teacher.expertise || "",
          dob: teacher.dob || "",
          gender: teacher.gender || "",
        });
      }
      setLoading(false);
    });
  }, [userData?.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const fieldName = id.replace("tch-", "");
    if (fieldName === "experience") {
      setFormData((prev) => ({
        ...prev,
        noOfYearsExperience:
          value === "" ? prev.noOfYearsExperience : Number(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in required fields");
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <ProfileLayout
        sidebar={
          <div className="space-y-4 p-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        }
      >
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout
      sidebar={
        <TeacherProfileCard
          user={user}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing((p) => !p)}
          successMessage={successMessage}
        />
      }
    >
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal & Bio</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <TeacherPersonalInfoTab
            formData={user}
            isEditing={isEditing}
            isSaving={isSaving}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="professional">
          <ProfessionalInfoTab
            formData={user}
            isEditing={isEditing}
            isSaving={isSaving}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />
        </TabsContent>
      </Tabs>
    </ProfileLayout>
  );
}
