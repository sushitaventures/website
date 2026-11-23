import React from 'react';
import { Link } from 'react-router-dom';
import { ConversationDrawer } from './ConversationDrawer.jsx';
import './PremiumFooter.css';

const SERVICES_LINKS = [
  { title: 'Residentials', slug: 'residential' },
  { title: 'Commercial', slug: 'commercial' },
  { title: 'Industrial', slug: 'industrial' },
  { title: 'Land / Plots', slug: 'land-plots' },
  { title: 'Hotels', slug: 'hotels' },
  { title: 'Leasing', slug: 'leasing' },
  { title: 'Exchange Property', slug: 'exchange-property' },
  { title: 'Sick Property', slug: 'sick-property' }
];

export const PremiumFooter = () => {
  return (
    <footer className="footer-root" aria-label="Brand Closing Showcase">
      {/* Global Conversation Drawer on Top of Footer */}
      <ConversationDrawer />

      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          <div className="footer-brand-column">
            <h2 className="footer-brand-title">
              Spaces shape possibilities.<br />Perspectives shape the future.
            </h2>
            <p className="footer-brand-statement">
              Discover a more considered approach to real estate across private acquisitions, commercial developments, and institutional advisory.
            </p>
            <Link to="/contact" className="footer-cta-link">
              <span>Connect with an Advisor</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="footer-nav-column">
            <h3 className="footer-column-heading">Navigation</h3>
            <ul className="footer-nav-list">
              <li><Link to="/" className="footer-nav-link">Home</Link></li>
              <li><Link to="/about" className="footer-nav-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-nav-link">Contact Us</Link></li>
              <li><Link to="/admin" className="footer-nav-link">Advisory Portal</Link></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h3 className="footer-column-heading">Services</h3>
            <ul className="footer-nav-list">
              {SERVICES_LINKS.map((link) => (
                <li key={link.slug}>
                  <Link to={`/services/${link.slug}`} className="footer-nav-link">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="footer-nav-column footer-follow-column">
            <h3 className="footer-column-heading">Follow Us</h3>
            <p className="footer-follow-statement">
              Perspectives, market insights & property showcases.
            </p>
            <div className="footer-social-links" aria-label="Official Social Media Channels">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow Sushita Ventures on LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow Sushita Ventures on Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow Sushita Ventures on Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow Sushita Ventures on X (formerly Twitter)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://threads.net"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow Sushita Ventures on Threads"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Monumental Single-Line Brand Lockup */}
        <div className="footer-monumental-lockup" aria-hidden="true">
          <div className="footer-inline-brand-lockup">
            <img
              src="/images/branding/logo.png"
              alt="Sushita Ventures Emblem"
              className="footer-logo-img"
            />
            <span className="footer-monumental-wordmark">
              SUSHITA VENTURES
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} Sushita Ventures. All rights reserved.
            </div>

            <div className="footer-legal-links">
              <span className="footer-legal-link">Privacy Policy [Pending]</span>
              <span className="footer-legal-link">Terms of Advisory [Pending]</span>
            </div>

            <div className="footer-credits">
              Designed and Maintained by <span className="footer-credits-name">Ritik Saini</span>
            </div>
          </div>
        </div>
    </footer>
  );
};
