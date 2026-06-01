"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { useScroll } from "framer-motion";
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
          // Find the nearest loaded frame to show on first paint
          for (let offset = 0; offset < totalFrames; offset++) {
            const candidate = images.current[Math.min(frameIdx + offset, totalFrames - 1)];
            if (candidate?.complete && candidate.naturalWidth > 0) {
              drawImage(ctx, candidate);
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

  const pct = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <>
      {loaded < total && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-6">
            {/* Phycosphere wordmark during load */}
            <p className="text-white/90 text-3xl font-bold tracking-tight" style={{ fontFamily: "inherit" }}>
              Phycosphere
            </p>
            <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00FF88] to-[#00D6FF] rounded-full"
                style={{
                  width: `${pct}%`,
                  transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <p className="text-white/35 text-xs font-medium tracking-[0.2em] uppercase">
              Loading experience — {pct}%
            </p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-screen z-0 pointer-events-none"
        style={{ willChange: "transform" }}
      />
    </>
  );
};
