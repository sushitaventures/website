# Open Questions & Pending Founder Clarifications

**Last Updated:** 2026-11-22  
**Status:** Active Tracking Document  
**Related Documents:** [MASTER_WEBSITE_BRIEF.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/MASTER_WEBSITE_BRIEF.md), [WEBSITE_SITEMAP.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/WEBSITE_SITEMAP.md)

---

## 1. Overview

This document tracks all unresolved business terminology, architectural scope options, and operational parameters requiring explicit founder decision or clarification.

Items are categorized by urgency and impact.

---

## 2. Terminology & Service Scope Ambiguities (Priority 1)

### Q1: "Sick Property" vs. "Sell Property"
- **Context:** The confirmed Services dropdown list explicitly specifies **"Sick Property"** as subpage #7. An earlier briefing document also referenced **"Sell Property"**.
- **Impact:** High. "Sick Property" denotes distressed, stalled, litigated, or non-performing assets requiring debt/legal turnaround advisory. "Sell Property" represents standard property disposition/listing services for asset owners.
- **Action Required:** Founders must confirm whether:
  - Option A: The service is specifically **"Sick Property"** (distressed asset turnaround).
  - Option B: The service is **"Sell Property"** (standard property disposition/sales).
  - Option C: Both exist as separate service lines.

---

### Q2: "Residential" Category Presence
- **Context:** The handwritten reference for the Contact Us form explicitly lists **Residential** (including *Independent Houses* and *Flats*) as an active interest category under "Looking For". However, the primary Services navigation dropdown does **not** list a dedicated "Residential" subpage (only Commercial, Industrial, Land / Plots, Hotels, Leasing, Exchange Property, Sick Property).
- **Impact:** Medium-High. Visitors seeking luxury villas, penthouses, or independent homes will find the option on the contact form but no corresponding showcase page in the navigation.
- **Action Required:** Founders to clarify whether a dedicated `/services/residential` page should be added to the sitemap and Services dropdown, or whether residential inquiries are handled exclusively via bespoke contact requests.

---

### Q3: Services Overview Page Architecture
- **Context:** The primary navigation has **Services** as a top-level item with 7 subpages.
- **Impact:** User experience and sitemap definition.
- **Action Required:** Confirm whether clicking the desktop top-level "Services" link should:
  - Option A: Navigate to a dedicated **Services Overview Landing Page** (`/services`) featuring summaries of all 7 disciplines.
  - Option B: Act strictly as a hover/click dropdown trigger that navigates directly to the specific subpages without a separate parent landing page.

---

## 3. Contact Form Rules & Data Policies (Priority 2)

### Q4: Mandatory vs. Optional Contact Fields
- **Context:** The initial reference confirmed `Name`, `Phone Number`, and `Looking For` as required. `Email` and `City` were noted as *"To be confirmed"*.
- **Impact:** Lead conversion rate vs. qualification depth.
- **Action Required:** Confirm whether:
  - `Email` should be mandatory or optional.
  - `City` should be mandatory, optional, or replaced with a pre-populated dropdown of active operating cities.

### Q5: Domestic vs. International Phone Formatting
- **Context:** Luxury real estate attracts NRI, GCC, and global institutional investors.
- **Action Required:** Confirm primary country dialing code default (e.g., India +91, UAE +971, UK +44, USA +1) and whether international country-picker selector is required.

---

## 4. Business Identity & Operating Parameters (Priority 2)

### Q6: Official Brand & Entity Details
- **Context:** The workspace root is named `sushita`. The official corporate entity name, public luxury trade name, and registered headquarters address have not yet been provided.
- **Action Required:** Supply official business name, brand wordmark styling preference, and registered contact information.

### Q7: Operating Geographic Footprint
- **Context:** Real estate authority requires clear geographical grounding.
- **Action Required:** Confirm the primary operating cities, micro-markets, states, or international territories served by the firm.

### Q8: Nature of Business Model
- **Context:** Does the company act as an exclusive advisory/brokerage firm, a development partner, an asset management syndicate, or a hybrid entity?
- **Action Required:** Clarify business model to ensure service descriptions reflect actual legal and operational capabilities.

---

## 5. Candidate Feature Evaluation (To be resolved before Section 04)

### Q9: Homepage Offer Popup & YouTube Video Integration
- **Context:** Mentions have been made of an "Offer popup" and a "YouTube video section" for the homepage.
- **Impact:** Brand tone and admin CMS complexity. Luxury real estate sites typically favor restrained cinematic video loops over external YouTube embeds or intrusive commercial popups.
- **Action Required:** Confirm the exact business purpose, trigger conditions, and content of the proposed offer popup and YouTube video integration.
