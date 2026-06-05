"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Monitor, Sun, Cpu } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Section } from "@/lib/SectionWrapper";

export function TechnicalSection() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Forged in stainless steel",
      desc: "Precision-engineered, weather-resistant body built to last decades. Industrial-grade materials meet elegant design for any environment.",
      accent: "#00FF88",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Illuminate every detail",
      desc: "Advanced monitoring system with real-time data visualization. Track AQI, algae health, and environmental metrics from an integrated smart display.",
      accent: "#00D6FF",
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Built to thrive anywhere",
      desc: "Solar-powered energy system for zero-electricity operation. Sustainable, autonomous, and designed for India's diverse climate conditions.",
      accent: "#FFB800",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Smart AQI Display",
      desc: "Real-time air quality index, weather conditions, and algae health tracking on a responsive, always-on screen.",
      accent: "#8B5CF6",
    },
  ];

  return (
    <Section className="bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-[#00D6FF] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Engineering
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Built different.<br />Built to last.
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            Every component is purpose-designed for maximum performance.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative rounded-xl border border-white/[0.06] p-7 overflow-hidden hover:border-white/10 transition-all duration-500"
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[120px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700"
                style={{ background: f.accent }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${f.accent}12`, color: f.accent }}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
