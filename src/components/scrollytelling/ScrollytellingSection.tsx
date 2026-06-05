"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollytellingSectionProps {
  align: "left" | "right" | "center";
  headline: string;
  subheadline: string;
  supportingLine?: string;
  cta?: string;
}

export const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({
  align,
  headline,
  subheadline,
  supportingLine,
  cta,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]);

  const alignClasses =
    align === "center"
      ? "mx-auto text-center items-center"
      : align === "right"
      ? "ml-auto text-right items-end"
      : "mr-auto text-left items-start";

  return (
    <div
      ref={sectionRef}
      className="h-[100vh]"
    >
      {/* Full-bleed side vignette: darkens the side where text lives, keeping image visible on the opposite side */}
      <div
        aria-hidden="true"
        className="sticky top-0 h-screen pointer-events-none -z-0"
        style={{
          background:
            align === "center"
              ? "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.30) 60%, transparent 100%)"
              : align === "left"
              ? "linear-gradient(90deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.55) 45%, transparent 75%)"
              : "linear-gradient(270deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.55) 45%, transparent 75%)",
          position: "sticky",
          marginBottom: "-100vh",
        }}
      />
      <div className="sticky top-0 h-screen flex items-center px-8 md:px-24">
        <motion.div
          style={{ opacity, y, scale, willChange: "opacity, transform" }}
          className={`relative max-w-4xl w-full flex flex-col gap-5 ${alignClasses}`}
        >
          {/* Accent line */}
          <motion.div
            style={{ opacity }}
            className={`h-[2px] w-16 bg-gradient-to-r from-[#00FF88] to-[#00D6FF] rounded-full ${
              align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
            }`}
          />

          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]"
            style={{
              textShadow:
                "0 2px 32px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,136,0.12)",
            }}
          >
            {headline}
          </h2>

          <p
            className="text-lg sm:text-xl md:text-2xl text-white/85 font-medium max-w-2xl leading-relaxed"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8)" }}
          >
            {subheadline}
          </p>

          {supportingLine && (
            <p
              className="text-base md:text-lg text-white/55 max-w-xl leading-relaxed"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.95)" }}
            >
              {supportingLine}
            </p>
          )}

          {cta && (
            <>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0,255,136,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 px-10 py-4 bg-[#00FF88] text-[#050505] font-bold rounded-full text-lg tracking-wide shadow-[0_0_30px_rgba(0,255,136,0.35)] transition-all duration-300 cursor-pointer"
              >
                {cta}
              </motion.button>

              {/* Scroll indicator */}
              <div className="mt-10 flex flex-col items-center gap-2">
                <p className="text-white/30 text-xs tracking-widest uppercase">Scroll to explore</p>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
                >
                  <motion.div className="w-1 h-1 rounded-full bg-[#00FF88]" />
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};
