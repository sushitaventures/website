# Technical Decisions Log

This document records the foundational architecture and technology selection choices for the luxury real estate project.

---

## 1. Runtime & Package Management

- **Node.js: `v24.14.1` (System Active)**
  - *Decision:* Selected the current system-installed Node.js runtime.
  - *Rationale:* Node 24 provides modern ECMAScript module performance, enhanced native crypto utilities, and full support for Express 5 and Vite 8.
- **npm: `11.6.1` with npm Workspaces**
  - *Decision:* Used standard npm workspaces rather than adding external tools like pnpm, yarn, lerna, or nx.
  - *Rationale:* Keeps the development setup zero-friction, standardizes dependency resolution, and maintains a single root `package-lock.json`.

---

## 2. Backend Stack

- **Express.js: `^5.2.1` (Express 5)**
  - *Decision:* Adopted Express 5 instead of legacy Express 4.
  - *Rationale:* Express 5 natively supports Promises returned from middleware and route handlers (automatic rejection handling), modern path routing, and improved error handling without requiring `express-async-errors`.
- **Mongoose: `^9.1.0` (Mongoose 9)**
  - *Decision:* Selected Mongoose 9 (current supported major version).
  - *Rationale:* Full compatibility with Node 24, modern MongoDB server releases (6.x, 7.x, 8.x), improved TypeScript definitions, and modern connection pooling defaults.
- **ES Modules (`"type": "module"`):**
  - *Decision:* Selected native ES Modules across the entire codebase.
  - *Rationale:* Eliminates CommonJS/ESM interop issues, standardizes `import`/`export` across both client and server, and aligns with modern Node.js standards.

---

## 3. Frontend Stack

- **React: `^19.0.0` & React DOM: `^19.0.0`**
  - *Decision:* Selected React 19 stable release.
  - *Rationale:* React 19 is the current stable standard, delivering modern actions, asset loading optimizations, and optimal integration with modern bundlers.
- **Vite: `^8.3.8` with `@vitejs/plugin-react` `^6.3.0`**
  - *Decision:* Selected Vite 8 as the build tool and dev server.
  - *Rationale:* Lightning-fast Hot Module Replacement (HMR), native ES module support in development, optimized Rollup-based production builds, and clean development proxying.
- **React Router: `^7.1.5`**
  - *Decision:* Selected React Router 7.
  - *Rationale:* The unified standard for client-side routing, nested layouts, and future data loading hooks.

---

## 4. API Design & Security Principles

- **API Versioning:** Structured under `/api/v1` to support future non-breaking evolutions.
- **Separation of Concerns:** Controllers do not execute direct database queries; business logic is delegated to services.
- **Fault-Tolerant Development Startup:** If MongoDB is unconfigured or unavailable during local development, the API does not abort execution. Probes honestly report the state, allowing frontend developers to test without a mandatory local database daemon.
- **Security First:** Helmet security headers, CORS origin whitelisting, and strict payload size limits (`10mb`) are configured from Day 1.

---

## 5. Scope Governance

- **No Premature Business Features:** All domain models (Properties, Agents, Inquiries), public website templates, and administrative interfaces are strictly postponed to Section 03 and subsequent phases to preserve architectural integrity.

---

## 6. Section 04 — Administration & Content Management Decisions

- **Server-Side Session Store with HttpOnly Cookies (over JWT in localStorage):**
  - *Decision:* Adopted server-side `AdminSession` persistence in MongoDB paired with `HttpOnly`, `SameSite=Lax`, and `Secure` cookies.
  - *Rationale:* Completely neutralizes Cross-Site Scripting (XSS) token theft from `localStorage`, guarantees instant session revocation on logout or account compromise, and supports database-managed TTL expirations.
- **Password Hashing with `bcryptjs` (Salt Factor 12):**
  - *Decision:* Selected `bcryptjs` over native `bcrypt` binary bindings.
  - *Rationale:* Ensures cross-platform portability on Windows environments without node-gyp C++ compiler toolchain requirements while maintaining strong cryptographic security.
- **Privacy-Enhanced YouTube Embed Architecture:**
  - *Decision:* Normalized all administrator-supplied YouTube URLs into `youtube-nocookie.com/embed/{videoId}` server-side.
  - *Rationale:* Protects user privacy, eliminates third-party tracking cookies prior to playback, and prevents injection of arbitrary iframes or cross-site scripts.
- **Dual-Phase Offer Publishing Lifecycle:**
  - *Decision:* Separated the concept of saving an offer (`status: 'draft'`) from campaign readiness (`status: 'published'`) and live homepage visibility (`active: true`).
  - *Rationale:* Prevents accidental exposure of unfinished content and allows administrators to prepare seasonal campaigns in advance.
- **In-Memory Integration Testing (`mongodb-memory-server`):**
  - *Decision:* Added `mongodb-memory-server` to backend devDependencies.
  - *Rationale:* Enables exhaustive automated integration and security test suites to execute offline with 100% fidelity without requiring a cloud Atlas connection or local daemon.

---

## 7. Section 05 — Design System, Rendering, SEO & Performance Standards

- **Semantic CSS Variable Architecture:**
  - *Decision:* Decoupled style architecture into semantic CSS custom properties in `:root`, leaving brand colors and typography families as pending slots until founder discovery.
  - *Rationale:* Prevents premature aesthetic lock-in while allowing layout, responsive clamping, and spacing rules to be engineered reliably.
- **Hybrid Prerendering & Express Metadata Injection for MERN SEO:**
  - *Decision:* Selected Vite prerendering with Express metadata injection on public routes rather than rebuilding the application on Next.js.
  - *Rationale:* Provides instant HTML, OpenGraph tags, and Schema.org JSON-LD to search engines and social crawlers while retaining 100% of the MERN architecture and client-side SPA benefits for the admin panel.
- **Façade Pattern for Video & Media Optimization:**
  - *Decision:* Mandated lightweight poster image façades with play triggers for YouTube embeds instead of initial iframe rendering.
  - *Rationale:* Saves ~1MB of third-party JavaScript per page load, protecting Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).
- **Strict MotionSites 10-Point QA Threshold:**
  - *Decision:* Codified the MotionSites visual QA standard (score ≥ 8.0/10 across 6 viewports) as an automated release blocker.
  - *Rationale:* Guarantees that public interfaces maintain high-end luxury craftsmanship, fluid typography, and zero layout overflow.

