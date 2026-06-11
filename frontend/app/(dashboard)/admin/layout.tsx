"use client";

import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";
import { ReactNode } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      {children}
    </ProtectedRoute>
  );
}
