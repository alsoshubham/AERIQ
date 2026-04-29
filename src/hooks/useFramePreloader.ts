"use client";

import { useEffect, useRef, useState } from "react";

interface FrameSequence {
  path: string;
  count: number;
}

/**
 * Preloads image frames in batches using requestIdleCallback
 * to avoid blocking the main thread during initial page load.
 */
export function useFramePreloader(sequences: FrameSequence[], batchSize = 30) {
  const [loaded, setLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const total = sequences.reduce((acc, s) => acc + s.count, 0);

  useEffect(() => {
    const allPaths: string[] = [];
    for (const seq of sequences) {
      for (let i = 1; i <= seq.count; i++) {
        allPaths.push(`${seq.path}/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`);
      }
    }

    const imgs: HTMLImageElement[] = new Array(allPaths.length);
    let cursor = 0;

    function loadBatch() {
      const end = Math.min(cursor + batchSize, allPaths.length);
      for (let i = cursor; i < end; i++) {
        const img = new Image();
        img.src = allPaths[i];
        img.onload = () => setLoaded((p) => p + 1);
        img.onerror = () => setLoaded((p) => p + 1);
        imgs[i] = img;
      }
      cursor = end;
      if (cursor < allPaths.length) {
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(loadBatch);
        } else {
          setTimeout(loadBatch, 0);
        }
      }
    }

    loadBatch();
    imagesRef.current = imgs;
  }, [sequences, batchSize]);

  return { images: imagesRef, loaded, total };
}
