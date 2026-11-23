import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle.jsx';
import './Navbar.css';

const SERVICES_MENU = [
  { title: 'Residentials', slug: 'residential' },
  { title: 'Commercial', slug: 'commercial' },
  { title: 'Industrial', slug: 'industrial' },
  { title: 'Land / Plots', slug: 'land-plots' },
  { title: 'Hotels', slug: 'hotels' },
  { title: 'Leasing', slug: 'leasing' },
  { title: 'Exchange Property', slug: 'exchange-property' },
  { title: 'Sick Property', slug: 'sick-property' }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isServices = location.pathname.startsWith('/services') || (isHome && location.hash === '#services-section');
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on ESC and route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleServicesClick = (e) => {
    if (isHome) {
      e.preventDefault();
      const servicesEl = document.getElementById('services-section');
      if (servicesEl) {
        servicesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHowWeWorkClick = (e) => {
    if (isHome) {
      e.preventDefault();
      const videoEl = document.getElementById('video-showcase-section');
      if (videoEl) {
        videoEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar-root ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo & Wordmark */}
        <Link to="/" className="navbar-brand" aria-label="Sushita Ventures - Luxury Real Estate Advisory Homepage">
          <div className="navbar-logo-frame">
            <img
              src="/images/branding/logo.png"
              alt="Sushita Ventures Emblem"
              className="navbar-logo-img"
            />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-main"><b>Sushita</b></span>
            <span className="navbar-brand-sub"><b>Ventures</b></span>
          </div>
        </Link>

        {/* Desktop Navigation Capsule */}
        <nav aria-label="Main Navigation" className="navbar-nav-capsule-wrapper">
          <ul className="navbar-menu-capsule">
            <li>
              <Link
                to="/"
                className={`navbar-link ${isHome && !location.hash ? 'active' : ''}`}
              >
                <span className="navbar-link-label">Home</span>
              </Link>
            </li>


            <li
              className="services-dropdown-wrapper"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="services-trigger-lockup">
                <Link
                  to="/#services-section"
                  className={`navbar-link services-link ${isServices ? 'active' : ''}`}
                  onClick={handleServicesClick}
                >
                  <span className="navbar-link-label">Services</span>
                </Link>
                <button
                  type="button"
                  className="services-chevron-btn"
                  aria-expanded={dropdownOpen}
                  aria-label="Toggle services menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <svg
                    className={`dropdown-chevron ${dropdownOpen ? 'open' : ''}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {dropdownOpen && (
                <ul className="services-dropdown-menu" role="menu">
                  {SERVICES_MENU.map((item) => (
                    <li key={item.slug} className="services-dropdown-item" role="none">
                      <Link
                        to={`/services/${item.slug}`}
                        className="services-dropdown-link"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="dropdown-bullet" aria-hidden="true">/</span>
                        <span className="dropdown-item-title">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/about"
                className={`navbar-link ${isAbout ? 'active' : ''}`}
              >
                <span className="navbar-link-label">About Us</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Actions: Contact Us Pill CTA & Theme Toggle & Mobile Menu */}
        <div className="navbar-actions">
          <Link
            to="/contact"
            className="navbar-contact-pill-btn"
            aria-label="Contact Sushita Ventures"
          >
            CONTACT US
          </Link>

          <ThemeToggle />

          <button
            type="button"
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-list">
          <li>
            <Link
              to="/"
              className={`mobile-link ${isHome ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="mobile-services-group">
            <Link
              to="/#services-section"
              className={`mobile-link ${isServices ? 'active' : ''}`}
              onClick={(e) => {
                handleServicesClick(e);
                setMobileMenuOpen(false);
              }}
            >
              Services
            </Link>
            <ul className="mobile-services-sublist">
              {SERVICES_MENU.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/services/${item.slug}`}
                    className="mobile-sublink"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link
              to="/about"
              className={`mobile-link ${isAbout ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`mobile-link ${isContact ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
          <li className="mobile-theme-row">
            <span className="mobile-theme-label">Appearance</span>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </header>
  );
};
