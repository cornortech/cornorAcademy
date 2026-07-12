"use client";

import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import { ContactUsSection } from "@/components/features/landingPage/ContactUsSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicHeader showNav={true} />
      <main className="flex-1">
        <ContactUsSection />
      </main>
      <Footer />
    </div>
  );
}
