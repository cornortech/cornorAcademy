"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Calendar,
  Bell,
  Settings,
  LogOut,
  Eye,
  Edit,
  BarChart3,
  TrendingUp,
  Play,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/layouts/dashboard-header";
import { StatsCard } from "@/components/shared/stats-card";

export default function TeacherDashboard() {
  const [isStartClassDialogOpen, setIsStartClassDialogOpen] = useState(false);
  const [classTitle, setClassTitle] = useState("");
  const [classUrl, setClassUrl] = useState("");

  const teacherData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@corneracademy.com",
    avatar: "/teacher-avatar.png",
    totalStudents: 156,
    activeCourses: 3,
    totalVideos: 48,
    avgRating: 4.8,
  };

  const teachingCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      students: 67,
      totalLessons: 24,
      completedLessons: 18,
      avgProgress: 75,
      nextClass: "Today, 2:00 PM",
      status: "active",
      thumbnail: "/web-development-course.png",
      startTime: "2024-01-20 14:00",
      meetingLink: "https://meet.example.com/web-dev",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      students: 45,
      totalLessons: 20,
      completedLessons: 12,
      avgProgress: 60,
      nextClass: "Tomorrow, 10:00 AM",
      status: "active",
      thumbnail: "/javascript-course.png",
      startTime: "2024-01-21 10:00",
      meetingLink: "https://meet.example.com/js-adv",
    },
    {
      id: 3,
      title: "React Development Mastery",
      students: 44,
      totalLessons: 28,
      completedLessons: 28,
      avgProgress: 100,
      nextClass: "Course Completed",
      status: "completed",
      thumbnail: "/react-course.png",
      startTime: "2023-12-01 09:00",
      meetingLink: "",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      title: "JavaScript Functions & Scope",
      course: "Web Development Fundamentals",
      courseId: 1,
      date: "Today",
      time: "2:00 PM",
      duration: "1.5 hours",
      students: 67,
      meetingLink: "https://meet.example.com/js-functions",
    },
    {
      id: 2,
      title: "Async Programming Workshop",
      course: "Advanced JavaScript Concepts",
      courseId: 2,
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "2 hours",
      students: 45,
      meetingLink: "https://meet.example.com/async-js",
    },
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Assignment Deadline Extended",
      course: "Web Development Fundamentals",
      message:
        "The JavaScript project deadline has been extended to next Monday.",
      date: "2 hours ago",
      recipients: 67,
    },
    {
      id: 2,
      title: "New Learning Resources Added",
      course: "Advanced JavaScript Concepts",
      message:
        "I've added additional practice exercises for async programming.",
      date: "1 day ago",
      recipients: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <DashboardHeader
        userRole="teacher"
        userName={teacherData.name}
        userEmail={teacherData.email}
        userAvatar={teacherData.avatar}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">
            Welcome back, {teacherData.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your courses and track student progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={teacherData.totalStudents}
            description="Across all courses"
            icon={Users}
          />
          <StatsCard
            title="Active Courses"
            value={teacherData.activeCourses}
            description="Currently teaching"
            icon={BookOpen}
          />
          <StatsCard
            title="Course Videos"
            value={teacherData.totalVideos}
            description="Total uploaded"
            icon={Video}
          />
          <StatsCard
            title="Average Rating"
            value={teacherData.avgRating}
            description="Student feedback"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-1" />
                Create New Course
              </Button>
            </div>

            <div className="space-y-6">
              {teachingCourses.map((course) => (
                <Card
                  key={course.id}
                  className="border-border/50 bg-card/50 backdrop-blur"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/4">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="lg:w-3/4 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">
                              {course.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {course.students} enrolled students
                            </p>
                          </div>
                          <Badge
                            variant={
                              course.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {course.status === "completed"
                              ? "Completed"
                              : "Active"}
                          </Badge>
                        </div>

                        <div className="p-2 bg-primary/10 rounded border border-primary/20">
                          <p className="text-sm font-medium text-primary">
                            Course Started: {course.startTime}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Course Progress</span>
                              <span>
                                {course.completedLessons}/{course.totalLessons}{" "}
                                lessons
                              </span>
                            </div>
                            <Progress
                              value={
                                (course.completedLessons /
                                  course.totalLessons) *
                                100
                              }
                              className="h-2"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Avg Student Progress</span>
                              <span>{course.avgProgress}%</span>
                            </div>
                            <Progress
                              value={course.avgProgress}
                              className="h-2"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="text-sm font-medium">
                              Next Class
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {course.nextClass}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {course.status !== "completed" && (
                            <Dialog
                              open={isStartClassDialogOpen}
                              onOpenChange={setIsStartClassDialogOpen}
                            >
                              <DialogTrigger asChild>
                                <Button variant="default" size="sm">
                                  <Play className="h-4 w-4 mr-1" />
                                  Start Class
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Start Class - {course.title}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Configure class details before starting
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="class-title">
                                      Class Title
                                    </Label>
                                    <Input
                                      id="class-title"
                                      placeholder="Enter class title"
                                      value={classTitle}
                                      onChange={(e) =>
                                        setClassTitle(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="class-url">
                                      Meeting URL
                                    </Label>
                                    <Input
                                      id="class-url"
                                      placeholder="Enter meeting URL"
                                      value={classUrl}
                                      onChange={(e) =>
                                        setClassUrl(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    type="submit"
                                    onClick={() => {
                                      console.log("Starting class:", {
                                        classTitle,
                                        classUrl,
                                      });
                                      setIsStartClassDialogOpen(false);
                                    }}
                                  >
                                    Start Class
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="default" size="sm" asChild>
                            <Link
                              href={`/dashboard/teacher/course/${course.id}`}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Manage Course
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit Content
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Classes */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingClasses.map((class_) => (
                  <div
                    key={class_.id}
                    className="p-3 border border-border/50 rounded-lg space-y-2"
                  >
                    <h4 className="font-medium text-sm">{class_.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {class_.course}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {class_.date} at {class_.time}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {class_.students}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href={class_.meetingLink} target="_blank">
                        Start Meeting
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 border border-border/50 rounded-lg space-y-2"
                  >
                    <h4 className="font-medium text-sm">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {announcement.course}
                    </p>
                    <p className="text-xs">{announcement.message}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{announcement.date}</span>
                      <span>{announcement.recipients} recipients</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
