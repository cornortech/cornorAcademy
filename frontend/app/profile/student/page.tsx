"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Edit, Save, LogOut, Check } from "lucide-react";
import Link from "next/link";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const studentData = {
    id: "STU001",
    uid: "uid_12345",
    status: "active",
    enrolledCourses: 4,
    completedCourses: 2,
    totalLearningHours: 156,
    avatar: "/student-avatar.png",
  };

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
                <span className="text-xl font-bold">Corner Academy</span>
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
                      src={studentData.avatar || "/placeholder.svg"}
                      alt={formData.name}
                    />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{formData.name}</h2>
                    <p className="text-muted-foreground">{formData.email}</p>
                    <Badge className="mt-2">{studentData.status}</Badge>
                  </div>
                  <div className="pt-4 space-y-2 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Courses Enrolled:
                      </span>
                      <span className="font-medium">
                        {studentData.enrolledCourses}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">
                        {studentData.completedCourses}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Learning Hours:
                      </span>
                      <span className="font-medium">
                        {studentData.totalLearningHours}
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
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
                        <Label htmlFor="std-name">Full Name *</Label>
                        <Input
                          id="std-name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-email">Email *</Label>
                        <Input
                          id="std-email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-phone">Phone Number</Label>
                        <Input
                          id="std-phone"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-gender">Gender</Label>
                        <Input
                          id="std-gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-dob">Date of Birth</Label>
                        <Input
                          id="std-dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-country">Country</Label>
                        <Input
                          id="std-country"
                          value={formData.country}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="std-address">Address</Label>
                        <Input
                          id="std-address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-city">City</Label>
                        <Input
                          id="std-city"
                          value={formData.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-district">District</Label>
                        <Input
                          id="std-district"
                          value={formData.district}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-pincode">Pincode</Label>
                        <Input
                          id="std-pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="std-about">About</Label>
                      <textarea
                        id="std-about"
                        className="w-full p-2 border border-border rounded-md text-sm disabled:opacity-50"
                        rows={4}
                        value={formData.about}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
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

              <TabsContent value="education" className="space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Education Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="std-institute">
                          Education Institute
                        </Label>
                        <Input
                          id="std-institute"
                          value={formData.educationInstitute}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-qualification">Qualification</Label>
                        <Input
                          id="std-qualification"
                          value={formData.qualification}
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
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="std-id">Student ID</Label>
                        <Input id="std-id" value={studentData.id} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-uid">UID</Label>
                        <Input id="std-uid" value={studentData.uid} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-status">Status</Label>
                        <Input
                          id="std-status"
                          value={studentData.status}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="std-password">Change Password</Label>
                      <Input
                        type="password"
                        id="std-password"
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
