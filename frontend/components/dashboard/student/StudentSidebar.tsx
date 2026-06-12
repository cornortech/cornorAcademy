"use client";

import { DashboardSidebar, type NavItem } from "@/components/dashboard/DashboardSidebar";
import { Home, LayoutDashboard, BookOpen, Calendar, Megaphone, User } from "lucide-react";

export const studentNavItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/student" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/student?tab=courses" },
  { id: "upcoming", label: "Upcoming Classes", icon: Calendar, href: "/student?tab=upcoming" },
  { id: "announcements", label: "Announcements", icon: Megaphone, href: "/student?tab=announcements" },
  { id: "profile", label: "Profile", icon: User, href: "/student?tab=profile" },
] as const satisfies readonly NavItem[];

interface StudentSidebarProps {
  collapsed: boolean; 
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function StudentSidebar(props: StudentSidebarProps) {
  return (
    <DashboardSidebar
      navItems={studentNavItems}
      role="student"
      {...props}
    />
  );
}
