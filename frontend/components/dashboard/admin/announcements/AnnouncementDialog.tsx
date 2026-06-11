import React from "react";
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

interface AnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function AnnouncementDialog({
  open,
  onOpenChange,
  trigger,
}: AnnouncementDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Announcement published!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
          <DialogDescription>
            Post an announcement visible to all students and teachers
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="announce-title">Announcement Title</Label>
            <Input id="announce-title" placeholder="Enter announcement title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="announce-content">Content</Label>
            <Textarea
              id="announce-content"
              placeholder="Write your announcement here..."
              rows={5}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="announce-type">Announcement Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="important">Important</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="announce-visibility">Visible To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="teachers">Teachers Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Publish Announcement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
