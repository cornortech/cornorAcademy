"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, GraduationCap, Book, User, BookOpen, Pin, Edit, Trash2, Target } from "lucide-react";
import type { Announcement } from "@/types";

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TARGET_LABELS: Record<string, string> = {
  EVERYONE: "Everyone",
  ALL_STUDENTS: "All Students",
  ALL_TEACHERS: "All Teachers",
  SPECIFIC_COURSE: "Course",
  INDIVIDUAL_USER: "Individual",
  COURSE_STUDENTS: "Course Students",
};

const TARGET_ICONS: Record<string, React.ElementType> = {
  EVERYONE: Globe,
  ALL_STUDENTS: Book,
  ALL_TEACHERS: GraduationCap,
  SPECIFIC_COURSE: BookOpen,
  INDIVIDUAL_USER: User,
  COURSE_STUDENTS: Book,
};

function getTypeLabel(target: string, creatorRole: string): { label: string; variant: "default" | "secondary" | "outline" } {
  if (target === "EVERYONE" || target === "ALL_TEACHERS" || target === "ALL_STUDENTS") {
    return { label: "Platform", variant: "default" };
  }
  return { label: "Course", variant: "secondary" };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isExpired(dateStr: string | null) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

export function AnnouncementCard({ announcement, onEdit, onDelete }: AnnouncementCardProps) {
  const TargetIcon = TARGET_ICONS[announcement.target] || Target;
  const typeInfo = getTypeLabel(announcement.target, announcement.creatorRole);
  const expired = isExpired(announcement.expiryDate);

  return (
    <Card className={`border-border/50 bg-card/50 backdrop-blur ${expired ? "opacity-50" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">

            {/* Header row */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {announcement.isPinned && (
                <Pin className="h-4 w-4 text-primary shrink-0" />
              )}
              <h4 className="font-semibold text-base truncate">
                {announcement.title}
              </h4>
              {expired && (
                <Badge variant="outline" className="text-xs">Expired</Badge>
              )}
            </div>

            {/* Tags row */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <Badge variant={typeInfo.variant} className="flex items-center gap-1 text-xs">
                <TargetIcon className="h-3 w-3" />
                {TARGET_LABELS[announcement.target] || announcement.target}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                {typeInfo.label}
              </Badge>
              {announcement.courseName && (
                <span className="text-xs text-muted-foreground">
                  {announcement.courseName}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                by {announcement.creatorRole === "admin" ? "Admin" : announcement.creatorRole === "teacher" ? "Teacher" : announcement.createdById.slice(0, 8)}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(announcement.publishDate)}
              </span>
              {announcement.expiryDate && (
                <span className="text-xs text-muted-foreground">
                  expires {formatDate(announcement.expiryDate)}
                </span>
              )}
            </div>

            {/* Message */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {announcement.message}
            </p>

            {/* Links */}
            {announcement.externalLinks && announcement.externalLinks.length > 0 && (
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {announcement.externalLinks.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate max-w-[200px]">
                    {link}
                  </a>
                ))}
              </div>
            )}

            {/* Attachments */}
            {announcement.attachments && announcement.attachments.length > 0 && (
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {announcement.attachments.map((att, i) => (
                  <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-secondary px-2 py-1 rounded-md hover:bg-secondary/80 truncate max-w-[200px]">
                    {att.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Actions — only shown if handlers provided */}
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1 ml-4 shrink-0">
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button variant="ghost" size="sm" onClick={onDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
