"use client";

import React from "react";
import { motion } from "framer-motion";
import { resolveError } from "@/lib/errorCodes";

interface ErrorDisplayProps {
  code?: string;
  onRetry?: () => void;
  /** Full-screen mode (used by error.tsx / global-error.tsx) */
  fullScreen?: boolean;
}

export function ErrorDisplay({ code, onRetry, fullScreen = true }: ErrorDisplayProps) {
  const err = resolveError(code);

  const severityAccent =
    err.severity === "fatal"
      ? "#FF4D6D"
      : err.severity === "error"
      ? "#FF8C42"
      : "#00D6FF";

  const severityLabel =
    err.severity === "fatal" ? "Critical" : err.severity === "error" ? "Error" : "Notice";

  return (
    <div
      className={`flex items-center justify-center bg-[#050505] ${
        fullScreen ? "fixed inset-0 z-[200]" : "min-h-[40vh] w-full rounded-2xl"
      }`}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 35% at 50% 55%, ${severityAccent}0A 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center gap-8 px-8 max-w-lg"
      >
        {/* Error code badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-3"
        >
          {/* Top accent line */}
          <div
            className="h-[1px] w-12 rounded-full mb-2"
            style={{ background: severityAccent }}
          />

          {/* AERIQ logo — light version */}
          <img
            src="/aeriq-logo-light.png"
            alt="AERIQ"
            className="w-14 h-14 object-contain opacity-60 mb-2"
            draggable={false}
          />

          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border"
            style={{
              color: severityAccent,
              borderColor: `${severityAccent}30`,
              background: `${severityAccent}0D`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: severityAccent }}
            />
            {severityLabel} · {err.code}
          </span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            {err.title}
          </h1>
          <p className="text-white/45 text-base leading-relaxed max-w-sm mx-auto">
            {err.message}
          </p>
        </motion.div>

        {/* Reference hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-white/15 text-[11px] tracking-widest uppercase font-medium"
        >
          Reference: {err.code}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 w-full justify-center"
        >
          {err.retryable && onRetry && (
            <motion.button
              onClick={onRetry}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full font-semibold text-sm text-[#050505] transition-all duration-300 cursor-pointer"
              style={{
                background: severityAccent,
                boxShadow: `0 0 28px ${severityAccent}40`,
              }}
            >
              Try again
            </motion.button>
          )}

          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full font-semibold text-sm text-white/60 border border-white/[0.1] hover:text-white hover:border-white/20 transition-all duration-300 text-center"
          >
            Go home
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
