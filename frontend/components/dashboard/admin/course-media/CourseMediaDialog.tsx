"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { CreateCourseMediaRequest } from "@/lib/types/courseMedia";
import { createCourseMediaSchema } from "@/lib/validations/courseMedia";

interface CourseMediaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  onSuccess: () => void;
}

export function CourseMediaDialog({
  open,
  onOpenChange,
  courseId,
  onSuccess,
}: CourseMediaDialogProps) {
  const [formData, setFormData] = useState<CreateCourseMediaRequest>({
    courseId,
    title: "",
    description: "",
    url: "",
    type: "video",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = createCourseMediaSchema.parse(formData);
      setLoading(true);
      onSuccess();
      onOpenChange(false);
      setFormData({
        courseId,
        title: "",
        description: "",
        url: "",
        type: "video",
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateCourseMediaRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Course Media</DialogTitle>
          <DialogDescription>
            Upload videos, PDFs, images, and other course materials.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="col-span-3"
                placeholder="Media title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="col-span-3"
                placeholder="Media description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                className="col-span-3"
                placeholder="https://example.com/media"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: "video" | "pdf" | "image" | "other") =>
                  handleInputChange("type", value)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Media"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
