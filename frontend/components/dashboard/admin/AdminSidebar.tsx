"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Student Management", icon: Users },
  { id: "teachers", label: "Teacher Management", icon: GraduationCap },
  { id: "courses", label: "Course Management", icon: BookOpen },
  { id: "enrollment-requests", label: "Enrollment", icon: FileText },
  { id: "announcements", label: "Announcement", icon: Megaphone },
  { id: "settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const { logout } = useAuth();

  const sidebarContent = (
    <div className="flex h-full flex-col bg-card border-r border-border/50">
      <div className={cn("flex h-16 items-center border-b border-border/50 px-3", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <span className="font-bold text-lg text-foreground">Super Admin Panel</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onToggle();
            onMobileClose();
          }}
          className="shrink-0"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onMobileClose();
              }}
              className={cn(
                "flex w-full items-center gap-3 text-sm font-medium transition-colors",
                collapsed
                  ? "justify-center py-3"
                  : "px-3 py-2.5",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
        <button
          onClick={logout}
          className={cn(
            "flex w-full items-center gap-3 text-sm font-medium transition-colors text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
            collapsed ? "justify-center py-3" : "px-3 py-2.5"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="truncate">Logout</span>}
        </button>
      </nav>
    </div>
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 -translate-x-full transition-transform duration-300 lg:hidden",
          mobileOpen && "translate-x-0"
        )}
      >
        <div className="flex h-full flex-col bg-card border-r border-border/50">
          <div className="flex h-16 items-center justify-between border-b border-border/50 px-3">
            <span className="font-bold text-lg text-foreground">Super Admin Panel</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onMobileClose();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => { logout(); onMobileClose(); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="truncate">Logout</span>
            </button>
          </nav>
        </div>
      </aside>
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-0 h-screen z-30 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
