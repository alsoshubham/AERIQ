# Phycosphere — AERIQ Website

> **AERIQ** is the flagship product line of **Phycosphere Pvt. Ltd.** — India's first bioengineered microalgae system for urban air purification, water treatment, and sustainable bio-economy applications.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF0076?logo=framer)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Sections](#sections)
- [Scrollytelling System](#scrollytelling-system)
- [Error Handling System](#error-handling-system)
- [Form Integration](#form-integration)
- [Assets & Branding](#assets--branding)
- [Local Development](#local-development)
- [Environment & Configuration](#environment--configuration)
- [Deployment](#deployment)

---

## Overview

This is the marketing website for the **Phycosphere AERIQ** product line. It features:

- **GPU-accelerated scrollytelling** — a 480-frame image sequence animation driven by scroll position, rendered via `<canvas>` with RAF lerp
- **Premium loading screen** — animated particles, branded progress bar with shimmer, and smooth fade-out
- **Dark-mode-first design** — deep blacks (`#050505`), green (`#00FF88`) and cyan (`#00D6FF`) accents
- **Production-safe error handling** — all errors shown as opaque PHY codes; no stack traces ever reach the user
- **FormSubmit.co integration** — contact form sends submissions to `hello.phycosphere@gmail.com`

---

## Tech Stack

| Layer | Technology | Version |
| --- | --- | --- |
| Framework | Next.js (App Router) | 16.2.4 |
| Runtime | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Animations | Framer Motion | ^12 |
| Icons | Lucide React | ^1.14 |
| Utilities | clsx, tailwind-merge | latest |
| Form Backend | FormSubmit.co | — |
| Font | Inter (Google Fonts) | via next/font |
| Build Tool | Turbopack (Next.js) | bundled |
| Package Manager | npm | — |

---

## Project Structure

```
AERIQ/
├── public/
│   ├── aeriq-logo-dark.png      # AERIQ logo — black on white (for light backgrounds)
│   ├── aeriq-logo-light.png     # AERIQ logo — white on dark (for dark backgrounds)
│   ├── frames/                  # Image sequence 1 (frames 001–240, JPG)
│   └── frames2/                 # Image sequence 2 (frames 001–240, JPG)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout — Inter font, metadata, <head> preconnects
│   │   ├── page.tsx             # Home page — composes ScrollytellingContainer + PostScrollSections
│   │   ├── globals.css          # Global CSS — Tailwind theme tokens, scrollbar, GPU layer hints
│   │   ├── error.tsx            # Route-level error boundary (Next.js App Router)
│   │   ├── global-error.tsx     # Root layout error boundary (renders own <html>/<body>)
│   │   ├── not-found.tsx        # 404 page
│   │   └── thank-you/
│   │       └── page.tsx         # Post-form-submission confirmation page
│   │
│   ├── components/
│   │   ├── ErrorDisplay.tsx     # Shared branded error UI (used by all error pages)
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Sticky top nav — fades in on scroll with backdrop blur
│   │   │   └── Footer.tsx       # Four-column footer — includes AERIQ light logo
│   │   │
│   │   ├── scrollytelling/
│   │   │   ├── ScrollytellingContainer.tsx   # Orchestrator — sets 500vh scroll height, owns canvas + sections
│   │   │   ├── ImageSequenceCanvas.tsx       # Canvas renderer — RAF lerp, DPR-aware, IntersectionObserver pause
│   │   │   └── ScrollytellingSection.tsx     # Single sticky text panel — opacity/y/scale on scroll + vignette
│   │   │
│   │   └── sections/
│   │       ├── PostScrollSections.tsx        # Aggregator for all post-scroll static sections
│   │       ├── DesignedInIndiaSection.tsx    # Why Phycosphere — 3 benefit columns
│   │       ├── TechnicalSection.tsx          # Engineering — 4 feature cards
│   │       ├── ProductsSection.tsx           # Product grid — 2 top + 4 bottom cards
│   │       ├── ApplicationsSection.tsx       # 12 application image cards
│   │       ├── CollaborationSection.tsx      # 3 partnership models
│   │       └── ContactSection.tsx            # FormSubmit contact form
│   │
│   ├── hooks/
│   │   └── useFramePreloader.ts   # Batch image preloader — rIC scheduling, shared ref array
│   │
│   └── lib/
│       ├── animations.ts          # Shared Framer Motion variants (fadeUp, staggerContainer)
│       ├── SectionWrapper.tsx     # <Section> — scroll-triggered stagger animation wrapper
│       └── errorCodes.ts          # PHY error code registry + classifyError() + resolveError()
│
├── next.config.ts               # Next.js config — Turbopack root, image remote patterns
├── tsconfig.json                # TypeScript config
├── postcss.config.mjs           # PostCSS config for Tailwind v4
├── eslint.config.mjs            # ESLint config
└── package.json
```

---

## Pages

### `/` — Home

The only page. Composed of two dynamically imported sections to enable code splitting:

1. **`ScrollytellingContainer`** — the 500vh scroll-driven animation experience
2. **`PostScrollSections`** — all static marketing sections below the animation

### `/thank-you`

Displayed after a successful contact form submission. Branded confirmation page with a link back to the homepage.

### `/not-found` (404)

Triggered automatically by Next.js for any unknown route. Shows `PHY-404` error screen with a "Go home" button.

### `/error` (Route Error Boundary)

Shown when any component inside the page throws an error at runtime. Logs only the opaque `digest` hash, never the raw error message.

### `/global-error` (Root Error Boundary)

Shown when the root layout itself throws. Renders its own `<html>` and `<body>` with the full error UI.

---

## Sections

All post-scroll sections live under `src/components/sections/`. They are wrapped in the `<Section>` component which triggers a stagger fade-up animation when scrolled into view.

### 1. Scrollytelling — Hero Sequence

**File:** `ScrollytellingContainer.tsx` + `ScrollytellingSection.tsx`

Five sticky panels displayed over the animated canvas background:

| # | Headline | Alignment | Copy |
| --- | --- | --- | --- |
| 1 | Phycosphere | Center | Redefining the future of living |
| 2 | Precision-engineered for life. | Left | Industrial-grade stainless steel meets living microalgae |
| 3 | Nature, accelerated. | Right | Microalgae capture CO₂ and release oxygen |
| 4 | Circular by design. | Center | From water treatment to biofertilizers… |
| 5 | Engineering the future of nature. | Center | CTA — Explore Phycosphere |

Each panel has a full-viewport directional vignette gradient on the text side to ensure legibility over the product imagery.

### 2. Why Phycosphere — Designed in India

**File:** `DesignedInIndiaSection.tsx` | **Anchor:** `#technology`

Three benefit columns:

- **Environmental** — CO₂ absorption, zero harmful emissions
- **Health** — Chemical-free air purification, silent operation
- **Operational** — Solar-powered, IoT monitoring, low maintenance

### 3. Engineering — Built Different

**File:** `TechnicalSection.tsx`

Four feature cards covering the hardware engineering:

- Forged in stainless steel
- Illuminate every detail (AQI smart display)
- Built to thrive anywhere (solar-powered)
- Smart AQI Display (real-time monitoring)

### 4. Products

**File:** `ProductsSection.tsx` | **Anchor:** `#products`

Six products in a bento-style grid:

**Top row (flagship + 1):**

- **Air Purification Unit** *(Flagship)* — replaces 15–25 trees in 1 m²
- **Water Restoration** *(Industrial)* — heavy metal + phosphate extraction

**Bottom row (4 equal cards):**

- **Agriculture** — biostimulants & biofertilizers
- **Nutraceuticals** — Omega-3 & antioxidant production
- **Textile & Dyeing** — carbon-negative indigo pigments
- **Bioplastics** — compostable polymers from biomass

### 5. Applications

**File:** `ApplicationsSection.tsx` | **Anchor:** `#bioeconomy`

Twelve application cards with real photography, hover reveal, and scale animations:

Smart Cities, Airports, Industrial Zones, Corporate Parks, Government Buildings, Hospitals, Highways, Public Parks, Residential Societies, Schools & Universities, Sewage Treatment Plants, CSR & ESG Projects.

### 6. Partner With Phycosphere

**File:** `CollaborationSection.tsx` | **Anchor:** `#invest`

Three collaboration models:

- **Pilot Program** — 3–6 month managed trial
- **ESG Investment** — carbon credits & verifiable offsets
- **CSR Partnerships** — long-term brand alignment

### 7. Contact

**File:** `ContactSection.tsx` | **Anchor:** `#contact-section`

FormSubmit-powered contact form. Fields: Full Name, Email, Organization, Phone, Message.

### 8. Footer

**File:** `Footer.tsx`

Four-column footer: Brand (with AERIQ logo), Product links, Company links, Contact info.

---

## Scrollytelling System

The canvas animation is driven by three files:

### `useFramePreloader.ts`

Preloads all 480 JPEG frames in batches using `requestIdleCallback`. Frames are stored in a shared `useRef` array so the canvas always has immediate access without waiting for React re-renders.

### `ImageSequenceCanvas.tsx`

- Renders a `<canvas>` fixed to the viewport
- Uses `useScroll` from Framer Motion to track scroll progress across the 500vh container
- A `requestAnimationFrame` loop lerps the current frame toward the target (factor `0.18`) for smooth inertia
- DPR-aware canvas sizing for retina displays
- `IntersectionObserver` pauses the RAF loop when the canvas is off-screen
- Shows the **premium loading screen** while frames are preloading, then fades out with `AnimatePresence`

### `ScrollytellingSection.tsx`

Each of the 5 sections occupies `100vh` of scroll space. The inner content is `position: sticky` and driven by `useTransform` on `scrollYProgress`:

- **Opacity:** `[0, 0.2, 0.8, 1]` → `[0, 1, 1, 0]`
- **Y translate:** `60px → 0 → 0 → -60px`
- **Scale:** `0.97 → 1 → 1 → 0.97`

A directional gradient vignette overlays the correct side of the viewport per text alignment (left/right/radial) to prevent text merging with the background image.

---

## Error Handling System

**File:** `src/lib/errorCodes.ts`

All errors are mapped to opaque `PHY-XXX` codes. No stack traces, component names, or internal messages ever reach the user.

### Error Code Reference

| Code | Title | Severity | Retryable |
| --- | --- | --- | --- |
| `PHY-001` | Something went wrong | error | ✅ |
| `PHY-002` | Component failed to load | warn | ✅ |
| `PHY-003` | Critical rendering error | fatal | ✅ |
| `PHY-101` | Failed to load content | warn | ✅ |
| `PHY-102` | Request timed out | warn | ✅ |
| `PHY-103` | Service unavailable | error | ✅ |
| `PHY-201` | Media failed to load | warn | ✅ |
| `PHY-202` | Animation sequence unavailable | warn | ✅ |
| `PHY-301` | Submission failed | warn | ✅ |
| `PHY-302` | Invalid input | warn | ❌ |
| `PHY-401` | Access denied | error | ❌ |
| `PHY-403` | Forbidden | error | ❌ |
| `PHY-404` | Page not found | warn | ❌ |
| `PHY-410` | Page no longer available | warn | ❌ |
| `PHY-000` | Unknown error (fallback) | error | ✅ |

### How It Works

```
Runtime Error thrown
        │
        ▼
error.tsx / global-error.tsx
        │
        ├─ Logs only: error.digest (opaque hash) — never error.message
        │
        ▼
classifyError(error) → PHY-XXX code
        │
        ▼
resolveError(code) → { title, message, severity, retryable }
        │
        ▼
<ErrorDisplay /> renders safe, branded UI — zero technical detail
```

The `ErrorDisplay` component uses the severity to pick an accent colour (green/orange/red) and shows a retry button only when `retryable: true`.

---

## Form Integration

The contact form uses **[FormSubmit.co](https://formsubmit.co)** — a zero-backend form service.

**Endpoint:** `https://formsubmit.co/hello.phycosphere@gmail.com`

### Hidden Configuration Fields

| Field | Value | Purpose |
| --- | --- | --- |
| `_next` | `https://phycosphere.in/thank-you` | Redirect after submission |
| `_template` | `table` | Email formatted as a clean table |
| `_subject` | `New Enquiry — Phycosphere` | Email subject line |
| `_captcha` | `false` | Disables reCAPTCHA (honeypot used instead) |
| `_honey` | *(empty)* | Invisible honeypot — bots fill it, real users don't |

### First-Use Activation

The **first submission** triggers a one-time confirmation email from FormSubmit to `hello.phycosphere@gmail.com`. Click **Confirm** in that email to activate the endpoint. All subsequent submissions arrive normally.

### Form Field Names

| Field | `name` attribute | Required |
| --- | --- | --- |
| Full Name | `full_name` | ✅ |
| Email | `email` | ✅ |
| Organization | `organization` | — |
| Phone | `phone` | — |
| Message | `message` | ✅ |

---

## Assets & Branding

| File | Usage |
| --- | --- |
| `public/aeriq-logo-dark.png` | Black AERIQ logo — use on white/light backgrounds |
| `public/aeriq-logo-light.png` | White AERIQ logo — use on dark backgrounds (footer, loading screen, error pages) |
| `public/frames/` | 240 JPEG frames for scroll animation sequence 1 |
| `public/frames2/` | 240 JPEG frames for scroll animation sequence 2 |

**Naming convention for frames:** `ezgif-frame-001.jpg` through `ezgif-frame-240.jpg`

**Colour palette:**

| Token | Hex | Usage |
| --- | --- | --- |
| Background | `#050505` | Primary background |
| Surface | `#080808` | Alternate section background |
| Primary | `#00FF88` | CTA, accents, highlights |
| Secondary | `#00D6FF` | Secondary accents |
| Purple | `#8B5CF6` | Tertiary accent |
| Amber | `#FFB800` | Warning / warm accent |

---

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

Site runs at **http://localhost:3000**

### Type check

```bash
npx tsc --noEmit
```

### Production build

```bash
npm run build
npm start
```

---

## Environment & Configuration

### `next.config.ts`

- **Turbopack** root set to `__dirname` (suppresses lockfile warning)
- **Image domains** whitelisted: `images.unsplash.com`, `plus.unsplash.com`, `media.istockphoto.com`

### `src/app/globals.css`

- Tailwind v4 theme tokens: `--color-background`, `--color-primary`, `--color-secondary`, `--font-inter`
- `overscroll-behavior: none` on `<html>` and `<body>` to prevent elastic scroll disrupting the animation
- Custom scrollbar styles
- `transform: translateZ(0)` on `canvas` for GPU compositing

---

## Deployment

The site is a standard Next.js static + server hybrid app. Recommended deployment targets:

### Vercel *(recommended)*

```bash
# Push to GitHub → connect repo to Vercel → deploy
```

Vercel auto-detects Next.js. No additional configuration needed.

### Self-hosted

```bash
npm run build
npm start   # runs on port 3000
```

Use a reverse proxy (Nginx / Caddy) to forward from port 80/443.

### Important — update `_next` redirect

Before deploying, update the `_next` hidden input in `ContactSection.tsx` to your production domain:

```tsx
<input type="hidden" name="_next" value="https://YOUR_DOMAIN.com/thank-you" />
```

---

## Scripts

| Script | Command | Description |
| --- | --- | --- |
| Dev server | `npm run dev` | Starts Next.js with Turbopack HMR |
| Production build | `npm run build` | Compiles and optimises for production |
| Start production | `npm start` | Runs the compiled production server |
| Lint | `npm run lint` | Runs ESLint across the project |
| Type check | `npx tsc --noEmit` | TypeScript type checking without emitting files |

---

*Built by Phycosphere Pvt. Ltd. — Designed in India. Made for India.*
