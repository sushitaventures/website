import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "../common/SplitText.jsx";
import "./WhySushita.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS_DATA = [
  {
    num: "01",
    title: "Business Understanding",
    copy: "Every opportunity exists within a wider business context. Understanding the requirement is as important as recognising the property itself.",
  },
  {
    num: "02",
    title: "Thoughtful Decisions",
    copy: "Meaningful real estate decisions require perspective, careful consideration and an understanding of what truly matters.",
  },
  {
    num: "03",
    title: "Diverse Expertise",
    copy: "From hospitality and leasing to residential, commercial property industrial property, every category presents its own considerations.",
  },
  {
    num: "04",
    title: "Lasting Relationships",
    copy: "Strong business relationships are built on transparency, communication and a shared understanding of objectives.",
  },
];

export const WhySushita = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const blocks = sectionRef.current.querySelectorAll(".why-pillar-block");
      const lines = sectionRef.current.querySelectorAll(".why-pillar-line");

      gsap.fromTo(
        blocks,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        lines,
        { scaleX: 0, transformOrigin: "0% 50%" },
        {
          scaleX: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="why-sushita-section"
      ref={sectionRef}
      className="why-sushita-root"
      aria-label="Why Sushita Ventures"
    >
      <div className="why-sushita-container">
        {/* Section Header - STRICT: NO EYEBROW */}
        <header className="why-sushita-header">
          <SplitText
            tag="h2"
            type="words"
            animation="3d-flip"
            className="why-sushita-heading"
            start="top 85%"
          >
            A Thoughtful Perspective. A Lasting Vision.
          </SplitText>
        </header>

        {/* 4 Evenly Distributed Editorial Blocks with Animated Separators */}
        <div className="why-pillars-grid m-swipe">
          {PILLARS_DATA.map((pillar) => (
            <div key={pillar.num} className="why-pillar-block">
              <div className="why-pillar-line" aria-hidden="true" />
              <div className="why-pillar-content">
                <span className="why-pillar-num">{pillar.num}</span>
                <h3 className="why-pillar-title">{pillar.title}</h3>
                <p className="why-pillar-copy">{pillar.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySushita;
