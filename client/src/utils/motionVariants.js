/**
 * Premium Luxury Motion Variants for Sushita Ventures
 * Calibrated with custom cubic-bezier easings for award-level fluidity.
 */

export const LUXURY_EASE = [0.16, 1, 0.3, 1]; // Iconic luxury spring/smooth curve
export const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

export const defaultViewport = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -40px 0px',
};

// Fade up reveal for section headers, text blocks, and containers
export const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: custom * 0.1,
      ease: LUXURY_EASE,
    },
  }),
};

// Fade in with subtle scale (ideal for media frames, video facade, maps)
export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: custom * 0.1,
      ease: LUXURY_EASE,
    },
  }),
};

// Stagger parent container
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Stagger child item (for cards, tiles, info badges, form fields)
export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: LUXURY_EASE,
    },
  },
};

// Slide from left (for alternating founder rows, cards)
export const slideInLeft = {
  hidden: { opacity: 0, x: -45, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};

// Slide from right
export const slideInRight = {
  hidden: { opacity: 0, x: 45, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};
