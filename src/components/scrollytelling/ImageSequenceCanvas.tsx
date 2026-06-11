"use client";

import React, { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useFramePreloader } from "@/hooks/useFramePreloader";

interface ImageSequenceCanvasProps {
  frameCount: number;
  frameCount2: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const ImageSequenceCanvas: React.FC<ImageSequenceCanvasProps> = ({
  frameCount,
  frameCount2,
  containerRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating-point frame position for sub-frame interpolation
  const currentFrameRef = useRef(-1);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const lastDrawnRef = useRef(-1);

  const totalFrames = frameCount + frameCount2;

  const sequences = useMemo(
    () => [
      { path: "/frames", count: frameCount },
      { path: "/frames2", count: frameCount2 },
    ],
    [frameCount, frameCount2]
  );

  const { images, loaded, total } = useFramePreloader(sequences);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pause rAF when canvas is off-screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Handle canvas resize with DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      // Force redraw after resize
      lastDrawnRef.current = -1;
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** Draw a single image frame, cover-fitting to the canvas */
  const drawImage = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    ctx.clearRect(0, 0, vw, vh);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = vw / vh;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (canvasRatio > imgRatio) {
      drawW = vw;
      drawH = vw / imgRatio;
      drawX = 0;
      drawY = (vh - drawH) / 2;
    } else {
      drawH = vh;
      drawW = vh * imgRatio;
      drawX = (vw - drawW) / 2;
      drawY = 0;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  /**
   * Main render loop.
   * Uses lerp to smoothly ease toward the target frame,
   * only repaints when the displayed frame actually changes.
   */
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && isVisibleRef.current) {
      let progress = scrollYProgress.get();
      // Framer Motion can return NaN if the container isn't fully laid out yet. Protect against NaN poisoning.
      if (typeof progress !== "number" || isNaN(progress)) {
        progress = 0;
      }
      
      // Target as a float index
      const rawTarget = progress * (totalFrames - 1);
      targetFrameRef.current = rawTarget;

      // Lerp toward the target — tune factor for feel (0.12 = smooth, 0.25 = snappy)
      const lerpFactor = 0.18;
      const prev = currentFrameRef.current < 0 ? rawTarget : currentFrameRef.current;
      const next = prev + (rawTarget - prev) * lerpFactor;
      currentFrameRef.current = next;

      const frameIdx = Math.min(
        Math.max(Math.round(next), 0),
        totalFrames - 1
      );

      if (frameIdx !== lastDrawnRef.current) {
        const img = images.current[frameIdx];
        if (img?.complete && img.naturalWidth > 0) {
          drawImage(ctx, img);
          lastDrawnRef.current = frameIdx;
        } else if (lastDrawnRef.current === -1) {
          // First paint only: the exact frame isn't decoded yet, so show the
          // nearest decoded frame in EITHER direction. Frames load 0→N, so when
          // the page is reloaded deep in the sequence the closest ready frame is
          // usually *behind* the target — a forward-only scan would find nothing
          // and leave the canvas blank until the whole sequence loads.
          for (let offset = 1; offset < totalFrames; offset++) {
            const back = images.current[frameIdx - offset];
            if (back?.complete && back.naturalWidth > 0) {
              drawImage(ctx, back);
              lastDrawnRef.current = frameIdx - offset;
              break;
            }
            const fwd = images.current[frameIdx + offset];
            if (fwd?.complete && fwd.naturalWidth > 0) {
              drawImage(ctx, fwd);
              lastDrawnRef.current = frameIdx + offset;
              break;
            }
          }
        }
      }
    }

    rafRef.current = requestAnimationFrame(renderFrame);
  }, [totalFrames, scrollYProgress, images, drawImage]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [renderFrame]);

  const [showLoader, setShowLoader] = useState(true);

  // Reveal the experience as soon as a buffer of opening frames is decoded —
  // the remaining frames keep streaming in while the user scrolls. Waiting for
  // all ~480 frames (~21 MB) before showing anything is what made the loader
  // feel endless. 80 frames covers roughly the first screenful of scrolling.
  const READY_FRAMES = 80;
  const readyThreshold = Math.min(total || READY_FRAMES, READY_FRAMES);
  const isReady = total > 0 && loaded >= readyThreshold;

  // Hide the loader once the opening buffer is ready (with a short beat so the
  // exit animation can play).
  useEffect(() => {
    if (isReady) {
      const t = setTimeout(() => setShowLoader(false), 600);
      return () => clearTimeout(t);
    }
  }, [isReady]);

  // Safety net: never trap the user behind the loader. If images stall (a frame
  // that never fires load/error), reveal the page anyway after a hard timeout.
  useEffect(() => {
    const safety = setTimeout(() => setShowLoader(false), 8000);
    return () => clearTimeout(safety);
  }, []);

  const pct =
    readyThreshold > 0
      ? Math.min(100, Math.round((loaded / readyThreshold) * 100))
      : 0;

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
            style={{ background: "#050505" }}
          >
            {/* Ambient radial glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 55%, rgba(0,255,136,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Floating particle dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                aria-hidden
                className="absolute rounded-full"
                style={{
                  width: i % 2 === 0 ? 3 : 2,
                  height: i % 2 === 0 ? 3 : 2,
                  left: `${15 + i * 14}%`,
                  top: `${30 + (i % 3) * 15}%`,
                  background: i % 3 === 0 ? "#00FF88" : i % 3 === 1 ? "#00D6FF" : "#ffffff40",
                }}
                animate={{ y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }}
                transition={{
                  duration: 2.4 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}

            <div className="relative flex flex-col items-center gap-8">
              {/* Glowing logo */}
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Accent line above logo */}
                <motion.div
                  className="h-[1px] bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mb-3"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 56, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                />
                <p
                  className="text-white text-3xl font-bold tracking-[0.18em] uppercase"
                  style={{ fontFamily: "inherit", letterSpacing: "0.18em" }}
                >
                  Phycosphere
                </p>
                <motion.p
                  className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  The Living Machine
                </motion.p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-64 h-[2px] bg-white/8 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #00FF88, #00D6FF)",
                      width: `${pct}%`,
                      transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-y-0 w-16 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                    }}
                    animate={{ left: ["-16%", "110%"] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
                  />
                </div>
                <p className="text-white/25 text-[10px] font-medium tracking-[0.28em] uppercase">
                  {isReady ? "Ready" : `Loading — ${pct}%`}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-screen z-0 pointer-events-none"
      />
    </>
  );
};
