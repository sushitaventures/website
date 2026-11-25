import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PremiumFooter.css";

gsap.registerPlugin(ScrollTrigger);

const WORDMARK = "SUSHITA VENTURES";

const FOOTER_EXPERTISE_LINKS = [
  { title: "Hotel & Resorts", slug: "hotel-resorts" },
  { title: "Leasing", slug: "leasing" },
  { title: "Residential Property", slug: "residential-property" },
  { title: "Commercial Property", slug: "commercial-property" },
  { title: "Industrial Property", slug: "industrial-property" },
  { title: "Exchange Land & Plots", slug: "exchange-land-plots" },
];

export const PremiumFooter = () => {
  const footerRef = useRef(null);
  const containerRef = useRef(null);

  // GSAP Rising-Card Parallax Reveal
  useGSAP(
    () => {
      if (!footerRef.current || !containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        { yPercent: -15, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      // Signature wordmark: letters rise in, then a gold fill sweeps through them.
      // Scrubbed against the same footer reveal, so it plays forward/back with scroll.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const footer = footerRef.current;
        const wordmark = footer.querySelector(".ft-wordmark");
        // Distance from the wordmark down to the footer's bottom edge. The footer is
        // sticky at bottom: 0 with overflow hidden, so that edge is the screen's bottom line.
        // (offsetTop is relative to the transformed inner container, so add its own offset)
        const toScreenBottom = () =>
          footer.clientHeight -
          (containerRef.current.offsetTop + wordmark.offsetTop);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .from(
            ".ft-char",
            {
              y: toScreenBottom,
              stagger: 0.06,
              duration: 0.6,
              ease: "power3.out",
            },
            0.1,
          )
          .to(
            ".ft-char",
            { color: "#A68C65", stagger: 0.04, duration: 0.35, ease: "none" },
            ">-0.3",
          );
      });
      return () => mm.revert();
    },
    { scope: footerRef },
  );

  const handleBackToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="ft" aria-label="Sushita Ventures Footer">
      <div ref={containerRef} className="ft-inner">
        <div className="ft-top">
          {/* Brand */}
          <div className="ft-brand">
            <Link
              to="/"
              className="ft-lockup"
              aria-label="Sushita Ventures home"
            >
              <img
                src="/images/branding/logo.png"
                alt="Sushita Ventures"
                className="ft-logo"
              />
            </Link>
            <p className="ft-motto">Where Trust Builds Wealth.</p>
            <div className="ft-social" aria-label="Social Media">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-btn"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-btn"
                aria-label="Facebook"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.7 20.7 0 0 0 14.3 4.3c-2.24 0-3.8 1.37-3.8 3.9v2.3H8v3h2.5V21z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-btn"
                aria-label="LinkedIn"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-btn"
                aria-label="X (Twitter)"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav className="ft-col" aria-label="Explore">
            <h3 className="ft-title">Explore</h3>
            <ul className="ft-list">
              <li>
                <Link to="/" className="ft-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="ft-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/#services-section" className="ft-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="ft-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Expertise */}
          <nav className="ft-col" aria-label="Our Expertise">
            <h3 className="ft-title">Our Expertise</h3>
            <ul className="ft-list">
              {FOOTER_EXPERTISE_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`} className="ft-link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="ft-col">
            <h3 className="ft-title">Get in Touch</h3>
            <ul className="ft-list ft-contact">
              <li>
                <span className="ft-label">Call now</span>
                <span>+91 [Configured by Admin]</span>
              </li>
              <li>
                <span className="ft-label">Email</span>
                <a
                  href="mailto:contact@sushitaventures.com"
                  className="ft-link"
                >
                  contact@sushitaventures.com
                </a>
              </li>
              <li>
                <span className="ft-label">Headquarters</span>
                <span>55-56, 3rd Floor, Sushma Infinium, Zirakpur, Punjab 140603</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Signature wordmark */}
        <div className="ft-wordmark" aria-hidden="true">
          {[...WORDMARK].map((c, i) => (
            <span key={i} className="ft-char">
              {c}
            </span>
          ))}
        </div>

        <div className="ft-bottom">
          <p className="ft-copy">
            &copy; {new Date().getFullYear()} Sushita Ventures. All rights
            reserved.
          </p>
          <p className="ft-legal">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms &amp; Conditions</span>
          </p>
          <p className="ft-credit">
            Designed &amp; maintained by{' '}
            <a href="https://www.linkedin.com/in/dev-ritik-saini/" target="_blank" rel="noopener noreferrer">
              Ritik Saini
            </a>
          </p>
          <button
            type="button"
            className="ft-top-btn"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            Back to Top
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
