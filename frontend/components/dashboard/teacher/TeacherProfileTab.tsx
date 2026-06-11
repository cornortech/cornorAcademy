"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeacherProfileCard } from "@/components/features/profile/TeacherProfileCard";
import { TeacherPersonalInfoTab } from "@/components/features/profile/TeacherPersonalInfoTab";
import { ProfessionalInfoTab } from "@/components/features/profile/ProfessionalInfoTab";
import type { Teacher } from "@/types";

interface TeacherProfileTabProps {
  teacher: Teacher | null;
}

export function TeacherProfileTab({ teacher }: TeacherProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    _e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!teacher) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No teacher data available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="text-muted-foreground -mt-4">
        Manage your personal and professional information.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <TeacherProfileCard
          user={teacher}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing((p) => !p)}
          successMessage={successMessage}
        />

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal & Bio</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <TeacherPersonalInfoTab
              formData={teacher}
              isEditing={isEditing}
              isSaving={isSaving}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
          </TabsContent>

          <TabsContent value="professional">
            <ProfessionalInfoTab
              formData={teacher}
              isEditing={isEditing}
              isSaving={isSaving}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
