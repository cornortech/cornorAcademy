"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Edit, Save, LogOut, Check } from "lucide-react";
import Link from "next/link";

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

  const [formData, setFormData] = useState<TeacherForm>({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@corneracademy.com",
    bio: "Experienced full-stack developer and passionate educator with 12+ years in the tech industry.",
    noOfYearsExperience: 12,
    expertise: "Web Development, JavaScript, React, Node.js",
    dob: "1985-07-22",
    gender: "Female",
  });

  const teacherData = {
    id: "TCH001",
    uid: "uid_teacher_001",
    status: "active",
    totalStudents: 156,
    activeCourses: 3,
    totalVideos: 48,
    avatar: "/teacher-avatar.png",
  };

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Cornor Academy</span>
              </Link>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-card/50 backdrop-blur sticky top-8">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage
                      src={teacherData.avatar || "/placeholder.svg"}
                      alt={formData.name}
                    />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{formData.name}</h2>
                    <p className="text-muted-foreground">{formData.email}</p>
                    <Badge className="mt-2">{teacherData.status}</Badge>
                  </div>
                  <div className="pt-4 space-y-2 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Total Students:
                      </span>
                      <span className="font-medium">
                        {teacherData.totalStudents}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Active Courses:
                      </span>
                      <span className="font-medium">
                        {teacherData.activeCourses}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Videos:</span>
                      <span className="font-medium">
                        {teacherData.totalVideos}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  {successMessage && (
                    <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                      <Check className="h-4 w-4" />
                      <span>{successMessage}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tch-name">Full Name *</Label>
                        <Input
                          id="tch-name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-email">Email *</Label>
                        <Input
                          id="tch-email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-gender">Gender</Label>
                        <Input
                          id="tch-gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-dob">Date of Birth</Label>
                        <Input
                          id="tch-dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tch-bio">Bio *</Label>
                        <textarea
                          id="tch-bio"
                          className="w-full p-2 border border-border rounded-md text-sm disabled:opacity-50"
                          rows={4}
                          value={formData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <Button onClick={handleSave} disabled={isSaving}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tch-experience">
                          Years of Experience *
                        </Label>
                        <Input
                          id="tch-experience"
                          type="number"
                          value={formData.noOfYearsExperience}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-expertise">Expertise Areas *</Label>
                        <Input
                          id="tch-expertise"
                          value={formData.expertise}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-id">Teacher ID</Label>
                        <Input id="tch-id" value={teacherData.id} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-uid">UID</Label>
                        <Input id="tch-uid" value={teacherData.uid} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-status">Status</Label>
                        <Input
                          id="tch-status"
                          value={teacherData.status}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tch-password">Change Password</Label>
                      <Input
                        type="password"
                        id="tch-password"
                        placeholder="New password"
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <Button className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      )}
                    </div>
                    {isEditing && (
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="mt-4"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
