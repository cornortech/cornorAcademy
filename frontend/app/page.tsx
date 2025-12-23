import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import FeatureSection from "@/components/features/landingPage/FeatureSection";
import HeroSection from "@/components/features/landingPage/HeroSection";
import CourseSection from "@/components/features/landingPage/CourseSection";
import InstructorsSection from "@/components/features/landingPage/InstructorsSection";
// import CertificateVerficationSection from "@/components/features/landingPage/CertificateVerficationSection"; // temporarily disabled
import CTASection from "@/components/features/landingPage/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader showNav={true} />
      <main>
        <HeroSection />
        <FeatureSection />
        <InstructorsSection />
        <CourseSection />
        {/* <CertificateVerficationSection /> */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
