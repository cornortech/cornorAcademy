"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  UserPlus,
  Bell,
  BarChart3,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

type UnifiedFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
  country: string;
  about: string;
  educationInstitute: string;
  qualification: string;
  bio: string;
  noOfYearsExperience: string;
  expertise: string;
  title: string;
  price: string;
  startTime: string;
  description: string;
};

const initialFormState: UnifiedFormData = {
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  dob: "",
  address: "",
  city: "",
  district: "",
  pincode: "",
  country: "",
  about: "",
  educationInstitute: "",
  qualification: "",
  bio: "",
  noOfYearsExperience: "",
  expertise: "",
  title: "",
  price: "",
  startTime: "",
  description: "",
};

export default function AdminDashboard() {
  const [isCreateStudentDialogOpen, setIsCreateStudentDialogOpen] =
    useState(false);
  const [isCreateTeacherDialogOpen, setIsCreateTeacherDialogOpen] =
    useState(false);
  const [isCreateCourseDialogOpen, setIsCreateCourseDialogOpen] =
    useState(false);
  const [isEditingStudent, setIsEditingStudent] = useState<number | null>(null);
  const [isEditingTeacher, setIsEditingTeacher] = useState<number | null>(null);
  const [isEditingCourse, setIsEditingCourse] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: string;
    id: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [students, setStudents] = useState([
    {
      id: 1,
      uid: "STU001",
      name: "John Smith",
      email: "john.smith@email.com",
      phoneNumber: "+1 (555) 123-4567",
      gender: "Male",
      dob: "1995-03-15",
      address: "123 Main Street",
      city: "New York",
      district: "Manhattan",
      pincode: "10001",
      country: "United States",
      about: "Passionate learner",
      educationInstitute: "NYU",
      qualification: "Bachelor's",
      status: "active",
      courses: 3,
      avatar: "/student-avatar.png",
    },
    {
      id: 2,
      uid: "STU002",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phoneNumber: "+1 (555) 234-5678",
      gender: "Female",
      dob: "1996-07-20",
      address: "456 Oak Ave",
      city: "Los Angeles",
      district: "Downtown",
      pincode: "90001",
      country: "United States",
      about: "Tech enthusiast",
      educationInstitute: "UCLA",
      qualification: "Bachelor's",
      status: "pending",
      courses: 1,
      avatar: "/student-avatar-2.png",
    },
  ]);

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      uid: "TCH001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@corneracademy.com",
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
      email: "michael.chen@corneracademy.com",
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

  const [courseManagement, setCourseManagement] = useState([
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "Dr. Sarah Johnson",
      instructorId: 1,
      students: 67,
      price: 299,
      status: "active",
      created: "2023-12-01",
      completion: 85,
      rating: 4.8,
      enrolled: 67,
      startTime: "2024-01-20 14:00",
      description: "Learn web development from scratch",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "Dr. Sarah Johnson",
      instructorId: 1,
      students: 45,
      price: 399,
      status: "active",
      created: "2023-11-15",
      completion: 72,
      rating: 4.7,
      enrolled: 45,
      startTime: "2024-01-21 10:00",
      description: "Advanced topics in JavaScript",
    },
    {
      id: 3,
      title: "React Development Mastery",
      instructor: "Dr. Sarah Johnson",
      instructorId: 1,
      students: 44,
      price: 499,
      status: "completed",
      created: "2023-10-01",
      completion: 100,
      rating: 4.9,
      enrolled: 44,
      startTime: "2023-12-01 09:00",
      description: "Master React and its ecosystem",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      instructor: "Dr. Emily Davis",
      instructorId: 2,
      students: 38,
      price: 449,
      status: "active",
      created: "2023-12-15",
      completion: 45,
      rating: 4.6,
      enrolled: 38,
      startTime: "2024-01-22 11:00",
      description: "Introduction to data science principles",
    },
  ]);

  // Mock data for payment (kept from original, might need adjustments based on new data structures if applicable)
  const paymentData = [
    {
      id: 1,
      student: "John Smith",
      course: "Web Development Fundamentals",
      amount: 299,
      status: "completed",
      date: "2024-01-15",
      method: "Credit Card",
    },
    {
      id: 2,
      student: "Sarah Wilson",
      course: "Advanced JavaScript Concepts",
      amount: 399,
      status: "pending",
      date: "2024-01-12",
      method: "PayPal",
    },
    {
      id: 3,
      student: "Michael Brown",
      course: "React Development Mastery",
      amount: 499,
      status: "completed",
      date: "2024-01-08",
      method: "Credit Card",
    },
    {
      id: 4,
      student: "Emma Davis",
      course: "Data Science Fundamentals",
      amount: 449,
      status: "failed",
      date: "2024-01-10",
      method: "Bank Transfer",
    },
  ];

  const [formData, setFormData] = useState<UnifiedFormData>(initialFormState);

  // CHANGE: Added comprehensive student management functions
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill required fields");
      return;
    }
    const newStudent = {
      id: Math.max(...students.map((s) => s.id), 0) + 1,
      uid: `STU${String(
        Math.max(...students.map((s) => Number.parseInt(s.uid.slice(3))), 0) + 1
      ).padStart(3, "0")}`,
      ...formData,
      status: "pending",
      courses: 0,
      avatar: "/placeholder.svg",
    };
    setStudents([...students, newStudent]);
    setFormData(initialFormState);
    setIsCreateStudentDialogOpen(false);
    alert("Student created successfully!");
  };

  const handleUpdateStudent = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    setStudents(students.map((s) => (s.id === id ? { ...s, ...formData } : s)));
    setIsEditingStudent(null);
    setFormData(initialFormState);
    alert("Student updated successfully!");
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
    setDeleteConfirm(null);
    alert("Student deleted successfully!");
  };

  // CHANGE: Added comprehensive teacher management functions
  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.noOfYearsExperience) {
      alert("Please fill required fields");
      return;
    }
    const newTeacher = {
      id: Math.max(...teachers.map((t) => t.id), 0) + 1,
      uid: `TCH${String(
        Math.max(...teachers.map((t) => Number.parseInt(t.uid.slice(3))), 0) + 1
      ).padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      noOfYearsExperience: Number.parseInt(formData.noOfYearsExperience),
      expertise: formData.expertise,
      dob: formData.dob,
      gender: formData.gender,
      status: "active",
      courses: 0,
      avatar: "/placeholder.svg",
    };
    setTeachers([...teachers, newTeacher]);
    setFormData(initialFormState);
    setIsCreateTeacherDialogOpen(false);
    alert("Teacher created successfully!");
  };

  const handleUpdateTeacher = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    setTeachers(
      teachers.map((t) =>
        t.id === id
          ? {
              ...t,
              name: formData.name,
              email: formData.email,
              bio: formData.bio,
              noOfYearsExperience: Number.parseInt(
                formData.noOfYearsExperience
              ),
              expertise: formData.expertise,
              gender: formData.gender,
              dob: formData.dob,
            }
          : t
      )
    );
    setIsEditingTeacher(null);
    setFormData(initialFormState);
    alert("Teacher updated successfully!");
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter((t) => t.id !== id));
    setDeleteConfirm(null);
    alert("Teacher deleted successfully!");
  };

  // CHANGE: Added comprehensive course management functions
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Please fill required fields");
      return;
    }
    const newCourse = {
      id: Math.max(...courseManagement.map((c) => c.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      instructor:
        teachers.find((t) => t.id === Number.parseInt(formData.name))?.name ||
        "Unknown", // Corrected instructor name lookup
      instructorId: Number.parseInt(formData.name),
      price: Number.parseInt(formData.price),
      startTime: formData.startTime,
      status: "active",
      created: new Date().toISOString().split("T")[0],
      completion: 0,
      rating: 0,
      enrolled: 0,
      students: 0,
    };
    setCourseManagement([...courseManagement, newCourse]);
    setFormData(initialFormState);
    setIsCreateCourseDialogOpen(false);
    alert("Course created successfully!");
  };

  const handleUpdateCourse = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    setCourseManagement(
      courseManagement.map((c) =>
        c.id === id
          ? {
              ...c,
              title: formData.title || c.title,
              description: formData.description || c.description,
              price: Number.parseInt(formData.price) || c.price,
              startTime: formData.startTime || c.startTime,
            }
          : c
      )
    );
    setIsEditingCourse(null);
    setFormData(initialFormState);
    alert("Course updated successfully!");
  };

  const handleDeleteCourse = (id: number) => {
    setCourseManagement(courseManagement.filter((c) => c.id !== id));
    setDeleteConfirm(null);
    alert("Course deleted successfully!");
  };

  const adminData = {
    name: "Admin User",
    email: "admin@corneracademy.com",
    avatar: "/admin-avatar.png",
  };

  const systemStats = {
    totalUsers: 1247,
    totalStudents: students.length,
    totalTeachers: teachers.length,
    totalCourses: courseManagement.length,
    activeCourses: courseManagement.filter((c) => c.status === "active").length,
    totalRevenue: 125400,
    monthlyRevenue: 18750,
    completionRate: 78,
  };

  // Mock data for system activity (kept from original)
  const systemActivity = [
    {
      id: 1,
      type: "user_registration",
      description: "New student registered: John Smith",
      timestamp: "2 hours ago",
      severity: "info",
    },
    {
      id: 2,
      type: "course_completion",
      description:
        "Course completed: React Development Mastery by Sarah Wilson",
      timestamp: "4 hours ago",
      severity: "success",
    },
    {
      id: 3,
      type: "payment_failed",
      description: "Payment failed for Emma Davis - Data Science Fundamentals",
      timestamp: "6 hours ago",
      severity: "warning",
    },
    {
      id: 4,
      type: "teacher_added",
      description: "New teacher added: Dr. Emily Davis",
      timestamp: "1 day ago",
      severity: "info",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || teacher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredCourses = courseManagement.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Corner Academy</span>
              </Link>
              <Badge variant="destructive">Admin Portal</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={adminData.avatar || "/placeholder.svg"}
                    alt={adminData.name}
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{adminData.name}</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage students, teachers, courses, and system settings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemStats.totalStudents + systemStats.totalTeachers}
              </div>
              <p className="text-xs text-muted-foreground">
                {systemStats.totalStudents} students,{" "}
                {systemStats.totalTeachers} teachers
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemStats.activeCourses}
              </div>
              <p className="text-xs text-muted-foreground">
                {systemStats.totalCourses} total courses
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${systemStats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                ${systemStats.totalRevenue.toLocaleString()} total
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemStats.completionRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                Average course completion
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="enrollment-requests">
              Enrollment Requests
            </TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Student Management</h3>
                <p className="text-muted-foreground">
                  Manage all student accounts and enrollment
                </p>
              </div>
              <Dialog
                open={isCreateStudentDialogOpen}
                onOpenChange={setIsCreateStudentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Student</DialogTitle>
                    <DialogDescription>
                      Add a new student account to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleCreateStudent}
                    className="grid gap-4 py-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="std-name">Full Name *</Label>
                        <Input
                          id="std-name"
                          placeholder="Enter full name"
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-email">Email *</Label>
                        <Input
                          id="std-email"
                          type="email"
                          placeholder="student@email.com"
                          value={formData.email || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-phone">Phone Number</Label>
                        <Input
                          id="std-phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phoneNumber || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-gender">Gender</Label>
                        <Select
                          value={formData.gender || ""}
                          onValueChange={(v) =>
                            setFormData({ ...formData, gender: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-dob">Date of Birth</Label>
                        <Input
                          id="std-dob"
                          type="date"
                          value={formData.dob || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-country">Country</Label>
                        <Input
                          id="std-country"
                          placeholder="United States"
                          value={formData.country || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="std-address">Address</Label>
                        <Input
                          id="std-address"
                          placeholder="Street address"
                          value={formData.address || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-city">City</Label>
                        <Input
                          id="std-city"
                          placeholder="City"
                          value={formData.city || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-district">District</Label>
                        <Input
                          id="std-district"
                          placeholder="District"
                          value={formData.district || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              district: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-pincode">Pincode</Label>
                        <Input
                          id="std-pincode"
                          placeholder="Postal code"
                          value={formData.pincode || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pincode: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-institute">
                          Education Institute
                        </Label>
                        <Input
                          id="std-institute"
                          placeholder="School/University"
                          value={formData.educationInstitute || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              educationInstitute: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="std-qualification">Qualification</Label>
                        <Input
                          id="std-qualification"
                          placeholder="Bachelor's, Master's, etc."
                          value={formData.qualification || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              qualification: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="std-about">About</Label>
                        <Textarea
                          id="std-about"
                          placeholder="Brief description about the student"
                          rows={3}
                          value={formData.about || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, about: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Student</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Students List */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border-b border-border/50 last:border-b-0 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.email}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant={
                                student.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {student.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {student.uid}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {student.courses} courses
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {student.city}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>
                                  {student.name} - Details
                                </DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Name
                                    </p>
                                    <p className="font-medium">
                                      {student.name}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Email
                                    </p>
                                    <p className="font-medium">
                                      {student.email}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Phone
                                    </p>
                                    <p className="font-medium">
                                      {student.phoneNumber}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Status
                                    </p>
                                    <Badge>{student.status}</Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      City
                                    </p>
                                    <p className="font-medium">
                                      {student.city}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Country
                                    </p>
                                    <p className="font-medium">
                                      {student.country}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={isEditingStudent === student.id}
                            onOpenChange={(open) =>
                              !open && setIsEditingStudent(null)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditingStudent(student.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Student</DialogTitle>
                              </DialogHeader>
                              <form
                                onSubmit={(e) =>
                                  handleUpdateStudent(student.id, e)
                                }
                                className="grid gap-4 py-4"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                      defaultValue={student.name}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                      type="email"
                                      defaultValue={student.email}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input
                                      defaultValue={student.phoneNumber}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          phoneNumber: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>City</Label>
                                    <Input
                                      defaultValue={student.city}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          city: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Update Student</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <AlertDialog
                            open={
                              deleteConfirm?.type === "student" &&
                              deleteConfirm?.id === student.id
                            }
                            onOpenChange={(open) =>
                              !open && setDeleteConfirm(null)
                            }
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "student",
                                  id: student.id,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Student
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {student.name}
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteStudent(student.id)
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Teacher Management</h3>
                <p className="text-muted-foreground">
                  Manage all instructor accounts
                </p>
              </div>
              <Dialog
                open={isCreateTeacherDialogOpen}
                onOpenChange={setIsCreateTeacherDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Teacher</DialogTitle>
                    <DialogDescription>
                      Add a new teacher account to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleCreateTeacher}
                    className="grid gap-4 py-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tch-name">Full Name *</Label>
                        <Input
                          id="tch-name"
                          placeholder="Dr. Name"
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-email">Email *</Label>
                        <Input
                          id="tch-email"
                          type="email"
                          placeholder="teacher@corneracademy.com"
                          value={formData.email || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-gender">Gender</Label>
                        <Select
                          value={formData.gender || ""}
                          onValueChange={(v) =>
                            setFormData({ ...formData, gender: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-dob">Date of Birth</Label>
                        <Input
                          id="tch-dob"
                          type="date"
                          value={formData.dob || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-experience">
                          Years of Experience *
                        </Label>
                        <Input
                          id="tch-experience"
                          type="number"
                          placeholder="10"
                          value={formData.noOfYearsExperience || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              noOfYearsExperience: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tch-expertise">Expertise *</Label>
                        <Input
                          id="tch-expertise"
                          placeholder="e.g., Web Development, Python, etc."
                          value={formData.expertise || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expertise: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tch-bio">Bio *</Label>
                        <Textarea
                          id="tch-bio"
                          placeholder="Professional biography and qualifications"
                          rows={3}
                          value={formData.bio || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Teacher</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teachers..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Teachers List */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center justify-between p-4 border-b border-border/50 last:border-b-0 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={teacher.avatar || "/placeholder.svg"}
                            alt={teacher.name}
                          />
                          <AvatarFallback>
                            {teacher.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{teacher.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {teacher.email}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant={
                                teacher.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {teacher.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {teacher.noOfYearsExperience} years
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {teacher.courses} courses
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {teacher.expertise.split(",")[0]}
                          </p>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
        
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>
                                  {teacher.name} - Details
                                </DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Name
                                    </p>
                                    <p className="font-medium">
                                      {teacher.name}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Email
                                    </p>
                                    <p className="font-medium">
                                      {teacher.email}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Experience
                                    </p>
                                    <p className="font-medium">
                                      {teacher.noOfYearsExperience} years
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Status
                                    </p>
                                    <Badge>{teacher.status}</Badge>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm text-muted-foreground">
                                      Bio
                                    </p>
                                    <p className="font-medium">{teacher.bio}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={isEditingTeacher === teacher.id}
                            onOpenChange={(open) =>
                              !open && setIsEditingTeacher(null)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditingTeacher(teacher.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Edit Teacher</DialogTitle>
                              </DialogHeader>
                              <form
                                onSubmit={(e) =>
                                  handleUpdateTeacher(teacher.id, e)
                                }
                                className="grid gap-4 py-4"
                              >
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                      defaultValue={teacher.name}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                      type="email"
                                      defaultValue={teacher.email}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Years of Experience</Label>
                                    <Input
                                      type="number"
                                      defaultValue={teacher.noOfYearsExperience}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          noOfYearsExperience: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Bio</Label>
                                    <Textarea
                                      defaultValue={teacher.bio}
                                      rows={3}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          bio: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Update Teacher</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <AlertDialog
                            open={
                              deleteConfirm?.type === "teacher" &&
                              deleteConfirm?.id === teacher.id
                            }
                            onOpenChange={(open) =>
                              !open && setDeleteConfirm(null)
                            }
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "teacher",
                                  id: teacher.id,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Teacher
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {teacher.name}
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteTeacher(teacher.id)
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab - Fully implemented with course management table */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Course Management</h3>
                <p className="text-muted-foreground">
                  Create and manage courses, assign teachers
                </p>
              </div>
              <Dialog
                open={isCreateCourseDialogOpen}
                onOpenChange={setIsCreateCourseDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Create Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                      Set up a new course with instructor assignment.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleCreateCourse}
                    className="grid gap-4 py-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="course-title">Course Title</Label>
                      <Input
                        id="course-title"
                        placeholder="Enter course title"
                        value={formData.title || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-description">Description</Label>
                      <Textarea
                        id="course-description"
                        placeholder="Course description"
                        rows={3}
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course-price">Price ($)</Label>
                        <Input
                          id="course-price"
                          type="number"
                          placeholder="299"
                          value={formData.price || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course-duration">
                          Duration (weeks)
                        </Label>
                        <Input
                          id="course-duration"
                          type="number"
                          placeholder="12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-start">Course Start Time</Label>
                      <Input
                        id="course-start"
                        type="datetime-local"
                        value={formData.startTime || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-instructor">
                        Assign Instructor
                      </Label>
                      <Select
                        value={formData.name || ""}
                        onValueChange={(v) =>
                          setFormData({ ...formData, name: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select instructor" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem
                              key={teacher.id}
                              value={teacher.id.toString()}
                            >
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Course</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Courses Table */}
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="px-6 py-3 text-left font-medium">
                        Course Title
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left font-medium">Price</th>
                      <th className="px-6 py-3 text-left font-medium">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b border-border/50 last:border-b-0 hover:bg-accent/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">
                          {course.title}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {course.instructor}
                        </td>
                        <td className="px-6 py-4">{course.enrolled}</td>
                        <td className="px-6 py-4">${course.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${course.completion}%` }}
                              />
                            </div>
                            <span className="text-xs">
                              {course.completion}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              course.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {course.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <Button variant="outline" size="sm" asChild>
                              <Link
                                href={`/dashboard/admin/courses/${course.id}`}
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>

                            <Dialog
                              open={isEditingCourse === course.id}
                              onOpenChange={(open) =>
                                !open && setIsEditingCourse(null)
                              }
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setIsEditingCourse(course.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Course</DialogTitle>
                                </DialogHeader>
                                <form
                                  onSubmit={(e) =>
                                    handleUpdateCourse(course.id, e)
                                  }
                                  className="grid gap-4 py-4"
                                >
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Course Title</Label>
                                      <Input
                                        defaultValue={course.title}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            title: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Description</Label>
                                      <Textarea
                                        defaultValue={course.description}
                                        rows={3}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            description: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Price</Label>
                                      <Input
                                        type="number"
                                        defaultValue={course.price}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            price: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Start Time</Label>
                                      <Input
                                        type="datetime-local"
                                        defaultValue={course.startTime}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            startTime: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Update Course</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>

                            <Button variant="outline" size="sm" asChild>
                              <Link
                                href={`/dashboard/admin/courses/${course.id}/payments`}
                              >
                                <BarChart3 className="h-4 w-4" />
                              </Link>
                            </Button>

                            <AlertDialog
                              open={
                                deleteConfirm?.type === "course" &&
                                deleteConfirm?.id === course.id
                              }
                              onOpenChange={(open) =>
                                !open && setDeleteConfirm(null)
                              }
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: "course",
                                    id: course.id,
                                  })
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Course
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete{" "}
                                    {course.title}? This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteCourse(course.id)
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="enrollment-requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Course Enrollment Requests
                </h3>
                <p className="text-muted-foreground">
                  Review and manage pending course enrollment requests
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name or course..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Enrollment Requests Table */}
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="px-6 py-3 text-left font-medium">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Course Title
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Request Date
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Payment Screenshot
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        studentName: "John Smith",
                        studentEmail: "john.smith@email.com",
                        courseTitle: "Web Development Fundamentals",
                        courseId: 1,
                        paymentScreenshotUrl: "/generic-payment-screenshot.png",
                        status: "pending",
                        createdAt: "2024-01-20",
                        amount: 299,
                      },
                      {
                        id: 2,
                        studentName: "Sarah Wilson",
                        studentEmail: "sarah.wilson@email.com",
                        courseTitle: "Advanced JavaScript Concepts",
                        courseId: 2,
                        paymentScreenshotUrl: "/generic-payment-screenshot.png",
                        status: "pending",
                        createdAt: "2024-01-19",
                        amount: 399,
                      },
                      {
                        id: 3,
                        studentName: "Michael Brown",
                        studentEmail: "michael.brown@email.com",
                        courseTitle: "React Development Mastery",
                        courseId: 3,
                        paymentScreenshotUrl: "/generic-payment-screenshot.png",
                        status: "approved",
                        createdAt: "2024-01-18",
                        amount: 499,
                      },
                      {
                        id: 4,
                        studentName: "Emma Davis",
                        studentEmail: "emma.davis@email.com",
                        courseTitle: "Data Science Fundamentals",
                        courseId: 4,
                        paymentScreenshotUrl: "/generic-payment-screenshot.png",
                        status: "rejected",
                        createdAt: "2024-01-17",
                        amount: 449,
                      },
                    ].map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-border/50 last:border-b-0 hover:bg-accent/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{request.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              {request.studentEmail}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">{request.courseTitle}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {request.createdAt}
                        </td>
                        <td className="px-6 py-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Payment Screenshot - {request.studentName}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">
                                    Course: {request.courseTitle}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Amount: ${request.amount}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Request Date: {request.createdAt}
                                  </p>
                                </div>
                                <div className="border border-border rounded-lg overflow-hidden">
                                  <img
                                    src={
                                      request.paymentScreenshotUrl ||
                                      "/placeholder.svg"
                                    }
                                    alt="Payment screenshot"
                                    className="w-full h-auto"
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              request.status === "approved"
                                ? "default"
                                : request.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {request.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            {request.status === "pending" && (
                              <>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-green-50 hover:bg-green-100"
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[400px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Approve Enrollment Request
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div>
                                        <p className="text-sm font-medium mb-2">
                                          Student: {request.studentName}
                                        </p>
                                        <p className="text-sm text-muted-foreground mb-4">
                                          Course: {request.courseTitle}
                                        </p>
                                        <p className="text-sm text-muted-foreground mb-4">
                                          Amount: ${request.amount}
                                        </p>
                                        <p className="text-sm">
                                          Are you sure you want to approve this
                                          enrollment request? The student will
                                          be automatically enrolled in the
                                          course.
                                        </p>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline">Cancel</Button>
                                      <Button className="bg-green-600 hover:bg-green-700">
                                        Approve Enrollment
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-red-50 hover:bg-red-100"
                                    >
                                      <AlertCircle className="h-4 w-4 text-red-600" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[400px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Reject Enrollment Request
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div>
                                        <p className="text-sm font-medium mb-2">
                                          Student: {request.studentName}
                                        </p>
                                        <p className="text-sm text-muted-foreground mb-4">
                                          Course: {request.courseTitle}
                                        </p>
                                        <div className="space-y-3">
                                          <div className="space-y-2">
                                            <Label htmlFor="rejection-reason">
                                              Reason for Rejection (Optional)
                                            </Label>
                                            <Textarea
                                              id="rejection-reason"
                                              placeholder="Enter reason for rejecting this enrollment request..."
                                              rows={4}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline">Cancel</Button>
                                      <Button variant="destructive">
                                        Reject Request
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </>
                            )}
                            {request.status === "approved" && (
                              <Badge
                                variant="default"
                                className="w-full justify-center"
                              >
                                Approved
                              </Badge>
                            )}
                            {request.status === "rejected" && (
                              <Badge
                                variant="destructive"
                                className="w-full justify-center"
                              >
                                Rejected
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Platform Announcements
                </h3>
                <p className="text-muted-foreground">
                  Create and manage announcements for students and teachers
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Create Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Announcement</DialogTitle>
                    <DialogDescription>
                      Post an announcement visible to all students and teachers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="announce-title">Announcement Title</Label>
                      <Input
                        id="announce-title"
                        placeholder="Enter announcement title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announce-content">Content</Label>
                      <Textarea
                        id="announce-content"
                        placeholder="Write your announcement here..."
                        rows={5}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="announce-type">Announcement Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="important">Important</SelectItem>
                            <SelectItem value="update">Update</SelectItem>
                            <SelectItem value="maintenance">
                              Maintenance
                            </SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="announce-visibility">Visible To</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="students">
                              Students Only
                            </SelectItem>
                            <SelectItem value="teachers">
                              Teachers Only
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Publish Announcement</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search announcements..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Announcements List */}
            <div className="grid gap-4">
              {[
                {
                  id: 1,
                  title: "Platform Maintenance Scheduled",
                  content:
                    "We will be performing scheduled maintenance on the platform this weekend from 2 AM to 6 AM UTC. Services may be unavailable during this time.",
                  type: "maintenance",
                  visibility: "all",
                  date: "2024-01-20",
                  author: "Admin",
                },
                {
                  id: 2,
                  title: "New Course: Advanced AI & Machine Learning",
                  content:
                    "We are excited to announce a brand new course on Advanced AI and Machine Learning, taught by industry experts. Enrollment is now open!",
                  type: "event",
                  visibility: "all",
                  date: "2024-01-18",
                  author: "Admin",
                },
                {
                  id: 3,
                  title: "Important: Update Your Profile Information",
                  content:
                    "Please update your profile information to ensure accuracy in your certificates and course records. Visit your profile settings to make changes.",
                  type: "important",
                  visibility: "all",
                  date: "2024-01-15",
                  author: "Admin",
                },
              ].map((announcement) => (
                <Card
                  key={announcement.id}
                  className="border-border/50 bg-card/50 backdrop-blur"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-lg">
                            {announcement.title}
                          </h4>
                          <Badge
                            variant={
                              announcement.type === "important"
                                ? "destructive"
                                : announcement.type === "maintenance"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {announcement.type}
                          </Badge>
                          <Badge variant="outline">
                            {announcement.visibility}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {announcement.content}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Posted by {announcement.author}</span>
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">System Settings</h3>
              <p className="text-muted-foreground">
                Configure platform settings and preferences
              </p>
            </div>

            <div className="grid gap-6">
              {/* General Settings */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-base">General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="Corner Academy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-email">Support Email</Label>
                    <Input
                      id="platform-email"
                      type="email"
                      defaultValue="support@corneracademy.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-phone">Support Phone</Label>
                    <Input
                      id="platform-phone"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              {/* Course Settings */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-base">Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">
                          Allow Course Refunds
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow students to refund within 30 days
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Require Certificate</Label>
                        <p className="text-sm text-muted-foreground">
                          Students must complete 80% to get certificate
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">
                          Auto-Archive Completed
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically archive completed courses
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              {/* Payment Settings */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-base">Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="inr">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax">Platform Tax Rate (%)</Label>
                    <Input id="tax" type="number" defaultValue="0" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
