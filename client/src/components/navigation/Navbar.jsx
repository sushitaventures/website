import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { MobileActionBar } from './MobileActionBar.jsx';

export const SERVICES_LIST = [
  { num: '01', title: 'Hotel & Resorts', slug: 'hotel-resorts', desc: 'Hospitality & destination resort assets' },
  { num: '02', title: 'Leasing', slug: 'leasing', desc: 'Hospitality, commercial & retail leasing' },
  { num: '03', title: 'Residential Property', slug: 'residential-property', desc: 'Considered residential acquisitions' },
  { num: '04', title: 'Commercial Property', slug: 'commercial-property', desc: 'Strategic corporate & retail real estate' },
  { num: '05', title: 'Industrial Property', slug: 'industrial-property', desc: 'Logistics, warehousing & industrial hubs' },
  { num: '06', title: 'Exchange Property', slug: 'exchange-property', desc: 'Structured property-for-property swaps' },
  { num: '07', title: 'Land & Plots', slug: 'land-plots', desc: 'Clear-title land & plot transactions' },
  { num: '08', title: 'Sick Property', slug: 'sick-property', desc: 'Distressed & underperforming assets' }
];

// Is the page behind the navbar light or dark? Samples the element under the bar,
// walks up to the first opaque background, and checks its luminance.
// Full-width photos/videos count as dark (heroes all sit under a dark scrim); a contained
// photo inside an ivory section doesn't — the section colour around it decides.
const detectToneBehind = (header) => {
  const y = Math.min(header.offsetHeight / 2, 40);
  const stack = document.elementsFromPoint(window.innerWidth / 2, y);
  const target = stack.find((el) => !header.contains(el) && !el.closest('.mab'));
  for (let el = target; el && el !== document.documentElement; el = el.parentElement) {
    const fullWidth = el.getBoundingClientRect().width >= window.innerWidth * 0.9;
    if (fullWidth && /^(IMG|VIDEO|IFRAME|CANVAS|PICTURE)$/.test(el.tagName)) return 'dark';
    const cs = getComputedStyle(el);
    if (fullWidth && cs.backgroundImage !== 'none' && !cs.backgroundImage.includes('gradient')) return 'dark';
    const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (!m) continue;
    const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    if (a < 0.5) continue;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150 ? 'light' : 'dark';
  }
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [tone, setTone] = useState('dark');
  const headerRef = useRef(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isServices = location.pathname.startsWith('/services') || (isHome && location.hash === '#services-section');
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  // Scroll listener: background state + text tone matched to the section behind the bar
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 40);
      if (headerRef.current) setTone(detectToneBehind(headerRef.current));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    // Re-check once the new page has painted/animated in (route change, images loading)
    const late = setTimeout(update, 600);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(late);
    };
  }, [location.pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menus on route change or ESC key
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover delay handlers to prevent menu flickering
  const handleMouseEnterMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 140);
  };


  return (
    <>
    <header
      ref={headerRef}
      className={`navbar-root ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'} navbar-tone-${tone} ${megaMenuOpen ? 'navbar-has-megamenu' : ''}`}
      role="banner"
    >
      <div className="navbar-container">
        
        {/* 1. LEFT — BRAND LOGO */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand" aria-label="Sushita Ventures Homepage">
            <div className="navbar-logo-frame">
              <img
                src="/images/branding/logo.png"
                alt="Sushita Ventures Emblem"
                className="navbar-brand-logo-img"
              />
            </div>
            <div className="navbar-brand-lockup">
              <span className="navbar-brand-title">Sushita</span>
              <span className="navbar-brand-subtitle">Ventures</span>
            </div>
          </Link>
        </div>

        {/* 2. CENTRE — MAIN NAVIGATION */}
        <nav className="navbar-center" aria-label="Main Navigation">
          <ul className="navbar-nav-list">
            <li className="navbar-nav-item">
              <Link
                to="/"
                className={`navbar-nav-link ${isHome && !location.hash ? 'active' : ''}`}
              >
                <span>Home</span>
              </Link>
            </li>

            <li className="navbar-nav-item">
              <Link
                to="/about"
                className={`navbar-nav-link ${isAbout ? 'active' : ''}`}
              >
                <span>About Us</span>
              </Link>
            </li>

            {/* Services with Mega-Menu Trigger */}
            <li
              className="navbar-nav-item services-item-wrapper"
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseLeaveMenu}
            >
              {/* No standalone Services page: clicking only opens the dropdown */}
              <button
                type="button"
                className={`navbar-nav-link services-nav-link ${isServices || megaMenuOpen ? 'active' : ''}`}
                onClick={handleMouseEnterMenu}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <svg
                  className={`services-caret ${megaMenuOpen ? 'open' : ''}`}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>

            <li className="navbar-nav-item">
              <Link
                to="/contact"
                className={`navbar-nav-link ${isContact ? 'active' : ''}`}
              >
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* 3. RIGHT — CONTACT ACTION */}
        <div className="navbar-right">
          {/* Minimal Mobile Menu Toggle Button */}
          <button
            type="button"
            className="navbar-mobile-toggle-btn"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* 4. DISTINCTIVE EDITORIAL SERVICES MEGA-MENU PANEL */}
      <div
        className={`services-megamenu-panel ${megaMenuOpen ? 'visible' : ''}`}
        role="region"
        aria-label="Services Mega Menu"
        onMouseEnter={handleMouseEnterMenu}
        onMouseLeave={handleMouseLeaveMenu}
      >
        <div className="megamenu-container">
          <div className="megamenu-inner-card">
            
            {/* LEFT: 6 Services Subpages in Balanced 2-Column Grid */}
            <div className="megamenu-left-col">
              <div className="megamenu-header-meta">
                <span className="megamenu-section-eyebrow">Our Areas of Expertise</span>
                <div className="megamenu-header-line" aria-hidden="true" />
              </div>

              <div className="megamenu-services-grid">
                {SERVICES_LIST.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="megamenu-service-link"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    <div className="megamenu-item-head">
                      <span className="megamenu-item-num">{service.num}</span>
                      <span className="megamenu-item-title">{service.title}</span>
                      <svg className="megamenu-hover-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="megamenu-item-desc">{service.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: Featured Architectural Visual (Luxury Hotel / Resort) */}
            <div className="megamenu-right-col">
              <Link
                to="/services/hotel-resorts"
                className="megamenu-featured-card"
                onClick={() => setMegaMenuOpen(false)}
                aria-label="Featured Service: Hotel & Resorts"
              >
                <div className="megamenu-visual-frame">
                  <picture>
                    <source srcSet="/images/home/service-hotel-resorts.webp" type="image/webp" />
                    <img
                      src="/images/home/service-hotel-resorts.jpg"
                      alt="Luxury hotel & resort architectural photography"
                      className="megamenu-visual-img"
                      loading="lazy"
                    />
                  </picture>
                  <div className="megamenu-visual-scrim" />
                  <div className="megamenu-visual-badge">Featured Sector</div>
                </div>
                <div className="megamenu-visual-info">
                  <div className="megamenu-visual-text">
                    <span className="megamenu-visual-category">01 — Hospitality Assets</span>
                    <span className="megamenu-visual-title">Hotel &amp; Resorts</span>
                  </div>
                  <span className="megamenu-visual-action">
                    <span>Explore Our Expertise</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* 5. MOBILE FULL-SCREEN NAVIGATION OVERLAY */}
      <div className={`navbar-mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="navbar-mobile-inner">
          
          <div className="navbar-mobile-top">
            <div className="navbar-logo-frame">
              <img
                src="/images/branding/logo.png"
                alt="Sushita Ventures Emblem"
                className="navbar-brand-logo-img"
              />
            </div>
            <button
              type="button"
              className="navbar-mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="navbar-mobile-list">
            <li className="navbar-mobile-item">
              <Link
                to="/"
                className={`navbar-mobile-link ${isHome && !location.hash ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-item-num">01</span>
                <span className="mobile-item-label">Home</span>
              </Link>
            </li>

            <li className="navbar-mobile-item">
              <Link
                to="/about"
                className={`navbar-mobile-link ${isAbout ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-item-num">02</span>
                <span className="mobile-item-label">About Us</span>
              </Link>
            </li>

            {/* Mobile Services Accordion */}
            <li className="navbar-mobile-item mobile-services-item">
              <button
                type="button"
                className="mobile-services-accordion-btn"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
              >
                <div className="mobile-services-accordion-left">
                  <span className="mobile-item-num">03</span>
                  <span className="mobile-item-label">Services</span>
                </div>
                <svg
                  className={`mobile-accordion-caret ${mobileServicesOpen ? 'open' : ''}`}
                  width="14"
                  height="8"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {mobileServicesOpen && (
                <ul className="mobile-services-accordion-sublist">
                  {SERVICES_LIST.map((service) => (
                    <li key={service.slug}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="mobile-accordion-sublink"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mobile-sublink-num">{service.num}</span>
                        <span className="mobile-sublink-title">{service.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="navbar-mobile-item">
              <Link
                to="/contact"
                className={`navbar-mobile-link ${isContact ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-item-num">04</span>
                <span className="mobile-item-label">Contact</span>
              </Link>
            </li>
          </ul>


        </div>
      </div>

    </header>
    {/* Sibling, not child: the scrolled header's backdrop-filter would trap a fixed child */}
    <MobileActionBar />
    </>
  );
};

export default Navbar;
