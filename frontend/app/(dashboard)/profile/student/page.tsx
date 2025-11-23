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
import { toast } from "sonner";
import ProfileLoader from "./loading";

export default function StudentProfile() {
  const { refreshUser } = useAuth();
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
      const data = await authService.getUserDetails("student");
      if (data) {
        setUserData(data as Student);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setUserData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSelectChange = (field: string, value: string) => {
    setUserData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async () => {
    if (!userData?.name || !userData?.email) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSaving(true);
    try {
      await authService.updateStudentProfile({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        gender: userData.gender,
        dob: userData.dob,
        address: userData.address,
        city: userData.city,
        district: userData.district,
        pincode: userData.pincode,
        country: userData.country,
        about: userData.about,
        educationInstitute: userData.educationInstitute,
        qualification: userData.qualification,
      });

      toast.success("Profile updated successfully!");
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      // setTimeout(() => setSuccessMessage(""), 3000);
      await refreshUser();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <ProfileLoader />;
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
