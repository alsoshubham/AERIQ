"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Applications", href: "#bioeconomy" },
  { label: "Partner", href: "#invest" },
];

export const Navbar = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);

  return (
    <motion.nav
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
    >
      {/* Backdrop */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[#050505] backdrop-blur-xl border-b border-white/[0.05]"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
        <a href="#" className="text-xl font-bold tracking-tighter text-white">
          PHYCOSPHERE
        </a>

        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-white/40">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact-section"
          className="px-5 py-2 text-[13px] font-semibold rounded-full border border-[#00FF88]/30 text-white/80 hover:bg-[#00FF88]/10 hover:border-[#00FF88]/50 hover:text-white transition-all duration-300"
        >
          Get in Touch
        </a>
      </div>
    </motion.nav>
  );
};
