"use client";

/**
 * Route-level error boundary (app/error.tsx).
 * Wraps every page/layout under the root.
 * NEVER exposes error.message or error.stack to UI.
 * Uses error.digest (a server-side hash) for correlation in logs.
 */

import { useEffect } from "react";
import { classifyError } from "@/lib/errorCodes";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the opaque digest only — never the raw message — in production
    if (process.env.NODE_ENV === "production") {
      // Swap this for your error-reporting service (Sentry, Datadog, etc.)
      // Only the digest (a hash) is sent — no message, no stack.
      console.info("[Phycosphere] Error digest:", error.digest ?? "none");
    }
  }, [error]);

  const code = classifyError(error);

  return <ErrorDisplay code={code} onRetry={unstable_retry} fullScreen />;
}
