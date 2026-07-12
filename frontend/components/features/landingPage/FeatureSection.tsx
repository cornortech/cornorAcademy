"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Award, Clock, Globe, Play, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Multi-Role Dashboards",
    description:
      "Specialized interfaces for students, teachers, and administrators with role-specific features and permissions.",
  },
  {
    icon: Play,
    title: "Interactive Video Learning",
    description:
      "High-quality video content with progress tracking, annotations, and interactive elements for enhanced learning.",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description:
      "Automated class scheduling with calendar integration, reminders, and attendance tracking for seamless learning.",
  },
  {
    icon: Award,
    title: "Certificate Validation",
    description:
      "Secure certificate generation and validation system with unique codes for credential verification.",
  },
  {
    icon: Shield,
    title: "Secure Payment System",
    description:
      "Integrated payment management with secure transactions, installment options, and automated billing.",
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Learn from anywhere with mobile-responsive design, offline content, and multi-language support.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="py-20 bg-muted/30"
      aria-labelledby="features-heading"
      role="region"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            id="features-heading"
            className="text-3xl lg:text-4xl font-bold text-balance mb-4"
          >
            {"Everything you need to succeed"}
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {
              "Comprehensive tools and features designed for students, teachers, and administrators."
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={index}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur h-full transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
