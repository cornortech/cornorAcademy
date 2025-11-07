import HeroSection from "@/components/landingPage/HeroSection";
import FeatureCard from "@/components/landingPage/FeatureCard";
import CourseSection from "@/components/landingPage/CourseSection";
import CertificateVerficationSection from "@/components/landingPage/CertificateVerficationSection";
import CTASection from "@/components/landingPage/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeatureCard />
      <CourseSection />
      <CertificateVerficationSection />
      <CTASection />
    </div>
  );
}
