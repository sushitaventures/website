import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Navbar } from '../../components/navigation/Navbar.jsx';
import { PremiumFooter } from '../../components/footer/PremiumFooter.jsx';
import { SERVICE_DETAILS_MAP } from '../../components/services/serviceDetailsData.js';
import '../../components/services/ServiceDetail.css';

const ALL_SERVICES = [
  { slug: 'residential', title: 'Residentials' },
  { slug: 'commercial', title: 'Commercial' },
  { slug: 'industrial', title: 'Industrial' },
  { slug: 'land-plots', title: 'Land / Plots' },
  { slug: 'hotels', title: 'Hotels' },
  { slug: 'leasing', title: 'Leasing' },
  { slug: 'exchange-property', title: 'Exchange Property' },
  { slug: 'sick-property', title: 'Sick Property' }
];

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = SERVICE_DETAILS_MAP[slug];

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Sushita Ventures Real Estate Advisory`;
    }
    window.scrollTo(0, 0);
  }, [slug, service]);

  if (!service) {
    return <Navigate to="/#services-section" replace />;
  }

  return (
    <div className="service-detail-root">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      <main id="main-content" className="service-detail-wrapper">
        {/* 2. Hero Section */}
        <section className="service-hero-section" aria-label={service.title}>
          <img
            src={service.heroImage}
            alt={service.heroAlt}
            className="service-hero-bg"
            loading="eager"
          />
          <div className="service-hero-scrim" />

          <div className="service-detail-container">
            <div className="service-hero-content">
              <div className="service-hero-eyebrow-row">
                <span className="service-hero-badge">{service.number}</span>
              </div>
              <h1 className="service-hero-title">{service.title}</h1>
              <p className="service-hero-tagline">{service.tagline}</p>
            </div>
          </div>
        </section>

        {/* 3. Overview & Target Assets Grid */}
        <section className="service-overview-section" aria-label="Advisory Scope">
          <div className="service-detail-container">
            <div className="service-overview-grid">
              
              <div className="service-overview-main">
                <span className="service-section-eyebrow">ADVISORY PERSPECTIVE</span>
                <h2 className="service-overview-heading">Considered Strategy for Lasting Value.</h2>
                <p className="service-overview-text">{service.overview}</p>
              </div>

              <div className="service-target-card">
                <h3 className="service-target-title">Target Asset Classes</h3>
                <ul className="service-target-list">
                  {service.targetAssets.map((asset, idx) => (
                    <li key={idx} className="service-target-item">
                      <span className="service-target-bullet" aria-hidden="true">■</span>
                      <span>{asset}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Core Pillars Grid */}
        <section className="service-pillars-section" aria-label="Key Capabilities">
          <div className="service-detail-container">
            <header className="service-pillars-header">
              <span className="service-section-eyebrow">SPECIALIST CAPABILITIES</span>
              <h2 className="service-pillars-heading">How We Support Your Requirements.</h2>
            </header>

            <div className="service-pillars-grid">
              {service.pillars.map((pillar, idx) => (
                <div key={idx} className="service-pillar-card">
                  <span className="service-pillar-num">0{idx + 1}</span>
                  <h3 className="service-pillar-title">{pillar.title}</h3>
                  <p className="service-pillar-desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 4-Step Advisory Process */}
        <section className="service-process-section" aria-label="Advisory Methodology">
          <div className="service-detail-container">
            <header className="service-process-header">
              <span className="service-section-eyebrow">OUR METHODOLOGY</span>
              <h2 className="service-pillars-heading">A Disciplined Fiduciary Approach.</h2>
            </header>

            <div className="service-process-grid">
              {service.advisoryProcess.map((proc, idx) => (
                <div key={idx} className="service-process-card">
                  <div className="service-process-num">{proc.step}</div>
                  <h3 className="service-process-title">{proc.title}</h3>
                  <p className="service-process-desc">{proc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Direct Mandate CTA Strip */}
        <section className="service-cta-strip" aria-label="Connect With Advisory">
          <div className="service-detail-container">
            <div className="service-cta-content">
              <span className="service-section-eyebrow">ENGAGE OUR TEAM</span>
              <h2 className="service-cta-title">Discuss Your Property Mandate.</h2>
              <p className="service-cta-desc">
                Whether assessing acquisition viability, seeking commercial spaces, or evaluating a strategic portfolio move, connect with Sushita Ventures for confidential, senior-level advisory.
              </p>
              <Link to="/contact" className="service-cta-btn">
                <span>CONNECT WITH AN ADVISOR</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Other Services Navigation Bar */}
        <nav className="service-nav-bar" aria-label="Other Specialist Services">
          <div className="service-detail-container">
            <div className="service-nav-title">EXPLORE OTHER SPECIALIST AREAS</div>
            <div className="service-nav-pills">
              {ALL_SERVICES.map((item) => (
                <Link
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  className={`service-nav-pill-link ${item.slug === slug ? 'active' : ''}`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </main>

      {/* 8. Global Premium Footer with Conversation Drawer */}
      <PremiumFooter />
    </div>
  );
};
