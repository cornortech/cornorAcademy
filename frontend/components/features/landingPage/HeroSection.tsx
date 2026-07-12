"use client";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPathForRole } from "@/lib/dashboard-routes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const HeroSection = () => {
  const { user, userRole } = useAuth();

  const handleStartLearning = () => {
    window.location.href = user ? getDashboardPathForRole(userRole || "student") : "/login";
  };
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              {"Learn with Purpose, Grow with Confidence"}
            </Badge>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6"
            variants={itemVariants}
          >
            {"The Complete Platform for "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              {"Online Learning"}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {
              "Transform your educational journey with our comprehensive learning management system. Expert-led courses, interactive dashboards, and personalized learning paths."
            }
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="text-lg px-8 transition-transform hover:scale-105 active:scale-95"
              onClick={handleStartLearning}
              aria-label="Start learning today"
            >
              {"Start Learning Today"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent transition-transform hover:scale-105 active:scale-95"
              asChild
            >
              <Link href="/courses" aria-label="Watch demo video">
                <Play className="mr-2 h-5 w-5" />
                {"Watch Demo"}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
