"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Reusable scroll-triggered section wrapper.
 * Animates children in with stagger when the section enters the viewport.
 */
export function Section({ children, className = "", id = "" }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`relative py-24 md:py-32 px-6 md:px-12 lg:px-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
