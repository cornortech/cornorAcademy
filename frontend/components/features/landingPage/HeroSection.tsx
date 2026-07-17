"use client";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPathForRole } from "@/lib/dashboard-routes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const circle1Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 },
  },
};

const circle2Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.4 },
  },
};

const circle3Variants = {
  hidden: { opacity: 0, scale: 0.6, x: 30, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.6 },
  },
};

const HeroSection = () => {
  const { user, userRole } = useAuth();

  const handleStartLearning = () => {
    window.location.href = user ? getDashboardPathForRole(userRole || "student") : "/login";
  };

  return (
    <section className="relative pt-12 pb-12 overflow-hidden bg-primary sm:pt-20 sm:pb-16 lg:pb-20 xl:pb-24">
      {/* Background images — three round shapes on right side */}
      {/* Circle 1: largest, back layer */}
      <motion.div
        className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-[5%] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden opacity-40 xl:opacity-70 w-[200px] h-[200px]"
        variants={circle1Variants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/hero/hero1.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 200px, 380px"
          className="object-cover"
          priority
        />
      </motion.div>
      {/* Circle 2: medium, middle layer */}
      <motion.div
        className="hidden sm:block absolute top-[5%] right-[25%] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden opacity-30 xl:opacity-60 w-[140px] h-[140px]"
        variants={circle2Variants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/hero/hero2.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 140px, 260px"
          className="object-cover"
        />
      </motion.div>
      {/* Circle 3: smallest, front layer */}
      <motion.div
        className="hidden sm:block absolute bottom-[5%] right-[15%] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden opacity-50 xl:opacity-90 border-4 border-white/20 w-[100px] h-[100px]"
        variants={circle3Variants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/hero/hero3.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100px, 200px"
          className="object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <motion.div
            className="w-full text-left lg:w-2/3 xl:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="font-sans text-base font-normal tracking-tight uppercase text-white"
              variants={itemVariants}
            >
              Learn with purpose, grow with confidence
            </motion.p>

            <motion.h1
              className="mt-6 tracking-tighter text-white"
              variants={itemVariants}
            >
              <span className="font-sans font-normal text-4xl sm:text-5xl lg:text-7xl">Master</span>
              <br />
              <span className="font-serif italic font-normal text-5xl sm:text-6xl lg:text-8xl">
                the tools behind
              </span>
            </motion.h1>

            <motion.p
              className="mt-12 font-sans text-base font-normal leading-7 max-w-xs md:max-w-sm text-white text-opacity-70"
              variants={itemVariants}
            >
              Transform your educational journey with our comprehensive learning management system. Expert-led courses, interactive dashboards, and personalized learning paths.
            </motion.p>

            <motion.div
              className="flex items-center justify-end mt-8 space-x-3 md:justify-start sm:space-x-4"
              variants={itemVariants}
            >
              <button
                type="button"
                onClick={handleStartLearning}
                className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 border-2 border-transparent rounded-full sm:leading-8 bg-white sm:text-lg text-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-primary"
              >
                Start Learning Today
              </button>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 bg-transparent border-2 rounded-full sm:leading-8 text-white border-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:text-primary sm:text-lg focus:ring-offset-primary"
              >
                <Info className="w-6 h-6 mr-2" />
                About Us
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
