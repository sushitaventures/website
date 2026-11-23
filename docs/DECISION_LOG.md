# Technical & Architectural Decision Log

**Last Updated:** 2026-11-22  
**Status:** Chronological Historical Audit  
**Related Documents:** [MASTER_WEBSITE_BRIEF.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/MASTER_WEBSITE_BRIEF.md), [TECHNICAL_DECISIONS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/TECHNICAL_DECISIONS.md)

---

## 1. Overview

This log maintains an immutable, chronological record of all confirmed technical, architectural, and business requirements established throughout the project lifecycle.

---

## 2. Chronological Record

### [2026-11-22] — Section 01: Design System & Skill Installation
- **DEC-001: Skill Installation Scope**
  - *Decision:* Installed MotionSites Web Builder (`motionsites-web-builder`) strictly at workspace scope inside `.agents/skills/motionsites-web-builder`.
  - *Source:* User Request — Section 01.
  - *Status:* Verified & Intact.
- **DEC-002: Visual Craft Standards Adoption**
  - *Decision:* Adopted the MotionSites craft guidelines (negative space proportions, clamp() typography scale, 1-accent color rule, edge-blend scrims, mandatory look-and-fix screenshot QA loop).
  - *Source:* User Request — Section 01.
  - *Status:* Confirmed for visual design phases.

---

### [2026-11-22] — Section 02: MERN Technical Foundation
- **DEC-003: Monorepo Architecture**
  - *Decision:* Structured project as an npm workspaces monorepo directly in workspace root (`client/` and `server/`), preserving root `.agents/`.
  - *Source:* User Request — Section 02.
  - *Status:* Fully operational.
- **DEC-004: Decoupled Full-Stack Versions**
  - *Decision:* Selected React 19 (`^19.0.0`), Vite 8 (`^8.3.8`), React Router 7 (`^7.1.5`), Express 5 (`^5.2.1`), Node 24 (`v24.14.1`), and Mongoose 9 (`^9.1.0`).
  - *Source:* Section 02 Technical Decisions.
  - *Status:* Tested and verified.
- **DEC-005: Honest Database Resilience**
  - *Decision:* In development, missing `MONGODB_URI` does not abort API execution; health returns 200 while readiness truthfully reports `{ "status": "unconfigured" }`. In production, missing URI aborts startup.
  - *Source:* Section 02 Database Requirements.
  - *Status:* Implemented and verified via probes.
- **DEC-006: Security & Zero Secret Leakage**
  - *Decision:* Implemented Helmet headers, strict CORS origin whitelisting (`CLIENT_ORIGIN`), and verified zero credential leakage across Git and client boundaries.
  - *Source:* Section 02 Security Requirements.
  - *Status:* Implemented in `server/src/app.js` and `.gitignore`.

---

### [2026-11-22] — Section 03: Website Architecture & Information Scope
- **DEC-007: Primary Public Navigation Scope**
  - *Decision:* Confirmed the 4 primary public navigation items: `Home`, `Services`, `About Us`, `Contact Us`.
  - *Source:* User Request — Section 03.
  - *Status:* Documented in [WEBSITE_SITEMAP.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/WEBSITE_SITEMAP.md) & [NAVIGATION_SPECIFICATION.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/NAVIGATION_SPECIFICATION.md).
- **DEC-008: Services Subpage Category Hierarchy**
  - *Decision:* Confirmed the 7 subpages under Services: `Commercial`, `Industrial`, `Land / Plots`, `Hotels`, `Leasing`, `Exchange Property`, `Sick Property`.
  - *Source:* User Request — Section 03.
  - *Status:* Documented; terminology check logged for "Sick Property" vs. "Sell Property".
- **DEC-009: Strict Prohibition of Premature Page Implementation**
  - *Decision:* Section 03 is dedicated exclusively to information architecture, customer journeys, content requirements, and discovery frameworks. No public web pages or admin UIs are to be generated.
  - *Source:* User Request — Section 03.
  - *Status:* Enforced.
- **DEC-010: Contact Enquiry Data Baseline**
  - *Decision:* Confirmed `Name`, `Phone Number`, and `Looking For` as mandatory fields on the initial contact form, with 8 baseline category options.
  - *Source:* Handwritten reference via Section 03 Request.
  - *Status:* Documented in [CONTACT_US_REQUIREMENTS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/CONTACT_US_REQUIREMENTS.md).

