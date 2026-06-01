"use client";

import React from "react";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#030303] border-t border-white/[0.05] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-white tracking-tighter">PHYCOSPHERE</span>
            <p className="text-white/25 text-sm mt-4 leading-relaxed">
              Bioengineered microalgae systems for urban air purification. Each unit replicates 15–25 trees in a 1 m² footprint.
            </p>
          </div>

          <div>
            <h4 className="text-white/30 font-medium text-xs uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3 text-sm text-white/25">
              <li className="hover:text-white/50 transition-colors cursor-pointer">Phycosphere Purifier</li>
              <li className="hover:text-white/50 transition-colors cursor-pointer">Technology</li>
              <li className="hover:text-white/50 transition-colors cursor-pointer">Specifications</li>
              <li className="hover:text-white/50 transition-colors cursor-pointer">Case Studies</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/30 font-medium text-xs uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-white/25">
              <li className="hover:text-white/50 transition-colors cursor-pointer">Our Story</li>
              <li className="hover:text-white/50 transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white/50 transition-colors cursor-pointer">Press</li>
              <li className="hover:text-white/50 transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/30 font-medium text-xs uppercase tracking-widest mb-5">Connect</h4>
            <ul className="space-y-3 text-sm text-white/25">
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-white/20" /> info@phycosphere.in
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-white/20" /> India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Phycosphere — Matiyari Technology Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/20 text-xs">
            <span className="hover:text-white/40 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white/40 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
