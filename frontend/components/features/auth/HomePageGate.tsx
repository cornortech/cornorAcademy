"use client";

import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import FeatureSection from "@/components/features/landingPage/FeatureSection";
import HeroSection from "@/components/features/landingPage/HeroSection";
import CourseSection from "@/components/features/landingPage/CourseSection";
import CertificateVerficationSection from "@/components/features/landingPage/CertificateVerficationSection";
import TestimonialSection from "@/components/features/landingPage/TestimonialSection";
import CTASection from "@/components/features/landingPage/CTASection";

export function HomePageGate() {
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
