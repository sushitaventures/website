import React, { useEffect } from 'react';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { AboutUs } from '../../components/about/AboutUs.jsx';
import { PremiumFooter } from '../../components/footer/PremiumFooter.jsx';
import { useSeo } from '../../seo/useSeo.js';

export const AboutPage = () => {
  useSeo('/about');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-root">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main About Us Editorial Content */}
      <main id="main-content">
        <AboutUs />
      </main>

      {/* 3. Global Premium Footer */}
      <PremiumFooter />
    </div>
  );
};
