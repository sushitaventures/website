# Homepage Design Specification

**Document Version:** 1.0.0  
**Phase:** Section 06 / Homepage Experience  
**Status:** Approved Specification  
**Last Updated:** 2026-11-22  

---

## 1. Aesthetic Direction: Architectural Minimalism

The homepage design is rooted in restraint, tactile depth, and architectural proportion. It deliberately diverges from generic broker templates through:
- **Atmospheric Canvas**: Layered charcoal and deep obsidian tones (`#08090a` to `#17191d`) rather than stark flat black.
- **Muted Precious Materiality**: Accent color is a single restrained champagne gold (`#c5a880`) paired with subtle `rgba(255, 255, 255, 0.08)` borders and soft box-shadows.
- **Monumental Typography**: Hero headlines utilizing high-contrast serif display fonts clamped fluidly (`clamp(2.75rem, 5.5vw + 1rem, 5.25rem)`) with disciplined negative space.
- **Editorial Card Asymmetry**: Services arranged in a dynamic 12-column cadence rather than identical repetitive boxes.

---

## 2. Design Token System (`client/src/styles/tokens.css`)

### Color Palette
- Canvas Background: `var(--color-bg-canvas)` (`#08090a`)
- Surface Containers: `var(--color-bg-surface-primary)` (`#101214`)
- Glassmorphism Scrim: `var(--color-bg-glass)` (`rgba(12, 14, 18, 0.78)`)
- Text Primary: `var(--color-text-primary)` (`#f5f6f8`)
- Text Secondary: `var(--color-text-secondary)` (`#a0a4ab`)
- Muted Accent: `var(--brand-accent-pending)` (`#c5a880`)

### Typographic Scales & Hierarchy
- Primary Sans-Serif: `"Manrope", -apple-system, BlinkMacSystemFont, "Inter", sans-serif`
- Primary Serif Display: `"Cinzel", "Playfair Display", serif`
- Eyebrow: `0.75rem`, letter-spacing `0.22em`, uppercase.
- Hero Heading: `clamp(2.75rem, 5.5vw + 1rem, 5.25rem)`, line-height `1.08`, serif.
- Section Display Titles: `clamp(2rem, 3.5vw + 0.8rem, 3.5rem)`, serif.
- Body Large: `1.125rem`, line-height `1.6`, sans-serif.
- Monumental Wordmark: `clamp(3.5rem, 11vw, 10.5rem)`, serif, 5% opacity.

### Motion Curves & Choreography
- Base Duration: `350ms` (hover / navigation transitions).
- Slow Cinematic Duration: `600ms` to `1200ms` (slide transitions, text reveals).
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration curve).