---

### [2026-11-22] — Section 04: Administration & Homepage Content Management
- **DEC-011: Server-Side HttpOnly Session Security**
  - *Decision:* Implemented server-side `AdminSession` persistence in MongoDB with 24h TTL index, cryptographically secure 64-char IDs, and `HttpOnly`, `SameSite=Lax`, `Secure` cookies. Banned token storage in `localStorage`.
  - *Source:* User Request — Section 04.
  - *Status:* Implemented & 100% verified.
- **DEC-012: Cryptographic Password Storage**
  - *Decision:* Adopted bcrypt with work factor 12. Password hashes excluded by default (`select: false`) and stripped from all responses.
  - *Source:* User Request — Section 04.
  - *Status:* Implemented & verified.
- **DEC-013: YouTube URL Sanitization & Privacy Embed**
  - *Decision:* Enforced strict hostname whitelisting, 11-char ID extraction, and automatic server-side normalization to `youtube-nocookie.com/embed/{id}` with `rel=0` and `modestbranding=1`.
  - *Source:* User Request — Section 04.
  - *Status:* Implemented & verified.
- **DEC-014: Decoupled Offer Publication Lifecycle**
  - *Decision:* Enforced strict separation between draft, published, and active states. Public endpoint returns only published and active offers, stripping admin metadata.
  - *Source:* User Request — Section 04.
  - *Status:* Implemented & verified.
- **DEC-015: Protected CLI Administrator Provisioning**
  - *Decision:* Provided `npm run admin:create` CLI tool with input masking/validation, preventing public signup endpoints or default credentials.
  - *Source:* User Request — Section 04.
  - *Status:* Implemented in `server/src/scripts/createAdmin.js`.

---

### [2026-11-22] — Section 05: Design System, SEO, AEO, GEO, Performance & Standards
- **DEC-016: Semantic CSS Token Architecture with Pending Slots**
  - *Decision:* Decoupled design tokens into semantic CSS variables (`--color-bg-canvas`, `--font-size-display-1`, `--space-*`, `--motion-*`), leaving core brand color codes and primary font selections as pending discovery slots to prevent premature styling.
  - *Source:* User Request — Section 05.
  - *Status:* Enforced in `docs/DESIGN_SYSTEM.md`.
- **DEC-017: MotionSites 10-Point Visual QA Standard & Gate**
  - *Decision:* Established a mandatory visual QA gate using `scripts/shoot.py` and 6 standard viewports (360px to 1440px). Passing threshold is ≥ 8.0 average score with no sub-score below 7.0 across the 10 criteria. Maximum 3 fix loops.
  - *Source:* User Request — Section 05.
  - *Status:* Documented in `docs/VISUAL_QA_STANDARD.md`.
- **DEC-018: Hybrid Prerendering & Metadata Injection for SPA SEO**
  - *Decision:* Evaluated CSR, SSG, SSR, and Hybrid. Adopted Hybrid prerender/metadata injection on Express for public routes while maintaining pure CSR for the `/admin` application, achieving full crawler/social scraper visibility without migrating away from MERN.
  - *Source:* User Request — Section 05.
  - *Status:* Documented in `docs/SEO_AEO_GEO_STRATEGY.md`.
- **DEC-019: Structured Data (Schema.org / JSON-LD) Standards**
  - *Decision:* Mandated `RealEstateAgent`, `WebSite`, `Service`, `BreadcrumbList`, and `VideoObject` structured data in `<head>` for all public routes.
  - *Source:* User Request — Section 05.
  - *Status:* Documented in `docs/SEO_AEO_GEO_STRATEGY.md`.
- **DEC-020: Core Web Vitals & WCAG 2.2 Level AA Accessibility Standards**
  - *Decision:* Codified CWV targets (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1) and WCAG 2.2 AA accessibility baselines (contrast ≥ 4.5:1, keyboard navigable, visible focus rings, reduced-motion queries).
  - *Source:* User Request — Section 05.
  - *Status:* Documented in `docs/PERFORMANCE_ACCESSIBILITY.md`.
