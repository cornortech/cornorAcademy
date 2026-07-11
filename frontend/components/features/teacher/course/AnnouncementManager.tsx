"use client";

import { useState } from "react";
import { Plus, Pin, Trash2, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  useGetCourseAnnouncements,
  useCreateCourseAnnouncement,
  useDeleteCourseAnnouncement,
} from "@/api/announcement";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Announcement } from "@/types";

interface AnnouncementManagerProps {
  courseId: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AnnouncementManager({ courseId }: AnnouncementManagerProps) {
  const { userData } = useAuth();
  const teacherId = userData?.id ?? "";

  const { data: announcements, isLoading, error } = useGetCourseAnnouncements(courseId);
  const { mutateAsync: createAnnouncement, isPending: isCreating } = useCreateCourseAnnouncement();
  const { mutateAsync: deleteAnnouncement, isPending: isDeleting } = useDeleteCourseAnnouncement();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [externalLinks, setExternalLinks] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [publishDate, setPublishDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required");
      return;
    }

    const links = externalLinks
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    await createAnnouncement(
      {
        teacherId,
        courseId,
        data: {
          title,
          message,
          isPinned,
          ...(publishDate && { publishDate }),
          ...(expiryDate && { expiryDate }),
          ...(links.length > 0 && { externalLinks: links }),
          sendEmail,
        },
      },
      {
        onSuccess: () => {
          toast.success("Announcement sent to students");
          setIsDialogOpen(false);
          setTitle("");
          setMessage("");
          setExternalLinks("");
          setIsPinned(false);
          setPublishDate("");
          setExpiryDate("");
          setSendEmail(false);
        },
        onError: () => toast.error("Failed to create announcement"),
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteAnnouncement(id, {
      onSuccess: () => toast.success("Announcement deleted"),
      onError: () => toast.error("Failed to delete announcement"),
    });
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Course Announcements</h3>
          <p className="text-muted-foreground">
            Send updates and notifications to your students
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!teacherId}>
              <Plus className="h-4 w-4 mr-1" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>
                Send important updates to your students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your announcement message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="links">External Links (one per line)</Label>
                <Textarea
                  id="links"
                  placeholder="https://..."
                  rows={2}
                  value={externalLinks}
                  onChange={(e) => setExternalLinks(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="pinned"
                    checked={isPinned}
                    onCheckedChange={setIsPinned}
                  />
                  <Label htmlFor="pinned">Pin announcement</Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <div className="flex items-center gap-2">
                <Switch id="sendEmail" checked={sendEmail} onCheckedChange={setSendEmail} />
                <Label htmlFor="sendEmail">Send email notification to students</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                Send Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Your latest updates to students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive text-center py-8">
              Failed to load announcements
            </p>
          )}

          {!isLoading && !error && (!announcements || announcements.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No announcements yet. Create your first one!
            </p>
          )}

          {!isLoading && !error && announcements?.map((announcement: Announcement) => (
            <div
              key={announcement.id}
              className="flex items-start justify-between p-4 border border-border/50 rounded-lg"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  {announcement.isPinned && (
                    <Pin className="h-4 w-4 text-primary" />
                  )}
                  <h4 className="font-medium">{announcement.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{announcement.message}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatDate(announcement.publishDate)}</span>
                  {announcement.externalLinks && announcement.externalLinks.length > 0 && (
                    <span>{announcement.externalLinks.length} link(s)</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(announcement.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
