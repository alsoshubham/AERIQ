/**
 * Phycosphere — Error Code Registry
 *
 * Every error shown to users is identified by a short, opaque code (e.g. PHY-001).
 * Stack traces, component names, and internal messages are NEVER surfaced to the UI.
 * Engineers can correlate codes → server logs via the `digest` field Next.js provides.
 */

export interface ErrorDefinition {
  /** Short human-readable title */
  title: string;
  /** Safe, user-facing explanation — zero technical detail */
  message: string;
  /** HTTP-like severity: "warn" = recoverable, "error" = needs action, "fatal" = critical */
  severity: "warn" | "error" | "fatal";
  /** Whether a "Try Again" retry button should be offered */
  retryable: boolean;
}

/** Full error catalogue */
export const ERROR_CODES: Record<string, ErrorDefinition> = {
  // ─── Render / Component ──────────────────────────────────────────────────
  "PHY-001": {
    title: "Something went wrong",
    message: "An unexpected issue occurred while loading this page. Our team has been notified.",
    severity: "error",
    retryable: true,
  },
  "PHY-002": {
    title: "Component failed to load",
    message: "Part of this page could not be rendered. Please try refreshing.",
    severity: "warn",
    retryable: true,
  },
  "PHY-003": {
    title: "Critical rendering error",
    message: "A critical error occurred. Please clear your cache and try again.",
    severity: "fatal",
    retryable: true,
  },

  // ─── Navigation / Routing ────────────────────────────────────────────────
  "PHY-404": {
    title: "Page not found",
    message: "The page you're looking for doesn't exist or has been moved.",
    severity: "warn",
    retryable: false,
  },
  "PHY-410": {
    title: "Page no longer available",
    message: "This page has been permanently removed. Please visit our homepage.",
    severity: "warn",
    retryable: false,
  },

  // ─── Data / Network ──────────────────────────────────────────────────────
  "PHY-101": {
    title: "Failed to load content",
    message: "We couldn't retrieve the content you requested. Check your connection and try again.",
    severity: "warn",
    retryable: true,
  },
  "PHY-102": {
    title: "Request timed out",
    message: "The request took too long to complete. Please try again in a moment.",
    severity: "warn",
    retryable: true,
  },
  "PHY-103": {
    title: "Service unavailable",
    message: "Our servers are temporarily unreachable. We're working on it — please try again shortly.",
    severity: "error",
    retryable: true,
  },

  // ─── Assets / Media ──────────────────────────────────────────────────────
  "PHY-201": {
    title: "Media failed to load",
    message: "Some images or videos on this page could not be loaded.",
    severity: "warn",
    retryable: true,
  },
  "PHY-202": {
    title: "Animation sequence unavailable",
    message: "The interactive experience could not be initialised. A static view is shown instead.",
    severity: "warn",
    retryable: true,
  },

  // ─── Form / Input ────────────────────────────────────────────────────────
  "PHY-301": {
    title: "Submission failed",
    message: "Your form could not be submitted. Please check your details and try again.",
    severity: "warn",
    retryable: true,
  },
  "PHY-302": {
    title: "Invalid input",
    message: "Some of the information entered is invalid. Please review and correct it.",
    severity: "warn",
    retryable: false,
  },

  // ─── Auth / Permissions (future) ─────────────────────────────────────────
  "PHY-401": {
    title: "Access denied",
    message: "You don't have permission to view this content.",
    severity: "error",
    retryable: false,
  },
  "PHY-403": {
    title: "Forbidden",
    message: "This action is not permitted.",
    severity: "error",
    retryable: false,
  },

  // ─── Fallback ────────────────────────────────────────────────────────────
  "PHY-000": {
    title: "Unknown error",
    message: "An unrecognised error occurred. Please refresh the page or contact support.",
    severity: "error",
    retryable: true,
  },
};

/**
 * Resolve a code to its ErrorDefinition.
 * Always falls back to PHY-000 so no raw error ever leaks to UI.
 */
export function resolveError(code?: string): ErrorDefinition & { code: string } {
  const key = code && ERROR_CODES[code] ? code : "PHY-000";
  return { code: key, ...ERROR_CODES[key] };
}

/**
 * Classify an Error object to a PHY code.
 * Intentionally conservative — when in doubt, return PHY-001.
 */
export function classifyError(error: Error & { digest?: string }): string {
  // Next.js server errors include a digest — log it server-side, show PHY-001 to user
  if (error.digest) return "PHY-001";

  const msg = error.message?.toLowerCase() ?? "";

  if (msg.includes("fetch") || msg.includes("network") || msg.includes("failed to fetch"))
    return "PHY-101";
  if (msg.includes("timeout") || msg.includes("timed out"))
    return "PHY-102";
  if (msg.includes("chunk") || msg.includes("loading chunk") || msg.includes("dynamically imported"))
    return "PHY-002";

  return "PHY-001";
}
