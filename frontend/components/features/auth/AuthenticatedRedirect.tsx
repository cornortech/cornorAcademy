"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPathForRole } from "@/lib/dashboard-routes";

interface AuthenticatedRedirectProps {
  children: React.ReactNode;
}

export function AuthenticatedRedirect({ children }: AuthenticatedRedirectProps) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user || !userRole) return;
    router.replace(getDashboardPathForRole(userRole));
  }, [user, userRole, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user && userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
