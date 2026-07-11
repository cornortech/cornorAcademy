"use client";

import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useGetAnnouncements, useDeleteAnnouncement } from "@/api/announcement";
import { AnnouncementDialog } from "@/components/dashboard/admin/announcements/AnnouncementDialog";
import { AnnouncementCard } from "@/components/shared/AnnouncementCard";

export function AdminAnnouncementsTab() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [targetFilter, setTargetFilter] = useState("");
  const [editTarget, setEditTarget] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filters = searchQuery
    ? { search: searchQuery, ...(targetFilter ? { target: targetFilter } : {}) }
    : targetFilter
    ? { target: targetFilter }
    : undefined;

  const { data: announcements, isLoading, error } = useGetAnnouncements(filters);
  const deleteMutation = useDeleteAnnouncement();

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Announcement deleted");
    } catch {
      toast.error("Failed to delete announcement");
    }
  }

  function handleEdit(announcement: any) {
    setEditTarget(announcement);
    setIsEditOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Announcements</h1>
          <p className="text-muted-foreground">
            Create and manage platform & course announcements
          </p>
        </div>
        <AnnouncementDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Create Announcement
            </Button>
          }
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={targetFilter} onValueChange={setTargetFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-1" />
            <SelectValue placeholder="All targets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All targets</SelectItem>
            <SelectItem value="EVERYONE">Everyone</SelectItem>
            <SelectItem value="ALL_STUDENTS">Students</SelectItem>
            <SelectItem value="ALL_TEACHERS">Teachers</SelectItem>
            <SelectItem value="SPECIFIC_COURSE">Course</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-muted-foreground py-8">
          Failed to load announcements
        </p>
      ) : !announcements || announcements.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No announcements yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {announcements.map((a) => (
            <AnnouncementCard
              key={a.id}
              announcement={a}
              onEdit={() => handleEdit(a)}
              onDelete={() => handleDelete(a.id)}
            />
          ))}
        </div>
      )}

      {editTarget && (
        <AnnouncementDialog
          open={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open);
            if (!open) setEditTarget(null);
          }}
          mode="edit"
          initialData={editTarget}
        />
      )}
    </div>
  );
}
