import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  useCreateCourse,
  useUpdateCourse,
  CreateCourseInput,
} from "@/api/course";

interface CourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  trigger?: React.ReactNode;
  initialData?: any;
  mode?: "create" | "edit";
  teachers?: any[];
}

export function CourseDialog({
  open,
  onOpenChange,
  onSubmit,
  trigger,
  initialData,
  mode = "create",
  teachers = [],
}: CourseDialogProps) {
  const [formData, setFormData] = useState(initialData || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Please fill required fields");
      return;
    }
    onSubmit(formData);
    setFormData({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-lg w-full overflow-y-auto max-h-[95vh] no-scrollbar">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Course" : "Edit Course"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Set up a new course with instructor assignment."
              : "Update course information."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              placeholder="Enter course title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Course description"
              rows={3}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Additional fields for backend API */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (comma separated)</Label>
            <Input
              id="requirements"
              placeholder="e.g., Basic computer knowledge, Internet connection"
              value={formData.requirements || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  requirements: e.target.value.split(",").map((r) => r.trim()),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="includes">What's Included (comma separated)</Label>
            <Input
              id="includes"
              placeholder="e.g., Video lectures, PDF notes, Certificate"
              value={formData.includes || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  includes: e.target.value.split(",").map((i) => i.trim()),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="outcomes">
              Learning Outcomes (comma separated)
            </Label>
            <Input
              id="outcomes"
              placeholder="e.g., Build websites, Understand JavaScript, Deploy projects"
              value={formData.outcomes || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  outcomes: e.target.value.split(",").map((o) => o.trim()),
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="299"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (weeks)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="12"
                value={formData.duration || ""}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingTime">Meeting Time</Label>
              <Input
                id="meetingTime"
                type="datetime-local"
                value={formData.meetingTime || ""}
                onChange={(e) =>
                  setFormData({ ...formData, meetingTime: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category || "WebDevelopment"}
                onValueChange={(v) => setFormData({ ...formData, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WebDevelopment">
                    Web Development
                  </SelectItem>
                  <SelectItem value="ui">UI/UX Design</SelectItem>
                  <SelectItem value="DataScience">Data Science</SelectItem>
                  <SelectItem value="DigitalMarketing">
                    Digital Marketing
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level || "beginner"}
                onValueChange={(v) => setFormData({ ...formData, level: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language || "english"}
                onValueChange={(v) => setFormData({ ...formData, language: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="nepali">Nepali</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                placeholder="https://example.com/image.jpg"
                value={formData.thumbnail || ""}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingUrl">Meeting URL</Label>
            <Input
              id="meetingUrl"
              placeholder="https://meet.google.com/abc-defg-hij"
              value={formData.meetingUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, meetingUrl: e.target.value })
              }
            />
          </div>
          {mode === "create" && (
            <div className="space-y-2">
              <Label htmlFor="instructor">Assign Instructor</Label>
              <Select
                value={formData.instructorId || ""}
                onValueChange={(v) =>
                  setFormData({ ...formData, instructorId: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">
              {mode === "create" ? "Create Course" : "Update Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
