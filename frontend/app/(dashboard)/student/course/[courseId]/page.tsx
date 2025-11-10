"use client";
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
import {
  BookOpen,
  Play,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Video,
  FileText,
  Download,
  MessageSquare,
  CheckCircle,
  ArrowLeft,
  Eye,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StudentCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  // Mock course data
  const courseData = {
    id: courseId,
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    instructorAvatar: "/instructor-avatar.png",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: "JavaScript Functions",
    status: "in-progress",
    lastAccessed: "2 hours ago",
    description:
      "Master the fundamentals of web development with HTML, CSS, and JavaScript.",
  };

  const courseMaterials = [
    {
      id: 1,
      title: "Introduction to HTML",
      type: "video",
      duration: "15:30",
      completed: true,
      url: "/videos/html-intro.mp4",
    },
    {
      id: 2,
      title: "CSS Styling Basics",
      type: "video",
      duration: "22:45",
      completed: true,
      url: "/videos/css-basics.mp4",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      type: "video",
      duration: "28:15",
      completed: false,
      url: "/videos/js-fundamentals.mp4",
    },
    {
      id: 4,
      title: "HTML Reference Guide",
      type: "pdf",
      size: "2.5 MB",
      completed: false,
      url: "/resources/html-guide.pdf",
    },
    {
      id: 5,
      title: "CSS Cheat Sheet",
      type: "pdf",
      size: "1.8 MB",
      completed: true,
      url: "/resources/css-cheatsheet.pdf",
    },
  ];

  const courseAnnouncements = [
    {
      id: 1,
      title: "New Assignment Posted",
      message:
        "Complete the JavaScript project by Friday. Check the resources section for guidelines.",
      time: "2 hours ago",
      type: "assignment",
    },
    {
      id: 2,
      title: "Live Session Tomorrow",
      message:
        "Join us tomorrow at 2 PM for a live coding session on JavaScript functions.",
      time: "1 day ago",
      type: "schedule",
    },
  ];

  const attendanceData = {
    totalClasses: 12,
    attended: 11,
    missed: 1,
    percentage: 92,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/student">
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
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={courseData.instructorAvatar || "/placeholder.svg"}
                      alt={courseData.instructor}
                    />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <span>by {courseData.instructor}</span>
                </div>
                <Badge variant="secondary">
                  {courseData.status === "completed"
                    ? "Completed"
                    : "In Progress"}
                </Badge>
              </div>
            </div>
            <Button asChild>
              <Link href={`/dashboard/student/materials/${courseId}`}>
                <PlayCircle className="h-4 w-4 mr-1" />
                Continue Learning
              </Link>
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Course Progress</span>
              <span>
                {courseData.completedLessons}/{courseData.totalLessons} lessons
                completed
              </span>
            </div>
            <Progress value={courseData.progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {courseData.progress}% complete
            </p>
          </div>
        </div>

        {/* Course Content Tabs */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="materials">Materials & Videos</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="attendance">My Attendance</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>
                  Access all videos, documents, and resources for this course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          {material.type === "video" ? (
                            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <Video className="h-5 w-5 text-blue-500" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{material.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {material.type === "video"
                              ? `Duration: ${material.duration}`
                              : `Size: ${material.size}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {material.completed && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/dashboard/student/materials/${courseId}?material=${material.id}`}
                          >
                            {material.type === "video" ? (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                {material.completed ? "Rewatch" : "Watch"}
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </>
                            )}
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Course Announcements</CardTitle>
                <CardDescription>
                  Important updates from your instructor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg"
                  >
                    <div className="shrink-0">
                      {announcement.type === "assignment" && (
                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-500" />
                        </div>
                      )}
                      {announcement.type === "schedule" && (
                        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-orange-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm">{announcement.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {announcement.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>My Attendance</CardTitle>
                <CardDescription>
                  Track your class attendance for this course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {attendanceData.percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Attendance Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {attendanceData.totalClasses}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Classes
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {attendanceData.attended}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Attended
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">
                      {attendanceData.missed}
                    </div>
                    <div className="text-sm text-muted-foreground">Missed</div>
                  </div>
                </div>
                <Progress value={attendanceData.percentage} className="h-3" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Course Discussions</CardTitle>
                <CardDescription>
                  Engage with your instructor and fellow students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No discussions yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to start a discussion in this course!
                  </p>
                  <Button>Start Discussion</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
