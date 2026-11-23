import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/services/service-residential.jpg',
    alt: 'Prime luxury residential architectural villa and private estate'
  },
  {
    id: 2,
    image: '/images/hero/hero-slide-1.jpg',
    alt: 'Commercial glass high-rise towers in DLF Cyber City Gurugram, India'
  },
  {
    id: 3,
    image: '/images/hero/hero-slide-2.jpg',
    alt: 'Modern commercial architecture at World Trade Center Bengaluru, India'
  },
  {
    id: 4,
    image: '/images/hero/hero-slide-3.jpg',
    alt: 'Luxury high-rise residential and commercial skyline development in Mumbai, India'
  },
  {
    id: 5,
    image: '/images/hero/hero-slide-4.jpg',
    alt: 'Master-planned integrated residential and commercial development in Mumbai, India'
  }
];

const AUTO_SLIDE_INTERVAL = 7000;

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const heroRef = useRef(null);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Visibility observer to replay text reveal on scroll-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automated slideshow timer
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide, currentIndex]);

  const handleScrollToServices = () => {
    const servicesEl = document.getElementById('services-section');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToVideo = () => {
    const videoEl = document.getElementById('video-showcase-section');
    if (videoEl) {
      videoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="hero-root"
      ref={heroRef}
      aria-label="Cinematic Luxury Real Estate Showcase"
    >
      {/* Background Slider */}
      <div className="hero-slider-track" aria-hidden="true">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
          >
            <div className="hero-media-wrapper">
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-media-image"
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Scrim Overlay */}
      <div className="hero-scrim" />

      {/* Foreground Content with Scroll-triggered Keyframe Animation */}
      <div className="hero-content-container">
        <div className="hero-inner-wrapper">
          {isInView && (
            <>
              <span className="hero-eyebrow animate-hero-reveal">
                PREMIUM PROPERTIES
              </span>

              <h1 className="hero-heading animate-hero-reveal-d1">
                Where Trust Builds <span className="hero-heading-gold">Wealth.</span>
              </h1>

              <p className="hero-description animate-hero-reveal-d2">
                Real Estate Consultancy | Investment Opportunities | Property Solutions
              </p>
            </>
          )}
        </div>
      </div>

      {/* Slider Controls Bar */}
      <div className="hero-controls-bar">
        <div className="hero-controls-container">
          {/* Progress Indicators */}
          <div className="hero-indicators" role="tablist" aria-label="Slider navigation">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Slide ${idx + 1} of ${HERO_SLIDES.length}`}
                className={`indicator-bullet ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
              >
                <div
                  className={`indicator-progress-fill ${idx === currentIndex && isPlaying ? 'running' : ''}`}
                />
              </button>
            ))}
          </div>

          {/* Navigation Arrows & Play/Pause */}
          <div className="hero-nav-buttons">
            <button
              type="button"
              className="hero-arrow-btn"
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="hero-arrow-btn"
              aria-label="Previous slide"
              onClick={prevSlide}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              className="hero-arrow-btn"
              aria-label="Next slide"
              onClick={nextSlide}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
