import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { PremiumFooter } from '../../components/footer/PremiumFooter.jsx';
import { SplitText } from '../../components/common/SplitText.jsx';
import { SERVICE_DETAILS_MAP } from '../../components/services/serviceDetailsData.js';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport, LUXURY_EASE } from '../../utils/motionVariants.js';
import '../../components/services/ServiceDetail.css';
import { useSeo } from '../../seo/useSeo.js';
import { FaqSection } from '../../components/common/FaqSection.jsx';
import { serviceFaqs } from '../../seo/seoData.js';

gsap.registerPlugin(ScrollTrigger);

// Canonical slugs only — the map also holds legacy alias keys pointing at the same objects
const SLUGS = [...new Set(Object.values(SERVICE_DETAILS_MAP).map((s) => s.slug))];

const Reveal = ({ as = 'div', variants = fadeInUp, ...props }) => {
  const M = motion[as];
  return <M initial="hidden" whileInView="visible" viewport={defaultViewport} variants={variants} {...props} />;
};

const Heading = ({ children, className = 'sd-h2' }) => (
  <SplitText tag="h2" type="words" animation="3d-flip" className={className} start="top 88%">
    {children}
  </SplitText>
);

const lineDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: LUXURY_EASE } }
};

const ServiceContent = ({ service, slug }) => {
  const rootRef = useRef(null);
  const next = SERVICE_DETAILS_MAP[SLUGS[(SLUGS.indexOf(slug) + 1) % SLUGS.length]];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero: image unmasks from a centred frame to full bleed on load, then drifts on scroll
        gsap.fromTo(
          '.sd-hero-media',
          { clipPath: 'inset(18% 14% 18% 14% round 8px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.6, ease: 'expo.inOut', delay: 0.1 }
        );
        gsap.fromTo('.sd-hero-img', { scale: 1.3 }, { scale: 1.08, duration: 2.2, ease: 'expo.out', delay: 0.1 });
        gsap.to('.sd-hero-img', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: { trigger: '.sd-hero', start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.sd-hero-content', {
          y: -60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.sd-hero', start: 'center center', end: 'bottom top', scrub: true }
        });

        // Process: gold track fills as the steps scroll through (vertical on phones, horizontal on desktop)
        const axis = window.matchMedia('(min-width: 901px)').matches ? 'scaleX' : 'scaleY';
        gsap.fromTo(
          '.sd-track-fill',
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.sd-steps', start: 'top 75%', end: 'bottom 55%', scrub: true }
          }
        );
      });

      // Desktop: pillars pin and slide horizontally
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const track = rootRef.current.querySelector('.sd-pillars-track');
        const distance = () => track.scrollWidth - track.parentElement.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.sd-pillars',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <main id="main-content" ref={rootRef} className="sd">

      {/* 1. Hero — the page's one image */}
      <section className="sd-hero" aria-label={service.title}>
        <div className="sd-hero-media">
          <img src={service.heroImage} alt={service.heroAlt} className="sd-hero-img" loading="eager" />
          <div className="sd-hero-scrim" />
        </div>
        <div className="sd-wrap sd-hero-content">
          <SplitText tag="h1" type="words" animation="3d-flip" className="sd-hero-title" trigger={false} delay={0.9}>
            {service.title}
          </SplitText>
          <motion.p
            className="sd-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: LUXURY_EASE }}
          >
            {service.tagline}
          </motion.p>
        </div>
      </section>

      {/* 2. Overview + target assets */}
      <section className="sd-section sd-light" aria-label="Advisory Scope">
        <div className="sd-wrap sd-overview">
          <Heading>Considered Strategy for Lasting Value.</Heading>
          <div>
            <Reveal as="p" className="sd-lead">{service.overview}</Reveal>
            <h3 className="sd-h3">Target Asset Classes</h3>
            <Reveal as="ul" className="sd-assets" variants={staggerContainer(0.1, 0.1)}>
              {service.targetAssets.map((asset) => (
                <motion.li key={asset} variants={staggerItem}>
                  <motion.span className="sd-line" variants={lineDraw} />
                  {asset}
                </motion.li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Pillars — pinned horizontal scroll on desktop, stacked on phones */}
      <section className="sd-pillars sd-dark" aria-label="Key Capabilities">
        <div className="sd-wrap sd-pillars-head">
          <Heading>How We Support Your Requirements.</Heading>
        </div>
        <div className="sd-pillars-viewport">
          <div className="sd-pillars-track m-swipe">
            {service.pillars.map((p, i) => (
              <Reveal as="article" key={p.title} className="sd-pillar">
                <span className="sd-num">0{i + 1}</span>
                <h3 className="sd-pillar-title">{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process with a scroll-filled gold track */}
      <section className="sd-section sd-light" aria-label="Advisory Methodology">
        <div className="sd-wrap">
          <header className="sd-head">
            <Heading>A Disciplined Fiduciary Approach.</Heading>
          </header>
          <div className="sd-steps">
            <div className="sd-track" aria-hidden="true"><span className="sd-track-fill" /></div>
            <Reveal as="ol" className="sd-steps-list" variants={staggerContainer(0.15, 0.1)}>
              {service.advisoryProcess.map((s) => (
                <motion.li key={s.step} className="sd-step" variants={staggerItem}>
                  <span className="sd-dot" aria-hidden="true" />
                  <span className="sd-num">{s.step}</span>
                  <h3 className="sd-h3">{s.title}</h3>
                  <p>{s.desc}</p>
                </motion.li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ — visible Q&A matching the FAQPage structured data (AEO) */}
      <FaqSection faqs={serviceFaqs(service)} heading={`${service.title}: Questions & Answers`} tone="dark" />

      {/* 5. CTA */}
      <section className="sd-section sd-dark sd-cta" aria-label="Connect With Advisory">
        <div className="sd-wrap">
          <Heading className="sd-h2 sd-cta-title">Discuss Your Property Mandate.</Heading>
          <Reveal as="p" className="sd-sub sd-cta-sub">
            Whether assessing acquisition viability, seeking commercial spaces, or evaluating a strategic portfolio move, connect with Sushita Ventures for confidential, senior-level advisory.
          </Reveal>
          <Reveal>
            <Link to="/contact" className="sd-btn">
              Connect with an Advisor
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 6. Next service + all services */}
      <nav className="sd-section sd-light sd-next" aria-label="Other Specialist Services">
        <div className="sd-wrap">
          <Link to={`/services/${next.slug}`} className="sd-next-link">
            <span className="sd-next-label">Next:</span> {next.title} <span className="sd-next-arrow" aria-hidden="true">→</span>
          </Link>
          <Reveal as="ul" className="sd-pills" variants={staggerContainer(0.05, 0.05)}>
            {SLUGS.map((s) => (
              <motion.li key={s} variants={staggerItem}>
                <Link
                  to={`/services/${s}`}
                  className={`sd-pill${s === slug ? ' is-active' : ''}`}
                  aria-current={s === slug ? 'page' : undefined}
                >
                  {SERVICE_DETAILS_MAP[s].title}
                </Link>
              </motion.li>
            ))}
          </Reveal>
        </div>
      </nav>
    </main>
  );
};

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = SERVICE_DETAILS_MAP[slug];
  // Canonical slug — legacy alias URLs (e.g. /services/hotels) point search engines at the real page
  useSeo(service ? `/services/${service.slug}` : `/services/${slug}`, { noindex: !service });

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [slug, service]);

  if (!service) return <Navigate to="/#services-section" replace />;

  return (
    <div className="service-detail-root">
      <Navbar />
      {/* key remounts the page per service so every animation and ScrollTrigger restarts cleanly */}
      <ServiceContent key={service.slug} service={service} slug={service.slug} />
      <PremiumFooter />
    </div>
  );
};
