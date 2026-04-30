"use client";

import { useEffect, useRef, useState } from "react";

interface FrameSequence {
  path: string;
  count: number;
}

/**
 * Preloads image frames aggressively (first batch sync, rest via rIC)
 * so the canvas always has a valid ref to the shared array.
 */
export function useFramePreloader(sequences: FrameSequence[], batchSize = 40) {
  const [loaded, setLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const total = sequences.reduce((acc, s) => acc + s.count, 0);

  useEffect(() => {
    // Reset on re-mount / hot-reload
    setLoaded(0);

    const allPaths: string[] = [];
    for (const seq of sequences) {
      for (let i = 1; i <= seq.count; i++) {
        allPaths.push(
          `${seq.path}/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`
        );
      }
    }

    let isCancelled = false;

    // Allocate array and assign to ref FIRST so the canvas
    // always reads from the same shared reference.
    const imgs: HTMLImageElement[] = new Array(allPaths.length);
    imagesRef.current = imgs;

    let loadedCount = 0;
    let cursor = 0;

    function loadBatch() {
      if (isCancelled) return;
      
      const end = Math.min(cursor + batchSize, allPaths.length);
      for (let i = cursor; i < end; i++) {
        const img = new Image();
        // Aggressive decode hint for GPU-accelerated drawing
        img.decoding = "async";
        img.src = allPaths[i];
        imgs[i] = img; // store immediately so canvas can access as soon as .complete
        img.onload = () => {
          if (isCancelled) return;
          loadedCount++;
          setLoaded(loadedCount);
        };
        img.onerror = () => {
          if (isCancelled) return;
          loadedCount++;
          setLoaded(loadedCount);
        };
      }
      cursor = end;
      if (cursor < allPaths.length && !isCancelled) {
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(loadBatch, { timeout: 200 });
        } else {
          setTimeout(loadBatch, 0);
        }
      }
    }

    loadBatch();

    // Cleanup: abort pending loads on unmount
    return () => {
      isCancelled = true;
      for (const img of imgs) {
        if (img) img.src = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);          // intentionally stable — sequences is memoised in consumer

  return { images: imagesRef, loaded, total };
}
