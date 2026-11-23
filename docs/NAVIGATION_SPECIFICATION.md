# Navigation Specification & Interaction Architecture

**Last Updated:** 2026-11-22  
**Status:** Approved Initial Scope  
**Related Documents:** [WEBSITE_SITEMAP.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/WEBSITE_SITEMAP.md), [OPEN_QUESTIONS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/OPEN_QUESTIONS.md)

---

## 1. Primary Desktop Navigation

The primary navigation bar comprises 4 top-level entries:

```text
[ Brand Wordmark ]       Home       Services ▾       About Us       Contact Us       [ Private Inquiry CTA ]
```

### Confirmed Navigation Items
1. **Home:** Direct link to `/`
2. **Services (Dropdown):** Trigger for the 7 specialized subpages. *(Open Question: Does clicking the parent navigate to `/services` or solely toggle the dropdown?)*
3. **About Us:** Direct link to `/about`
4. **Contact Us:** Direct link to `/contact`

---

## 2. Services Dropdown Hierarchy

The dropdown menu under **Services** contains exactly the 7 confirmed subcategories:

| # | Display Label | Target Route | Scope Notes |
|---|---|---|---|
| 1 | **Commercial** | `/services/commercial` | Office, retail, commercial complexes |
| 2 | **Industrial** | `/services/industrial` | Warehousing, logistics parks, manufacturing |
| 3 | **Land / Plots** | `/services/land-plots` | Greenfield, plotted developments, land banks |
| 4 | **Hotels** | `/services/hotels` | Hospitality assets, luxury resorts, boutique stays |
| 5 | **Leasing** | `/services/leasing` | Corporate leasing, luxury residential leasing |
| 6 | **Exchange Property** | `/services/exchange-property` | Asset exchange, barter transactions |
| 7 | **Sick Property** | `/services/sick-property` | *Pending founder confirmation: "Sick Property" vs. "Sell Property"* |

### Terminology Governance:
- The phrase **"Sick Property"** must not be silently renamed or altered in the specification.
- A previous reference indicated **"Sell Property"**; both terms are formally logged in [OPEN_QUESTIONS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/OPEN_QUESTIONS.md) pending founder resolution.

---

## 3. Navigation Interaction & Behavioral Requirements

### A. Dropdown Mechanics (Desktop)
- **Trigger:** Accessible via hover with intentional intent delay (150ms buffer) and keyboard focus (`Enter` / `Space` / `ArrowDown`).
- **Elevation:** High z-index layer (`z-index: 50+`), floating cleanly over hero media and content layers.
- **Surface Token:** In accordance with the MotionSites craft rules, the dropdown surface will share the page's unified material (frosted liquid-glass with subtle border scrim).
- **Dismissal:** Closes smoothly on `Escape`, clicking outside, or focus moving outside the menu container.

### B. Active Page Indication
- Active route state must be unmistakably signaled (e.g., subtle indicator bar, muted opacity shift, or dot indicator) without aggressive visual clutter.
- When on any service subpage (e.g. `/services/commercial`), the parent **Services** navigation item must reflect active hierarchy state.

### C. Mobile Navigation (Viewports < 1024px)
- **Collapsible Drawer / Fullscreen Overlay:** Dedicated luxury hamburger icon with accessible `aria-expanded` and `aria-label` attributes.
- **Accordion for Services:** The 7 subpages nest cleanly under a collapsible accordion item, preventing long vertical overflow.
- **Body Scroll Lock:** When the mobile menu is open, the background viewport is locked (`overflow: hidden` on body) to prevent dual-scrolling artifacts.
- **Automatic Close:** Closes upon navigation route change, clicking backdrop, or tapping `Escape`.

### D. Footer Navigation
The footer acts as an institutional baseline across all pages:
- **Column 1 — Brand:** Official brand wordmark, founding ethos statement, regulatory disclaimer.
- **Column 2 — Primary Navigation:** Home, About Us, Contact Us.
- **Column 3 — Services:** All 7 subcategory links.
- **Column 4 — Direct Contact:** Office address, direct telephone, private inquiry email.
- **Bottom Strip:** Copyright, Privacy Policy, Terms of Advisory.

### E. Accessibility & Keyboard Navigation
- Full compliance with WCAG 2.1 AA standards:
  - Visible keyboard focus rings (`outline-offset: 2px`).
  - Skip to main content link for screen readers.
  - Proper ARIA attributes: `role="navigation"`, `aria-haspopup="true"`, `aria-expanded="false"`.

---

## 4. Visual Design Notice
In accordance with the project guidelines, **exact visual styling, color tokens, font pairings, px dimensions, and entrance motion choreography are deferred to the visual design phase (Section 06+)**.
