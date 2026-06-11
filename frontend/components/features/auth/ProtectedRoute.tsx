"use client";

import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPathForRole } from "@/lib/dashboard-routes";
import { UserRole } from "@/types";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallback,
}: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles && userRole) {
      if (!allowedRoles.includes(userRole)) {
        router.push(getDashboardPathForRole(userRole));
      }
    }
  }, [user, loading, router, userRole, allowedRoles, pathname]);

  if (loading) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) return null;

  return <>{children}</>;
}
