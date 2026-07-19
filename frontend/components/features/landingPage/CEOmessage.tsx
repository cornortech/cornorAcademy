"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CEOmessage() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/about-us/ceo.jpg"
                alt="CEO of Cornor Academy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-6">
              Our Mission & Vision
            </h2>
            
            <blockquote className="text-lg text-muted-foreground text-balance italic border-l-4 border-primary pl-4 mb-2">
              &ldquo;At Cornor Academy, we believe technology education should be practical, accessible, and aligned with real-world needs. Our mission is to empower learners with skills that matter, bridge the gap between knowledge and application, and build a community where students grow with confidence.&rdquo;
            </blockquote>

            <p className="text-sm font-semibold text-primary mb-6">— Ramit Neupane, CEO</p>

            <div className="space-y-4 text-muted-foreground leading-8">
              <p>
                Cornor Academy started with a clear goal: make technology education useful,
                easy to follow, and aligned with the needs of modern learners and employers.
              </p>
              <p>
                Today we deliver practical learning experiences, strong instructor support,
                and a community that helps students grow with confidence around CornorTech.
              </p>
              <p>
                We keep our approach straightforward: teach the skills that matter, show how
                to use them, and help learners make real progress.
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}