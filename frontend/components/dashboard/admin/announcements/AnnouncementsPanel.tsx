"use client";

import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "../shared/SearchAndFilter";
import { Input } from "@/components/ui/input";
import { AnnouncementDialog } from "./AnnouncementDialog";
import { AnnouncementList } from "./AnnouncementList";

export function AnnouncementsPanel() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Platform Announcements</h3>
          <p className="text-muted-foreground">
            Create and manage announcements for students and teachers
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

      <div className="flex items-center space-x-4 mb-6">
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
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-1" />
          Filter
        </Button>
      </div>

      <AnnouncementList />
    </div>
  );
}
