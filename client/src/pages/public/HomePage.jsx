import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { HeroSlider } from '../../components/hero/HeroSlider.jsx';
import { OfferPopup } from '../../components/offers/OfferPopup.jsx';
import { CinematicVideo } from '../../components/video/CinematicVideo.jsx';
import { ServicesShowcase } from '../../components/services/ServicesShowcase.jsx';
import { PremiumFooter } from '../../components/footer/PremiumFooter.jsx';

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Sushita Ventures | Considered Real Estate Advisory & Capital Portfolio';
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        // Small delay to allow layout to settle
        const timeout = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [location.hash]);

  return (
    <div className="homepage-root">
      {/* 1. Transparent-to-Blurred Floating Navigation */}
      <Navbar />

      {/* 2. Full-Screen Cinematic Hero with Keyframe Text Reveal */}
      <main id="main-content">
        <HeroSlider />

        {/* 3. Cinematic YouTube Video Showcase */}
        <CinematicVideo />

        {/* 4. Asymmetric Editorial Services Showcase */}
        <ServicesShowcase />
      </main>

      {/* 5. Scroll-Triggered Offer / Exclusive Mandate Popup */}
      <OfferPopup />

      {/* 6. Full-Screen Monumental Closing Footer */}
      <PremiumFooter />
    </div>
  );
};
