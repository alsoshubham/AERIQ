"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ImageSequenceCanvas } from "@/components/scrollytelling/ImageSequenceCanvas";
import { ScrollytellingSection } from "@/components/scrollytelling/ScrollytellingSection";

export default function ScrollytellingContainer() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // The frame-sequence canvas decodes images 0→N, so a reload that restores the
  // browser to a mid-page scroll position lands the user in the middle of the
  // animation before those frames exist. Take over scroll restoration and always
  // begin at the hero (unless the URL carries a real #anchor deep link) so every
  // load is deterministic and the opening frames are the ones that load first.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

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
            headline="Phycosphere"
            subheadline="Nature, Engineered for Value."
            supportingLine="Turning waste streams and carbon into resources, products and measurable environmental value."
          />
          <ScrollytellingSection
            align="left"
            headline="From waste streams to value streams."
            subheadline="Nature-based technologies for resource recovery, waste valorisation and carbon utilisation."
            supportingLine="Built for industry, infrastructure and cities."
          />
          <ScrollytellingSection
            align="right"
            headline="Smarter systems. Greater resource value."
            subheadline="Modular, scalable solutions tailored to your waste streams, infrastructure and resource-recovery goals."
            supportingLine="Smart monitoring, IoT integration and AI-enabled optimisation connect treatment, recovery and valorisation."
          />
          <ScrollytellingSection
            align="center"
            headline="Circular by design."
            subheadline="Waste → Recovery → Transformation → Value"
            supportingLine={`From recovered nutrients, carbon and biomass to biofertilizers, biopolymers, biofibres, biofuels and other high-value bioproducts.

Closing loops. Creating value. Enabling regenerative economies.`}
          />
          <ScrollytellingSection
            align="center"
            headline="A world where waste becomes infrastructure."
            subheadline="PhycoSphere is building modular, intelligent resource-recovery systems that connect nature, technology and industry."
            supportingLine="Recover more. Create more value. Waste less."
          />
        </div>
      </div>
    </>
  );
}
