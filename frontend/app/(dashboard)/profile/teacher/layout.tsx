"use client";
import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";
import { ProfileHeader } from "@/components/shared/profile-header";
import { ReactNode } from "react";

export default function TeacherProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-background">
        <ProfileHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
