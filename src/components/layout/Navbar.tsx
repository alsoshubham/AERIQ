"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

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

        <div className="flex items-center gap-3">
          <a
            href="#contact-section"
            className="hidden sm:inline-flex px-5 py-2 text-[13px] font-semibold rounded-full border border-[#00FF88]/30 text-white/80 hover:bg-[#00FF88]/10 hover:border-[#00FF88]/50 hover:text-white transition-all duration-300"
          >
            Get in Touch
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 rounded-lg text-white/70 hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 rounded-2xl border border-white/[0.08] bg-[#050505]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact-section"
                onClick={() => setMenuOpen(false)}
                className="mt-1 px-4 py-3 text-sm font-semibold text-center rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 text-white hover:bg-[#00FF88]/15 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
