/**
 * not-found.tsx — shown whenever notFound() is thrown
 * or the user navigates to a non-existent route.
 *
 * This is a Server Component (no "use client" directive needed).
 */

import type { Metadata } from "next";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export const metadata: Metadata = {
  title: "Page Not Found — Phycosphere",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <ErrorDisplay code="PHY-404" fullScreen />;
}
