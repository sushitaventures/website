# Master Website Brief — Sushita Ventures Luxury Real Estate Platform

**Document Version:** 1.1.0  
**Brand Identity:** Sushita Ventures  
**Status:** Living Document / Single Source of Truth  
**Last Updated:** 2026-11-22  
**Current Phase:** Section 06 — Cinematic Homepage & Brand Integration  

---

## 1. Project Overview & Objective

We are creating a bespoke, gallery-grade luxury real estate web platform for **Sushita Ventures**. The platform is engineered to convey prestige, architectural sophistication, and institutional trust, targeting high-net-worth individuals, institutional investors, corporate clients, and property developers.

The project merges an enterprise-ready decoupled MERN engineering foundation with the cinematic visual design and craft standards established in the MotionSites Web Builder methodology.

---

## 2. Confirmed Technical Foundation (Section 02)

| Layer | Technology | Version | Architectural Role |
|---|---|---|---|
| **Frontend Framework** | React | `^19.0.0` | Client single-page application (SPA) |
| **Frontend Bundler** | Vite | `^8.3.8` | ESM-powered dev server and optimized Rollup production builds |
| **Client Routing** | React Router | `^7.1.5` | Declarative client-side routing and layout orchestration |
| **Backend Runtime** | Node.js | `v24.14.1` | Native ECMAScript Modules runtime |
| **Backend Framework** | Express.js | `^5.2.1` | REST API service, security headers, routing, error handling |
| **Data Persistence** | Mongoose / MongoDB | `^9.1.0` | Object data modeling and connection lifecycle management |
| **Monorepo Architecture** | npm workspaces | `11.6.1` | Unified workspace linking `client` and `server` packages |
| **Design Standards** | MotionSites Skill | v1.0.0 | Taste rules, visual craft, typography scale, motion tables, QA rubric |

### Technical Verification Completed:
- Backend operational with health probe (`/api/v1/health`) and database readiness probe (`/api/v1/health/ready`).
- Vite development reverse proxy forwards `/api` requests to backend on port 5000.
- Production build verified (`npm run build` outputs minified bundle to `client/dist/` in <200ms).
- Zero secret leakage across client and Git boundaries.

---

## 3. Confirmed Information Architecture (Section 03)

### Primary Public Navigation
The confirmed primary navigation consists of:
1. **Home** (`/`)
2. **Services** (`/services` — dropdown containing 7 subcategories)
3. **About Us** (`/about`)
4. **Contact Us** (`/contact`)

### Services Subpage Hierarchy
1. **Commercial** (`/services/commercial`)
2. **Industrial** (`/services/industrial`)
3. **Land / Plots** (`/services/land-plots`)
4. **Hotels** (`/services/hotels`)
5. **Leasing** (`/services/leasing`)
6. **Exchange Property** (`/services/exchange-property`)
7. **Sick Property** (`/services/sick-property`) — *[Flagged for business clarification: "Sick Property" vs. "Sell Property"]*

---

## 4. Confirmed Features & Scopes Across Phases

| Phase | Scope Area | Status | Key Deliverables |
|---|---|---|---|
| **Section 01** | Design Methodology | **Complete** | MotionSites Web Builder installed in `.agents/skills/motionsites-web-builder`; craft, media shelf, and QA rubric mastered. |
| **Section 02** | Technical Foundation | **Complete** | Decoupled MERN stack initialized, verified with probes, zero-leakage security, production build operational. |
| **Section 03** | Website Architecture | **Complete** | Information architecture, sitemap, contact requirements, customer journeys, founder discovery frameworks. |
| **Section 04** | Admin & Content Management | **Complete** | Full-stack admin authentication, session security, Offer management, YouTube video management, 52/52 automated tests passed. |
| **Section 05** | Design System, SEO/AEO/GEO & Standards | **Complete** | Semantic token architecture, MotionSites 10-point QA gate, React SPA rendering strategy, Schema.org JSON-LD, CWV & WCAG 2.2 AA standards. |
| **Section 06** | Cinematic Homepage Experience | **Complete** | Full-screen hero slider, text reveal animation, Offer popup integration, YouTube façade player, asymmetric services grid, monumental footer, multi-viewport QA (8.81/10). |
| **Contact Us** | Dedicated Contact Page & Enquiry Engine | **Complete** | Two-column editorial visual & enquiry form, lead API (`POST /api/v1/public/enquiries`), MongoDB schema, contact strip, dark-themed responsive Google Map. |
| **About Us** | Four Founders & Brand Vision Architecture | **Complete** | Opening story hero, alternating 4-founder editorial profile layout, Vision & Mission, 4 Core Values, 3-step Approach, service category integration, closing CTA. |
| **Section 07+**| Standalone Service Subpages | Pending | Implementation of the 7 individual service subpages following founder discovery. |

---

## 5. Scope Governance & Boundaries

### Confirmed In Scope:
- 4 primary navigation destinations.
- 7 dedicated service subcategory pages.
- Structured luxury enquiry form on Contact Us page.
- Candidate administrative control over homepage offer, featured video, and incoming leads.

### Explicitly Out of Scope (Unless Formally Requested by Founders):
- Public blog or content marketing editorial hub.
- Careers and recruitment application board.
- Self-service MLS/IDX listing search portal.
- Public customer account creation / client login portals.
- Financial transaction or payment processing gateway.

---

## 6. Document Cross-References

- **Sitemap & Page Hierarchy:** [WEBSITE_SITEMAP.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/WEBSITE_SITEMAP.md)
- **Navigation Specification:** [NAVIGATION_SPECIFICATION.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/NAVIGATION_SPECIFICATION.md)
- **Contact Us Requirements:** [CONTACT_US_REQUIREMENTS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/CONTACT_US_REQUIREMENTS.md)
- **Customer Journeys:** [CUSTOMER_JOURNEYS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/CUSTOMER_JOURNEYS.md)
- **Business Discovery Template:** [BUSINESS_DISCOVERY.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/BUSINESS_DISCOVERY.md)
- **Founder Profiles & Vision:** [FOUNDER_VISION.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/FOUNDER_VISION.md)
- **Content Inventory:** [CONTENT_REQUIREMENTS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/CONTENT_REQUIREMENTS.md)
- **Open Questions & Ambiguities:** [OPEN_QUESTIONS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/OPEN_QUESTIONS.md)
- **Historical Decisions Log:** [DECISION_LOG.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/DECISION_LOG.md)
- **System Architecture:** [ARCHITECTURE.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/ARCHITECTURE.md)
