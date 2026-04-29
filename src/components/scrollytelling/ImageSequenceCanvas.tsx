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
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  const totalFrames = frameCount + frameCount2;

  // Memoize sequences array to prevent re-renders
  const sequences = useMemo(
    () => [
      { path: "/frames", count: frameCount },
      { path: "/frames2", count: frameCount2 },
    ],
    [frameCount, frameCount2]
  );

  // Batch-load frames using idle callbacks
  const { images, loaded, total } = useFramePreloader(sequences);

  // Track scroll progress within the container only
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
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render loop — skips when off-screen
  const renderFrame = useCallback(() => {
    if (!isVisibleRef.current) {
      rafRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      rafRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    const progress = scrollYProgress.get();
    const frameIdx = Math.min(
      Math.max(Math.floor(progress * (totalFrames - 1)), 0),
      totalFrames - 1
    );

    if (frameIdx !== currentFrameRef.current) {
      currentFrameRef.current = frameIdx;
      const img = images.current[frameIdx];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      ctx.clearRect(0, 0, vw, vh);

      if (img?.complete && img.naturalWidth > 0) {
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
      }
    }

    rafRef.current = requestAnimationFrame(renderFrame);
  }, [totalFrames, scrollYProgress, images]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [renderFrame]);

  return (
    <>
      {loaded < total && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00FF88] to-[#00D6FF] rounded-full transition-all duration-300"
                style={{ width: `${(loaded / total) * 100}%` }}
              />
            </div>
            <p className="text-white/40 text-sm font-medium tracking-wide">
              Loading experience... {Math.round((loaded / total) * 100)}%
            </p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-screen z-0 pointer-events-none"
      />
    </>
  );
};
