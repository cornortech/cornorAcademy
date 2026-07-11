"use client";

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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useCreateAnnouncement, useUpdateAnnouncement } from "@/api/announcement";
import { useGetAllCourses } from "@/api/course";
import { createAnnouncementSchema } from "@/lib/validations/announcement";
import type { AnnouncementTarget } from "@/types";

interface AnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  initialData?: {
    id: string;
    title: string;
    message: string;
    target: AnnouncementTarget;
    courseId?: string | null;
    targetUserId?: string | null;
    isPinned?: boolean;
    externalLinks?: string[];
    publishDate?: string;
    expiryDate?: string | null;
  };
  mode?: "create" | "edit";
}

const TARGET_OPTIONS: { value: AnnouncementTarget; label: string }[] = [
  { value: "EVERYONE", label: "Everyone" },
  { value: "ALL_STUDENTS", label: "All Students" },
  { value: "ALL_TEACHERS", label: "All Teachers" },
  { value: "SPECIFIC_COURSE", label: "Specific Course" },
  { value: "INDIVIDUAL_USER", label: "Individual User" },
];

export function AnnouncementDialog({
  open,
  onOpenChange,
  trigger,
  initialData,
  mode = "create",
}: AnnouncementDialogProps) {
  const isEdit = mode === "edit";
  const { data: courses = [] } = useGetAllCourses();
  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [message, setMessage] = useState(initialData?.message ?? "");
  const [target, setTarget] = useState<AnnouncementTarget | "">(initialData?.target ?? "");
  const [courseId, setCourseId] = useState(initialData?.courseId ?? "");
  const [targetUserId, setTargetUserId] = useState(initialData?.targetUserId ?? "");
  const [isPinned, setIsPinned] = useState(initialData?.isPinned ?? false);
  const [externalLinks, setExternalLinks] = useState<string[]>(initialData?.externalLinks ?? [""]);
  const [publishDate, setPublishDate] = useState(initialData?.publishDate ?? "");
  const [expiryDate, setExpiryDate] = useState(initialData?.expiryDate ?? "");
  const [sendEmail, setSendEmail] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showCoursePicker = target === "SPECIFIC_COURSE";
  const showUserInput = target === "INDIVIDUAL_USER";

  function addLink() {
    setExternalLinks([...externalLinks, ""]);
  }

  function updateLink(index: number, value: string) {
    const updated = [...externalLinks];
    updated[index] = value;
    setExternalLinks(updated);
  }

  function removeLink(index: number) {
    setExternalLinks(externalLinks.filter((_, i) => i !== index));
  }

  function resetForm() {
    setTitle("");
    setMessage("");
    setTarget("");
    setCourseId("");
    setTargetUserId("");
    setIsPinned(false);
    setExternalLinks([""]);
    setPublishDate("");
    setExpiryDate("");
    setErrors({});
  }

  function toISO(dateStr: string): string | undefined {
    if (!dateStr) return undefined;
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? undefined : d.toISOString();
    } catch {
      return undefined;
    }
  }

  function isValidUrl(str: string): boolean {
    try { new URL(str); return true; }
    catch { return false; }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!target) {
      setErrors({ target: "Target audience is required" });
      return;
    }

    const cleanLinks = externalLinks.filter(Boolean);
    const invalidLinks = cleanLinks.filter((l) => !isValidUrl(l));
    if (invalidLinks.length > 0) {
      setErrors({ externalLinks: "One or more links are not valid URLs" });
      return;
    }

    const payload = {
      title,
      message,
      target,
      courseId: showCoursePicker ? courseId || undefined : undefined,
      targetUserId: showUserInput ? targetUserId || undefined : undefined,
      isPinned: isPinned || undefined,
      externalLinks: cleanLinks.length > 0 ? cleanLinks : undefined,
      publishDate: toISO(publishDate),
      expiryDate: toISO(expiryDate),
      sendEmail: sendEmail || undefined,
    };

    const result = createAnnouncementSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path.join(".");
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data: result.data });
        toast.success("Announcement updated successfully");
      } else {
        await createMutation.mutateAsync(result.data);
        toast.success("Announcement published successfully");
      }
      resetForm();
      onOpenChange(false);
    } catch {
      toast.error(isEdit ? "Failed to update announcement" : "Failed to publish announcement");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) resetForm();
        onOpenChange(newOpen);
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Announcement" : "Create New Announcement"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the announcement details below."
              : "Post an announcement to students, teachers, or everyone."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your announcement here..."
              rows={5}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <Label htmlFor="target">Target Audience</Label>
            <Select value={target} onValueChange={(v) => setTarget(v as AnnouncementTarget)}>
              <SelectTrigger>
                <SelectValue placeholder="Select who sees this" />
              </SelectTrigger>
              <SelectContent>
                {TARGET_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.target && <p className="text-sm text-destructive">{errors.target}</p>}
          </div>

          {/* Course Picker (conditional) */}
          {showCoursePicker && (
            <div className="space-y-2">
              <Label htmlFor="courseId">Select Course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.courseId && <p className="text-sm text-destructive">{errors.courseId}</p>}
            </div>
          )}

          {/* User ID Input (conditional) */}
          {showUserInput && (
            <div className="space-y-2">
              <Label htmlFor="targetUserId">User ID</Label>
              <Input
                id="targetUserId"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="Enter the user's UUID"
              />
              {errors.targetUserId && (
                <p className="text-sm text-destructive">{errors.targetUserId}</p>
              )}
            </div>
          )}

          {/* External Links */}
          <div className="space-y-2">
            <Label>External Links</Label>
            {externalLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={link}
                  onChange={(e) => updateLink(i, e.target.value)}
                  placeholder="https://example.com"
                />
                {externalLinks.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeLink(i)}>
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addLink}>
              + Add Link
            </Button>
          </div>

          {/* Pinned + Dates row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 pt-2">
              <Switch id="isPinned" checked={isPinned} onCheckedChange={setIsPinned} />
              <Label htmlFor="isPinned">Pin this announcement</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input
                id="publishDate"
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="datetime-local"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>

          {/* Email Notification */}
          <div className="flex items-center gap-2">
            <Switch id="sendEmail" checked={sendEmail} onCheckedChange={setSendEmail} />
            <Label htmlFor="sendEmail">Send email notification to target audience</Label>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {isEdit ? "Save Changes" : "Publish Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
