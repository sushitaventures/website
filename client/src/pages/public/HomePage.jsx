import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { HeroSlider } from '../../components/hero/HeroSlider.jsx';
import { BrandIntroduction } from '../../components/home/BrandIntroduction.jsx';
import { ServicesScrollGrid } from '../../components/services/ServicesScrollGrid.jsx';
import { BusinessPerspective } from '../../components/home/BusinessPerspective.jsx';
import { WhySushita } from '../../components/home/WhySushita.jsx';
import { ContactCTA } from '../../components/home/ContactCTA.jsx';
import { PremiumFooter } from '../../components/footer/PremiumFooter.jsx';
import { OfferPopup } from '../../components/offers/OfferPopup.jsx';

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Sushita Ventures | Real Estate & Investment Opportunities';
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        const timeout = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return () => clearTimeout(timeout);
      }
    }
  }, [location.hash]);

  return (
    <div className="homepage-root">
      {/* Global Header & Navigation */}
      <Navbar />

      <main id="main-content">
        {/* Section 1: Cinematic Full-Screen Hero */}
        <HeroSlider />

        {/* Section 2: Brand Introduction & Animated Wordmark */}
        <BrandIntroduction />

        {/* Section 3: Our Services (Signature Scroll-Animated Grid + Exchange Land & Plots) */}
        <ServicesScrollGrid />

        {/* Section 4: Our Business Perspective */}
        <BusinessPerspective />

        {/* Section 5: Why Sushita Ventures */}
        <WhySushita />

        {/* Section 6: Final Brand Statement & Contact CTA (Pre-Footer Card) */}
        <ContactCTA />
      </main>

      {/* Section 7: Premium Footer with Rising-Card Reveal */}
      <PremiumFooter />

      {/* Exclusive Mandate / Offer Modal */}
      <OfferPopup />
    </div>
  );
};

export default HomePage;
