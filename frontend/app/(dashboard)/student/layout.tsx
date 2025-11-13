"use client";
import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";
import { DashboardHeader } from "@/components/shared/dashboard-header";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const hideHeader =
    pathname.includes("/course/") || pathname.includes("/materials/");

  return (
    <ProtectedRoute>
      {hideHeader ? (
        <>{children}</>
      ) : (
        <div className="min-h-screen bg-background">
          <DashboardHeader
            userRole="student"
            userName={user?.displayName || "Student"}
            userEmail={user?.email || ""}
            userAvatar={user?.photoURL || ""}
          />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      )}
    </ProtectedRoute>
  );
}
