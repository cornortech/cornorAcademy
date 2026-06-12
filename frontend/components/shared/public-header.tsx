"use client";
import { ArrowLeft, BookOpen, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { APP_NAME } from "@/lib/config";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { getDashboardPathForRole } from "@/lib/dashboard-routes";

interface PublicHeaderProps {
  showNav?: boolean;
  showBackButton?: boolean;
}

const PublicHeader = ({
  showNav = true,
  showBackButton = false,
}: PublicHeaderProps) => {
  const { user, logout, userRole, userData } = useAuth();

  const avatarSrc =
    (userData as any)?.image ||
    (userData as any)?.avatar ||
    user?.photoURL ||
    "";
  const displayName = userData?.name || user?.displayName || "User";
  const email = userData?.email || user?.email || "";

  const navItems = [
    { label: "Courses", href: "/courses" },
    { label: "Verify Certificate", href: "/#verify-certificate" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const pathname = usePathname();
  const homeHref = user && userRole ? getDashboardPathForRole(userRole) : "/";

  return (
    <nav className="ice-nav border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center space-x-4">
          
            {showBackButton && (
              <Button variant="ghost" size="sm" asChild>
                <Link href={homeHref}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            )}

            <Link href={homeHref} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo/logo.png"
                  alt={`${APP_NAME} Logo`}
                  width={43}
                  height={43}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                {APP_NAME}
              </span>
            </Link>

          </div>

          {showNav && !showBackButton && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href as any}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none group">
                  <Avatar className="h-9 w-9 border border-border transition-all group-hover:ring-2 group-hover:ring-primary/20 group-hover:border-primary/50">
                    <AvatarImage
                      src={avatarSrc}
                      alt={displayName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/5 text-primary font-medium text-xs">
                      {getInitials(displayName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 p-2 rounded-xl shadow-lg border bg-popover"
              >
                <div className="px-2 py-1.5 mb-1">
                  <p className="text-sm font-medium leading-none">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {email}
                  </p>
                </div>

                <div className="h-px bg-border my-1" />

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-md focus:bg-accent focus:text-accent-foreground"
                >
                  <Link
                    href={getDashboardPathForRole(userRole || "student")}
                    className="flex items-center px-2 py-2"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-md focus:bg-accent focus:text-accent-foreground"
                >
                  <Link href="/courses" className="flex items-center px-2 py-2">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>My Courses</span>
                  </Link>
                </DropdownMenuItem>

                <div className="h-px bg-border my-1" />

                <DropdownMenuItem
                  onSelect={logout}
                  className="cursor-pointer rounded-md text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          )}


        </div>
      </div>
    </nav>
  );
};

export default PublicHeader;
