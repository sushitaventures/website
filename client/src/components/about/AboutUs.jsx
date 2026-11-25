import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../common/SplitText.jsx';
import {
  FOUNDERS_DATA,
  FOUNDER_PLACEHOLDERS,
  VISION_DATA,
  PROMISE_DATA,
  CORE_VALUES,
  APPROACH_STEPS,
  EXPERTISE_TILES
} from './aboutContent.js';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport, LUXURY_EASE } from '../../utils/motionVariants.js';
import './AboutUs.css';

gsap.registerPlugin(ScrollTrigger);

const FOUNDERS = [...FOUNDERS_DATA, ...FOUNDER_PLACEHOLDERS];

// Thin gold rule that draws in from the left
const lineDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: LUXURY_EASE } }
};

// Image unmasks bottom-to-top
const imageReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.2, ease: LUXURY_EASE } }
};

const Reveal = ({ as = 'div', variants = fadeInUp, ...props }) => {
  const M = motion[as];
  return <M initial="hidden" whileInView="visible" viewport={defaultViewport} variants={variants} {...props} />;
};

const Heading = ({ children, tag = 'h2', className = 'ab-h2' }) => (
  <SplitText tag={tag} type="words" animation="3d-flip" className={className} start="top 88%">
    {children}
  </SplitText>
);

