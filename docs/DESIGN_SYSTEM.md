# Design System & Token Architecture

## 1. Luxury Design Philosophy

True luxury is defined by:
- **Restraint and Negative Space**: Generous whitespace, disciplined margins, and purposeful emptiness allowing high-craft imagery and editorial copy to breathe.
- **Editorial Craft & Typographic Hierarchy**: Subtle typographic scale contrasts, refined tracking, deliberate line-heights, and strict hierarchy instead of oversized generic marketing text.
- **Refined Materiality**: Tactile depth achieved through subtle translucent scrims, muted borders, soft ambient shadows, and deliberate micro-interactions, avoiding fake gradient gold or heavy neon accents.
- **Intentional Motion**: Micro-choreography (200ms–400ms) with smooth cubic-bezier physics, zero gratuitous bounce or disorienting scrolljacking, and full respect for reduced-motion preferences.
- **Visual Integrity Across Breakpoints**: Fluid scaling, natural proportions, optical alignment, and bespoke layouts tailored to mobile (390px) as rigorously as ultra-wide screens (1440px+).

---

## 2. Design Token Architecture (CSS Variables)

To decouple architectural structure from premature brand styling, the token system is structured into semantic CSS custom properties defined at `:root`. 

> **Important**: The base brand colors, primary typography families, and specific aesthetic values are kept as pending semantic slots until the upcoming Founders' Vision & Brand Discovery sessions are finalized.

### 2.1 Color Tokens Architecture
```css
:root {
  /* Brand Primitive Slots (Pending Founder Decisions) */
  --brand-primary-pending: #1a1a1a;
  --brand-accent-pending: #c5a880;
  --brand-surface-pending: #0d0d0d;
  
  /* Semantic Background Tokens */
  --color-bg-canvas: var(--brand-surface-pending);
  --color-bg-surface-primary: #141414;
  --color-bg-surface-secondary: #1c1c1c;
  --color-bg-surface-elevated: #242424;
  --color-bg-glass: rgba(20, 20, 20, 0.72);
  
  /* Semantic Text Tokens */
  --color-text-primary: #f5f5f7;
  --color-text-secondary: #a1a1a6;
  --color-text-muted: #6e6e73;
  --color-text-inverted: #0d0d0d;
  
  /* Semantic Border & Line Tokens */
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-medium: rgba(255, 255, 255, 0.16);
  --color-border-focus: var(--brand-accent-pending);
  
  /* Interactive & State Tokens */
  --color-interactive-primary: var(--brand-accent-pending);
  --color-interactive-hover: #d8bc95;
  --color-interactive-active: #b3956e;
  --color-interactive-disabled: rgba(255, 255, 255, 0.24);
  
  /* Status & Notification Tokens */
  --color-status-success: #34c759;
  --color-status-warning: #ff9f0a;
  --color-status-danger: #ff453a;
  --color-status-info: #0a84ff;
}
```

### 2.2 Typography Scale & Roles
```css
:root {
  /* Font Families (Pending Discovery Finalization) */
  --font-family-display: "Cinzel", "Playfair Display", serif;
  --font-family-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif;
  --font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

  /* Typographic Scale (Fluid Clamp) */
  --font-size-display-1: clamp(3rem, 6vw + 1rem, 5.5rem);      /* Main Hero Titles */
  --font-size-display-2: clamp(2.25rem, 4vw + 1rem, 3.75rem);  /* Section Signatures */
  --font-size-h1: clamp(1.85rem, 2.5vw + 0.75rem, 2.75rem);   /* Page Headlines */
  --font-size-h2: clamp(1.5rem, 1.8vw + 0.5rem, 2rem);        /* Major Component Titles */
  --font-size-h3: clamp(1.2rem, 1.2vw + 0.4rem, 1.45rem);     /* Subsection Titles */
  --font-size-body-large: 1.125rem;                            /* Editorial Intro Lead */
  --font-size-body-base: 1rem;                                 /* Standard Body */
  --font-size-body-small: 0.875rem;                            /* Supporting Details / Microcopy */
  --font-size-caption: 0.75rem;                               /* Badges, Timestamps, Labels */

  /* Line Heights */
  --line-height-display: 1.08;
  --line-height-heading: 1.22;
  --line-height-body: 1.6;
  --line-height-tight: 1.35;

  /* Letter Spacing */
  --letter-spacing-display: -0.02em;
  --letter-spacing-heading: -0.01em;
  --letter-spacing-body: 0em;
  --letter-spacing-eyebrow: 0.12em; /* Uppercase section eyebrow badges */
}
```

### 2.3 Spacing, Grid & Layout System
```css
:root {
  /* 8-point base spacing ladder */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-8: 3rem;     /* 48px */
  --space-10: 4rem;    /* 64px */
  --space-12: 5rem;    /* 80px */
  --space-16: 8rem;    /* 128px */
  --space-20: 10rem;   /* 160px */

  /* Container Widths */
  --container-max-width: 1440px;
  --container-narrow-width: 1080px;
  --container-padding: clamp(1.25rem, 4vw, 3.5rem);

  /* Elevation & Shadows */
  --shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-elevated: 0 8px 30px rgba(0, 0, 0, 0.35);
  --shadow-dramatic: 0 20px 60px rgba(0, 0, 0, 0.6);

  /* Border Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-pill: 9999px;
}
```

### 2.4 Motion Choreography & Transitions
```css
:root {
  /* Duration Standards */
  --motion-duration-fast: 150ms;
  --motion-duration-base: 250ms;
  --motion-duration-slow: 400ms;
  --motion-duration-cinematic: 800ms;

  /* Easing Curves */
  --motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);    /* High-end deceleration */
  --motion-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* Smooth bidirectional */
  --motion-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle spring */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-duration-fast: 0ms;
    --motion-duration-base: 0ms;
    --motion-duration-slow: 0ms;
    --motion-duration-cinematic: 0ms;
  }
}
```

---

## 3. Core Component Specifications

1. **Buttons & Actions**:
   - Primary: High-contrast button with subtle border glow on focus/hover, uppercase micro-spaced text (`--letter-spacing-eyebrow`), minimum touch target of 44x44px.
   - Secondary / Ghost: 1px border (`--color-border-medium`), transparent background with backdrop blur, hover fill transition.
2. **Form Inputs**:
   - Floating or subtle top-aligned labels, crisp contrast on dark surface, high-visibility focus ring (`--color-border-focus`), clear error messaging with inline ARIA invalid indicators.
3. **Pills & Status Badges**:
   - Compact height, pill radius (`--radius-pill`), translucent tinted backgrounds with opaque text matching status intent (e.g., Active, Expired, Exclusive).
4. **Cards & Surface Containers**:
   - Subtle background tint (`--color-bg-surface-primary`), fine border (`--color-border-subtle`), smooth hover lift (max translateY -4px) with transition (`--motion-ease-out`).
5. **Video & Media Frames**:
   - Aspect ratio locking (`16:9` or `4:3`), placeholder shimmer skeleton before load, privacy-compliant iframe isolation, and customized play triggers.
