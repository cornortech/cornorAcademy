
"use client";
import Link from "next/link";
import {
  Award,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Target,
  Lightbulb,
  Heart,
  Briefcase,
  MapPin,
  Building2,
  Calendar,
} from "lucide-react";
import PublicHeader from "@/components/shared/public-header";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings } from "@/contexts/SettingsContext";

export default function AboutPage() {
  const { settings } = useSettings();

  const coreValues = [
    {
      title: "Transformative Learning",
      description:
        "We go beyond surface-level education to create transformative experiences that enable our students to think critically, solve complex problems, and adapt to the ever-changing tech landscape.",
      icon: Lightbulb,
    },
    {
      title: "Outcome-Focused Design",
      description:
        "Every course is built with measurable outcomes in mind. We track student progress, adapt our curriculum based on industry feedback, and ensure real-world applicability.",
      icon: Target,
    },
    {
      title: "Industry Partnership",
      description:
        "We collaborate directly with leading tech companies to ensure our curriculum stays ahead of market demands and provides students with relevant, job-ready skills.",
      icon: Briefcase,
    },
    {
      title: "Inclusive Excellence",
      description:
        "Education should be accessible. We're committed to providing high-quality learning opportunities to students from diverse backgrounds and experience levels.",
      icon: Heart,
    },
  ];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader showNav={true} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">About Us</h2>
            <p className="text-muted-foreground text-lg">
              Practical tech education, built for ambitious learners
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
            <div className="space-y-4 text-muted-foreground leading-8">
              <p>
                {settings?.platformName || "Cornor Academy"} started with a clear goal: make technology education useful,
                easy to follow, and aligned with the needs of modern learners and employers.
              </p>
              <p>
                Today we deliver practical learning experiences, strong instructor support,
                and a community that helps students grow with confidence around CornorTech
                products CornorTech POS, CornorTech AI, and ChatWithLead.
              </p>
              <p>
                We keep our approach straightforward: teach the skills that matter, show how
                to use them, and help learners make real progress.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, label: "Location", value: "Tilottama-3, Janakinagar" },
              { icon: Building2, label: "District", value: "Rupandehi, Nepal" },
              { icon: Calendar, label: "Established", value: "2024" },
              { icon: Target, label: "Focus", value: "Practical tech learning" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/70 transition-colors">
                  <CardContent className="pt-6">
                    <div className="rounded-2xl bg-primary/10 p-3 w-fit text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="values" className="py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Mission & Values</h2>
            <p className="text-muted-foreground text-lg">
              We&apos;re dedicated to excellence in education and student success
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/70 transition-colors"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary mt-1 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose {settings?.platformName || "Cornor Academy"}?</h2>
            <p className="text-muted-foreground text-lg">
              Stand out with skills that matter
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Industry-expert instructors with real-world experience",
              "Hands-on projects that build a professional portfolio",
              "Flexible learning paths tailored to your pace",
              "Lifetime access to course materials and updates",
              "Certificate of completion recognized by industry leaders",
              "Dedicated support from our learning advisors",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card/30"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What You&apos;ll Achieve</h2>
            <p className="text-muted-foreground text-lg">
              Real skills for real-world opportunities
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>Learn at Your Pace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access course materials anytime, anywhere. Learn on your own schedule without compromising on quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle>Get Certified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn recognized certificates that demonstrate your expertise and boost your professional credibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle>Advance Your Career</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build skills that employers value and open doors to exciting career opportunities and growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center rounded-3xl border border-border/70 bg-primary/5 p-10 md:p-16 shadow-sm backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of learners already transforming their careers at {settings?.platformName || "Cornor Academy"}.
              Choose a course and begin your learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Talk to an Advisor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
