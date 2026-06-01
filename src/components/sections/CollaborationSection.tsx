"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart3, Users } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Section } from "@/lib/SectionWrapper";

export function CollaborationSection() {
  const models = [
    {
      title: "Pilot Program",
      duration: "3–6 months",
      desc: "Test Phycosphere in your facility with a fully managed trial. We handle setup, monitoring, and optimization.",
      accent: "#00FF88",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "ESG Investment",
      duration: "Carbon Credits",
      desc: "Invest in verifiable environmental impact. Each Phycosphere unit generates measurable carbon offset data.",
      accent: "#00D6FF",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: "CSR Partnerships",
      duration: "Long-term",
      desc: "Align your brand with sustainability. Deploy Phycosphere units as part of your corporate social responsibility initiatives.",
      accent: "#8B5CF6",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <Section className="bg-[#050505]" id="invest">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-[#8B5CF6] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Collaborate
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Partner With Phycosphere
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            Multiple pathways to bring clean air technology to your organization.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-4">
          {models.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative rounded-xl border border-white/[0.06] p-7 overflow-hidden hover:border-white/10 transition-all duration-500"
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-700"
                style={{ background: m.accent }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${m.accent}15`, color: m.accent }}
              >
                {m.icon}
              </div>
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: `${m.accent}90` }}>
                {m.duration}
              </p>
              <h3 className="text-base font-semibold text-white mb-3">{m.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
