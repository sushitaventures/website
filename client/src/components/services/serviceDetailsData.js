/**
 * Definitive Service Categories for Sushita Ventures
 * 1. Hotel & Resorts
 * 2. Leasing
 * 3. Residential Property
 * 4. Commercial Property
 * 5. Industrial Property
 * 6. Exchange Land & Plots (Standalone)
 */

export const SERVICE_DETAILS_MAP = {
  'hotel-resorts': {
    id: '01',
    number: '01 / 06',
    title: 'Hotel & Resorts',
    shortTitle: 'Hotel & Resorts',
    slug: 'hotel-resorts',
    tagline: 'Hospitality properties and resort opportunities shaped around the potential of place, experience and purpose.',
    heroImage: '/images/home/service-hotel-resorts.webp',
    fallbackImage: '/images/services/service-hotels.jpg',
    heroAlt: 'Exceptional contemporary luxury hotel and resort architecture with infinity pool',
    overview: 'Hospitality real estate unites physical asset value with intricate operational performance. We advise hotel owners, institutional funds, and hospitality operators on confidential hotel acquisitions, divestments, management contract tie-ups, and adaptive reuse opportunities across key tourism and commercial hubs.',
    pillars: [
      {
        title: 'Hotel Acquisitions & Divestment',
        desc: 'Discreet mandates for acquiring or divesting operating luxury hotels, boutique resorts, and business city hotels.'
      },
      {
        title: 'Brand & Operator Tie-ups',
        desc: 'Advising owners on securing premier international and national hotel brand management and franchise contracts.'
      },
      {
        title: 'Feasibility & RevPAR Analysis',
        desc: 'Evaluating occupancy trends, operational RevPAR metrics, and capital expenditure ROI for hospitality assets.'
      },
      {
        title: 'Distressed Hospitality Turnaround',
        desc: 'Facilitating recapitalization, operator restructuring, and debt resolution for underperforming hotels.'
      }
    ],
    targetAssets: ['Luxury City Hotels', 'Boutique Leisure Resorts', 'Business Transit Hotels', 'Serviced Hospitality Apartments'],
    advisoryProcess: [
      { step: '01', title: 'Confidential Profiling', desc: 'Safeguarding brand reputation through strictly confidential, discrete engagements.' },
      { step: '02', title: 'Operational Audit', desc: 'Analyzing EBITDA, room inventory, licenses, and physical asset condition.' },
      { step: '03', title: 'Operator Alignment', desc: 'Connecting the property with the right hotel flag, brand, or buyer ecosystem.' },
      { step: '04', title: 'Deal Conclusion', desc: 'Facilitating lease, management agreement, or outright asset sale.' }
    ]
  },

  'leasing': {
    id: '02',
    number: '02 / 06',
    title: 'Leasing',
    shortTitle: 'Leasing',
    slug: 'leasing',
    tagline: 'Property leasing opportunities considered through location, requirements and the needs of businesses.',
    heroImage: '/images/home/service-leasing.webp',
    fallbackImage: '/images/services/service-leasing.jpg',
    heroAlt: 'Premium contemporary commercial leasing property with large glass facades',
    overview: 'A successful lease agreement aligns operational agility with predictable occupancy cost. We represent both enterprise tenants seeking strategic workplace locations and asset owners seeking reliable institutional rent rolls across commercial office spaces, high-street retail, and specialized facilities.',
    pillars: [
      {
        title: 'Tenant Representation',
        desc: 'Guiding corporate occupiers in site selection, lease negotiations, space planning options, and rent benchmarking.'
      },
      {
        title: 'Landlord Representation',
        desc: 'Formulating leasing strategies to attract high-credit corporate tenants and minimize vacancy periods.'
      },
      {
        title: 'Lease Renewal & Restructuring',
        desc: 'Renegotiating existing terms, escalations, lock-ins, and space rights to reflect current economic realities.'
      },
      {
        title: 'Retail Flagship Leasing',
        desc: 'Positioning premier retail spaces on prominent high streets and luxury commercial corridors.'
      }
    ],
    targetAssets: ['Corporate Workplaces', 'High-Street Retail Outlets', 'Showrooms & Flagships', 'Institutional Clinics'],
    advisoryProcess: [
      { step: '01', title: 'Requirement Scope', desc: 'Defining required floor plates, headcount projections, and budget constraints.' },
      { step: '02', title: 'Inventory Shortlisting', desc: 'Curating Grade-A commercial options with verified OC and fire NOCs.' },
      { step: '03', title: 'Commercial Negotiation', desc: 'Structuring favorable rent-free periods, CAM terms, and escalation clauses.' },
      { step: '04', title: 'Agreement Execution', desc: 'Vetting registered lease agreements to ensure sustained legal protection.' }
    ]
  },

  'residential-property': {
    id: '03',
    number: '03 / 06',
    title: 'Residential Property',
    shortTitle: 'Residential Property',
    slug: 'residential-property',
    tagline: 'Residential properties with an emphasis on location, thoughtful spaces and individual requirements.',
    heroImage: '/images/home/service-residential.webp',
    fallbackImage: '/images/services/service-residential.jpg',
    heroAlt: 'Ultra-premium contemporary residential architecture with floor-to-ceiling glass',
    overview: 'Acquiring or divesting prime residential property is both a deeply personal pursuit and a significant capital decision. We advise private individuals, families, and high-net-worth investors on premium residential assets — spanning luxury penthouses, bespoke villas, gated estate developments, and high-yield residential investment portfolios.',
    pillars: [
      {
        title: 'Luxury Estates & Villas',
        desc: 'Curated access to prime private villas, bespoke bungalows, and expansive architectural estates in premier micro-markets.'
      },
      {
        title: 'Penthouses & High-End Apartments',
        desc: 'Identifying exceptional high-floor residences with panoramic views, private amenities, and institutional developer credentials.'
      },
      {
        title: 'Title Diligence & Clear Legal Ownership',
        desc: 'Comprehensive multi-tier legal audit, municipal approval verification, and chain-of-title scrutiny for absolute peace of mind.'
      },
      {
        title: 'Private Portfolio Advisory',
        desc: 'Advising family offices and individual investors on residential acquisitions with strong rental yields and long-term capital appreciation.'
      }
    ],
    targetAssets: ['Bespoke Luxury Villas', 'Ultra-Luxury Penthouses', 'Gated Community Residences', 'Prime Residential Plots'],
    advisoryProcess: [
      { step: '01', title: 'Lifestyle & Capital Brief', desc: 'Understanding your family preferences, lifestyle expectations, spatial needs, and investment goals.' },
      { step: '02', title: 'Curated Asset Shortlisting', desc: 'Presenting exclusively verified residential properties with transparent pricing and clean documentation.' },
      { step: '03', title: 'Private Viewings & Valuation', desc: 'Arranging discreet walkthroughs and providing rigorous comparative market valuations.' },
      { step: '04', title: 'Seamless Acquisition', desc: 'Structuring sale agreements, registry compliance, and possession transfer with fiduciary precision.' }
    ]
  },

  'commercial-property': {
    id: '04',
    number: '04 / 06',
    title: 'Commercial Property',
    shortTitle: 'Commercial Property',
    slug: 'commercial-property',
    tagline: 'Commercial property opportunities shaped around business requirements, location potential and long-term possibilities.',
    heroImage: '/images/home/service-commercial.webp',
    fallbackImage: '/images/services/service-commercial.jpg',
    heroAlt: 'High-end commercial real estate architecture with contemporary glass office towers',
    overview: 'Commercial real estate demands more than square footage calculations — it requires understanding operational workflows, locational economics, and long-term capital appreciation. We explore strategic commercial opportunities across corporate headquarters, IT business parks, Grade-A retail destinations, and institutional asset portfolios.',
    pillars: [
      {
        title: 'Corporate Office Spaces',
        desc: 'Sourcing and structuring prime corporate office holdings, campus developments, and flexible enterprise spaces aligned with organizational growth.'
      },
      {
        title: 'Retail & Mixed-Use',
        desc: 'Identifying high-footfall commercial destinations, flagship retail spaces, and integrated mixed-use environments.'
      },
      {
        title: 'Asset Acquisition & Underwriting',
        desc: 'Rigorous valuation, rent roll sustainability analysis, clear-title verification, and investment underwriting for acquisitions.'
      },
      {
        title: 'Transaction Structuring',
        desc: 'Customized advisory across institutional sale-and-leaseback, joint developments, and structured outright acquisitions.'
      }
    ],
    targetAssets: ['Grade-A Office Towers', 'Commercial Business Parks', 'High-Street Retail Flags', 'Institutional Co-Working Hubs'],
    advisoryProcess: [
      { step: '01', title: 'Mandate Discovery', desc: 'Understanding your business profile, capital criteria, and operational spatial requirements.' },
      { step: '02', title: 'Market Diligence', desc: 'Screening verified clear-title commercial assets across priority micro-markets.' },
      { step: '03', title: 'Deal Structuring', desc: 'Advising on financial modeling, lease terms, and legal diligence.' },
      { step: '04', title: 'Closing Execution', desc: 'Guiding transaction documentation to conclusion with absolute fiduciary transparency.' }
    ]
  },

  'industrial-property': {
    id: '05',
    number: '05 / 06',
    title: 'Industrial Property',
    shortTitle: 'Industrial Property',
    slug: 'industrial-property',
    tagline: 'Industrial spaces and property opportunities considered through operational requirements, infrastructure and location.',
    heroImage: '/images/home/service-industrial.webp',
    fallbackImage: '/images/services/service-industrial.jpg',
    heroAlt: 'Premium modern industrial real estate development and logistics campus',
    overview: 'Modern industrial operations require strategic freight positioning, seamless multimodal connectivity, and scalable floor specifications. Our industrial advisory team assists manufacturing enterprises, 3PL providers, and institutional investors in securing Grade-A warehousing, logistics parks, and industrial corridors.',
    pillars: [
      {
        title: 'Warehousing & Logistics Parks',
        desc: 'Procuring large-format distribution centers, high-bay warehouses, and temperature-controlled cold chain logistics spaces.'
      },
      {
        title: 'Manufacturing Facilities',
        desc: 'Advisory on compliant manufacturing assets, heavy fabrication facilities, and strategic greenfield industrial parks.'
      },
      {
        title: 'Industrial Land Sourcing',
        desc: 'Procuring industrial-zoned clear-title land parcels adjacent to national highways and freight corridors.'
      },
      {
        title: 'Build-to-Suit (BTS) Mandates',
        desc: 'Structuring tailored build-to-suit agreements with developers to match specific operational engineering requirements.'
      }
    ],
    targetAssets: ['Grade-A Logistics Parks', 'Cold-Storage Hubs', 'Manufacturing Plants', 'Industrial Corridors'],
    advisoryProcess: [
      { step: '01', title: 'Operational Brief', desc: 'Analyzing floor-load capacity, ceiling clearances, power load, and logistical routes.' },
      { step: '02', title: 'Corridor Screening', desc: 'Identifying compliant industrial zones with optimal arterial connectivity.' },
      { step: '03', title: 'Compliance & Diligence', desc: 'Verifying industrial clearances, pollution control approvals, and clear titles.' },
      { step: '04', title: 'Execution & Handover', desc: 'Structuring commercial terms, lease mechanics, or acquisition closure.' }
    ]
  },

  'exchange-land-plots': {
    id: '06',
    number: '06 / 06',
    title: 'Exchange Land & Plots',
    shortTitle: 'Exchange Land & Plots',
    slug: 'exchange-land-plots',
    tagline: 'Explore land and plot exchange opportunities through a more considered perspective on property and potential.',
    heroImage: '/images/services/service-land.jpg',
    fallbackImage: '/images/services/service-exchange.jpg',
    heroAlt: 'Expansive strategic development land parcel and commercial property plots',
    overview: 'Land and plots represent the ultimate bedrock of tangible wealth. Through structured exchange and acquisition advisory, we assist investors, corporate occupiers, and landowners in unlocking trapped liquidity, swapping into higher-growth corridors, and executing clear-title land transactions with fiduciary discipline.',
    pillars: [
      {
        title: 'Strategic Land Aggregation',
        desc: 'Advisory on procuring contiguous land parcels, zoning clearances, and conversion feasibility.'
      },
      {
        title: 'Plot & Asset Exchange',
        desc: 'Facilitating structured cross-category swaps between plotted land banks, commercial units, and income-generating assets.'
      },
      {
        title: 'Joint Development Structuring (JDA)',
        desc: 'Aligning landowners and tier-one developers through equitable joint ventures and revenue-sharing frameworks.'
      },
      {
        title: 'Due Diligence & Title Clearance',
        desc: 'Forensic title chain validation, encumbrance verification, and municipal master plan compliance.'
      }
    ],
    targetAssets: ['Highway Corridor Plots', 'Commercial Land Banks', 'Industrial Development Parcels', 'Residential Plotted Communities'],
    advisoryProcess: [
      { step: '01', title: 'Asset & Zoning Analysis', desc: 'Verifying FSI limits, land classification, arterial access, and clear ownership records.' },
      { step: '02', title: 'Exchange Strategy', desc: 'Identifying matching institutional buyers or exchange counterparties.' },
      { step: '03', title: 'Valuation Consensus', desc: 'Harmonizing independent market valuations and differential capital balances.' },
      { step: '04', title: 'Conveyance & Registry', desc: 'Supervising transparent bilateral documentation and formal conveyance deeds.' }
    ]
  }
};

// Aliases for legacy routes to ensure zero broken links
SERVICE_DETAILS_MAP['hotels'] = SERVICE_DETAILS_MAP['hotel-resorts'];
SERVICE_DETAILS_MAP['residential'] = SERVICE_DETAILS_MAP['residential-property'];
SERVICE_DETAILS_MAP['residentials'] = SERVICE_DETAILS_MAP['residential-property'];
SERVICE_DETAILS_MAP['commercial'] = SERVICE_DETAILS_MAP['commercial-property'];
SERVICE_DETAILS_MAP['industrial'] = SERVICE_DETAILS_MAP['industrial-property'];
SERVICE_DETAILS_MAP['land-plots'] = SERVICE_DETAILS_MAP['exchange-land-plots'];
SERVICE_DETAILS_MAP['exchange-property'] = SERVICE_DETAILS_MAP['exchange-land-plots'];
SERVICE_DETAILS_MAP['sick-property'] = SERVICE_DETAILS_MAP['commercial-property'];
