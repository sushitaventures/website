import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, defaultViewport } from '../../utils/motionVariants.js';
import { smoothScrollTo } from '../../utils/gsapHelpers.js';
import { SplitText } from '../common/SplitText.jsx';
import './ConversationDrawer.css';

export const ConversationDrawer = () => {
  const [isInView, setIsInView] = useState(false);
  const drawerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (drawerRef.current) {
      observer.observe(drawerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleServicesClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      smoothScrollTo('#services-section', -75, 1.2);
    }
  };

  return (
    <section
      ref={drawerRef}
      className={`conversation-drawer-root ${isInView ? 'in-view' : ''}`}
      aria-label="Call to Collaboration"
    >
      {/* Background Handshake Image */}
      <img
        src="/images/common/conversation-handshake.jpg"
        alt="Two business leaders concluding a real estate partnership with a handshake"
        className="conversation-drawer-bg"
        loading="lazy"
      />

      {/* Atmospheric Gradient Scrim */}
      <div className="conversation-drawer-scrim" />

      {/* Drawer Accent Top Border & Pull Pill */}
      <div className="conversation-drawer-handle-zone" aria-hidden="true">
        <div className="conversation-drawer-handle-pill" />
      </div>

      {/* Foreground Content */}
      <div className="conversation-drawer-container">
        <motion.div
          className="conversation-drawer-content"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          <span className="conversation-drawer-eyebrow">
            An Invitation to Collaborate
          </span>

          <SplitText
            tag="h2"
            type="words"
            animation="3d-flip"
            className="conversation-drawer-heading"
            start="top 90%"
          >
            Every Great Opportunity Begins with a Conversation.
          </SplitText>

          <p className="conversation-drawer-desc">
            Whether you're exploring a new property opportunity, looking for the right business space, or considering your next strategic move, we'd be glad to understand your vision.
          </p>

          <motion.div
            className="conversation-drawer-cta-group"
            variants={staggerContainer(0.12, 0.2)}
          >
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/services/commercial"
                className="conversation-drawer-primary-btn"
                onClick={handleServicesClick}
                aria-label="Explore our specialist real estate services"
              >
                <span>Explore Our Services</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="conversation-drawer-secondary-btn"
                aria-label="Get in touch with Sushita Ventures"
              >
                <span>Speak with an Advisor</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
