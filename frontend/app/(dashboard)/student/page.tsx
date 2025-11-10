"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Bell, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { studentData } from "@/data/mock/students";
import StudentStatsCard from "@/components/dashboard/student/student-stats-card";
import StudentSearchFilter from "@/components/dashboard/student/search-filter";
import UpcomingClasses from "@/components/dashboard/student/UpcomingClasses";
import RecentAnnouncements from "@/components/dashboard/student/RecentAnnouncements";

export default function StudentDashboard() {
  const [joinClassLink, setJoinClassLink] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Corner Academy</span>
              </Link>
              <Badge variant="secondary">Student Portal</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile/student">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={studentData.avatar || "/placeholder.svg"}
                    alt={studentData.name}
                  />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{studentData.name}</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">
            Welcome back, {studentData.name}!
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey and achieve your goals.
          </p>
        </div>

        {/* Stats Cards */}
        <StudentStatsCard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses - Main Content */}
          <StudentSearchFilter />

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Classes */}
            <UpcomingClasses />

            {/* Recent Announcements */}
            <RecentAnnouncements />
          </div>
        </div>
      </div>
    </div>
  );
}
