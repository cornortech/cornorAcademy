"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Menu } from "lucide-react";
import { TeacherSidebar } from "@/components/dashboard/teacher/TeacherSidebar";
import TeacherDashboardLoading from "./loading";

export default function TeacherDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const hideSidebar = pathname.includes("/course/");

  return (
    <ProtectedRoute
      allowedRoles={["teacher"]}
      fallback={<TeacherDashboardLoading />}
    >
      {hideSidebar ? (
        <>{children}</>
      ) : (
        <div className="min-h-screen bg-background">
          <TeacherSidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />
          <main className={cn(
            "min-h-screen transition-all duration-300 p-6 lg:p-8",
            sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          )}>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden mb-4 p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            {children}
          </main>
        </div>
      )}
    </ProtectedRoute>
  );
}
