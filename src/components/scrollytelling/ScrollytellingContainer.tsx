"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ImageSequenceCanvas } from "@/components/scrollytelling/ImageSequenceCanvas";
import { ScrollytellingSection } from "@/components/scrollytelling/ScrollytellingSection";

export default function ScrollytellingContainer() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />
      <div ref={scrollContainerRef} className="relative" style={{ height: "500vh" }}>
        <ImageSequenceCanvas
          frameCount={240}
          frameCount2={240}
          containerRef={scrollContainerRef}
        />
        <div className="relative z-10">
          <ScrollytellingSection
            align="center"
            headline="Aeriq"
            subheadline="Redefining the future of living."
            supportingLine="engineering modular biological infrastructure that transforms urban CO2 and wastewater into clean air, reusable biomass, and measurable climate impact at the speed cities need"
          />
          <ScrollytellingSection
            align="left"
            headline="Precision-engineered for life."
            subheadline="Industrial-grade stainless steel meets living microalgae."
            supportingLine="Every layer designed for efficiency, regeneration, and balance."
          />
          <ScrollytellingSection
            align="right"
            headline="Nature, accelerated."
            subheadline="Microalgae capture CO₂ and release oxygen."
            supportingLine="Smart sensors regulate light, flow, and nutrient cycles. Clean air and water — powered by biology."
          />
          <ScrollytellingSection
            align="center"
            headline="Circular by design."
            subheadline="From air purification to biofertilizers, Aeriq transforms waste into value."
            supportingLine="Each system contributes to a regenerative economy."
          />
          <ScrollytellingSection
            align="center"
            headline="Engineering the future of nature."
            subheadline="Aeriq — where sustainability becomes technology."
            cta="Explore Aeriq"
          />
        </div>
      </div>
    </>
  );
}
