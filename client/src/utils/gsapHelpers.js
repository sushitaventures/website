import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger, ScrollToPlugin };

/**
 * Universal Smooth Scroll to target using GSAP ScrollToPlugin & Lenis sync
 * @param {string|Element} target - Selector or DOM Element
 * @param {number} offset - Vertical offset (default -75 for fixed navbar)
 * @param {number} duration - Animation duration in seconds (default 1.2)
 */
export const smoothScrollTo = (target, offset = -75, duration = 1.2) => {
  if (typeof window === 'undefined') return;

  const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
  if (!targetEl) return;

  if (window.lenis) {
    window.lenis.scrollTo(targetEl, { offset, duration });
  } else {
    gsap.to(window, {
      duration,
      scrollTo: {
        y: targetEl,
        offsetY: -offset,
        autoKill: true,
      },
      ease: 'power3.inOut',
    });
  }
};

/**
 * Universal Smooth Scroll to top of window
 * @param {number} duration - Duration in seconds
 */
export const scrollToTop = (duration = 1.1) => {
  if (typeof window === 'undefined') return;

  if (window.lenis) {
    window.lenis.scrollTo(0, { duration });
  } else {
    gsap.to(window, {
      duration,
      scrollTo: { y: 0, autoKill: true },
      ease: 'power3.inOut',
    });
  }
};

/**
 * Premium 3D Perspective Card Grid Animation on Scroll
 */
export const animateExpertiseGrid = (container, cardSelector = '.service-card-wrapper', options = {}) => {
  if (!container) return null;

  const cards = container.querySelectorAll(cardSelector);
  if (!cards.length) return null;

  gsap.set(container, {
    perspective: 1200,
    transformStyle: 'preserve-3d',
  });

  const ctx = gsap.context(() => {
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 80,
        rotateX: 16,
        scale: 0.94,
        transformOrigin: '50% 0%',
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: options.duration || 1.1,
        stagger: {
          amount: options.staggerAmount || 0.65,
          from: 'start',
          ease: 'power2.out',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: options.start || 'top 82%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  }, container);

  return ctx;
};
