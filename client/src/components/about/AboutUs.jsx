import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FOUNDERS_DATA, 
  VISION_DATA,
  PROMISE_DATA,
  CORE_VALUES, 
  APPROACH_STEPS, 
  EXPERTISE_TILES 
} from './aboutContent.js';
import './AboutUs.css';

export const AboutUs = () => {
  return (
    <div className="about-main-wrapper">
      
      {/* 1. Opening Section — Our Story */}
      <section className="about-story-hero" aria-label="Our Story">
        <img 
          src="/images/about/about-story-hero.jpg" 
          alt="Sushita Ventures Architectural Environment" 
          className="about-story-bg"
          loading="eager"
        />
        <div className="about-story-scrim" />
        <div className="about-container">
          <div className="about-story-content">
            <span className="about-eyebrow">ABOUT SUSHITA VENTURES</span>
            <h1 className="about-story-heading">
              More Than Property.<br />A Vision Built on Possibility.
            </h1>
            <p className="about-story-description">
              Every meaningful venture begins with a vision. Sushita Ventures was built around the belief that real estate is about more than locations, structures, and transactions. It is about recognising potential, understanding aspirations, and creating opportunities that deliver lasting value.
            </p>
            <p className="about-story-description">
              Across commercial, industrial, hospitality, land, and property solutions, we approach every opportunity with a broader perspective — combining business understanding, thoughtful decisions, and a commitment to meaningful relationships.
            </p>
            <p className="about-story-closing">
              "We don't just see what a property is today. We see what it can become tomorrow."
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Leadership Behind the Vision */}
      <section className="founders-section" aria-label="Leadership Team">
        <div className="about-container">
          
          <header className="founders-intro-header">
            <span className="about-eyebrow">LEADERSHIP &amp; VISION</span>
            <h2 className="founders-intro-heading">The Vision Behind Sushita Ventures</h2>
            <p className="founders-intro-desc">
              Behind Sushita Ventures is a leadership team uniting people-focused vision, entrepreneurial depth, and strategic expansion. Together, they shape the direction, values, and global ambitions of the organisation.
            </p>
          </header>

          <div className="founders-alternating-list">
            {FOUNDERS_DATA.map((founder, idx) => {
              const isEven = idx % 2 !== 0; // Alternates: 0 (L-text, R-img), 1 (L-img, R-text)
              return (
                <article 
                  key={founder.id} 
                  className={`founder-row ${isEven ? 'reverse' : ''}`}
                  aria-labelledby={`founder-title-${founder.id}`}
                >
                  {/* Text Column */}
                  <div className="founder-text-block">
                    <div className="founder-meta-header">
                      <span className="founder-number-badge">{founder.number}</span>
                    </div>

                    <h3 id={`founder-title-${founder.id}`} className="founder-name">
                      {founder.name}
                    </h3>

                    <div className="founder-roles-strip">
                      {founder.rolesString}
                    </div>

                    <div className="founder-bio-flow">
                      {(founder.bioParagraphs || [founder.bio1, founder.bio2].filter(Boolean)).map((para, pIdx) => (
                        <p key={pIdx} className="founder-bio-p">{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* Portrait Column */}
                  <div className="founder-portrait-frame">
                    <img 
                      src={founder.image} 
                      alt={founder.imageAlt} 
                      className="founder-portrait-img"
                      loading="lazy"
                    />
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Our Vision & 4. Our Promise Grid */}
      <section className="about-container" aria-label="Vision and Promise">
        <div className="vision-mission-grid">
          
          {/* Vision Card */}
          <div className="vision-card">
            <span className="about-eyebrow">{VISION_DATA.eyebrow}</span>
            <h2 className="vision-heading">{VISION_DATA.title}</h2>
            <p className="vision-p">{VISION_DATA.description1}</p>
            <p className="vision-p">{VISION_DATA.description2}</p>
            <div className="vision-highlight-box">
              {VISION_DATA.highlight}
            </div>
          </div>

          {/* Promise Card */}
          <div className="mission-card promise-card">
            <span className="about-eyebrow">{PROMISE_DATA.eyebrow}</span>
            <h2 className="vision-heading promise-heading">
              {PROMISE_DATA.title1}<br />
              <span className="promise-gradient-text">{PROMISE_DATA.title2}</span>
            </h2>
            <div className="promise-corporate-mark">
              <span className="promise-entity-name">{PROMISE_DATA.company}</span>
              <div className="promise-gold-tagline">"{PROMISE_DATA.motto}"</div>
            </div>
            <p className="mission-p" style={{ marginTop: '1.25rem' }}>
              {PROMISE_DATA.description}
            </p>
            <div className="vision-highlight-box promise-highlight-box">
              Where Trust Builds Wealth · Enduring Integrity
            </div>
          </div>

        </div>
      </section>

      {/* 5. What We Believe In — Our Core Values */}
      <section className="values-section" aria-label="Core Values">
        <div className="about-container">
          <header className="values-header">
            <span className="about-eyebrow">WHAT WE BELIEVE IN</span>
            <h2 className="founders-intro-heading">The Principles Behind Every Decision.</h2>
          </header>

          <div className="values-grid">
            {CORE_VALUES.map((val) => (
              <div key={val.id} className="value-tile">
                <span className="value-badge">{val.number}</span>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.description}</p>
              </div>
            ))}
          </div>

          {/* Architectural Principles Panorama Visual */}
          <div className="values-panorama-frame" aria-hidden="true">
            <div className="values-panorama-inner">
              <img 
                src="/images/about/principles-visual-panorama.jpg" 
                alt="Visual journey of Sushita Ventures principles: Integrity, Relationships, Perspective, and Long-Term Value" 
                className="values-panorama-img"
                loading="lazy"
              />
            </div>
            <div className="values-panorama-caption">
              <span>INTEGRITY</span>
              <span className="panorama-divider">•</span>
              <span>RELATIONSHIPS</span>
              <span className="panorama-divider">•</span>
              <span>PERSPECTIVE</span>
              <span className="panorama-divider">•</span>
              <span>LONG-TERM VALUE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Approach */}
      <section className="approach-section" aria-label="Our Approach">
        <div className="about-container">
          <header className="approach-header">
            <span className="about-eyebrow">HOW WE THINK</span>
            <h2 className="founders-intro-heading">Every Opportunity Deserves a Closer Look.</h2>
            <p className="founders-intro-desc">
              Property decisions require more than simply identifying available spaces. They require understanding the purpose, the people, the location, and the opportunity behind every requirement.
            </p>
          </header>

          <div className="approach-timeline-container approach-staircase-wrapper">
            <div className="approach-steps-grid">
              {APPROACH_STEPS.map((step, idx) => {
                const podiumTitles = ['01 • FOUNDATION', '02 • EVALUATION', '03 • PARTNERSHIP'];
                return (
                  <div 
                    key={step.step} 
                    className={`approach-timeline-step stair-step-${idx + 1}`}
                  >
                    {/* Timeline Connecting Node Dot */}
                    <div className="approach-node-anchor" aria-hidden="true">
                      <div className="approach-node-dot">
                        <div className="approach-node-core" />
                        <div className="approach-node-pulse" />
                      </div>
                      <div className="approach-node-stem" />
                    </div>

                    {/* Connecting Staircase Track to Next Higher Step (for Steps 1 & 2) */}
                    {idx < APPROACH_STEPS.length - 1 && (
                      <div className="approach-stair-connector" aria-hidden="true">
                        <svg 
                          className="stair-line-svg" 
                          viewBox="0 0 100 50" 
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id={`stairGrad-${idx}`} x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#dfb76c" />
                              <stop offset="50%" stopColor="#c5a880" />
                              <stop offset="100%" stopColor="#f0d48f" />
                            </linearGradient>
                          </defs>
                          {/* Stepped Staircase Path: bottom horizontal tread -> vertical riser up -> top horizontal tread */}
                          <path 
                            d="M 0 50 H 50 V 0 H 100" 
                            fill="none" 
                            stroke={`url(#stairGrad-${idx})`} 
                            strokeWidth="2.5" 
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                        {/* Stair Step Accent Tag */}
                        <div className="stair-riser-tag">
                          <span>STEP UP</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M7 17L17 7M7 7h10v10" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Framed Step Card */}
                    <div className="approach-step-card">
                      {/* Architectural 3-tier Stair Progress Indicator */}
                      <div className="stair-step-indicator" aria-hidden="true">
                        <div className="stair-mini-bars">
                          <span className={`mini-stair mini-stair-1 ${idx >= 0 ? 'active' : ''}`} />
                          <span className={`mini-stair mini-stair-2 ${idx >= 1 ? 'active' : ''}`} />
                          <span className={`mini-stair mini-stair-3 ${idx >= 2 ? 'active' : ''}`} />
                        </div>
                        <span className="stair-step-tag">
                          {idx === 0 && 'STEP 01 OF 03'}
                          {idx === 1 && 'STEP 02 OF 03'}
                          {idx === 2 && 'FINAL STEP 03'}
                        </span>
                      </div>

                      <div className="step-num">{step.step}</div>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.description}</p>

                      {/* Stair Base / Stage Anchor */}
                      <div className="stair-step-podium" aria-hidden="true">
                        <span className="podium-line" />
                        <span className="podium-badge">{podiumTitles[idx]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Areas of Expertise */}
      <section className="expertise-strip-section" aria-label="Areas of Expertise">
        <div className="about-container">
          <header className="expertise-header">
            <span className="about-eyebrow">AREAS OF EXPERTISE</span>
            <h2 className="founders-intro-heading" style={{ fontSize: '1.75rem' }}>
              Diverse Opportunities. One Focus on Value.
            </h2>
          </header>

          <div className="expertise-tiles-grid">
            {EXPERTISE_TILES.map((tile) => (
              <Link 
                key={tile.slug} 
                to={`/services/${tile.slug}`}
                className="expertise-tile-link"
              >
                <span>{tile.title}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
