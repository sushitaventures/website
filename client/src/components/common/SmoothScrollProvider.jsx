import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis for premium inertial smooth scrolling
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial mount
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  // Handle route and hash changes seamlessly
  useEffect(() => {
    if (!lenisRef.current) return;

    if (location.hash) {
      const targetEl = document.querySelector(location.hash);
      if (targetEl) {
        setTimeout(() => {
          lenisRef.current?.scrollTo(targetEl, {
            offset: -75,
            duration: 1.2,
          });
        }, 100);
        return;
      }
    }

    // Standard route transition scrolls to top
    lenisRef.current.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [location.pathname, location.hash]);

  return (
    <SmoothScrollContext.Provider value={lenisRef.current}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
