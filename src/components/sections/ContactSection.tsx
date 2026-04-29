"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Section } from "@/lib/SectionWrapper";

export function ContactSection() {
  const inputClasses =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none focus:border-[#00FF88]/30 focus:bg-white/[0.05] transition-all duration-200";

  return (
    <Section className="bg-[#080808]" id="contact-section">
      <div className="max-w-2xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-[#00FF88] text-sm font-medium tracking-[0.2em] uppercase mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Ready to breathe better?
          </h2>
          <p className="text-white/40 text-lg">
            Reach out to explore pilot programs, partnerships, or learn more.
          </p>
        </motion.div>

        <motion.form variants={fadeUp} className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className={inputClasses} />
            <input type="email" placeholder="Email Address" className={inputClasses} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Organization" className={inputClasses} />
            <input type="tel" placeholder="Phone Number" className={inputClasses} />
          </div>
          <textarea rows={5} placeholder="Your Message" className={`${inputClasses} resize-none`} />
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3.5 bg-[#00FF88] text-[#050505] font-semibold rounded-full text-sm tracking-wide hover:bg-[#00FF88]/90 transition-all duration-200 cursor-pointer"
            >
              Send Message
            </motion.button>
            <p className="text-white/20 text-xs mt-4">We respect your privacy. Your information will be kept confidential.</p>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}
