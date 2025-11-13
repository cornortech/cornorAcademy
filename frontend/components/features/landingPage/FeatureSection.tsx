import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Award, Clock, Globe, Play, Shield, Users } from "lucide-react";

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            {"Everything you need to succeed"}
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {
              "Comprehensive tools and features designed for students, teachers, and administrators."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{"Multi-Role Dashboards"}</CardTitle>
              <CardDescription>
                {
                  "Specialized interfaces for students, teachers, and administrators with role-specific features and permissions."
                }
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{"Interactive Video Learning"}</CardTitle>
              <CardDescription>
                {
                  "High-quality video content with progress tracking, annotations, and interactive elements for enhanced learning."
                }
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{"Smart Scheduling"}</CardTitle>
              <CardDescription>
                {
                  "Automated class scheduling with calendar integration, reminders, and attendance tracking for seamless learning."
                }
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{"Certificate Validation"}</CardTitle>
              <CardDescription>
                {
                  "Secure certificate generation and validation system with unique codes for credential verification."
                }
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{"Secure Payment System"}</CardTitle>
              <CardDescription>
                {
                  "Integrated payment management with secure transactions, installment options, and automated billing."
                }
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{"Global Accessibility"}</CardTitle>
              <CardDescription>
                {
                  "Learn from anywhere with mobile-responsive design, offline content, and multi-language support."
                }
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
