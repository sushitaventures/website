import React, { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { HeroSlider } from '../../components/hero/HeroSlider.jsx';
import { BrandIntroduction } from '../../components/home/BrandIntroduction.jsx';
import { ServicesScrollGrid } from '../../components/services/ServicesScrollGrid.jsx';
import { BusinessPerspective } from '../../components/home/BusinessPerspective.jsx';
import { WhySushita } from '../../components/home/WhySushita.jsx';
import { ContactCTA } from '../../components/home/ContactCTA.jsx';
import { PremiumFooter } from '../../components/footer/PremiumFooter.jsx';
import { useSeo } from '../../seo/useSeo.js';
import { HOME_FAQS } from '../../seo/seoData.js';
import { useAfterLoad } from '../../utils/useAfterLoad.js';

// Below-the-fold / deferred pieces load in their own chunks. They're the only home
// components using framer-motion, so the library stays out of the critical bundle.
const FaqSection = lazy(() => import('../../components/common/FaqSection.jsx').then((m) => ({ default: m.FaqSection })));
const OfferPopup = lazy(() => import('../../components/offers/OfferPopup.jsx').then((m) => ({ default: m.OfferPopup })));

export const HomePage = () => {
  const location = useLocation();

  useSeo('/');
  // FAQ chunk + offer popup wait until the page is loaded and idle (keeps them off the LCP path)
  const afterLoad = useAfterLoad();

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
        {/* FAQ — visible Q&A matching the FAQPage structured data (AEO) */}
        {afterLoad && (
          <Suspense fallback={null}>
            <FaqSection faqs={HOME_FAQS} tone="dark" />
          </Suspense>
        )}

        <ContactCTA />
      </main>

      {/* Section 7: Premium Footer with Rising-Card Reveal */}
      <PremiumFooter />

      {/* Exclusive Mandate / Offer Modal */}
      {afterLoad && (
        <Suspense fallback={null}>
          <OfferPopup />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
