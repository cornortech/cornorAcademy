"use client";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { landingStats } from "@/lib/data";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            <Zap className="h-3 w-3 mr-1" />
            {"Trusted by 1,000 Students Worldwide"}
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
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                {"Start Learning Today"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
              asChild
            >
              <Link href="#demo">
                <Play className="mr-2 h-5 w-5" />
                {"Watch Demo"}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {landingStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
