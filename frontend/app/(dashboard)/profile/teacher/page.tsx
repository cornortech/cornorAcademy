"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfessionalInfoTab } from "@/components/features/profile/ProfessionalInfoTab";
import { Teacher } from "@/types";
import { mockTeacherData } from "@/lib/data";
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

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState<Teacher>(mockTeacherData);

  const [formData, setFormData] = useState<TeacherForm>({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@Cornoracademy.com",
    bio: "Experienced full-stack developer and passionate educator with 12+ years in the tech industry.",
    noOfYearsExperience: 12,
    expertise: "Web Development, JavaScript, React, Node.js",
    dob: "1985-07-22",
    gender: "Female",
  });

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
