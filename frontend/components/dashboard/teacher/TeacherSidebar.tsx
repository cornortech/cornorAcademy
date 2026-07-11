"use client";

import { DashboardSidebar, type NavItem } from "@/components/dashboard/DashboardSidebar";
import { LayoutDashboard, BookOpen, Calendar, User, FileText, Megaphone } from "lucide-react";

export const teacherNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/teacher" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/teacher?tab=courses" },
  { id: "upcoming", label: "Upcoming Classes", icon: Calendar, href: "/teacher?tab=upcoming" },
  { id: "enrollments", label: "Enrollments", icon: FileText, href: "/teacher?tab=enrollments" },
  { id: "announcements", label: "Announcements", icon: Megaphone, href: "/teacher?tab=announcements" },
  { id: "profile", label: "Profile", icon: User, href: "/teacher?tab=profile" },
] as const satisfies readonly NavItem[];

interface TeacherSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function TeacherSidebar(props: TeacherSidebarProps) {
  return (
    <DashboardSidebar
      navItems={teacherNavItems}
      role="teacher"
      {...props}
    />
  );
}