export const AboutUs = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero: slow settle on load, then parallax drift on scroll
        gsap.fromTo('.ab-hero-img', { scale: 1.18 }, { scale: 1.05, duration: 2.4, ease: 'power3.out' });
        gsap.to('.ab-hero-img', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: '.ab-hero', start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.ab-hero-content', {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.ab-hero', start: 'center center', end: 'bottom top', scrub: true }
        });

        // Full-width panorama: zooms out as it crosses the viewport
        gsap.fromTo(
          '.ab-panorama img',
          { scale: 1.2 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: '.ab-panorama', start: 'top bottom', end: 'bottom top', scrub: true } }
        );

        // Founder portraits: gentle inner parallax
        gsap.utils.toArray('.ab-founder-photo img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div className="ab" ref={rootRef}>

      {/* 1. Hero */}
      <section className="ab-hero" aria-label="About Sushita Ventures">
        <img src="/images/about/about-story-hero.jpg" alt="" className="ab-hero-img" loading="eager" />
        <div className="ab-hero-scrim" />
        <div className="ab-wrap ab-hero-content">
          <SplitText tag="h1" type="words" animation="3d-flip" className="ab-hero-title" trigger={false} delay={0.3}>
            More Than Property. A Vision Built on Possibility.
          </SplitText>
          <motion.p
            className="ab-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: LUXURY_EASE }}
          >
            "We don't just see what a property is today. We see what it can become tomorrow."
          </motion.p>
        </div>
        <motion.div
          className="ab-scroll-cue"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        />
      </section>

      {/* 2. Story */}
      <section className="ab-section ab-light" aria-label="Our Story">
        <div className="ab-wrap ab-split">
          <Heading>Every meaningful venture begins with a vision.</Heading>
          <Reveal className="ab-copy" variants={staggerContainer(0.15, 0.2)}>
            <motion.p variants={staggerItem}>
              Sushita Ventures was built around the belief that real estate is about more than locations, structures, and transactions. It is about recognising potential, understanding aspirations, and creating opportunities that deliver lasting value.
            </motion.p>
            <motion.p variants={staggerItem}>
              Across commercial, industrial, hospitality, land, and property solutions, we approach every opportunity with a broader perspective — combining business understanding, thoughtful decisions, and a commitment to meaningful relationships.
            </motion.p>
          </Reveal>
        </div>
      </section>

      {/* 3. Founders */}
      <section className="ab-section ab-dark" aria-label="Leadership">
        <div className="ab-wrap">
          <header className="ab-head">
            <Heading>The Vision Behind Sushita Ventures</Heading>
            <Reveal as="p" className="ab-sub">
              Behind Sushita Ventures is a leadership team uniting people-focused vision, entrepreneurial depth, and strategic expansion. Together, they shape the direction, values, and global ambitions of the organisation.
            </Reveal>
          </header>
          <div className="ab-founders m-swipe">
            {FOUNDERS.map((f) => {
              const [first, ...rest] = f.bioParagraphs;
              return (
                <Reveal as="article" key={f.id} className="ab-founder" variants={staggerContainer(0.1, 0)}>
                  <motion.div className="ab-founder-photo" variants={imageReveal}>
                    <img src={f.image} alt={f.imageAlt} loading="lazy" />
                  </motion.div>
                  <div>
                    <motion.h3 className="ab-founder-name" variants={staggerItem}>{f.name}</motion.h3>
                    <motion.p className="ab-founder-title" variants={staggerItem}>{f.designation}</motion.p>
                    <motion.p className="ab-founder-roles" variants={staggerItem}>{f.rolesString}</motion.p>
                    <motion.p className="ab-founder-bio" variants={staggerItem}>{first}</motion.p>
                    {rest.length > 0 && (
                      <motion.details className="ab-more" variants={staggerItem}>
                        <summary>Read full profile</summary>
                        {rest.map((p, i) => <p key={i} className="ab-founder-bio">{p}</p>)}
                      </motion.details>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Vision & Promise */}
      <section className="ab-section ab-light" aria-label="Vision and Promise">
        <div className="ab-wrap ab-vp">
          <div>
            <Heading>{VISION_DATA.title}</Heading>
            <Reveal className="ab-copy" variants={staggerContainer(0.12, 0.2)}>
              <motion.p variants={staggerItem}>{VISION_DATA.description1}</motion.p>
              <motion.p variants={staggerItem}>{VISION_DATA.description2}</motion.p>
              <motion.p className="ab-note" variants={staggerItem}>{VISION_DATA.highlight}</motion.p>
            </Reveal>
          </div>
          <div className="ab-promise">
            <Heading>{PROMISE_DATA.title1}</Heading>
            <SplitText tag="p" type="words" animation="fade-rise" className="ab-h2 ab-gold" delay={0.25} start="top 88%">
              {PROMISE_DATA.title2}
            </SplitText>
            <Reveal className="ab-copy" variants={staggerContainer(0.12, 0.3)}>
              <motion.p variants={staggerItem}>{PROMISE_DATA.description}</motion.p>
              <motion.p className="ab-note" variants={staggerItem}>{PROMISE_DATA.company} — "{PROMISE_DATA.motto}"</motion.p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Values */}
      <section className="ab-section ab-dark ab-values-section" aria-label="Core Values">
        <div className="ab-wrap">
          <header className="ab-head">
            <Heading>The Principles Behind Every Decision.</Heading>
          </header>
          <Reveal className="ab-values m-swipe" variants={staggerContainer(0.12, 0.1)}>
            {CORE_VALUES.map((v) => (
              <motion.div key={v.id} className="ab-value" variants={staggerItem} whileHover={{ y: -6 }}>
                <motion.span className="ab-line" variants={lineDraw} />
                <span className="ab-num">{v.id}</span>
                <h3 className="ab-h3">{v.title}</h3>
                <p>{v.description}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
        {/* Full-bleed panorama */}
        {/* Unclipped wrapper triggers the reveal: a fully clipped element never registers as in view */}
        <Reveal variants={{ hidden: {}, visible: {} }}>
          <motion.div className="ab-panorama" variants={imageReveal}>
            <img
              src="/images/about/principles-visual-panorama.jpg"
              alt="Integrity, Relationships, Perspective and Long-Term Value"
              loading="lazy"
            />
          </motion.div>
        </Reveal>
      </section>

      {/* 6. Approach */}
      <section className="ab-section ab-light" aria-label="Our Approach">
        <div className="ab-wrap">
          <header className="ab-head">
            <Heading>Every Opportunity Deserves a Closer Look.</Heading>
            <Reveal as="p" className="ab-sub">
              Property decisions require more than simply identifying available spaces. They require understanding the purpose, the people, the location, and the opportunity behind every requirement.
            </Reveal>
          </header>
          <Reveal as="ol" className="ab-steps m-swipe" variants={staggerContainer(0.18, 0.1)}>
            {APPROACH_STEPS.map((s) => (
              <motion.li key={s.step} className="ab-step" variants={staggerItem}>
                <motion.span className="ab-line" variants={lineDraw} />
                <span className="ab-num">{s.step}</span>
                <h3 className="ab-h3">{s.title}</h3>
                <p>{s.description}</p>
              </motion.li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 7. Expertise */}
      <section className="ab-section ab-dark" aria-label="Areas of Expertise">
        <div className="ab-wrap">
          <header className="ab-head">
            <Heading>Diverse Opportunities. One Focus on Value.</Heading>
          </header>
          <Reveal className="ab-tiles" variants={staggerContainer(0.07, 0.1)}>
            {EXPERTISE_TILES.map((t) => (
              <motion.div key={t.slug} variants={staggerItem}>
                <Link to={`/services/${t.slug}`} className="ab-tile">
                  {t.title} <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
