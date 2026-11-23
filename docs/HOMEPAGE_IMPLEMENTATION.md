# Homepage Technical Implementation & Architecture

**Document Version:** 1.0.0  
**Phase:** Section 06 / Homepage Build  
**Status:** Complete & Verified  
**Last Updated:** 2026-11-22  

---

## 1. Architectural Structure

The homepage follows a modular, reusable component hierarchy in `client/src/`:

```text
client/src/
├── components/
│   ├── navigation/
│   │   ├── Navbar.jsx           # Floating glassmorphism header with services dropdown & mobile drawer
│   │   └── Navbar.css           # Glass blur, hover underlines, responsive drawer transitions
│   ├── hero/
│   │   ├── HeroSlider.jsx       # 100svh Ken Burns slider, progress timer, staggered keyframe reveal
│   │   └── HeroSlider.css       # Scrim gradients, fluid typography clamp, slide indicators
│   ├── offers/
│   │   ├── OfferPopup.jsx       # Scroll-triggered exclusive mandate drawer, public API integration
│   │   └── OfferPopup.css       # Elevated glassmorphism card, dismiss animations
│   ├── video/
│   │   ├── CinematicVideo.jsx   # Facade poster pattern, YouTube privacy-enhanced embed
│   │   └── CinematicVideo.css   # 16:9 aspect-ratio container, ambient glow
│   ├── services/
│   │   ├── ServicesShowcase.jsx # 12-column asymmetric editorial grid for the 7 confirmed services
│   │   └── ServicesShowcase.css # Card hover scale, image scrims, responsive column collapse
│   └── footer/
│       ├── PremiumFooter.jsx    # Monumental 11vw typographic lockup, brand statement, navigation
│       └── PremiumFooter.css    # Full-screen deep slate backdrop, legal disclaimers
│
├── pages/
│   └── public/
│       └── HomePage.jsx         # Section orchestrator & dynamic document title
│
├── routes/
│   └── AppRoutes.jsx            # React Router 7 configuration with placeholder guards
│
├── services/
│   ├── apiClient.js             # Centralized fetch wrapper
│   └── homepageApi.js           # Offers & video endpoints integration
│
└── styles/
    ├── tokens.css               # Centralized CSS custom properties (colors, typography, spacing)
    ├── animations.css           # Keyframe animations (heroRevealUp, progressSweep, Ken Burns)
    └── index.css                # Base reset, typography setup, scrollbar styling
```

---

## 2. Component Sequence & Interaction Details

1. **Floating Navigation (`<Navbar />`)**:
   - Transparent over the hero section; transitions to blurred glass (`rgba(12, 14, 18, 0.78)` with `backdrop-filter: blur(20px)`) when scrolled past 40px.
   - Hover and click-accessible "Services" dropdown featuring all 7 confirmed categories.
   - Accessible full-screen mobile drawer triggered by animated hamburger toggle.
2. **Cinematic Hero Slider (`<HeroSlider />`)**:
   - Uses `100svh` with a `100vh` fallback and a `640px` minimum height guard.
   - 4 high-resolution architectural photography slides with 7-second automated transitions, animated progress indicators, manual chevron controls, and play/pause toggle.
   - Staggered CSS keyframe entrance animation (`heroRevealUp`) replayed on upward scroll via `IntersectionObserver`.
   - First slide loaded eagerly with `fetchpriority="high"`; subsequent slides lazy-loaded.
3. **Cinematic YouTube Video Showcase (`<CinematicVideo />`)**:
   - Integrated into the page via a lightweight poster façade pattern.
   - Fetches configuration from `GET /api/v1/public/homepage/video`. If active, clicking the façade launches a privacy-enhanced `youtube-nocookie.com` embed with muted autoplay.
   - If unconfigured, renders a graceful architectural preview without breaking layout.
4. **Specialist Services Showcase (`<ServicesShowcase />`)**:
   - 12-column asymmetric editorial grid: Commercial (8 cols), Industrial (4 cols), Land, Hotels, Leasing (4 cols each), Exchange Property and Sick Property (6 cols each).
   - Links to `/services/:slug` with route placeholder guards to prevent 404s.
5. **Exclusive Mandate Offer Drawer (`<OfferPopup />`)**:
   - Fetches active published offers from `GET /api/v1/public/homepage/offers`.
   - Triggers when the visitor scrolls beyond 65% of viewport height.
   - Unobtrusive bottom-right floating card with dismiss state.
6. **Monumental Closing Footer (`<PremiumFooter />`)**:
   - Full-width closing brand experience featuring brand advisory statement, full navigation tree, legal disclaimers, and a monumental 11vw typographic `BRAND NAME` wordmark.
