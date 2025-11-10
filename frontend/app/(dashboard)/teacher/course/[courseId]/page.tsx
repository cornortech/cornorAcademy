"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  BookOpen,
  Users,
  Video,
  Bell,
  Settings,
  LogOut,
  Upload,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Clock,
  UserCheck,
  UserX,
  CheckCircle2,
  XCircle,
  CalendarDays,
  FileText,
  File,
  ImageIcon,
  Music,
  Archive,
  Trash2,
  Download,
  Search,
  FolderPlus,
  Folder,
  ArrowLeft,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type StudentAttendance = Record<string, boolean>; // studentId -> present/absent
type AttendanceState = Record<string, StudentAttendance>; // `${courseId}-${date}` -> StudentAttendance
type ResourceType =
  | "pdf"
  | "video"
  | "image"
  | "audio"
  | "archive"
  | "code"
  | "design"
  | "other";

type UploadedResource = {
  id: number;
  name: string;
  type: ResourceType;
  size: string;
  folder: string;
  uploadDate: string;
  downloads: number;
  description: string;
};

export default function TeacherCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] =
    useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState<AttendanceState>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Mock course data
  const courseData = {
    id: courseId,
    title: "Web Development Fundamentals",
    students: 67,
    totalLessons: 24,
    completedLessons: 18,
    avgProgress: 75,
    nextClass: "Today, 2:00 PM",
    status: "active",
    description:
      "Comprehensive course covering HTML, CSS, JavaScript, and modern web development practices.",
  };

  const studentProgress = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      progress: 85,
      lastActive: "2 hours ago",
      attendance: 92,
      assignments: "8/10",
      avatar: "/student-avatar.png",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      progress: 78,
      lastActive: "1 day ago",
      attendance: 88,
      assignments: "7/10",
      avatar: "/student-avatar-2.png",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@email.com",
      progress: 68,
      lastActive: "6 hours ago",
      attendance: 85,
      assignments: "6/10",
      avatar: "/student-avatar-5.png",
    },
    {
      id: 4,
      name: "Lisa Brown",
      email: "lisa.brown@email.com",
      progress: 91,
      lastActive: "1 hour ago",
      attendance: 98,
      assignments: "9/10",
      avatar: "/student-avatar-6.png",
    },
  ];

  const uploadedResources: UploadedResource[] = [
    {
      id: 1,
      name: "JavaScript Fundamentals.pdf",
      type: "pdf",
      size: "2.4 MB",
      folder: "Week 1 - Introduction",
      uploadDate: "2024-01-15",
      downloads: 45,
      description:
        "Complete guide to JavaScript basics including variables, functions, and control structures.",
    },
    {
      id: 2,
      name: "HTML Structure Examples.zip",
      type: "archive",
      size: "1.8 MB",
      folder: "Week 1 - Introduction",
      uploadDate: "2024-01-14",
      downloads: 38,
      description:
        "Sample HTML files demonstrating proper document structure and semantic markup.",
    },
    {
      id: 3,
      name: "CSS Grid Layout Tutorial.mp4",
      type: "video",
      size: "45.2 MB",
      folder: "Week 3 - CSS Layouts",
      uploadDate: "2024-01-12",
      downloads: 52,
      description:
        "Step-by-step video tutorial on creating responsive layouts with CSS Grid.",
    },
  ];

  const courseAnnouncements = [
    {
      id: 1,
      title: "Assignment Deadline Extended",
      message:
        "The JavaScript project deadline has been extended to next Monday due to popular request.",
      date: "2 hours ago",
      recipients: 67,
    },
    {
      id: 2,
      title: "Office Hours This Week",
      message:
        "I'll be available for one-on-one sessions this Thursday from 1-3 PM. Book your slot in advance.",
      date: "2 days ago",
      recipients: 67,
    },
  ];

  const handleAttendanceChange = (
    studentId: number | string,
    date: string,
    isPresent: boolean
  ) => {
    const key = `${courseId}-${date}`;
    const idKey = String(studentId); // normalize

    setAttendanceData((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] ?? {}),
        [studentId]: isPresent,
      },
    }));
  };

  const getAttendanceForDate = (date: string): StudentAttendance => {
    const key = `${courseId}-${date}`;
    return attendanceData[key] || {};
  };

  const saveAttendance = () => {
    console.log(`Saving attendance for course ${courseId} on ${selectedDate}`);
    alert("Attendance saved successfully!");
  };

  const getAttendanceStats = () => {
    const totalStudents = studentProgress.length;
    const attendance = getAttendanceForDate(selectedDate);
    const presentCount = Object.values(attendance).filter(Boolean).length;
    const absentCount = Object.values(attendance).filter(
      (val) => val === false
    ).length;
    const notMarkedCount = totalStudents - presentCount - absentCount;

    return { totalStudents, presentCount, absentCount, notMarkedCount };
  };

  const getFileIcon = (fileType: ResourceType) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "image":
        return <ImageIcon className="h-4 w-4 text-green-500" />;
      case "audio":
        return <Music className="h-4 w-4 text-purple-500" />;
      case "archive":
        return <Archive className="h-4 w-4 text-orange-500" />;
      case "code":
        return <File className="h-4 w-4 text-gray-500" />;
      case "design":
        return <ImageIcon className="h-4 w-4 text-pink-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredResources = uploadedResources
    .filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        selectedFileType === "all" || resource.type === selectedFileType;
      const matchesFolder =
        selectedFolder === "all" || resource.folder === selectedFolder;

      return matchesSearch && matchesType && matchesFolder;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
          );
        case "popular":
          return b.downloads - a.downloads;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const stats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/teacher">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Corner Academy</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
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
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">
                {courseData.title}
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {courseData.students} students enrolled
                </span>
                <Badge variant="secondary">
                  {courseData.status === "completed" ? "Completed" : "Active"}
                </Badge>
              </div>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-1" />
              Edit Course
            </Button>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Course Progress</span>
                <span>
                  {courseData.completedLessons}/{courseData.totalLessons}{" "}
                  lessons
                </span>
              </div>
              <Progress
                value={
                  (courseData.completedLessons / courseData.totalLessons) * 100
                }
                className="h-3"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Avg Student Progress</span>
                <span>{courseData.avgProgress}%</span>
              </div>
              <Progress value={courseData.avgProgress} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Next Class</div>
              <div className="text-sm text-muted-foreground">
                {courseData.nextClass}
              </div>
            </div>
          </div>
        </div>

        {/* Course Management Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students & Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources & Materials</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Tracking</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Student Progress Overview</CardTitle>
                <CardDescription>
                  Track your students' learning progress and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentProgress.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {student.progress}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Progress
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {student.attendance}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Attendance
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {student.assignments}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Assignments
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {student.lastActive}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last Active
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Course Resources</h3>
                <p className="text-muted-foreground">
                  Upload and manage course materials
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Dialog
                  open={isFolderDialogOpen}
                  onOpenChange={setIsFolderDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <FolderPlus className="h-4 w-4 mr-1" />
                      New Folder
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Folder</DialogTitle>
                      <DialogDescription>
                        Organize your course materials by creating folders.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="folder-name">Folder Name</Label>
                        <Input
                          id="folder-name"
                          placeholder="Enter folder name"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => setIsFolderDialogOpen(false)}
                      >
                        Create Folder
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isUploadDialogOpen}
                  onOpenChange={setIsUploadDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-1" />
                      Upload Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Upload New Resource</DialogTitle>
                      <DialogDescription>
                        Add videos, documents, or other learning materials to
                        this course.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="resource-folder">Select Folder</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a folder" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="week1">
                              Week 1 - Introduction
                            </SelectItem>
                            <SelectItem value="week2">
                              Week 2 - HTML Basics
                            </SelectItem>
                            <SelectItem value="week3">
                              Week 3 - CSS Layouts
                            </SelectItem>
                            <SelectItem value="assignments">
                              Assignments
                            </SelectItem>
                            <SelectItem value="resources">Resources</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-title">Resource Title</Label>
                        <Input
                          id="resource-title"
                          placeholder="Enter resource title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-description">
                          Description
                        </Label>
                        <Textarea
                          id="resource-description"
                          placeholder="Describe the resource"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="file-upload">Upload File</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop your file here, or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports: PDF, DOC, PPT, MP4, ZIP, and more (Max:
                            100MB)
                          </p>
                          <Input
                            type="file"
                            className="hidden"
                            id="file-upload"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => setIsUploadDialogOpen(false)}
                      >
                        Upload Resource
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search resources..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        File Type
                      </label>
                      <Select
                        value={selectedFileType}
                        onValueChange={setSelectedFileType}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="archive">Archive</SelectItem>
                          <SelectItem value="code">Code</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Folder
                      </label>
                      <Select
                        value={selectedFolder}
                        onValueChange={setSelectedFolder}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Folders</SelectItem>
                          <SelectItem value="Week 1 - Introduction">
                            Week 1
                          </SelectItem>
                          <SelectItem value="Week 3 - CSS Layouts">
                            Week 3
                          </SelectItem>
                          <SelectItem value="Assignments">
                            Assignments
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Sort By
                      </label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="popular">
                            Most Downloaded
                          </SelectItem>
                          <SelectItem value="name">By Name</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        className="w-full h-9 bg-transparent"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedFileType("all");
                          setSelectedFolder("all");
                          setSortBy("recent");
                        }}
                      >
                        <Filter className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid with filtering applied */}
            <div className="grid gap-4">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <Card
                    key={resource.id}
                    className="border-border/50 bg-card/50 backdrop-blur"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="shrink-0">
                            {getFileIcon(resource.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">
                              {resource.name}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{resource.size}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Folder className="h-3 w-3 mr-1" />
                                {resource.folder}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{resource.downloads} downloads</div>
                            <div>
                              {new Date(
                                resource.uploadDate
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No resources match your filters
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Daily Attendance Tracking
                </h3>
                <p className="text-muted-foreground">
                  Mark student attendance for today's classes
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto"
                  />
                </div>
              </div>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {courseData.title}
                    </CardTitle>
                    <CardDescription>
                      {studentProgress.length} students enrolled
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{stats.presentCount} Present</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>{stats.absentCount} Absent</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>{stats.notMarkedCount} Not Marked</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-3">
                    {studentProgress.map((student) => {
                      const attendance = getAttendanceForDate(selectedDate);
                      const studentKey = String(student.id);
                      const isPresent = attendance[studentKey];
                      const isAbsent = attendance[studentKey] === false;

                      return (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={student.avatar || "/placeholder.svg"}
                                alt={student.name}
                              />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm">
                                {student.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {student.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-xs text-muted-foreground">
                              Overall: {student.attendance}%
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={isPresent ? "default" : "outline"}
                                size="sm"
                                onClick={() =>
                                  handleAttendanceChange(
                                    student.id,
                                    selectedDate,
                                    true
                                  )
                                }
                                className="h-8"
                              >
                                <UserCheck className="h-3 w-3 mr-1" />
                                Present
                              </Button>
                              <Button
                                variant={isAbsent ? "destructive" : "outline"}
                                size="sm"
                                onClick={() =>
                                  handleAttendanceChange(
                                    student.id,
                                    selectedDate,
                                    false
                                  )
                                }
                                className="h-8"
                              >
                                <UserX className="h-3 w-3 mr-1" />
                                Absent
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="text-sm text-muted-foreground">
                      Attendance for{" "}
                      {new Date(selectedDate).toLocaleDateString()}
                    </div>
                    <Button onClick={saveAttendance}>Save Attendance</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Course Announcements</h3>
                <p className="text-muted-foreground">
                  Send updates and notifications to your students
                </p>
              </div>
              <Dialog
                open={isAnnouncementDialogOpen}
                onOpenChange={setIsAnnouncementDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    New Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Announcement</DialogTitle>
                    <DialogDescription>
                      Send important updates to your students.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="announcement-title">Title</Label>
                      <Input
                        id="announcement-title"
                        placeholder="Enter announcement title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announcement-message">Message</Label>
                      <Textarea
                        id="announcement-message"
                        placeholder="Write your announcement message"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={() => setIsAnnouncementDialogOpen(false)}
                    >
                      Send Announcement
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>
                  Your latest updates to students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-start justify-between p-4 border border-border/50 rounded-lg"
                  >
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm">{announcement.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{announcement.date}</span>
                        <span>{announcement.recipients} recipients</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
