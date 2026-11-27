/**
 * Definitive Service Categories for Sushita Ventures
 * 1. Hotel & Resorts
 * 2. Leasing
 * 3. Residential Property
 * 4. Commercial Property
 * 5. Industrial Property
 * 6. Exchange Property
 * 7. Land & Plots
 * 8. Sick Property
 */

export const SERVICE_DETAILS_MAP = {
  'hotel-resorts': {
    id: '01',
    number: '01 / 08',
    title: 'Hotel & Resorts',
    shortTitle: 'Hotel & Resorts',
    slug: 'hotel-resorts',
    tagline: 'Hospitality properties and resort opportunities shaped around the potential of place, experience and purpose.',
    heroImage: '/images/services/hotel-resorts/hero.webp',
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
      },
      {
        title: 'Leasing & Management Contracts',
        desc: 'Structuring hotel leases and management contracts that balance owner returns with operator control, with clear terms on rent, revenue share, fees and performance.'
      }
    ],
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Luxury Premium Hotels', img: '/images/services/hotel-resorts/assets/luxury-premium-hotels.webp' },
      { name: 'Wellness Resorts', img: '/images/services/hotel-resorts/assets/wellness-resorts.webp' },
      { name: 'Business Transit Hotels', img: '/images/services/hotel-resorts/assets/business-transit-hotels.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Confidential Profiling', desc: 'Safeguarding brand reputation through strictly confidential, discrete engagements.' },
      { step: '02', title: 'Operational Audit', desc: 'Analyzing EBITDA, room inventory, licenses, and physical asset condition.' },
      { step: '03', title: 'Operator Alignment', desc: 'Connecting the property with the right hotel flag, brand, or buyer ecosystem.' },
      { step: '04', title: 'Deal Conclusion', desc: 'Facilitating lease, management agreement, or outright asset sale.' }
    ]
  },

  'leasing': {
    id: '02',
    number: '02 / 08',
    title: 'Leasing',
    shortTitle: 'Leasing',
    slug: 'leasing',
    tagline: 'Leasing for hotels, resorts, offices, retail and healthcare spaces, shaped around location, business needs and lasting partnerships.',
    heroImage: '/images/services/leasing/hero.webp',
    heroAlt: 'Premium contemporary commercial leasing property with large glass facades',
    overview: 'A good lease works for both sides: the occupier gets the right space on workable terms, and the owner gets a dependable tenant and steady income. We represent property owners, hoteliers, businesses and operators across hospitality, commercial, retail and healthcare leasing, from finding the right match to negotiating terms and registering the agreement.',
    pillars: [
      {
        title: 'Hospitality Leasing',
        desc: 'Leasing hotels, resorts, banquet properties and serviced apartments to established operators, on fixed rent, revenue share or hybrid terms that protect the asset.'
      },
      {
        title: 'Tenant Representation',
        desc: 'Helping businesses find the right office, showroom or clinic, with site selection, rent benchmarking and negotiation handled for them.'
      },
      {
        title: 'Landlord Representation',
        desc: 'Marketing properties to credible, well-matched tenants and operators to reduce vacancy and secure reliable long-term income.'
      },
      {
        title: 'Retail & Showroom Leasing',
        desc: 'Placing brands in high-footfall high streets, malls and commercial corridors where visibility drives business.'
      },
      {
        title: 'Lease Renewal & Restructuring',
        desc: 'Renegotiating rent, escalations, lock-in periods and exit terms so existing leases keep pace with the market.'
      }
    ],
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Hotels & Resorts', img: '/images/services/leasing/assets/hotels-and-resorts.webp' },
      { name: 'Corporate Offices', img: '/images/services/leasing/assets/corporate-offices.webp' },
      { name: 'High-Street Retail & Showrooms', img: '/images/services/leasing/assets/high-street-retail-and-showrooms.webp' },
      { name: 'Banquet & Event Venues', img: '/images/services/leasing/assets/banquet-and-event-venues.webp' },
      { name: 'Healthcare Institutions', img: '/images/services/leasing/assets/healthcare-institutions.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Requirement Brief', desc: 'Understanding the space, location, budget and lease structure you need, as owner or occupier.' },
      { step: '02', title: 'Matching & Shortlisting', desc: 'Shortlisting verified properties, tenants or hotel operators with the right approvals and track record.' },
      { step: '03', title: 'Terms Negotiation', desc: 'Agreeing rent or revenue share, deposits, escalations, lock-in, fit-out periods and maintenance terms.' },
      { step: '04', title: 'Agreement & Handover', desc: 'Drafting and registering the lease, then coordinating a smooth handover of the property.' }
    ]
  },

  'residential-property': {
    id: '03',
    number: '03 / 08',
    title: 'Residential Property',
    shortTitle: 'Residential Property',
    slug: 'residential-property',
    tagline: 'Residential properties with an emphasis on location, thoughtful spaces and individual requirements.',
    heroImage: '/images/services/residential-property/hero.webp',
    heroAlt: 'Ultra-premium contemporary residential architecture with floor-to-ceiling glass',
    overview: 'Acquiring or divesting prime residential property is both a deeply personal pursuit and a significant capital decision. We advise private individuals, families, and high-net-worth investors on premium residential assets — spanning luxury penthouses, bespoke villas, gated estate developments, and high-yield residential investment portfolios.',
    pillars: [
      {
        title: 'Homes Matched to Your Needs',
        desc: 'Villas, apartments, independent floors and residential plots shortlisted around your preferred location, budget and family requirements.'
      },
      {
        title: 'Verified Titles & Approvals',
        desc: 'Every property is checked for clear ownership, RERA registration, building approvals and pending dues before you commit.'
      },
      {
        title: 'Integrity in Every Deal',
        desc: 'Clear terms in writing, regular updates at every stage and full disclosure of any issue we find, so you always know exactly where your purchase stands.'
      },
      {
        title: 'Ethical Business',
        desc: 'Transparent pricing with no hidden charges, and honest advice that puts your interest first, even when that means recommending you wait or walk away.'
      },
      {
        title: 'Long-Term Value',
        desc: 'We look beyond today’s price at location growth, connectivity, construction quality and resale or rental potential, so your home keeps its worth.'
      }
    ],
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Bespoke Luxury Villas', img: '/images/services/residential-property/assets/bespoke-luxury-villas.webp' },
      { name: 'Ultra-Luxury Flats & Penthouses', img: '/images/services/residential-property/assets/ultra-luxury-flats-and-penthouses.webp' },
      { name: 'Luxury Independent Houses', img: '/images/services/residential-property/assets/luxury-independent-houses.webp' },
      { name: 'Gated Community Residences', img: '/images/services/residential-property/assets/gated-community-residences.webp' },
      { name: 'Land Parcels', img: '/images/services/residential-property/assets/land-parcels.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Lifestyle & Capital Brief', desc: 'Understanding your family preferences, lifestyle expectations, spatial needs, and investment goals.' },
      { step: '02', title: 'Curated Asset Shortlisting', desc: 'Presenting exclusively verified residential properties with transparent pricing and clean documentation.' },
      { step: '03', title: 'Private Viewings & Valuation', desc: 'Arranging discreet walkthroughs and providing rigorous comparative market valuations.' },
      { step: '04', title: 'Seamless Acquisition', desc: 'Structuring sale agreements, registry compliance, and possession transfer with fiduciary precision.' }
    ]
  },

  'commercial-property': {
    id: '04',
    number: '04 / 08',
    title: 'Commercial Property',
    shortTitle: 'Commercial Property',
    slug: 'commercial-property',
    tagline: 'Commercial property opportunities shaped around business requirements, location potential and long-term possibilities.',
    heroImage: '/images/services/commercial-property/hero.webp',
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
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Grade-A Office Towers', img: '/images/services/commercial-property/assets/grade-a-office-towers.webp' },
      { name: 'Commercial Business Parks', img: '/images/services/commercial-property/assets/commercial-business-parks.webp' },
      { name: 'Shopping Malls & Retail Centres', img: '/images/services/commercial-property/assets/shopping-malls-and-retail-centres.webp' },
      { name: 'High-Street Retail Flags', img: '/images/services/commercial-property/assets/high-street-retail-flags.webp' },
      { name: 'Hospitals ', img: '/images/services/commercial-property/assets/hospitals.webp' },
      { name: 'Institutional Co-Working Hubs', img: '/images/services/commercial-property/assets/institutional-co-working-hubs.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Mandate Discovery', desc: 'Understanding your business profile, capital criteria, and operational spatial requirements.' },
      { step: '02', title: 'Market Diligence', desc: 'Screening verified clear-title commercial assets across priority micro-markets.' },
      { step: '03', title: 'Deal Structuring', desc: 'Advising on financial modeling, lease terms, and legal diligence.' },
      { step: '04', title: 'Closing Execution', desc: 'Guiding transaction documentation to conclusion with absolute fiduciary transparency.' }
    ]
  },

  'industrial-property': {
    id: '05',
    number: '05 / 08',
    title: 'Industrial Property',
    shortTitle: 'Industrial Property',
    slug: 'industrial-property',
    tagline: 'Industrial spaces and property opportunities considered through operational requirements, infrastructure and location.',
    heroImage: '/images/services/industrial-property/hero.webp',
    heroAlt: 'Premium modern industrial real estate development and logistics campus',
    overview: 'Modern industrial operations require strategic freight positioning, seamless multimodal connectivity, and scalable floor specifications. Our industrial advisory team assists manufacturing enterprises, 3PL(Third-Party Logistics) providers , and institutional investors in securing Grade-A warehousing, logistics parks, and industrial corridors.',
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
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Grade-A Logistics Parks', img: '/images/services/industrial-property/assets/grade-a-logistics-parks.webp' },
      { name: 'Cold-Storage Hubs', img: '/images/services/industrial-property/assets/cold-storage-hubs.webp' },
      { name: 'Manufacturing Plants', img: '/images/services/industrial-property/assets/manufacturing-plants.webp' },
      { name: 'Industrial Corridors', img: '/images/services/industrial-property/assets/industrial-corridors.webp' },
      { name: 'Industrial Plots', img: '/images/services/industrial-property/assets/industrial-plots.webp' },
      { name: 'Industrial buildings', img: '/images/services/industrial-property/assets/industrial-buildings.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Operational Brief', desc: 'Analyzing floor-load capacity, ceiling clearances, power load, and logistical routes.' },
      { step: '02', title: 'Corridor Screening', desc: 'Identifying compliant industrial zones with optimal arterial connectivity.' },
      { step: '03', title: 'Compliance & Diligence', desc: 'Verifying industrial clearances, pollution control approvals, and clear titles.' },
      { step: '04', title: 'Execution & Handover', desc: 'Structuring commercial terms, lease mechanics, or acquisition closure.' }
    ]
  },

  'exchange-property': {
    id: '06',
    number: '06 / 08',
    title: 'Exchange Property',
    shortTitle: 'Exchange Property',
    slug: 'exchange-property',
    tagline: 'Property exchange opportunities that let you move from what you hold into what you need, without the friction of a separate sale and purchase.',
    heroImage: '/images/services/exchange-property/hero.webp',
    heroAlt: 'Contemporary property assets representing structured real estate exchange',
    overview: 'An exchange lets an owner trade one property for another of matching or adjusted value — a residence for a commercial unit, a plot for a built asset, or one location for a stronger corridor. We identify credible counterparties, reconcile valuations and differential balances, and manage documentation so both sides close with clarity.',
    pillars: [
      {
        title: 'Like-for-Like Exchange',
        desc: 'Swapping residential, commercial or industrial property for an equivalent asset in a preferred location or format.'
      },
      {
        title: 'Cross-Category Swaps',
        desc: 'Moving between asset classes — plots into built units, residential into income-generating commercial, and the reverse.'
      },
      {
        title: 'Valuation & Balance Settlement',
        desc: 'Independent valuation of both properties and transparent structuring of any differential payment.'
      },
      {
        title: 'Title & Documentation',
        desc: 'Verifying both titles, encumbrances and approvals, and supervising exchange deeds and registry.'
      }
    ],
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Residential Units', img: '/images/services/exchange-property/assets/residential-units.webp' },
      { name: 'Commercial Spaces', img: '/images/services/exchange-property/assets/commercial-spaces.webp' },
      { name: 'Built Industrial Assets', img: '/images/services/exchange-property/assets/built-industrial-assets.webp' },
      { name: 'Plots & Land Parcels', img: '/images/services/exchange-property/assets/plots-and-land-parcels.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Asset Assessment', desc: 'Understanding the property you hold, its value, and what you want in return.' },
      { step: '02', title: 'Counterparty Matching', desc: 'Identifying owners with complementary properties and exchange intent.' },
      { step: '03', title: 'Valuation Consensus', desc: 'Harmonizing independent valuations and agreeing the differential balance.' },
      { step: '04', title: 'Exchange Deed & Registry', desc: 'Supervising bilateral documentation and formal conveyance on both sides.' }
    ]
  },

  'land-plots': {
    id: '07',
    number: '07 / 08',
    title: 'Land & Plots',
    shortTitle: 'Land & Plots',
    slug: 'land-plots',
    tagline: 'Land and plot opportunities considered through location, zoning, title and long-term potential.',
    heroImage: '/images/services/land-plots/hero.webp',
    heroAlt: 'Expansive strategic development land parcel and residential plots',
    overview: 'Land and plots represent the bedrock of tangible wealth. We assist investors, developers, corporate occupiers and landowners in buying, selling and aggregating clear-title land — from residential plots to highway-corridor parcels — with rigorous diligence on zoning, approvals and ownership.',
    pillars: [
      {
        title: 'Plot Acquisition & Sale',
        desc: 'Buying and selling residential, commercial and farm plots in approved colonies and growth corridors.'
      },
      {
        title: 'Strategic Land Aggregation',
        desc: 'Procuring contiguous land parcels, zoning clearances and change-of-land-use feasibility.'
      },
      {
        title: 'Joint Development Structuring (JDA)',
        desc: 'Aligning landowners and developers through equitable joint ventures and revenue-sharing frameworks.'
      },
      {
        title: 'Due Diligence & Title Clearance',
        desc: 'Title chain validation, encumbrance verification and master plan compliance.'
      }
    ],
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Residential Plots', img: '/images/services/land-plots/assets/residential-plots.webp' },
      { name: 'Highway Corridor Land', img: '/images/services/land-plots/assets/highway-corridor-land.webp' },
      { name: 'Commercial Land Banks', img: '/images/services/land-plots/assets/commercial-land-banks.webp' },
      { name: 'Agricultural & Farm Land', img: '/images/services/land-plots/assets/agricultural-and-farm-land.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Requirement & Zoning Brief', desc: 'Defining size, location, land use and budget for the parcel.' },
      { step: '02', title: 'Site Screening', desc: 'Shortlisting verified plots with access, approvals and clear ownership.' },
      { step: '03', title: 'Diligence & Valuation', desc: 'Auditing title records and benchmarking prices against the micro-market.' },
      { step: '04', title: 'Conveyance & Registry', desc: 'Supervising sale deeds, mutation and registry through to possession.' }
    ]
  },

  'sick-property': {
    id: '08',
    number: '08 / 08',
    title: 'Sick Property',
    shortTitle: 'Sick Property',
    slug: 'sick-property',
    tagline: 'Distressed and underperforming properties approached with a clear view of what is holding them back and what they can become.',
    heroImage: '/images/services/sick-property/hero.webp',
    heroAlt: 'Underutilised commercial property with potential for revival',
    overview: 'Sick properties — stalled projects, closed units, bank-auctioned or legally entangled assets, and buildings that no longer earn their keep — often hold real value behind their problems. We help owners find a way out and help investors find a way in, by diagnosing the issue, resolving what can be resolved, and positioning the asset for sale, lease or revival.',
    pillars: [
      {
        title: 'Distressed Asset Sale',
        desc: 'Discreetly marketing stressed and non-performing properties to buyers equipped to take them on.'
      },
      {
        title: 'Bank Auction & NPA Properties',
        desc: 'Guiding investors through auctioned and NPA assets, from reserve-price analysis to possession.'
      },
      {
        title: 'Revival & Repositioning',
        desc: 'Assessing alternate use, re-leasing or redevelopment to restore income and value.'
      },
      {
        title: 'Legal & Encumbrance Resolution',
        desc: 'Identifying liens, disputes and pending dues, and coordinating their resolution before a deal.'
      }
    ],
    // One image per asset class — see scripts/image-manifest.mjs
    targetAssets: [
      { name: 'Closed Industrial Units', img: '/images/services/sick-property/assets/closed-industrial-units.webp' },
      { name: 'Stalled Projects', img: '/images/services/sick-property/assets/stalled-projects.webp' },
      { name: 'Bank-Auctioned Assets', img: '/images/services/sick-property/assets/bank-auctioned-assets.webp' },
      { name: 'Underperforming Commercial Buildings', img: '/images/services/sick-property/assets/underperforming-commercial-buildings.webp' }
    ],
    advisoryProcess: [
      { step: '01', title: 'Distress Diagnosis', desc: 'Understanding the financial, legal and physical issues affecting the property.' },
      { step: '02', title: 'Resolution Path', desc: 'Choosing between sale, lease, repositioning or settlement of liabilities.' },
      { step: '03', title: 'Buyer & Investor Matching', desc: 'Connecting the asset with buyers who have the appetite for its risk.' },
      { step: '04', title: 'Closure & Handover', desc: 'Managing clearances, documentation and transfer to a clean conclusion.' }
    ]
  }
};

// Aliases for legacy routes to ensure zero broken links
SERVICE_DETAILS_MAP['hotels'] = SERVICE_DETAILS_MAP['hotel-resorts'];
SERVICE_DETAILS_MAP['residential'] = SERVICE_DETAILS_MAP['residential-property'];
SERVICE_DETAILS_MAP['residentials'] = SERVICE_DETAILS_MAP['residential-property'];
SERVICE_DETAILS_MAP['commercial'] = SERVICE_DETAILS_MAP['commercial-property'];
SERVICE_DETAILS_MAP['industrial'] = SERVICE_DETAILS_MAP['industrial-property'];
SERVICE_DETAILS_MAP['exchange-land-plots'] = SERVICE_DETAILS_MAP['exchange-property'];
