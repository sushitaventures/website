import React, { useState, useEffect, useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "../common/SplitText.jsx";
import "./HeroSlider.css";
import { useAfterLoad } from "../../utils/useAfterLoad.js";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/images/home/hero-hotel-resorts.webp",
    fallback: "/images/home/hero-hotel-resorts.jpg",
    category: "Hotel & Resorts",
    alt: "Luxury contemporary hotel and resort architecture with infinity reflection pool",
  },
  {
    id: 2,
    image: "/images/home/hero-commercial.webp",
    fallback: "/images/home/hero-commercial.jpg",
    category: "Commercial Property",
    alt: "Ultra-premium contemporary commercial architecture and corporate towers",
  },
  {
    id: 3,
    image: "/images/home/hero-industrial.webp",
    fallback: "/images/home/hero-industrial.jpg",
    category: "Industrial Property",
    alt: "High-end industrial logistics campus architecture",
  },
];

const AUTO_SLIDE_INTERVAL = 6500;

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Slides 2+ are stacked invisibly in the viewport, so loading="lazy" can't defer them.
  // Don't render their images until the page has loaded — they stay off the LCP path.
  const afterLoad = useAfterLoad();
  const heroRef = useRef(null);
  const timerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Automated slideshow timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  // Initial GSAP Choreography
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Zoom only — no opacity fade. The first slide must be visible on the very first
      // paint: it's the Largest Contentful Paint element, so hiding it until JS runs
      // would delay LCP by the whole JS download.
      tl.fromTo(
        ".hero-slide.active .hero-media-image",
        { scale: 1.08 },
        { scale: 1, duration: 1.4 },
      )
        .fromTo(
          ".hero-scrim",
          { opacity: 0 },
          { opacity: 1, duration: 1.0 },
          "-=1.0",
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.4",
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4",
        );
    },
    { scope: heroRef },
  );

  return (
    <section
      className="hero-root"
      ref={heroRef}
      aria-label="Sushita Ventures Cinematic Hero"
    >
      {/* Background Slides Track with Crossfade & Subtle Zoom */}
      <div className="hero-slider-track" aria-hidden="true">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide ${idx === currentIndex ? "active" : ""}`}
          >
            <div className="hero-media-wrapper">
              {(idx === 0 || afterLoad) && (
              <picture>
                <source srcSet={`${slide.image.replace(".webp", "-640.webp")} 640w, ${slide.image} 1376w`} sizes="100vw" type="image/webp" />
                <img
                  src={slide.fallback}
                  alt={slide.alt}
                  className="hero-media-image"
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                />
              </picture>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Atmospheric Scrim Overlay */}
      <div className="hero-scrim" />

      {/* Foreground Content - Lower-Left Architectural Framing */}
      <div className="hero-content-container">
        <div className="hero-inner-wrapper" ref={contentRef}>
          {/* STRICT HEADING RULE: No eyebrow label. Starts directly with main heading */}
          <SplitText
            tag="h1"
            type="words"
            animation="lcp-rise"
            className="hero-heading"
            trigger={false}
            delay={0.2}
            duration={1.2}
          >
            Where Trust Builds Wealth
          </SplitText>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        className="hero-scroll-indicator"
        ref={scrollIndicatorRef}
        aria-hidden="true"
      >
        <span className="scroll-indicator-text">Scroll</span>
        <div className="scroll-indicator-line">
          <div className="scroll-indicator-pip" />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
