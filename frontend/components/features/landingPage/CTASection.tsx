"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary/5" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            id="cta-heading"
            className="text-3xl lg:text-4xl font-bold text-balance mb-6"
          >
            {"Ready to start your learning journey?"}
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-8">
            {
              "Join thousands of students who have transformed their careers with Cornor Academy."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 transition-transform hover:scale-105 active:scale-95"
              asChild
              aria-label="Get started free"
            >
              <Link href="/signup">
                {"Get Started Free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent transition-transform hover:scale-105 active:scale-95"
              asChild
              aria-label="Contact us"
            >
              <Link href="/contact">{"Contact Us"}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
