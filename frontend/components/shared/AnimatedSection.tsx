"use client";

import { motion, type Variants } from "framer-motion";
import { useRef } from "react";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const defaultStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  stagger?: boolean;
  id?: string;
  "aria-labelledby"?: string;
  role?: string;
}

const AnimatedSection = ({
  children,
  className,
  as = "section",
  stagger = false,
  id,
  ...rest
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const variants = stagger ? defaultStaggerVariants : defaultVariants;
  const Tag = motion[as];

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;
