import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { staggerContainer, LUXURY_EASE } from '../../utils/motionVariants.js';
import './TargetAssetClasses.css';

gsap.registerPlugin(ScrollTrigger);

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: LUXURY_EASE } }
};

/**
 * Editorial gallery of a service's asset classes.
 * assets: [{ name, img, alt?, desc? }] — page-specific, passed in by the service page.
 * Images are 4:3 (generated/cropped by scripts/image-assets.mjs), so width/height
 * attributes reserve the space and nothing shifts while they load.
 * Desktop: like the pillars section, it pins mid-screen and the row slides right → left
 * until the last card is fully visible, then the page scrolls on. Rows that already fit
 * (3 cards) don't pin. Phones keep the native swipe row; reduced motion gets a still row.
 */
export const TargetAssetClasses = ({ title = 'Target Asset Classes', intro, assets, serviceTitle }) => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const track = rootRef.current.querySelector('.tac-grid');
        const wrap = track.parentElement;
        // Overflow beyond the padded content box = how far the row has to travel
        const distance = () => {
          const cs = getComputedStyle(wrap);
          const inner = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          return Math.max(0, track.scrollWidth - inner);
        };
        if (distance() === 0) return;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            // Centred in the space below the fixed header (~92px once scrolled), never tucked under it
            start: () => `top ${Math.max(96, 96 + (window.innerHeight - 96 - rootRef.current.offsetHeight) / 2)}px`,
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
  <section className="tac" ref={rootRef} aria-labelledby="tac-title">
    <div className="sd-wrap">
      <header className="tac-head">
        <h2 id="tac-title" className="sd-h2">{title}</h2>
        {intro && <p className="tac-intro">{intro}</p>}
      </header>

      <motion.ul
        className="tac-grid m-swipe"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.09, 0.05)}
      >
        {assets.map((a, i) => (
          <motion.li key={a.name} className="tac-card" variants={card}>
            <div className="tac-media">
              <img
                src={a.img}
                alt={a.alt || `${a.name.trim()}${serviceTitle ? ` — ${serviceTitle}` : ''}`}
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="tac-text">
              <span className="tac-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="tac-name">{a.name.trim()}</h3>
              {a.desc && <p className="tac-desc">{a.desc}</p>}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
  );
};
