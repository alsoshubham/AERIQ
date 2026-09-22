"use client";

import React from "react";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/[0.05] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-white tracking-tighter">PHYCOSPHERE</span>
            <p className="text-white/25 text-sm mt-4 leading-relaxed">
              Biology that goes more
            </p>
          </div>

          <div>
            <h4 className="text-white/30 font-medium text-xs uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3 text-sm text-white/25">
              <li className="hover:text-white transition-colors cursor-pointer">Technology</li>
              <li className="hover:text-white transition-colors cursor-pointer">Specifications</li>
              <li className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/30 font-medium text-xs uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-white/25">
              <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Press</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/30 font-medium text-xs uppercase tracking-widest mb-5">Connect</h4>
            <ul className="space-y-3 text-sm text-white/25">
              <li className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-white/20" /> admin@phycosphere.com
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-white/20" /> New Delhi, Delhi, India
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/phycosphere/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Phycosphere on LinkedIn"
                className="group w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-[#00D6FF]/40 transition-all duration-300"
                style={{
                  boxShadow: "0 0 0 0 rgba(0,214,255,0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 12px rgba(0,214,255,0.35), 0 0 24px rgba(0,214,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 0 rgba(0,214,255,0)";
                }}
              >
                {/* LinkedIn logo SVG */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://x.com/Phycosphere"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Phycosphere on X (Twitter)"
                className="group w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 12px rgba(255,255,255,0.2), 0 0 24px rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 0 rgba(255,255,255,0)";
                }}
              >
                {/* X (Twitter) logo SVG */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a
                href="mailto:admin@phycosphere.com"
                aria-label="Email Phycosphere"
                className="group w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-[#00FF88]/40 transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 12px rgba(0,255,136,0.35), 0 0 24px rgba(0,255,136,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 0 rgba(0,255,136,0)";
                }}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Phycosphere Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/25 text-xs">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
