"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Leaf, Beaker, Recycle, Zap, Layers } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Section } from "@/lib/SectionWrapper";

const topProducts = [
  {
    icon: <Recycle className="w-5 h-5" />,
    accent: "#00FF88",
    title: "Waste to Wealth",
    desc: "Transforming waste streams into recoverable resources, biomass and new value.",
    tag: "Flagship",
    wide: true,
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    accent: "#00D6FF",
    title: "Water Restoration",
    desc: "In-situ nature-based algal systems for nutrient recovery, water quality improvement and reuse.",
    tag: "Social / Environmental",
    wide: false,
  },
];

const bottomProducts = [
  {
    icon: <Zap className="w-5 h-5" />,
    accent: "#FFB800",
    title: "Energy & Green Fuels",
    desc: "Converting biomass into renewable fuels including biodiesel, biogas and bioethanol.",
    tag: "Environmental",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    accent: "#10B981",
    title: "Biobased Soil Amendments",
    desc: "Biobased inputs that improve soil health, nutrient cycling and crop resilience for climate-resilient agriculture.",
    tag: "Agricultural",
  },
  {
    icon: <Beaker className="w-5 h-5" />,
    accent: "#8B5CF6",
    title: "Value-added Bio-Molecules",
    desc: "Recovering high-value molecules from biomass for nutraceutical and industrial applications.",
    tag: "Industrial",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    accent: "#F43F5E",
    title: "Bioplastics and Biocomposites",
    desc: "Transforming recovered biomass into bio-based polymers and sustainable materials.",
    tag: "Materials",
  },
];

function CardTag({ accent, tag }: { accent: string; tag: string }) {
  return (
    <span
      className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={{ background: `${accent}12`, color: `${accent}BB` }}
    >
      {tag}
    </span>
  );
}

function GlowBlob({ accent }: { accent: string }) {
  return (
    <div
      className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[120px] opacity-[0.06] group-hover:opacity-[0.13] transition-opacity duration-700 pointer-events-none"
      style={{ background: accent }}
    />
  );
}

export function ProductsSection() {
  return (
    <Section className="bg-[#080808]" id="products">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-[#00FF88] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Our Products
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Solutions across resource-recovery<br />value chain.
          </h2>
          <p className="text-white/40 text-xl leading-relaxed max-w-5xl">
            Phycosphere transforms waste streams to recovered resources, energy and biofuels, agricultural soil stimulants and high-value bioproducts.
          </p>
        </motion.div>

        {/* Row 1: wide flagship (2 cols) + 1 card */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-3 mb-3">
          {topProducts.map((p, i) => (
            <div
              key={i}
              className={`group relative rounded-xl border border-white/[0.06] p-7 flex flex-col justify-between overflow-hidden hover:border-white/10 transition-all duration-500 min-h-[260px] ${p.wide ? "md:col-span-2" : ""}`}
            >
              <GlowBlob accent={p.accent} />
              {/* Diagonal stripe pattern on flagship */}
              {p.wide && (
                <div className="absolute top-0 right-0 w-48 h-full opacity-[0.03] pointer-events-none overflow-hidden">
                  {[...Array(10)].map((_, n) => (
                    <div
                      key={n}
                      className="absolute h-[200%] w-px rotate-[28deg] origin-top"
                      style={{ right: `${n * 18}px`, background: "white", top: "-50%" }}
                    />
                  ))}
                </div>
              )}
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.accent}15`, color: p.accent }}
                  >
                    {p.icon}
                  </div>
                  <CardTag accent={p.accent} tag={p.tag} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex items-center gap-2 mt-8 text-xs font-semibold uppercase tracking-wider text-white/25 group-hover:text-white/55 transition-colors duration-300 cursor-pointer">
                Explore Product
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2: four equal cards */}
        <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {bottomProducts.map((p, i) => (
            <div
              key={i}
              className="group relative rounded-xl border border-white/[0.06] p-6 flex flex-col justify-between overflow-hidden hover:border-white/10 transition-all duration-500 min-h-[220px]"
            >
              <GlowBlob accent={p.accent} />
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.accent}15`, color: p.accent }}
                  >
                    {p.icon}
                  </div>
                  <CardTag accent={p.accent} tag={p.tag} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 mt-5 text-[11px] font-semibold uppercase tracking-wider text-white/20 group-hover:text-white/45 transition-colors duration-300 cursor-pointer">
                Explore
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
