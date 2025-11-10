import { useState } from "react";
import {
  Plus,
  FolderPlus,
  Eye,
  Download,
  Edit,
  Trash2,
  Search,
  Filter,
  Folder,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { CourseMaterialType } from "@/types";
import { File, Video, ImageIcon, Music, Archive, FileText } from "lucide-react";

export function getFileIcon(fileType: CourseMaterialType) {
  switch (fileType) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "video":
      return <Video className="h-5 w-5 text-blue-500" />;
    case "image":
      return <ImageIcon className="h-5 w-5 text-green-500" />;
    case "audio":
      return <Music className="h-5 w-5 text-purple-500" />;
    case "archive":
      return <Archive className="h-5 w-5 text-orange-500" />;
    case "code":
      return <File className="h-5 w-5 text-gray-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
}

interface Resource {
  id: number;
  name: string;
  type: string;
  size: string;
  folder: string;
  uploadDate: string;
  downloads: number;
  description: string;
}

interface ResourceManagementProps {
  resources: Resource[];
}

export function ResourceManagement({ resources }: ResourceManagementProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedFileType === "all" || resource.type === selectedFileType;
    const matchesFolder =
      selectedFolder === "all" || resource.folder === selectedFolder;
    return matchesSearch && matchesType && matchesFolder;
  });

  return (
    <div className="space-y-6">
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
                  <Input id="folder-name" placeholder="Enter folder name" />
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
                  Add videos, documents, or other learning materials to this
                  course.
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
                      <SelectItem value="assignments">Assignments</SelectItem>
                      <SelectItem value="resources">Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Resource Title</Label>
                  <Input placeholder="Enter resource title" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the resource" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: PDF, DOC, PPT, MP4, ZIP, and more (Max: 100MB)
                    </p>
                    <Input type="file" className="hidden" id="file-upload" />
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

      {/* Search and Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-4">
          <div className="space-y-4">
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
                    <SelectItem value="Week 3 - CSS Layouts">Week 3</SelectItem>
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
                    <SelectItem value="popular">Most Downloaded</SelectItem>
                    <SelectItem value="name">By Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full h-9 mt-5"
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

      {/* Resources List */}
      <div className="grid gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="border-border/50 bg-card/50 backdrop-blur"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div>{/* Icon based on file type */}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{resource.name}</h4>
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
                    <div className="text-right text-sm text-muted-foreground mr-4">
                      <div>{resource.downloads} downloads</div>
                      <div>
                        {new Date(resource.uploadDate).toLocaleDateString()}
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
    </div>
  );
}
