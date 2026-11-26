import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "../common/SplitText.jsx";
import { BrandFilm } from "./BrandFilm.jsx";
import "./BrandIntroduction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const BrandIntroduction = () => {
  const sectionRef = useRef(null);
  const wordmarkRef = useRef(null);
  const imageFrameRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Signature Brand-Name Write-On / Stroke-Mask Animation linked to scroll
      if (wordmarkRef.current) {
        const textMask = wordmarkRef.current.querySelector(
          ".wordmark-reveal-fill",
        );
        const underline = wordmarkRef.current.querySelector(
          ".wordmark-draw-line",
        );

        const wordmarkTl = gsap.timeline({
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1.2,
          },
        });

        if (textMask) {
          wordmarkTl.fromTo(
            textMask,
            { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
            },
          );
        }

        if (underline) {
          wordmarkTl.fromTo(
            underline,
            { scaleX: 0, transformOrigin: "0% 50%" },
            { scaleX: 1, ease: "none" },
            0,
          );
        }
      }

      // 2. Architectural Image Vertical Clip-Path Reveal + Subtle Parallax
      if (imageFrameRef.current) {
        const img = imageFrameRef.current.querySelector(".brand-intro-img");

        gsap.fromTo(
          imageFrameRef.current,
          { clipPath: "inset(15% 0% 15% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );

        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.08 },
            {
              yPercent: 8,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: imageFrameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="brand-intro-section"
      ref={sectionRef}
      className="brand-intro-root"
      aria-label="Brand Philosophy and Introduction"
    >
      <div className="brand-intro-container">
        {/* Upper Asymmetric Editorial Row */}
        <div className="brand-intro-editorial-grid">
          {/* Left Column: Monumental Headline */}
          <div className="brand-intro-headline-col">
            {/* STRICT: NO EYEBROW */}
            <SplitText
              tag="h2"
              type="words"
              animation="3d-flip"
              className="brand-intro-heading"
              start="top 85%"
            >
              Where Trust Builds Wealth
            </SplitText>
          </div>

          {/* Right Column: Editorial Philosophy & Story Link */}
          <div className="brand-intro-copy-col">
            <p className="brand-intro-lead">
              Every meaningful venture begins with a vision.
            </p>
            <p className="brand-intro-body">
              At Sushita Ventures, we believe real estate is about more than
              locations, structures and transactions. It is about recognising
              potential, understanding aspirations and identifying opportunities
              that create lasting value.
            </p>
            <p className="brand-intro-body">
              Across{" "}
              <b>
                Hospitality, Leasing, Residential, Commercial, Industrial and
                Land Parcel,
              </b>{" "}
              we approach every opportunity with a broader perspective —
              combining business understanding, thoughtful decisions and a clear
              vision for what is possible.
            </p>

            <Link to="/about" className="brand-intro-cta-link">
              <span>Discover Our Story</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Middle Architectural Feature Frame */}
        <div className="brand-intro-media-wrapper">
          <div ref={imageFrameRef} className="brand-intro-image-frame">
            <picture>
              <source
                srcSet="/images/home/brand-introduction-640.webp 640w, /images/home/brand-introduction.webp 1200w"
                sizes="(max-width: 900px) 100vw, 90vw"
                type="image/webp"
              />
              <img
                src="/images/home/brand-introduction.jpg"
                alt="Minimalist luxury contemporary stone and glass architecture"
                className="brand-intro-img"
                loading="lazy"
              />
            </picture>
            {/* Admin-controlled film plays over the photo, which stays as its poster */}
            <BrandFilm />
          </div>
        </div>

        {/* Lower Signature Brand-Name Write-On Animation */}
        <div
          ref={wordmarkRef}
          className="brand-intro-signature-zone"
          aria-hidden="true"
        >
          <div className="wordmark-container">
            {/* Base Outlined/Muted Wordmark */}
            <div className="wordmark-base-track" aria-hidden="true">
              SUSHITA VENTURES
            </div>

            {/* Revealed / Drawn Rich Fill Controlled by ScrollTrigger */}
            <div className="wordmark-reveal-fill" aria-hidden="true">
              SUSHITA VENTURES
            </div>
          </div>
          <div className="wordmark-draw-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default BrandIntroduction;
