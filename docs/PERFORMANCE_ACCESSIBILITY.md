# Performance & Accessibility Standards (WCAG 2.2 AA)

## 1. Core Web Vitals (CWV) Standards

Every public route is engineered and audited against the following strict Core Web Vitals thresholds (measured at the 75th percentile of user visits):

| Metric | Target (Good) | Needs Improvement | Poor | Primary Architectural Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | **≤ 2.5 seconds** | 2.5s – 4.0s | > 4.0s | Hero image preloading (`fetchpriority="high"`), WebP/AVIF formats, critical CSS inlining. |
| **Interaction to Next Paint (INP)** | **≤ 200 ms** | 200ms – 500ms | > 500ms | Lightweight React runtime, avoiding long tasks, debounced inputs, CSS transitions over JS animation loops. |
| **Cumulative Layout Shift (CLS)** | **≤ 0.1** | 0.1 – 0.25 | > 0.25 | Strict aspect-ratio containers on images/videos, font fallback size-adjusting, reserved skeleton containers. |
| **First Input Delay (FID)** | *Legacy (Replaced by INP)* | - | - | Monitored alongside INP. |
| **Time to First Byte (TTFB)** | **≤ 800 ms** | 800ms – 1.8s | > 1.8s | Fast Express edge response, compressed static assets, optimized database queries. |

---

## 2. Media & Asset Delivery Pipeline

### 2.1 Image Formats & Responsive Sets
- **Modern Formats**: Convert all photography to WebP and AVIF formats with high-quality fallback JPEG/PNG.
- **Responsive Sizing**: Use `<picture>` or `srcset` / `sizes` attributes:
  - Mobile (390w, 780w for 2x retina)
  - Tablet (768w, 1536w)
  - Desktop (1440w, 2880w)
- **Lazy Loading**: Native `loading="lazy"` on all below-the-fold imagery. Hero images must use `loading="eager"` and `fetchpriority="high"`.

### 2.2 Video & YouTube Embed Performance
- Avoid direct eager loading of YouTube iframes on initial page render (each unoptimized YouTube iframe injects ~1MB of JS/CSS).
- **Façade Pattern**: Render a lightweight custom poster image with an accessible play trigger.
- **Dynamic Load**: The actual `youtube-nocookie.com` iframe is only injected when the user interacts or when the section enters the viewport via `IntersectionObserver`.

### 2.3 JavaScript & Font Optimization
- **Code Splitting**: Route-level dynamic `import()` via React Router to ensure public visitors do not download Admin bundle chunks.
- **Font Delivery**: Self-host web fonts (`woff2` format), use `font-display: swap`, and preload critical display font weights.

---

## 3. Accessibility Standards (WCAG 2.2 Level AA Compliance)

Accessibility is foundational to luxury craftsmanship. The platform enforces WCAG 2.2 AA compliance:

### 3.1 Color Contrast
- **Normal Text (< 18pt or < 14pt bold)**: Minimum contrast ratio of **4.5:1** against the background.
- **Large Text (≥ 18pt or ≥ 14pt bold)**: Minimum contrast ratio of **3.0:1**.
- **UI Components & Graphical Objects**: Minimum contrast ratio of **3.0:1** for active borders, icons, and focus indicators.

### 3.2 Keyboard Navigation & Focus Management
- **Full Keyboard Operability**: Every interactive element (buttons, links, form inputs, modal controls) must be operable using `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- **Visible Focus Rings**: Distinct, high-contrast focus rings (`outline: 2px solid var(--color-border-focus); outline-offset: 2px`). Never suppress `:focus` without providing `:focus-visible`.
- **Skip Links**: Include an accessible skip-to-content link (`<a href="#main-content" class="skip-link">Skip to main content</a>`) at the very top of the DOM.
- **Focus Trapping**: Modals and slide-out menus must trap focus within the active container while open and restore focus to the triggering element upon closure.

### 3.3 Semantic DOM & ARIA Best Practices
- Use native HTML elements (`<nav>`, `<header>`, `<main>`, `<footer>`, `<button>`, `<dialog>`) in preference to ARIA-augmented `<div>` tags.
- Provide descriptive `aria-label` or `aria-labelledby` for icon-only buttons (e.g., hamburger toggle, close modal, video play).
- Ensure form inputs feature explicit `<label for="...">` associations and `aria-describedby` for error states.

### 3.4 Reduced Motion
- Honor user OS preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
