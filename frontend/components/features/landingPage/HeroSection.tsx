"use client";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPathForRole } from "@/lib/dashboard-routes";

const HeroSection = () => {
  const { user, userRole } = useAuth();

  const handleStartLearning = () => {
    window.location.href = user ? getDashboardPathForRole(userRole || "student") : "/login";
  };
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            <Zap className="h-3 w-3 mr-1" />
            {"Learn with Purpose, Grow with Confidence"}
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            {"The Complete Platform for "}
            <span className="text-primary">{"Online Learning"}</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            {
              "Transform your educational journey with our comprehensive learning management system. Expert-led courses, interactive dashboards, and personalized learning paths."
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" onClick={handleStartLearning}>
              {"Start Learning Today"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
              asChild
            >
              <Link href="/courses">
                <Play className="mr-2 h-5 w-5" />
                {"Watch Demo"}
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
