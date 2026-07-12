"use client";

import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import FeatureSection from "@/components/features/landingPage/FeatureSection";
import HeroSection from "@/components/features/landingPage/HeroSection";
import { AboutUsSection } from "@/components/features/landingPage/AboutUsSection";
import CourseSection from "@/components/features/landingPage/CourseSection";
import CertificateVerficationSection from "@/components/features/landingPage/CertificateVerficationSection";
import TestimonialSection from "@/components/features/landingPage/TestimonialSection";
import { ContactUsSection } from "@/components/features/landingPage/ContactUsSection";
import CTASection from "@/components/features/landingPage/CTASection";

export function HomePageGate() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <PublicHeader showNav={true} />
      <main id="main-content">
        <HeroSection />
        <FeatureSection />
        <CourseSection />
        <CertificateVerficationSection />
        <TestimonialSection />
        <AboutUsSection />
        <ContactUsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
