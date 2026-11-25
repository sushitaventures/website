import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../common/SplitText.jsx';
import './ContactCTA.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactCTA = () => {
  const containerRef = useRef(null);
  const bgImgRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (bgImgRef.current) {
        gsap.fromTo(
          bgImgRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact-cta-section"
      ref={containerRef}
      className="contact-cta-root"
      aria-label="Final Brand Statement and Collaboration"
    >
      {/* Background Architectural Visual (Blue-Hour Luxury Structure) */}
      <div className="contact-cta-bg-layer" aria-hidden="true">
        <picture>
          <source srcSet="/images/home/contact-cta-640.webp 640w, /images/home/contact-cta.webp 1376w" sizes="100vw" type="image/webp" />
          <img
            ref={bgImgRef}
            src="/images/home/contact-cta.jpg"
            alt="Monumental contemporary luxury architectural structure at blue hour"
            className="contact-cta-bg-img"
            loading="lazy"
          />
        </picture>
        <div className="contact-cta-scrim" />
      </div>

      {/* Atmospheric Foreground Content */}
      <div className="contact-cta-container">
        <div className="contact-cta-inner">
          {/* STRICT: NO EYEBROW */}
          <SplitText
            tag="h2"
            type="words"
            animation="3d-flip"
            className="contact-cta-heading"
            start="top 85%"
          >
            Every Great Opportunity Begins With a Vision.
          </SplitText>

          <p className="contact-cta-desc">
            Whether you are exploring a property opportunity, considering a new development or seeking the right real estate solution, we welcome the opportunity to understand your vision.
          </p>

          <div className="contact-cta-action-block">
            <Link
              to="/contact"
              className="contact-cta-btn"
              aria-label="Start a conversation with Sushita Ventures"
            >
              <span>Let's Start a Conversation</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <span className="contact-cta-secondary-note">
              Tell us what you have in mind. Let's explore what is possible.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
