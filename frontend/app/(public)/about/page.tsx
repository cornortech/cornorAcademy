"use client";

import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import { AboutUsSection } from "@/components/features/landingPage/AboutUsSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicHeader showNav={true} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <AboutUsSection />
      </main>
      <Footer />
    </div>
  );
}
