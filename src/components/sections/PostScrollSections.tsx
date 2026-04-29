"use client";

import { DesignedInIndiaSection } from "@/components/sections/DesignedInIndiaSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { CollaborationSection } from "@/components/sections/CollaborationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

/**
 * Section order (post-scrollytelling):
 * 1. DesignedInIndia  — Why Aeriq / benefits overview
 * 2. Technical        — Engineering details
 * 3. Products         — Our product range
 * 4. Applications     — Where it's deployed
 * 5. Collaboration    — Partner pathways
 * 6. Contact          — Lead capture
 * 7. Footer
 */
export default function PostScrollSections() {
  return (
    <div className="relative z-30">
      <DesignedInIndiaSection />
      <TechnicalSection />
      <ProductsSection />
      <ApplicationsSection />
      <CollaborationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
