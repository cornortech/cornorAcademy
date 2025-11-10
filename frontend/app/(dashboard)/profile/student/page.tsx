"use client";

import { ChangeEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Student } from "@/types";
import { mockStudentData } from "@/lib/data";
import { StudentProfileCard } from "@/components/features/profile/StudentProfileCard";
import { PersonalInfoTab } from "@/components/features/profile/PersonalInfoTab";
import EducationTab from "@/components/features/profile/EducationTab";
import AccountInfoTable from "@/components/features/profile/AccountInfoTable";
import { ProfileLayout } from "@/components/features/profile/ProfileLayout";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState<Student>(mockStudentData);

  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    dob: "1995-03-15",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    district: "Manhattan",
    pincode: "10001",
    country: "United States",
    about: "Passionate about web development and continuous learning.",
    educationInstitute: "New York University",
    qualification: "Bachelor's in Computer Science",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id
        .replace("std-", "")
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
        .split("-")
        .map((word, i) =>
          i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("")]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in required fields");
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
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
        <StudentProfileCard
          user={user}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing((p) => !p)}
          successMessage={successMessage}
        />
      }
    >
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalInfoTab
            formData={user}
            isEditing={isEditing}
            isSaving={isSaving}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <EducationTab
            formData={user}
            isEditing={isEditing}
            isSaving={isSaving}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountInfoTable
            user={user}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </TabsContent>
      </Tabs>
    </ProfileLayout>
  );
}
