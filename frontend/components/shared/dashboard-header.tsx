"use client";

import Link from "next/link";
import Image from "next/image";
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
  const { logout, userData, user } = useAuth();

  const avatarSrc =
    (userData as any)?.image ||
    (userData as any)?.avatar ||
    user?.photoURL ||
    "";
  const displayName = userData?.name || userName || "User";
  const email = userData?.email || user?.email || "";

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

          {/* ===== Logo ===== */}
          <div className="flex items-center space-x-4">
            <Link href={"/"} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center shadow-md">
                <Image
                  src="/logo/logo.png"
                  alt={`${APP_NAME} Logo`}
                  width={43}
                  height={43}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </Link>
            {getRoleBadge()}
          </div>
          {/* ===== End Logo ===== */}


          <div className="flex items-center space-x-4">

            {/* ===== Notifications Button ===== */}
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            {/* ===== End Notifications Button ===== */}

            {/* ===== User Menu ===== */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-muted hover:text-foreground focus:outline-none rounded-full px-2 py-1 transition"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarSrc} alt={displayName} />
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-sm font-medium">{displayName}</span>
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
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 group transition flex items-center space-x-2 px-4 py-2 rounded-md"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* ===== End User Menu ===== */}

          </div>
        </div>
      </div>
    </header>
  );
}
