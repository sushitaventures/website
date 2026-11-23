import React, { useEffect } from 'react';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { ContactUs } from '../../components/contact/ContactUs.jsx';
import { PremiumFooter } from '../../components/footer/PremiumFooter.jsx';

export const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Us | Sushita Ventures Real Estate Advisory";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page-root">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Contact Us Content */}
      <main id="main-content">
        <ContactUs />
      </main>

      {/* 3. Global Premium Footer */}
      <PremiumFooter />
    </div>
  );
};