- **DEC-021: Media Sourcing Hierarchy & Anti-Deception Policy**
  - *Decision:* Codified 4-tier media sourcing hierarchy with strict bans on fake listings, fabricated client testimonials, and unverified deal counters.
  - *Source:* User Request — Section 05.
  - *Status:* Documented in `docs/CONTENT_AND_ENTITY_GUIDELINES.md`.

---

### [2026-11-22] — Section 06: Cinematic Homepage Implementation
- **DEC-022: Homepage Route Activation & Scope Containment**
  - *Decision:* Mounted the new cinematic homepage at `/` while connecting planned routes (`/about`, `/contact`, `/services/*`) to temporary non-breaking placeholder guards.
  - *Source:* User Request — Section 06.
  - *Status:* Implemented in `client/src/routes/AppRoutes.jsx`.
- **DEC-023: Full-Screen 100svh Hero with Ken Burns & Progress Controls**
  - *Decision:* Implemented automated 4-slide architectural hero slider with 7s intervals, animated progress bars, keyboard accessible indicators, play/pause, and scroll-up reveal replaying.
  - *Source:* User Request — Section 06.
  - *Status:* Implemented in `client/src/components/hero/HeroSlider.jsx`.
- **DEC-024: YouTube Video Façade Pattern**
  - *Decision:* Integrated the YouTube video showcase via an interactive poster image façade, deferring iframe loading until user interaction to preserve Core Web Vitals and privacy.
  - *Source:* User Request — Section 06.
  - *Status:* Implemented in `client/src/components/video/CinematicVideo.jsx`.
- **DEC-025: Asymmetric 12-Column Services Grid**
  - *Decision:* Rejected uniform 7-card grids in favor of an asymmetric editorial composition (8-col, 4-col, 6-col spans) with individual hover zooms and typography numbering.
  - *Source:* User Request — Section 06.
  - *Status:* Implemented in `client/src/components/services/ServicesShowcase.jsx`.
- **DEC-026: Monumental Typographic Footer**
  - *Decision:* Crafted a substantial closing brand experience featuring a prominent 11vw typographic `BRAND NAME` wordmark, editorial closing statement, and explicit placeholder legal links.
  - *Source:* User Request — Section 06.
  - *Status:* Implemented in `client/src/components/footer/PremiumFooter.jsx`.
- **DEC-027: Primary Architectural Typography Selection (Manrope)**
  - *Decision:* Selected and integrated **Manrope** (weights 300 through 800) from Google Fonts as the primary modern geometric sans-serif typeface across all UI elements, navigation, and body copy, paired with classical Cinzel display headings.
  - *Source:* User Clarification — Section 06.
  - *Status:* Implemented in `client/index.html` and `client/src/styles/tokens.css`.
- **DEC-028: Brand Name and Logo Asset Integration (Sushita Ventures)**
  - *Decision:* Replaced all placeholder brand references with official brand name **Sushita Ventures**. Integrated the uploaded 3D architectural gold emblem into the navigation header (`/images/branding/logo.jpg`), monumental footer centerpiece, browser favicon, page title, and copyright notices. Calibrated CSS tokens to harmonize with the logo's metallic gold palette (`#d4af37`).
  - *Source:* User Upload — Section 06.
  - *Status:* Implemented across `client/src/` and verified in screenshots.
- **DEC-029: Contact Us Page & Lead Management Engine Implementation**
  - *Decision:* Designed and built the dedicated Contact Us page (`/contact`) featuring the two-column architectural image and interactive enquiry form, full backend API (`POST /api/v1/public/enquiries`), MongoDB `Enquiry` schema, direct phone/email strip, and interactive responsive dark-themed Google Map.
  - *Source:* User Request — Contact Us Page Implementation.
  - *Status:* Implemented in `client/src/pages/public/ContactPage.jsx` and `server/src/controllers/public/enquiry.controller.js`.
- **DEC-030: About Us Page Implementation (Four Founders & Vision Architecture)**
  - *Decision:* Designed and developed the dedicated About Us page (`/about`) featuring the opening story hero, an alternating 4-founder narrative layout with dedicated portrait slots and philosophies, Vision and Mission dual-card grid, Core Values 4-tile grid, 3-step Approach journey, service category integration, and closing conversion section with dual CTAs.
  - *Source:* User Request — About Us Page Implementation.
  - *Status:* Implemented in `client/src/pages/public/AboutPage.jsx` and verified in multi-viewport screenshots.






