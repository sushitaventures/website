import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { SplitText } from '../common/SplitText.jsx';
import { BUSINESS_VERTICALS } from '../../context/BusinessContext.jsx';
import './BusinessPerspective.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BusinessPerspective = () => {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (mediaRef.current) {
        const img = mediaRef.current.querySelector('.perspective-img');

        gsap.fromTo(
          mediaRef.current,
          { clipPath: 'inset(12% 0% 12% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mediaRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.06 },
            {
              yPercent: 6,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="business-perspective-section"
      ref={sectionRef}
      className="perspective-root"
      aria-label="Our Business Perspective"
    >
      <div className="perspective-container">
        
        {/* Left Column: Editorial Perspective Copy */}
        <div className="perspective-content-col">
          {/* STRICT: NO EYEBROW */}
          <SplitText
            tag="h2"
            type="words"
            animation="3d-flip"
            className="perspective-heading"
            start="top 85%"
          >
            Beyond the Asset. Into the Possibilities.
          </SplitText>

          <p className="perspective-sub">
            A property is never just a physical space. Its significance lies in the possibilities it creates.
          </p>
          <p className="perspective-p">
            Its location, surrounding infrastructure, intended purpose and wider business context all contribute to its
            potential. We believe meaningful real estate decisions begin by understanding the bigger picture — looking
            beyond the immediate asset to recognise what it can represent in the future.
          </p>
          <Link to="/about" className="perspective-btn">
            Discover Our Approach
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right Column: Monumental Architectural Visual (50-55% width) */}
        <div className="perspective-visual-col">
          <div ref={mediaRef} className="perspective-image-frame">
            <picture>
              <source srcSet="/images/home/business-perspective-640.webp 640w, /images/home/business-perspective.webp 1200w" sizes="(max-width: 900px) 100vw, 50vw" type="image/webp" />
              <img
                src="/images/home/business-perspective.jpg"
                alt="Monumental contemporary mixed-use architecture integrated with landscape"
                className="perspective-img"
                loading="lazy"
              />
            </picture>
            <div className="perspective-scrim" />
          </div>
        </div>

      </div>

      <div className="perspective-brand">
        <img src="/images/branding/logo.png" alt="Sushita Ventures" className="perspective-brand-logo" />
        {BUSINESS_VERTICALS.map((v) => (
          <div key={v.id} className="perspective-brand-item">
            <span className="perspective-brand-name">{v.name}</span>
            <span className="perspective-brand-tag">{v.tagline}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessPerspective;
