import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesShowcase.css';

const SERVICES_DATA = [
  {
    id: '01',
    title: 'Residentials',
    slug: 'residential',
    copy: 'Discreet advisory for prime residences, luxury estates, and bespoke living spaces.',
    image: '/images/services/service-residential.jpg',
    layoutClass: 'card-featured'
  },
  {
    id: '02',
    title: 'Commercial',
    slug: 'commercial',
    copy: 'Considered spaces for evolving business requirements.',
    image: '/images/services/service-commercial.jpg',
    layoutClass: 'card-secondary'
  },
  {
    id: '03',
    title: 'Industrial',
    slug: 'industrial',
    copy: 'Industrial property opportunities for operations and future growth.',
    image: '/images/services/service-industrial.jpg',
    layoutClass: 'card-tertiary'
  },
  {
    id: '04',
    title: 'Land / Plots',
    slug: 'land-plots',
    copy: 'Explore land and plot opportunities with clarity and purpose.',
    image: '/images/services/service-land.jpg',
    layoutClass: 'card-tertiary'
  },
  {
    id: '05',
    title: 'Hotels',
    slug: 'hotels',
    copy: 'Explore hotel and hospitality property opportunities.',
    image: '/images/services/service-hotels.jpg',
    layoutClass: 'card-tertiary'
  },
  {
    id: '06',
    title: 'Leasing',
    slug: 'leasing',
    copy: 'Property leasing opportunities for a range of business requirements.',
    image: '/images/services/service-leasing.jpg',
    layoutClass: 'card-tertiary'
  },
  {
    id: '07',
    title: 'Exchange Property',
    slug: 'exchange-property',
    copy: 'Explore property exchange enquiries and possibilities.',
    image: '/images/services/service-exchange.jpg',
    layoutClass: 'card-tertiary'
  },
  {
    id: '08',
    title: 'Sick Property',
    slug: 'sick-property',
    copy: 'Strategic property advisory and revitalisation for distressed or underperforming assets.',
    image: '/images/services/service-sick-property.jpg',
    layoutClass: 'card-tertiary'
  }
];

export const ServicesShowcase = () => {
  return (
    <section 
      id="services-section" 
      className="services-showcase-root" 
      aria-label="Specialist Services Showcase"
    >
      <div className="services-showcase-container">
        <header className="services-header">
          <span className="services-eyebrow">OUR AREAS OF EXPERTISE</span>
          <h2 className="services-heading">Real Estate, Across Possibilities.</h2>
          <p className="services-description">
            Explore a range of property interests and opportunities through our specialist service categories. We take a considered approach to understanding requirements and structuring the right real-estate solutions.
          </p>
        </header>

        <div className="services-editorial-grid">
          {SERVICES_DATA.map((service) => (
            <Link 
              key={service.id} 
              to={`/services/${service.slug}`}
              className={`service-card ${service.layoutClass}`}
              aria-label={`Explore ${service.title} advisory`}
            >
              <div className="service-card-media">
                <img 
                  src={service.image} 
                  alt={`${service.title} architectural showcase`} 
                  className="service-card-image"
                  loading="lazy"
                />
              </div>

              <div className="service-card-scrim" />

              <div className="service-card-content">
                <span className="service-card-number">{service.id}</span>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-copy">{service.copy}</p>
                <div className="service-card-cta">
                  <span>View Details</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
