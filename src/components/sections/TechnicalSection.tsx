"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Cpu, Sliders, Recycle } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Section } from "@/lib/SectionWrapper";

export function TechnicalSection() {
  const features = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "01 — Advanced Reactor Systems",
      desc: "State-of-the-art modular photobioreactor architecture designed for efficient cultivation, resource recovery and scalable deployment.",
      accent: "#00FF88",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "02 — Smart Technology",
      desc: "IoT-enabled monitoring, automation and data-driven process control - with AI-ready architecture for optimisation and predictive operation.",
      accent: "#00D6FF",
    },
    {
      icon: <Sliders className="w-6 h-6" />,
      title: "03 — Tailored by Design",
      desc: "Client-specific systems engineered around feedstock, process conditions, site constraints, operating goals and scale.",
      accent: "#8B5CF6",
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "04 — Biomass to Bioproducts",
      desc: "Integrated biomass recovery and downstream pathways for biofertilizers, biopolymers, biofibres, biofuels and other high-value products.",
      accent: "#FFB800",
    },
  ];

  return (
    <Section className="bg-[#080808]" id="technology">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-[#00D6FF] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Engineering
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Engineered for performance.<br />Built for scale.
          </h2>
          <p className="text-white/40 text-xl leading-relaxed max-w-5xl">
            From reactor architecture to biomass valorisation, every layer is designed around the application.
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
