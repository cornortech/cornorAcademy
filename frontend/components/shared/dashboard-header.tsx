"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Bell, Settings, LogOut } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { UserRole } from "@/types";
import { APP_NAME } from "@/lib/config";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DashboardHeaderProps {
  userRole: UserRole | null;
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

export function DashboardHeader({
  userRole,
  userName,
  userAvatar,
}: DashboardHeaderProps) {
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
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={"/"} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-muted hover:text-foreground focus:outline-none rounded-full px-2 py-1 transition"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {userRole}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40 bg-background border border-border rounded-xl shadow-lg py-2"
              >
                <DropdownMenuItem
                  asChild
                  className="hover:bg-primary/10 transition"
                >
                  <Link
                    href={getProfileRoute()}
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="hover:bg-primary/10 transition"
                >
                  <Link
                    href="/courses"
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Courses</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={logout}
                  className="hover:bg-red-500 hover:text-white transition flex items-center space-x-2 px-4 py-2 rounded-b-xl"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
