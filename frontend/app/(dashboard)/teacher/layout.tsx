"use client";
import { DashboardHeader } from "@/components/shared/dashboard-header";
import { mockTeacherData } from "@/lib/data";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function TeacherDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const user = mockTeacherData;

  const hideHeader = pathname.includes("/course/");

  if (hideHeader) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userRole={user.role}
        userName={user.name}
        userEmail={user.email}
        userAvatar={user.avatar}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
