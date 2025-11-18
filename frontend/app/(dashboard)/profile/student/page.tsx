"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Student } from "@/types";
import { mockStudentData } from "@/lib/data";
import { StudentProfileCard } from "@/components/features/profile/StudentProfileCard";
import { PersonalInfoTab } from "@/components/features/profile/PersonalInfoTab";
import EducationTab from "@/components/features/profile/EducationTab";
import AccountInfoTable from "@/components/features/profile/AccountInfoTable";
import { ProfileLayout } from "@/components/features/profile/ProfileLayout";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/lib/api/auth.service";
import { Loader2 } from "lucide-react";

export default function StudentProfile() {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState<Student | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const profile = await authService.getUserProfile();
      // TODO: Fetch full student data from  backend
      // For now, using the profile data
      setUserData(profile as any);
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setUserData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSave = async () => {
    if (!userData?.name || !userData?.email) {
      alert("Please fill in required fields");
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call

      await authService.updateStudentProfile({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        // ... other fields
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
      await refreshUser();
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!userData) {
    return <div>Error loading profile</div>;
  }

  return (
    <ProfileLayout
      sidebar={
        <StudentProfileCard
          user={userData}
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
            formData={userData}
            isEditing={isEditing}
            isSaving={isSaving}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <EducationTab
            formData={userData}
            isEditing={isEditing}
            isSaving={isSaving}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountInfoTable
            user={userData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </TabsContent>
      </Tabs>
    </ProfileLayout>
  );
}
