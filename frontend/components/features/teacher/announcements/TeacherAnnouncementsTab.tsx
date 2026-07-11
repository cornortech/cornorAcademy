"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useDeleteCourseAnnouncement,
  useUpdateCourseAnnouncement,
} from "@/api/announcement";
import { useTeacherDashboard } from "@/hooks/use-teacher-dashboard";
import { AnnouncementCard } from "@/components/shared/AnnouncementCard";
import type { Announcement } from "@/types";

export function TeacherAnnouncementsTab() {
  const { announcements, teacher, loading } = useTeacherDashboard();
  const deleteMutation = useDeleteCourseAnnouncement();
  const updateMutation = useUpdateCourseAnnouncement();
  const [editing, setEditing] = useState<Announcement | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editIsPinned, setEditIsPinned] = useState(false);
  const [editLinks, setEditLinks] = useState<string[]>([""]);
  const [editPublishDate, setEditPublishDate] = useState("");
  const [editExpiryDate, setEditExpiryDate] = useState("");

  if (loading) {
    return (
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-muted-foreground">Loading announcements...</p>
      </div>
    );
  }

  const teacherId = teacher?.id ?? "";

  function openEdit(a: Announcement) {
    setEditing(a);
    setEditTitle(a.title);
    setEditMessage(a.message);
    setEditIsPinned(a.isPinned);
    setEditLinks(a.externalLinks && a.externalLinks.length > 0 ? [...a.externalLinks] : [""]);
    setEditPublishDate(a.publishDate ? a.publishDate.slice(0, 16) : "");
    setEditExpiryDate(a.expiryDate ? a.expiryDate.slice(0, 16) : "");
  }

  function closeEdit() {
    setEditing(null);
  }

  function addLink() {
    setEditLinks([...editLinks, ""]);
  }

  function updateLink(index: number, value: string) {
    const updated = [...editLinks];
    updated[index] = value;
    setEditLinks(updated);
  }

  function removeLink(index: number) {
    setEditLinks(editLinks.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!editing) return;
    try {
      const cleanLinks = editLinks.filter(Boolean);
      await updateMutation.mutateAsync({
        announcementId: editing.id,
        data: {
          title: editTitle,
          message: editMessage,
          isPinned: editIsPinned,
          externalLinks: cleanLinks.length > 0 ? cleanLinks : undefined,
          publishDate: editPublishDate ? new Date(editPublishDate).toISOString() : undefined,
          expiryDate: editExpiryDate ? new Date(editExpiryDate).toISOString() : null,
        },
      });
      toast.success("Announcement updated");
      closeEdit();
    } catch {
      toast.error("Failed to update announcement");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Announcement deleted");
    } catch {
      toast.error("Failed to delete announcement");
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-muted-foreground">Updates from admin and your courses.</p>
      </div>
      {announcements.length > 0 ? (
        <div className="grid gap-4">
          {announcements.map((a) => {
            const isOwnCourse = a.createdById === teacherId && a.creatorRole === "teacher";
            return (
              <AnnouncementCard
                key={a.id}
                announcement={a}
                onEdit={isOwnCourse ? () => openEdit(a) : undefined}
                onDelete={isOwnCourse ? () => handleDelete(a.id) : undefined}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">No announcements yet.</p>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => { if (!o) closeEdit(); }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="editTitle">Title</Label>
              <Input id="editTitle" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="editMessage">Message</Label>
              <Textarea id="editMessage" rows={4} value={editMessage} onChange={(e) => setEditMessage(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>External Links</Label>
              {editLinks.map((link, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input value={link} onChange={(e) => updateLink(i, e.target.value)} placeholder="https://example.com" />
                  {editLinks.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeLink(i)}>×</Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addLink}>+ Add Link</Button>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="editPinned" checked={editIsPinned} onCheckedChange={setEditIsPinned} />
              <Label htmlFor="editPinned">Pin this announcement</Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="editPublishDate">Publish Date</Label>
                <Input id="editPublishDate" type="datetime-local" value={editPublishDate} onChange={(e) => setEditPublishDate(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="editExpiryDate">Expiry Date</Label>
                <Input id="editExpiryDate" type="datetime-local" value={editExpiryDate} onChange={(e) => setEditExpiryDate(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEdit}>Cancel</Button>
            <Button onClick={handleSave} disabled={updateMutation.isPending}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
