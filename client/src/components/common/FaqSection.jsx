import { motion } from 'framer-motion';
import { SplitText } from './SplitText.jsx';
import { staggerContainer, staggerItem, defaultViewport } from '../../utils/motionVariants.js';
import './FaqSection.css';

/**
 * Visible FAQ — mirrors the FAQPage JSON-LD from seoData (Google and answer engines
 * only trust FAQ markup whose Q&A is on the page). Native <details>: accessible,
 * works without JS, and answers stay in the HTML for crawlers.
 */
export const FaqSection = ({ faqs, heading = 'Frequently Asked Questions', tone = 'light' }) => (
  <section className={`faq faq--${tone}`} aria-labelledby="faq-heading">
    <div className="faq-wrap">
      <SplitText tag="h2" type="words" animation="3d-flip" className="faq-heading" id="faq-heading" start="top 88%">
        {heading}
      </SplitText>
      <motion.div
        className="faq-list"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer(0.08, 0.1)}
      >
        {faqs.map(({ q, a }) => (
          <motion.details key={q} className="faq-item" variants={staggerItem}>
            <summary className="faq-q">
              <h3>{q}</h3>
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <p className="faq-a">{a}</p>
          </motion.details>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
