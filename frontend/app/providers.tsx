"use client";

import { ReactNode, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsProvider } from "@/contexts/SettingsContext";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}
    disableTransitionOnChange
    >
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </SettingsProvider>
    </QueryClientProvider>
    </ThemeProvider>
  );
}
