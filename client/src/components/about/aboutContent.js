/**
 * Content Structure for Sushita Ventures About Us Page
 * Centralized, maintainable structure for founders, vision, mission, promise, values, and approach
 */

export const FOUNDERS_DATA = [
  {
    id: '01',
    number: 'FOUNDER & MANAGING DIRECTOR',
    name: 'Sunita Attri',
    designation: 'Founder & Managing Director',
    roles: ['Entrepreneur', 'Motivational Speaker', 'Trainer', 'Career Counsellor'],
    rolesString: 'Entrepreneur | Motivational Speaker | Trainer | Career Counsellor',
    bioParagraphs: [
      'Sunita Attri is a visionary entrepreneur, business leader and the Managing Director of Sushita Ventures Pvt. Ltd., originally belonging to Gurdaspur, Punjab. Her professional journey reflects courage, determination and an unwavering commitment to growth and excellence.',
      'She began her career in the private sector and subsequently served as a Government Lecturer. Alongside her professional responsibilities, she developed her entrepreneurial vision and started her own consultancy business. In 2010, she made the bold decision to leave her government position and dedicate herself completely to entrepreneurship.',
      'Her initial journey focused on consultancy, motivational speaking, professional training and financial counselling, helping individuals understand financial opportunities and make informed decisions for a stronger future.',
      'Her entrepreneurial journey later expanded into real estate, beginning with freelance consultancy and progressing to establishing SS Landcraft. With a larger vision, she subsequently founded Sushita Ventures Pvt. Ltd.',
      'Today, she is leading the company towards becoming a globally recognised multi-service corporate group with business verticals in real estate consultancy, investment solutions, construction and comprehensive professional services.',
      'Her ambition is to create a strong franchise network, expand internationally and build a legacy of trust, opportunities and sustainable business growth.'
    ],
    bio1: 'Sunita Attri is a visionary entrepreneur, business leader and the Managing Director of Sushita Ventures Pvt. Ltd., originally belonging to Gurdaspur, Punjab. Her professional journey reflects courage, determination and an unwavering commitment to growth and excellence.',
    bio2: 'Today, she is leading the company towards becoming a globally recognised multi-service corporate group with business verticals in real estate consultancy, investment solutions, construction and comprehensive professional services.',
    image: '/images/founders/sunita-attri.jpg',
    imageAlt: 'Sunita Attri - Founder & Managing Director, Sushita Ventures'
  },
  {
    id: '02',
    number: 'DIRECTOR & CO-FOUNDER',
    name: 'Er. Sushil Attri',
    designation: 'Director & Co-Founder',
    roles: ['Engineer', 'Entrepreneur', 'Motivational Speaker', 'Business Strategist'],
    rolesString: 'Engineer | Entrepreneur | Motivational Speaker | Business Strategist',
    bioParagraphs: [
      'Er. Sushil Attri is a Director of Sushita Ventures Pvt. Ltd., contributing to the company’s leadership and its long-term vision of building a strong, professionally managed and globally recognised corporate organisation.',
      'As part of the leadership team, he shares the ambition of developing Sushita Ventures into a diversified multi-service corporate group with a strong presence across the real estate, investment, construction and professional services sectors.',
      'The company’s vision is to create meaningful opportunities for investors, property owners, business associates and customers by providing professional guidance, reliable consultancy and comprehensive property-related solutions.',
      'With an emphasis on strategic growth, organisational development and long-term business expansion, he is associated with the company’s ambition to establish a strong franchise-based business model and expand its presence across India and international markets.',
      'Sushita Ventures aims to develop its own construction and infrastructure projects, establish a wide network of offices and build a corporate ecosystem that brings multiple services under one trusted brand.',
      'Together with the leadership team, he shares a commitment to building an organisation founded on trust, professionalism, transparency and long-term value creation.',
      'His association with Sushita Ventures reflects a shared vision of creating a lasting corporate legacy and establishing a brand that stands for excellence, credibility and growth.'
    ],
    bio1: 'Er. Sushil Attri is a Director of Sushita Ventures Pvt. Ltd., contributing to the company’s leadership and its long-term vision of building a strong, professionally managed and globally recognised corporate organisation.',
    bio2: 'His association with Sushita Ventures reflects a shared vision of creating a lasting corporate legacy and establishing a brand that stands for excellence, credibility and growth.',

    image: '/images/founders/sushil-attri.jpg',
    imageAlt: 'Er. Sushil Attri - Director & Co-Founder, Sushita Ventures'
  }
];

export const VISION_DATA = {
  eyebrow: 'OUR VISION',
  title: 'Building a Global Real Estate & Multi-Service Corporate Group.',
  description1: 'Our long-term vision is to establish Sushita Ventures as a trusted brand with a strong presence across India and international markets, supported by a growing network of offices, franchise partners and professional teams.',
  description2: 'We aim to create an ecosystem where clients, investors, channel partners and professionals grow together.',
  highlight: 'Ecosystem for Mutual Growth · India & Global Presence'
};

export const PROMISE_DATA = {
  eyebrow: 'OUR PROMISE',
  title1: "We don't just connect people with properties.",
  title2: 'We connect people with opportunities.',
  company: 'Sushita Ventures Pvt. Ltd.',
  motto: 'Where Trust Builds Wealth.',
  description: 'At Sushita Ventures, every partnership and property mandate is built on fiduciary trust, strategic foresight, and sustainable value creation.'
};

export const CORE_VALUES = [
  {
    id: '01',
    number: 'Value 01',
    title: 'Integrity',
    description: 'We believe trust is built through honesty, transparency, and consistency in every interaction.'
  },
  {
    id: '02',
    number: 'Value 02',
    title: 'Relationships',
    description: 'Strong relationships are the foundation of meaningful business. We value understanding people before pursuing opportunities.'
  },
  {
    id: '03',
    number: 'Value 03',
    title: 'Perspective',
    description: 'Every property has a story and potential. We look beyond its immediate appearance to understand the possibilities ahead.'
  },
  {
    id: '04',
    number: 'Value 04',
    title: 'Long-Term Value',
    description: 'We focus on decisions and relationships that create lasting value rather than short-term outcomes.'
  }
];

export const APPROACH_STEPS = [
  {
    step: '01',
    title: 'Understand',
    description: 'We begin by listening, understanding requirements, and identifying what truly matters to the client.'
  },
  {
    step: '02',
    title: 'Explore',
    description: 'We evaluate relevant property opportunities across our areas of expertise and consider their potential.'
  },
  {
    step: '03',
    title: 'Connect',
    description: 'We bring the right people and opportunities together, focusing on clear communication and meaningful business relationships.'
  }
];

export const EXPERTISE_TILES = [
  { title: 'Residential Properties', slug: 'residential' },
  { title: 'Commercial Properties', slug: 'commercial' },
  { title: 'Industrial Properties', slug: 'industrial' },
  { title: 'Land / Plots', slug: 'land-plots' },
  { title: 'Hotels & Hospitality', slug: 'hotels' },
  { title: 'Corporate Leasing', slug: 'leasing' },
  { title: 'Property Exchange', slug: 'exchange-property' },
  { title: 'Sick & Turnaround Assets', slug: 'sick-property' }
];
