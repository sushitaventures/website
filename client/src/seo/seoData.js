/**
 * Single source of truth for SEO / AEO metadata.
 * Used by the React app (useSeo hook, runtime) AND scripts/seo-build.mjs (build time),
 * so plain JS only — no JSX, no browser APIs, no import.meta.
 */
import { SERVICE_DETAILS_MAP } from '../components/services/serviceDetailsData.js';

export const SITE = {
  name: 'Sushita Ventures',
  legalName: 'Sushita Ventures Pvt. Ltd.',
  tagline: 'Where Trust Builds Wealth.',
  defaultUrl: 'https://sushitaventures.com',
  email: 'contact@sushitaventures.com',
  logo: '/images/branding/logo.png',
  ogImage: '/images/home/hero-hotel-resorts.jpg',
  locale: 'en_IN',
  address: {
    streetAddress: '55-56, 3rd Floor, Sushma Infinium',
    addressLocality: 'Zirakpur',
    addressRegion: 'Punjab',
    postalCode: '140603',
    addressCountry: 'IN'
  },
  areaServed: ['Zirakpur', 'Chandigarh', 'Punjab', 'India'],
  founders: ['Sunita Attri', 'Er. Sushil Attri']
};

// Canonical service list (the data map also contains legacy alias keys)
export const SERVICES = [...new Map(Object.values(SERVICE_DETAILS_MAP).map((s) => [s.slug, s])).values()];

export const HOME_FAQS = [
  {
    q: 'What does Sushita Ventures do?',
    a: 'Sushita Ventures is a real estate consultancy that helps clients find, evaluate, lease, buy, sell and exchange property across hospitality, leasing, residential, commercial, industrial and land segments.'
  },
  {
    q: 'Which real estate services does Sushita Ventures offer?',
    a: `Sushita Ventures offers six services: ${SERVICES.map((s) => s.title).join(', ')}.`
  },
  {
    q: 'Where is Sushita Ventures located?',
    a: 'The Sushita Ventures office is at 55-56, 3rd Floor, Sushma Infinium, Zirakpur, Punjab 140603, India.'
  },
  {
    q: 'How do I contact Sushita Ventures about a property requirement?',
    a: 'Submit the enquiry form on the Contact page with your name, phone number, email, city and the type of property you are looking for, or email contact@sushitaventures.com. The team will get back to you shortly.'
  },
  {
    q: 'Who founded Sushita Ventures?',
    a: 'Sushita Ventures Pvt. Ltd. is led by Founder & Managing Director Sunita Attri and Director & Co-Founder Er. Sushil Attri.'
  }
];

/** Question/answer pairs for a service page — derived only from that service's published content. */
export const serviceFaqs = (s) => [
  { q: `What is Sushita Ventures' ${s.title} service?`, a: `${s.tagline} ${s.overview}` },
  { q: `Which property types does the ${s.title} service cover?`, a: `It covers ${s.targetAssets.join(', ')}.` },
  {
    q: `How does the ${s.title} process work?`,
    a: s.advisoryProcess.map((p) => `${p.step}. ${p.title}: ${p.desc}`).join(' ')
  },
  {
    q: `How can I enquire about ${s.title}?`,
    a: `Use the enquiry form on the Sushita Ventures Contact page and choose the property type you are interested in, or email ${SITE.email}.`
  }
];

const abs = (siteUrl, path) => new URL(path, siteUrl).href;

