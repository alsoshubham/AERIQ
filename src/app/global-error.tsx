"use client";

/**
 * global-error.tsx — catches errors in the root layout itself.
 * Must render its own <html> and <body> tags (replaces the root layout).
 * See: Next.js docs — file-conventions/error#global-error
 */

import { useEffect } from "react";
import { Inter } from "next/font/google";
import { classifyError } from "@/lib/errorCodes";
import { ErrorDisplay } from "@/components/ErrorDisplay";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.info("[Phycosphere] Global error digest:", error.digest ?? "none");
    }
  }, [error]);

  const code = classifyError(error);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong — Phycosphere</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        className={inter.className}
        style={{
          margin: 0,
          padding: 0,
          background: "#050505",
          color: "#ededed",
          fontFamily: inter.style.fontFamily,
        }}
      >
        <ErrorDisplay code={code} onRetry={unstable_retry} fullScreen />
      </body>
    </html>
  );
}
