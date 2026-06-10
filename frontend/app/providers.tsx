"use client";

// This component wraps client-side providers
// Server-sidr setup (metadata, fonts) stays in layout.tsx

import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

// Added therme provider to prevent dark mode flicker later
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}
    disableTransitionOnChange
    >
    <AuthProvider>
      {children}
      <Toaster position="top-right" richColors />
    </AuthProvider>
    </ThemeProvider>
  );
}
