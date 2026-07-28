"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Menu, X, type LucideIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { APP_NAME } from "@/lib/config";
import type { UserRole } from "@/types";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

interface DashboardSidebarProps {
  navItems: readonly NavItem[] | NavItem[];
  role: UserRole;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function DashboardSidebar({
  navItems,
  role,
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { logout, user, userData } = useAuth();

  const currentTab = searchParams.get("tab") || "dashboard";

  const avatarSrc =
    (userData as any)?.image ||
    (userData as any)?.avatar ||
    user?.photoURL ||
    "";
  const displayName = userData?.name || user?.displayName || "User";

  const isActive = (item: NavItem) => {
    if (item.id === "dashboard") {
      return pathname === `/${role}` && !searchParams.has("tab");
    }
    return currentTab === item.id;
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-card border-r border-border/50">
      <div className={cn("flex h-16 items-center border-b border-border/50 px-3", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <span className="font-bold text-lg text-foreground">{APP_NAME}</span>
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

      {!collapsed && (
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={avatarSrc} alt={displayName} />
            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <Badge variant="secondary" className="text-xs capitalize mt-0.5">
              {role}
            </Badge>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.id}
              href={item.href as any}
              onClick={onMobileClose}
              className={cn(
                "flex w-full items-center gap-3 text-sm font-medium transition-colors rounded-md",
                collapsed
                  ? "justify-center py-3"
                  : "px-3 py-2.5",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}

        <button
          onClick={() => { logout(); onMobileClose(); }}
          className={cn(
            "flex w-full items-center gap-3 text-sm font-medium transition-colors rounded-md cursor-pointer text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
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
            <span className="font-bold text-lg text-foreground">{APP_NAME}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={avatarSrc} alt={displayName} />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <Badge variant="secondary" className="text-xs capitalize mt-0.5">
                {role}
              </Badge>
            </div>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.id}
                  href={item.href as any}
                  onClick={onMobileClose}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-md",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => { logout(); onMobileClose(); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-md cursor-pointer text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
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
