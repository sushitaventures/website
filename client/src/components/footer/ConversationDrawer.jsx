import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      const servicesEl = document.getElementById('services-section');
      if (servicesEl) {
        servicesEl.scrollIntoView({ behavior: 'smooth' });
      }
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
        <div className="conversation-drawer-content">
          <span className="conversation-drawer-eyebrow">
            AN INVITATION TO COLLABORATE
          </span>

          <h2 className="conversation-drawer-heading">
            <span className="conversation-drawer-heading-line">EVERY GREAT OPPORTUNITY</span>
            <span className="conversation-drawer-heading-line">BEGINS WITH A CONVERSATION.</span>
          </h2>

          <p className="conversation-drawer-desc">
            Whether you're exploring a new property opportunity, looking for the right business space, or considering your next strategic move, we'd be glad to understand your vision.
          </p>

          <div className="conversation-drawer-cta-group">
            <Link
              to="/services/commercial"
              className="conversation-drawer-primary-btn"
              onClick={handleServicesClick}
              aria-label="Explore our specialist real estate services"
            >
              <span>EXPLORE OUR SERVICES</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/contact"
              className="conversation-drawer-secondary-btn"
              aria-label="Get in touch with Sushita Ventures"
            >
              <span>GET IN TOUCH</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