/** Organization / LocalBusiness entity, referenced by every page via @id. */
export const organizationLd = (siteUrl) => ({
  '@type': ['RealEstateAgent', 'Organization'],
  '@id': `${siteUrl}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  slogan: SITE.tagline,
  url: `${siteUrl}/`,
  logo: abs(siteUrl, SITE.logo),
  image: abs(siteUrl, SITE.ogImage),
  email: SITE.email,
  address: { '@type': 'PostalAddress', ...SITE.address },
  areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
  founder: SITE.founders.map((name) => ({ '@type': 'Person', name })),
  knowsAbout: SERVICES.map((s) => s.title),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Real estate services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: abs(siteUrl, `/services/${s.slug}`) }
    }))
  }
});

const faqLd = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
});

const breadcrumbLd = (siteUrl, trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(siteUrl, path) }))
});

/**
 * Metadata for a public route. Returns null for unknown routes.
 * @returns {{path,title,description,image,noindex?,jsonLd:object,faqs?,h1,summary:string[]}|null}
 */
export const getRouteSeo = (path, siteUrl = SITE.defaultUrl) => {
  const org = organizationLd(siteUrl);
  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: SITE.name,
    publisher: { '@id': org['@id'] },
    inLanguage: 'en-IN'
  };
  const page = (extra) => ({
    '@type': 'WebPage',
    '@id': `${abs(siteUrl, path)}#webpage`,
    url: abs(siteUrl, path),
    isPartOf: { '@id': website['@id'] },
    about: { '@id': org['@id'] },
    inLanguage: 'en-IN',
    ...extra
  });
  const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': [org, website, ...nodes] });

  if (path === '/') {
    return {
      path,
      title: 'Sushita Ventures | Real Estate Consultancy in Zirakpur, Punjab',
      description:
        'Sushita Ventures is a real estate consultancy in Zirakpur, Punjab for hotels & resorts, leasing, residential, commercial and industrial property, and land & plot exchange.',
      h1: 'Where Trust Builds Wealth',
      lcpImage: '/images/home/hero-hotel-resorts.webp',
      // must mirror the hero <source srcSet/sizes> so the preload is reused, not doubled
      lcpSrcset: '/images/home/hero-hotel-resorts-640.webp 640w, /images/home/hero-hotel-resorts.webp 1376w',
      summary: [
        'Sushita Ventures is a real estate consultancy that recognises potential, understands aspirations and identifies opportunities that create lasting value.',
        'Across hospitality, leasing, residential, commercial and industrial property, we approach every opportunity with a broader perspective.'
      ],
      faqs: HOME_FAQS,
      jsonLd: graph(page({ name: SITE.name }), faqLd(HOME_FAQS))
    };
  }

  if (path === '/about') {
    return {
      path,
      title: 'About Sushita Ventures | Founders, Vision & Values',
      description:
        'Meet the team behind Sushita Ventures Pvt. Ltd. — founders Sunita Attri and Er. Sushil Attri — and the vision, promise and values guiding our real estate consultancy.',
      h1: 'More Than Property. A Vision Built on Possibility.',
      lcpImage: '/images/about/about-story-hero.jpg',
      summary: [
        'Sushita Ventures was built around the belief that real estate is about more than locations, structures, and transactions.',
        'Led by Founder & Managing Director Sunita Attri and Director & Co-Founder Er. Sushil Attri, the company is building a trusted real estate and multi-service corporate group with a presence across India and international markets.',
        'Our values: Integrity, Relationships, Perspective and Long-Term Value.'
      ],
      jsonLd: graph(
        page({ '@type': 'AboutPage', name: 'About Sushita Ventures' }),
        breadcrumbLd(siteUrl, [['Home', '/'], ['About', '/about']])
      )
    };
  }

  if (path === '/contact') {
    return {
      path,
      title: 'Contact Sushita Ventures | Real Estate Enquiries, Zirakpur',
      description:
        'Contact Sushita Ventures for property enquiries — visit 55-56, 3rd Floor, Sushma Infinium, Zirakpur, Punjab 140603, email contact@sushitaventures.com, or send the enquiry form.',
      h1: "Let's Connect",
      summary: [
        'Every great property decision begins with the right conversation. Tell us what you are looking for and the Sushita Ventures team will connect with you.',
        'Office: 55-56, 3rd Floor, Sushma Infinium, Zirakpur, Punjab 140603, India. Email: contact@sushitaventures.com.'
      ],
      jsonLd: graph(
        page({ '@type': 'ContactPage', name: 'Contact Sushita Ventures' }),
        breadcrumbLd(siteUrl, [['Home', '/'], ['Contact', '/contact']])
      )
    };
  }

  const m = path.match(/^\/services\/([a-z0-9-]+)$/);
  const service = m && SERVICE_DETAILS_MAP[m[1]];
  if (service && service.slug === m[1]) {
    const faqs = serviceFaqs(service);
    return {
      path,
      title: `${service.title} | Sushita Ventures Real Estate`,
      description: service.tagline,
      image: service.heroImage,
      lcpImage: service.heroImage,
      h1: service.title,
      summary: [service.tagline, service.overview],
      faqs,
      service,
      jsonLd: graph(
        page({ name: service.title }),
        {
          '@type': 'Service',
          '@id': `${abs(siteUrl, path)}#service`,
          name: service.title,
          serviceType: service.title,
          description: service.overview,
          provider: { '@id': org['@id'] },
          areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
          image: abs(siteUrl, service.heroImage),
          url: abs(siteUrl, path)
        },
        breadcrumbLd(siteUrl, [['Home', '/'], ['Services', '/#services-section'], [service.title, path]]),
        faqLd(faqs)
      )
    };
  }

  return null;
};

export const PUBLIC_ROUTES = ['/', '/about', '/contact', ...SERVICES.map((s) => `/services/${s.slug}`)];
