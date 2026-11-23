import React, { useState, useEffect } from 'react';
import { homepageApi } from '../../services/homepageApi.js';
import './OfferPopup.css';

export const OfferPopup = () => {
  const [offer, setOffer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Fetch active offer on mount
  useEffect(() => {
    let isMounted = true;
    const fetchActiveOffer = async () => {
      const offers = await homepageApi.getOffers();
      if (isMounted && offers && offers.length > 0) {
        // Take the top active published offer
        setOffer(offers[0]);
      }
    };

    fetchActiveOffer();
    return () => { isMounted = false; };
  }, []);

  // Trigger popup when visitor scrolls beyond the hero section (~450px)
  useEffect(() => {
    if (!offer || isDismissed) return;

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.65;
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offer, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!offer || !isVisible || isDismissed) {
    return null;
  }

  return (
    <aside 
      className="offer-modal-overlay" 
      aria-label="Exclusive Real Estate Announcement"
      role="complementary"
    >
      <div className="offer-card">
        <button 
          type="button" 
          className="offer-close-x"
          aria-label="Dismiss announcement"
          onClick={handleDismiss}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <span className="offer-badge">
          {offer.category || 'EXCLUSIVE MANDATE'}
        </span>

        <h3 className="offer-title">
          {offer.title}
        </h3>

        <p className="offer-description">
          {offer.description}
        </p>

        <div className="offer-actions">
          {offer.link ? (
            <a 
              href={offer.link} 
              className="offer-cta-link"
              target={offer.link.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <span>{offer.ctaText || 'Learn More'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ) : (
            <a href="#services-section" className="offer-cta-link" onClick={handleDismiss}>
              <span>Explore Portfolio</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          )}

          <button 
            type="button" 
            className="offer-dismiss-btn"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        </div>
      </div>
    </aside>
  );
};
