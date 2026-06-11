"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/api/axios";

export interface SystemSettings {
  id: string;
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  facebookUrl: string;
  instagramUrl: string;
  allowRefunds: boolean;
  requireCertificate: boolean;
  autoArchive: boolean;
  currency: string;
  taxRate: number;
}

interface SettingsContextType {
  settings: SystemSettings | null;
  loading: boolean;
  formatPrice: (amount: number) => string;
  updateSettings: (newSettings: Partial<SystemSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get("/settings");
      setSettings(response.data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const formatPrice = (amount: number) => {
    const curr = settings?.currency || "npr";
    switch (curr.toLowerCase()) {
      case "usd":
        return `$${amount.toLocaleString()}`;
      case "eur":
        return `€${amount.toLocaleString()}`;
      case "gbp":
        return `£${amount.toLocaleString()}`;
      case "inr":
        return `₹${amount.toLocaleString()}`;
      case "npr":
      default:
        return `Rs. ${amount.toLocaleString()}`;
    }
  };

  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      const response = await axiosInstance.post("/settings", newSettings);
      setSettings(response.data);
    } catch (error) {
      console.error("Failed to update settings:", error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        formatPrice,
        updateSettings,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
