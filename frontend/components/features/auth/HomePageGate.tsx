"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPathForRole } from "@/lib/dashboard-routes";
import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import FeatureSection from "@/components/features/landingPage/FeatureSection";
import HeroSection from "@/components/features/landingPage/HeroSection";
import CourseSection from "@/components/features/landingPage/CourseSection";
import CertificateVerficationSection from "@/components/features/landingPage/CertificateVerficationSection";
import TestimonialSection from "@/components/features/landingPage/TestimonialSection";
import CTASection from "@/components/features/landingPage/CTASection";

export function HomePageGate() {
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader showNav={true} />
      <main>
        <HeroSection />
        <FeatureSection />
        <CourseSection />
        <CertificateVerficationSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
