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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Bell,
  Settings,
  LogOut,
  CheckCircle,
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Clock,
  PlayCircle,
  ZoomIn,
  ZoomOut,
  Bookmark,
  MessageSquare,
  Share,
  ThumbsUp,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function MaterialsViewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const materialId = searchParams.get("material");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(
    materialId ? Number.parseInt(materialId) : 1
  );
  const [showNotes, setShowNotes] = useState(false);
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  // Mock course data
  const courseData = {
    id: courseId,
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    instructorAvatar: "/instructor-avatar.png",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
  };

  const courseMaterials = [
    {
      id: 1,
      title: "Introduction to HTML",
      type: "video",
      duration: "15:30",
      completed: true,
      url: "/videos/html-intro.mp4",
      description: "Learn the basics of HTML structure and semantic markup.",
      transcript: "Welcome to our HTML introduction course...",
    },
    {
      id: 2,
      title: "CSS Styling Basics",
      type: "video",
      duration: "22:45",
      completed: true,
      url: "/videos/css-basics.mp4",
      description:
        "Master CSS fundamentals including selectors, properties, and the box model.",
      transcript: "In this lesson, we'll explore CSS styling...",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      type: "video",
      duration: "28:15",
      completed: false,
      url: "/videos/js-fundamentals.mp4",
      description:
        "Dive into JavaScript programming with variables, functions, and control structures.",
      transcript: "JavaScript is the programming language of the web...",
    },
    {
      id: 4,
      title: "HTML Reference Guide",
      type: "pdf",
      size: "2.5 MB",
      pages: 45,
      completed: false,
      url: "/resources/html-guide.pdf",
      description:
        "Comprehensive reference guide for HTML elements and attributes.",
    },
    {
      id: 5,
      title: "CSS Cheat Sheet",
      type: "pdf",
      size: "1.8 MB",
      pages: 12,
      completed: true,
      url: "/resources/css-cheatsheet.pdf",
      description: "Quick reference for CSS properties and values.",
    },
    {
      id: 6,
      title: "JavaScript Code Examples",
      type: "code",
      size: "156 KB",
      completed: false,
      url: "/resources/js-examples.zip",
      description: "Collection of JavaScript code examples and exercises.",
    },
  ];

  const currentMaterial =
    courseMaterials.find((m) => m.id === selectedMaterial) ||
    courseMaterials[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMaterialSelect = (materialId: number) => {
    setSelectedMaterial(materialId);
    setCurrentTime(0);
    setIsPlaying(false);
    setPdfPage(1);
  };

  const markAsCompleted = (materialId: number) => {
    // In a real app, this would update the database
    console.log(`Marking material ${materialId} as completed`);
  };

  const nextMaterial = () => {
    const currentIndex = courseMaterials.findIndex(
      (m) => m.id === selectedMaterial
    );
    if (currentIndex < courseMaterials.length - 1) {
      handleMaterialSelect(courseMaterials[currentIndex + 1].id);
    }
  };

  const previousMaterial = () => {
    const currentIndex = courseMaterials.findIndex(
      (m) => m.id === selectedMaterial
    );
    if (currentIndex > 0) {
      handleMaterialSelect(courseMaterials[currentIndex - 1].id);
    }
  };

  const renderVideoPlayer = () => (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <p className="text-lg font-medium">{currentMaterial.title}</p>
            <p className="text-sm opacity-80">
              Duration: {currentMaterial.duration}
            </p>
          </div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
          <div className="space-y-2">
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1">
                <Progress
                  value={(currentTime / (duration || 1)) * 100}
                  className="h-1 bg-white/20"
                />
              </div>
              <span>{currentMaterial.duration}</span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-1">
                  <Volume2 className="h-4 w-4 text-white" />
                  <div className="w-16">
                    <Progress
                      value={volume * 100}
                      className="h-1 bg-white/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={playbackSpeed}
                  onChange={(e) =>
                    setPlaybackSpeed(Number.parseFloat(e.target.value))
                  }
                  className="bg-white/20 text-white text-sm rounded px-2 py-1 border-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-1" />
            Bookmark
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Notes
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" />
            Like
          </Button>
          {!currentMaterial.completed && (
            <Button onClick={() => markAsCompleted(currentMaterial.id)}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderPDFViewer = () => {
    const totalPages = currentMaterial.pages ?? 1;
    return (
      <div className="space-y-4">
        {/* PDF Viewer */}
        <div className="border border-border rounded-lg overflow-hidden">
          {/* PDF Toolbar */}
          <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPdfPage(Math.max(1, pdfPage - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {pdfPage} of {currentMaterial.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPdfPage(Math.min(totalPages, pdfPage + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPdfZoom(Math.max(50, pdfZoom - 25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{pdfZoom}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPdfZoom(Math.min(200, pdfZoom + 25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="bg-gray-100 p-8 min-h-[600px] flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
              <div className="text-center space-y-4">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">
                  {currentMaterial.title}
                </h3>
                <p className="text-muted-foreground">
                  {currentMaterial.description}
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>Size: {currentMaterial.size}</p>
                  <p>Pages: {currentMaterial.pages}</p>
                </div>
                <Button>
                  <Eye className="h-4 w-4 mr-1" />
                  Open PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-1" />
              Bookmark
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            {!currentMaterial.completed && (
              <Button onClick={() => markAsCompleted(currentMaterial.id)}>
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCodeViewer = () => (
    <div className="space-y-4">
      {/* Code File Viewer */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
          <h3 className="font-medium">{currentMaterial.title}</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>

        <div className="p-6 bg-gray-50 min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">{currentMaterial.title}</h3>
            <p className="text-muted-foreground max-w-md">
              {currentMaterial.description}
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Size: {currentMaterial.size}</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-1" />
              Download Files
            </Button>
          </div>
        </div>
      </div>

      {/* Code Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {!currentMaterial.completed && (
            <Button onClick={() => markAsCompleted(currentMaterial.id)}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderMaterialContent = () => {
    switch (currentMaterial.type) {
      case "video":
        return renderVideoPlayer();
      case "pdf":
        return renderPDFViewer();
      case "code":
        return renderCodeViewer();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Unsupported material type</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/student/course/${courseId}`}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Course
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Materials Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">{courseData.title}</CardTitle>
                <CardDescription>by {courseData.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Course Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Course Progress</span>
                      <span>{courseData.progress}%</span>
                    </div>
                    <Progress value={courseData.progress} className="h-2" />
                  </div>

                  <Separator />

                  {/* Materials List */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Course Materials</h4>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-1">
                        {courseMaterials.map((material, index) => (
                          <button
                            key={material.id}
                            onClick={() => handleMaterialSelect(material.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              selectedMaterial === material.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:bg-muted/50"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="shrink-0">
                                {material.completed && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                                {!material.completed && (
                                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {material.title}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <span className="capitalize">
                                    {material.type}
                                  </span>
                                  {material.duration && (
                                    <>
                                      <span>•</span>
                                      <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {material.duration}
                                      </span>
                                    </>
                                  )}
                                  {material.size && (
                                    <>
                                      <span>•</span>
                                      <span>{material.size}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Material Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-balance">
                    {currentMaterial.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {currentMaterial.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousMaterial}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMaterial}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Material Content */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  {renderMaterialContent()}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Tabs defaultValue="description" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  {currentMaterial.type === "video" && (
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  )}
                  <TabsTrigger value="notes">My Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                  <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        About this material
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {currentMaterial.description}
                      </p>
                      <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="capitalize">
                          {currentMaterial.type} content
                        </span>
                        {currentMaterial.duration && (
                          <>
                            <span>•</span>
                            <span>{currentMaterial.duration} duration</span>
                          </>
                        )}
                        {currentMaterial.size && (
                          <>
                            <span>•</span>
                            <span>{currentMaterial.size} file size</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {currentMaterial.type === "video" && (
                  <TabsContent value="transcript">
                    <Card className="border-border/50 bg-card/50 backdrop-blur">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Video Transcript
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[300px]">
                          <p className="text-sm leading-relaxed">
                            {currentMaterial.transcript}
                          </p>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                <TabsContent value="notes">
                  <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-lg">My Notes</CardTitle>
                      <CardDescription>
                        Take notes while studying this material
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          No notes yet
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Start taking notes to remember key points!
                        </p>
                        <Button>Add Note</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
