"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Heart, Settings, Sparkles, Check } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Section } from "@/lib/SectionWrapper";

export function DesignedInIndiaSection() {
  const benefits = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Environmental",
      color: "#00FF88",
      items: [
        "Resource recovery",
        "CO₂ utilisation",
        "Nature-based processes",
      ],
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Value Addition",
      color: "#FFB800",
      items: [
        "Waste → resources",
        "Biomass → bioproducts",
        "Multiple value streams",
      ],
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Operational",
      color: "#8B5CF6",
      items: [
        "Modular & scalable",
        "IoT-enabled monitoring",
        "Smart process control",
      ],
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Health",
      color: "#00D6FF",
      items: [
        "Air & water improvement",
        "Photosynthetic oxygen generation",
        "Low-impact operation",
      ],
    },
  ];

  return (
    <Section className="bg-[#050505]" id="why-phycosphere">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-[#00FF88] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Why Phycosphere
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Designed in India.<br />Manufactured in India.<br />Built for the World.
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#050505] p-8 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${b.color}15`, color: b.color }}
              >
                {b.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-5">{b.title}</h3>
              <ul className="space-y-4">
                {b.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/40 text-sm leading-relaxed">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: b.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
