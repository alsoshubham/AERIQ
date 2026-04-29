"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2, Plane, Factory, Briefcase, Hospital,
  Zap, Leaf, TreePine, GraduationCap, Droplets, Heart,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Section } from "@/lib/SectionWrapper";

export function ApplicationsSection() {
  const applications = [
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Smart Cities & Urban Infrastructure",
      desc: "Deploy Aeriq across smart-city plazas, walkways and redevelopment corridors.",
      image: "https://images.unsplash.com/photo-1715870251864-64fd4a6ae4ad?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Plane className="w-5 h-5" />,
      title: "Airports & Transit Hubs",
      desc: "Continuous CO₂ reduction and oxygen enrichment for high-traffic commuter hubs.",
      image: "https://images.unsplash.com/photo-1667731705714-e206818ab2d4?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Factory className="w-5 h-5" />,
      title: "Industrial & Manufacturing Zones",
      desc: "Reduce emissions, toxic gases, and heat pockets in industrial parks.",
      image: "https://images.unsplash.com/photo-1602860109208-613d39362844?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Corporate Parks",
      desc: "ESG-focused fresh-air zones for tech campuses and business districts.",
      image: "https://plus.unsplash.com/premium_photo-1676357175446-8e85f2205ea6?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Government Buildings",
      desc: "Bio-engineered air purification across civic offices and institutions.",
      image: "https://plus.unsplash.com/premium_photo-1697730326668-6b0eb391bc55?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Hospital className="w-5 h-5" />,
      title: "Hospitals & Healthcare",
      desc: "Cleaner breathing zones to support patient recovery and staff wellbeing.",
      image: "https://images.unsplash.com/photo-1710074213374-e68503a1b795?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Highways & Toll Plazas",
      desc: "Reduce vehicle-related pollutants at toll gates and expressway rest stops.",
      image: "https://plus.unsplash.com/premium_photo-1661875371684-2e579931d559?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Public Parks & Recreation",
      desc: "Living air solutions that boost local air quality and public engagement.",
      image: "https://plus.unsplash.com/premium_photo-1661938135446-9aae7262fed5?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <TreePine className="w-5 h-5" />,
      title: "Residential Societies",
      desc: "Premium sustainability feature that adds value to modern developments.",
      image: "https://images.unsplash.com/photo-1745069362156-d4bf22cf49f2?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Schools & Universities",
      desc: "Healthy learning environments through visible, living technology.",
      image: "https://images.unsplash.com/photo-1695204651916-a300caba0d7e?w=600&auto=format&fit=crop&q=60",
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      title: "Sewage Treatment Plants",
      desc: "Neutralize odours and toxic gases with algae-based remediation.",
      image: "https://media.istockphoto.com/id/2156572065/photo/a-panoramic-view-of-the-lakeside-sewage-treatment-plant-in-the-township.webp?a=1&b=1&s=612x612&w=0&k=20&c=c_85uGE5vINAc_GzFq1lp7qVdjCM1PEQVdsa-7hjDyE=",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "CSR & ESG Projects",
      desc: "Measurable environmental transformation with real-time CO₂ metrics.",
      image: "https://plus.unsplash.com/premium_photo-1713766195580-89ab68b59eef?w=600&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <Section className="bg-[#050505]" id="bioeconomy">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-[#00FF88] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Applications
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Ideal Applications
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            Purpose-built for high-impact environments across cities and industries.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {applications.map((app, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative h-64 rounded-xl overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${app.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-[#00FF88]/0 group-hover:bg-[#00FF88]/5 transition-colors duration-500" />

              <div className="relative z-10 h-full p-5 flex flex-col justify-end">
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 text-white/80 group-hover:bg-[#00FF88]/20 group-hover:text-[#00FF88] transition-all duration-300">
                  {app.icon}
                </div>
                <h3 className="text-sm font-semibold text-white leading-snug mb-1 group-hover:text-[#00FF88] transition-colors duration-300">
                  {app.title}
                </h3>
                <div className="overflow-hidden">
                  <p className="text-white/50 text-xs leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-1 transition-all duration-500 ease-out">
                    {app.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
