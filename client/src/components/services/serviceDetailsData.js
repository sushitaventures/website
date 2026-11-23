/**
 * Detailed Editorial Information for Sushita Ventures' 7 Specialist Service Categories
 * Real Estate Advisory: Commercial, Industrial, Land/Plots, Hotels, Leasing, Exchange Property, Sick Property
 */

export const SERVICE_DETAILS_MAP = {
  commercial: {
    id: '02',
    number: 'SERVICE 02 / 08',
    title: 'Commercial Real Estate Advisory',
    shortTitle: 'Commercial',
    slug: 'commercial',
    tagline: 'Considered spaces for evolving business requirements.',
    heroImage: '/images/services/service-commercial.jpg',
    heroAlt: 'High-rise modern commercial glass tower development in India',
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

  industrial: {
    id: '03',
    number: 'SERVICE 03 / 08',
    title: 'Industrial & Logistics Advisory',
    shortTitle: 'Industrial',
    slug: 'industrial',
    tagline: 'Industrial property opportunities for operations and future growth.',
    heroImage: '/images/services/service-industrial.jpg',
    heroAlt: 'Modern high-bay logistics warehouse and distribution facility in India',
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

  'land-plots': {
    id: '04',
    number: 'SERVICE 04 / 08',
    title: 'Land & Strategic Plots Advisory',
    shortTitle: 'Land / Plots',
    slug: 'land-plots',
    tagline: 'Explore land and plot opportunities with clarity and purpose.',
    heroImage: '/images/services/service-land.jpg',
    heroAlt: 'Expansive strategic development land parcel at sunset in India',
    overview: 'Land is the ultimate foundation of all real estate value, yet it presents intricate legal, zoning, and title verification challenges. We provide considered advisory for commercial land acquisition, developer joint ventures, plotted developments, and long-term strategic land holding across emerging growth corridors.',
    pillars: [
      {
        title: 'Clear-Title Land Procurement',
        desc: 'End-to-end vetting of title chains, revenue records, encumbrances, and municipal master plan compliance.'
      },
      {
        title: 'Developer Joint Ventures (JV/JDA)',
        desc: 'Structuring balanced Joint Development Agreements and revenue-sharing frameworks between landowners and developers.'
      },
      {
        title: 'Commercial & Institutional Plots',
        desc: 'Procuring pre-zoned land for corporate offices, hospitals, educational institutions, and retail hubs.'
      },
      {
        title: 'Plotted Developments',
        desc: 'Advisory on land aggregation, licensing feasibility, and layout planning for plotted residential and mixed communities.'
      }
    ],
    targetAssets: ['Commercial Land Parcels', 'Institutional Plots', 'Master-Planned Land Banks', 'Plotted Communities'],
    advisoryProcess: [
      { step: '01', title: 'Zoning & Master Plan Review', desc: 'Validating land use, FSI/FAR potential, and future municipal infrastructure.' },
      { step: '02', title: 'Title & Revenue Diligence', desc: 'Conducting historical title search and ownership chain validation.' },
      { step: '03', title: 'Valuation & Modeling', desc: 'Benchmarking acquisition cost against projected development yield.' },
      { step: '04', title: 'Transaction Governance', desc: 'Executing transparent sale deeds, agreements to sell, or JDA frameworks.' }
    ]
  },

  hotels: {
    id: '05',
    number: 'SERVICE 05 / 08',
    title: 'Hospitality & Hotels Advisory',
    shortTitle: 'Hotels',
    slug: 'hotels',
    tagline: 'Explore hotel and hospitality property opportunities.',
    heroImage: '/images/services/service-hotels.jpg',
    heroAlt: 'Luxury boutique resort hospitality architecture with illuminated pool',
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

  leasing: {
    id: '06',
    number: 'SERVICE 06 / 08',
    title: 'Corporate & Retail Leasing',
    shortTitle: 'Leasing',
    slug: 'leasing',
    tagline: 'Property leasing opportunities for a range of business requirements.',
    heroImage: '/images/services/service-leasing.jpg',
    heroAlt: 'Sleek architectural corridor in modern commercial office building',
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

  'exchange-property': {
    id: '07',
    number: 'SERVICE 07 / 08',
    title: 'Property Exchange Advisory',
    shortTitle: 'Exchange Property',
    slug: 'exchange-property',
    tagline: 'Explore property exchange enquiries and possibilities.',
    heroImage: '/images/services/service-exchange.jpg',
    heroAlt: 'Executive in dark tailored suit descending architectural staircase',
    overview: 'Property exchange provides a sophisticated alternative to traditional liquidations, enabling asset owners to rebalance portfolios, redeploy equity, and transition between residential, commercial, or land holdings without unnecessary liquidity drag. We facilitate confidential and structured asset-for-asset exchanges.',
    pillars: [
      {
        title: 'Cross-Asset Exchanges',
        desc: 'Structuring bilateral swaps between residential holdings, commercial units, industrial sheds, and clear-title plots.'
      },
      {
        title: 'Dual Valuation Harmonization',
        desc: 'Conducting transparent, unbiased fair market valuations for both sides of the exchange transaction.'
      },
      {
        title: 'Equity Difference Settlement',
        desc: 'Structuring transparent cash-adjustment mechanisms and payment milestones for unequal value assets.'
      },
      {
        title: 'Tax & Diligence Advisory',
        desc: 'Ensuring both assets undergo strict legal title clearance and advising on applicable capital gains structures.'
      }
    ],
    targetAssets: ['Commercial Units', 'Residential Portfolios', 'Land Parcels for Commercial', 'Multi-City Asset Trades'],
    advisoryProcess: [
      { step: '01', title: 'Portfolio Assessment', desc: 'Evaluating your existing asset profile and ideal target replacement property.' },
      { step: '02', title: 'Counterparty Matching', desc: 'Leveraging our network to identify verified owners seeking reciprocal property trades.' },
      { step: '03', title: 'Valuation Consensus', desc: 'Agreeing on objective valuation baselines and differential cash terms.' },
      { step: '04', title: 'Simultaneous Conveyance', desc: 'Coordinating synchronized legal deeds to guarantee complete bilateral security.' }
    ]
  },

  'sick-property': {
    id: '08',
    number: 'SERVICE 08 / 08',
    title: 'Sick Property Advisory',
    shortTitle: 'Sick Property',
    slug: 'sick-property',
    tagline: 'Strategic property advisory and revitalisation for distressed or underperforming assets.',
    heroImage: '/images/services/service-sick-property.jpg',
    heroAlt: 'Minimalist elegant architectural interior with natural light',
    overview: 'Distressed, stalled, or underperforming real estate assets often contain substantial latent value trapped behind legal complications, financial debt, or developer default. Our specialized advisory guides asset owners, lenders, and investors through strategic restructuring, dispute resolution, and asset turnaround workouts.',
    pillars: [
      {
        title: 'Stalled Project Turnaround',
        desc: 'Developing realistic restructuring models to restart incomplete commercial, industrial, or residential projects.'
      },
      {
        title: 'Debt Resolution & Settlement',
        desc: 'Assisting in structured one-time settlements (OTS), lender mediation, and capital restructuring for stressed assets.'
      },
      {
        title: 'Legal & Title Clearance',
        desc: 'Addressing legacy encumbrances, regulatory bottlenecks, and multipartite title disputes.'
      },
      {
        title: 'Exit & Recapitalization',
        desc: 'Connecting distressed asset holders with specialized opportunistic funds and white-knight developers.'
      }
    ],
    targetAssets: ['Stalled Commercial Projects', 'Distressed Industrial Units', 'Underperforming Retail', 'Disputed Land Banks'],
    advisoryProcess: [
      { step: '01', title: 'Diagnostic Audit', desc: 'Conducting forensic assessment of legal status, debt burden, and physical condition.' },
      { step: '02', title: 'Feasibility Modeling', desc: 'Determining minimum capital required for turnaround vs. liquidation outcome.' },
      { step: '03', title: 'Stakeholder Mediation', desc: 'Aligning lenders, developers, landowners, and buyers around a viable workout plan.' },
      { step: '04', title: 'Revitalization Closure', desc: 'Executing new development partnerships, asset transfers, or recapitalization.' }
    ]
  },

  residential: {
    id: '01',
    number: 'SERVICE 01 / 08',
    title: 'Residential Real Estate Advisory',
    shortTitle: 'Residentials',
    slug: 'residential',
    tagline: 'Discreet advisory for prime residences, luxury estates, and bespoke living spaces.',
    heroImage: '/images/services/service-residential.jpg',
    heroAlt: 'Contemporary luxury modern architectural villa estate',
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
  }
};

// Support both 'residential' and 'residentials' slug lookups
SERVICE_DETAILS_MAP.residentials = SERVICE_DETAILS_MAP.residential;
