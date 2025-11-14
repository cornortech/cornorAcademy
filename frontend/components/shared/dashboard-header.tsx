"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Bell, Settings, LogOut } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { UserRole } from "@/types";
import { APP_NAME } from "@/lib/config";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  userRole: UserRole;
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

export function DashboardHeader({
  userRole,
  userName,
  userEmail,
  userAvatar,
}: DashboardHeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const getRoleBadge = () => {
    switch (userRole) {
      case "admin":
        return <Badge variant="destructive">Admin Portal</Badge>;
      case "teacher":
        return <Badge variant="secondary">Teacher Portal</Badge>;
      case "student":
        return <Badge variant="secondary">Student Portal</Badge>;
    }
  };

  const getProfileRoute = () => {
    switch (userRole) {
      case "student":
        return "/profile/student";
      case "teacher":
        return "/profile/teacher";
      default:
        return "#";
    }
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={"/"} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </Link>
            {getRoleBadge()}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={getProfileRoute()}>
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
