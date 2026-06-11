"use client";

import { DashboardSidebar, type NavItem } from "@/components/dashboard/DashboardSidebar";
import { LayoutDashboard, BookOpen, Calendar, User } from "lucide-react";

export const studentNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/student" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/student?tab=courses" },
  { id: "upcoming", label: "Upcoming Classes", icon: Calendar, href: "/student?tab=upcoming" },
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
