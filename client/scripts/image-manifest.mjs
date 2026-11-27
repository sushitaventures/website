/**
 * Every image the website renders — one entry per image to (re)generate.
 * Used by scripts/image-assets.mjs to write docs/IMAGE_INVENTORY.md (prompt sheet),
 * create stand-ins, and import generated files at the exact sizes the layout needs.
 *
 * Entry: { id, page, section, w, h, outputs, existing?, prompt, standIn? }
 *  - id       → drop file name: client/image-drop/<id>.(png|jpg|jpeg|webp)
 *  - w × h    → final crop (the generated image may be any size of a similar ratio)
 *  - outputs  → files written on import: '.webp' | '.jpg' | '-640.webp' (phone srcset)
 *  - standIn  → existing photo shown until the generated one is imported
 */
import { SERVICES } from '../src/seo/seoData.js';

export const STYLE =
  'Photorealistic professional architectural and real-estate photograph, full-frame camera, 24–35mm lens, ' +
  'straight verticals, true-to-life materials and proportions, soft natural light, calm uncluttered composition, ' +
  'refined warm palette of stone, ivory, deep green and muted brass. Set in North India (Punjab / Chandigarh tricity) ' +
  'unless stated otherwise. No text, no readable signage, no logos, no watermarks, no people in the foreground, ' +
  'no distorted or impossible architecture, not a 3D render.';

const HERO = { w: 1376, h: 768, outputs: ['.webp', '.jpg', '-640.webp'] }; // 16:9-ish full-width
const CARD = { w: 896, h: 1200, outputs: ['.webp', '.jpg', '-640.webp'] }; // 3:4 portrait service cards
const SPLIT = { w: 1200, h: 896, outputs: ['.webp', '.jpg', '-640.webp'] }; // 4:3 half-width blocks
const SERVICE_HERO = { w: 1920, h: 1080, outputs: ['.webp'] }; // full-screen service page hero
const ASSET = { w: 800, h: 600, outputs: ['.webp'] }; // 4:3 asset-class cards

const site = [
  { id: 'home/hero-hotel-resorts', page: 'Home', section: 'Hero slider — slide 1 (also default social share image)', ...HERO,
    prompt: 'Wide dusk view of a contemporary luxury resort in the Shivalik foothills: low-rise stone-and-timber pavilions, a long still infinity pool reflecting warm interior light, mature trees, deep blue sky. Calm, aspirational, plenty of quiet space on the left third for headline text.' },
  { id: 'home/hero-commercial', page: 'Home', section: 'Hero slider — slide 2', ...HERO,
    prompt: 'Wide early-morning view of a premium Grade-A glass and stone office campus with landscaped forecourt and tree-lined boulevard, soft golden light on the facades, empty clean plaza. Quiet negative space on the left third.' },
  { id: 'home/hero-industrial', page: 'Home', section: 'Hero slider — slide 3', ...HERO,
    prompt: 'Aerial-oblique view at sunrise of a modern logistics and warehousing park beside a highway corridor: clean pre-engineered sheds with standing-seam roofs, orderly truck docks, wide internal roads, green buffer planting, light haze over Punjab farmland beyond.' },
  { id: 'home/brand-introduction', page: 'Home (also admin sign-in art)', section: 'Brand introduction', ...SPLIT,
    prompt: 'Architectural detail of a refined contemporary building entrance: honed stone cladding, bronze-framed glass doors, a single mature tree casting soft shadows, warm afternoon light. Evokes trust, permanence and craftsmanship.' },
  { id: 'home/business-perspective', page: 'Home', section: 'Business perspective', ...SPLIT,
    prompt: 'Elevated view across a growing North Indian city edge at golden hour: new mid-rise residential and commercial blocks, wide arterial road, green belts and open land parcels in between — a sense of opportunity and long-term perspective.' },
  { id: 'home/contact-cta', page: 'Home', section: 'Contact call-to-action background', ...HERO,
    prompt: 'Quiet, dimly lit private consultation lounge in a luxury real-estate office: deep green upholstered armchairs, walnut table, stone wall, tall window with soft evening light. Darker tones overall so white text reads well over it; no people.' },
  { id: 'home/service-hotel-resorts', page: 'Home + navigation menu', section: 'Services grid card — Hotel & Resorts', ...CARD,
    prompt: 'Vertical composition: boutique luxury hotel courtyard at blue hour, lantern-lit colonnade around a reflecting pool, palms and frangipani, warm windows above.' },
  { id: 'home/service-leasing', page: 'Home', section: 'Services grid card — Leasing', ...CARD,
    prompt: 'Vertical composition: ground-floor glass frontage of a premium retail and office building on a clean high street, polished stone pilasters, warm interior light, empty modern showroom ready for a tenant.' },
  { id: 'home/service-residential', page: 'Home', section: 'Services grid card — Residential Property', ...CARD,
    prompt: 'Vertical composition: contemporary luxury villa facade at dusk, layered stone and white plaster volumes, floor-to-ceiling glass, landscaped entrance path with uplit trees.' },
  { id: 'home/service-commercial', page: 'Home', section: 'Services grid card — Commercial Property', ...CARD,
    prompt: 'Vertical composition looking up at a Grade-A office tower: crisp glass curtain wall with vertical stone fins against a clear sky, a few clouds, strong clean lines.' },
  { id: 'home/service-industrial', page: 'Home', section: 'Services grid card — Industrial Property', ...CARD,
    prompt: 'Vertical composition: interior of a modern high-bay warehouse, polished concrete floor, tall racking receding into soft daylight from roof skylights, clean and orderly, no workers.' },
  { id: 'about/about-story-hero', page: 'About', section: 'Page hero', w: 1920, h: 1080, outputs: ['.jpg'],
    prompt: 'Wide atmospheric view of a refined contemporary office building in Chandigarh tricity at dusk, warm glow from within, landscaped approach, calm and established — a company with a long-term vision. Darker lower half for overlaid heading.' },
  { id: 'common/conversation-handshake', page: 'All pages', section: '"Start a conversation" drawer image', w: 1920, h: 1280, outputs: ['.jpg'],
    prompt: 'Close, tasteful detail of two professionals shaking hands over a walnut desk with architectural drawings and a property file, faces out of frame, soft window light, shallow depth of field.' },
  { id: 'hero/hero-slide-3', page: 'Home', section: 'Brand film poster (shown before the video plays)', w: 1620, h: 1080, outputs: ['.jpg'],
    prompt: 'Cinematic wide view of a premium mixed-use development at golden hour — residences, offices and landscaped plaza — slightly dark and moody so a play button reads clearly.' },
  { id: 'services/contact-experience', page: 'Contact', section: 'Contact page image', w: 1200, h: 800, outputs: ['.jpg'],
    prompt: 'Welcoming reception of a boutique real-estate advisory office: stone reception desk, brass details, framed architectural photographs, plants, warm daylight, empty and calm.' }
];

// New full-screen heroes for each service page (previously a stretched portrait card image)
const HERO_PROMPTS = {
  'hotel-resorts': ['services/service-hotels.jpg', 'Wide view of a luxury hill resort in the Himalayan foothills at golden hour: terraced stone villas, infinity pool edge, valley view, warm lights coming on.'],
  leasing: ['services/service-leasing.jpg', 'Wide street-level view of a premium leased commercial building: double-height glass showrooms at ground level, offices above, clean forecourt, early evening light.'],
  'residential-property': ['services/service-residential.jpg', 'Wide view of an ultra-premium contemporary residence at dusk: cantilevered volumes, floor-to-ceiling glass, reflecting pool, landscaped lawn.'],
  'commercial-property': ['services/service-commercial.jpg', 'Wide view of a Grade-A commercial district: glass office towers and a landscaped central plaza at blue hour, light trails on the boulevard.'],
  'industrial-property': ['services/service-industrial.jpg', 'Wide aerial view of a modern industrial and logistics park at sunrise: large warehouses, truck docks, solar panels on roofs, wide roads, farmland beyond.'],
  'exchange-property': ['services/service-exchange.jpg', 'Wide view composing two contrasting properties side by side across a quiet street — a contemporary home and a modern commercial building — balanced, symmetrical, evening light.'],
  'land-plots': ['services/service-land.jpg', 'Wide aerial view of a demarcated land parcel with clear plot boundaries and an access road on the edge of a growing North Indian town, fields and tree lines beyond, soft morning light.'],
  'sick-property': ['services/service-sick-property.jpg', 'Wide view of a well-built but disused commercial building awaiting revival: weathered facade, empty forecourt, structurally sound, dramatic hopeful sky — potential, not ruin.']
};

// One prompt + stand-in per asset class, in the same order as serviceDetailsData targetAssets
const ASSET_PROMPTS = {
  'hotel-resorts': [
    ['home/service-hotel-resorts.jpg', 'Grand entrance porte-cochère of a five-star city hotel at dusk, stone facade, warm lobby glow, valet-ready forecourt.'],
    ['home/hero-hotel-resorts.jpg', 'Wellness resort amid forested hills: open-air yoga pavilion, spa pools, natural stone and timber, morning mist.'],
    ['services/service-hotels.jpg', 'Modern mid-scale business hotel near an expressway or airport: clean glass-and-panel facade, drop-off canopy, evening light.']
  ],
  leasing: [
    ['home/hero-hotel-resorts.jpg', 'Leased boutique hotel and resort property: pool courtyard and guest wings, ready for an operator, late afternoon light.'],
    ['home/service-commercial.jpg', 'Bright, fitted corporate office floor: open workstations, glass meeting rooms, city view through full-height windows, empty.'],
    ['services/service-leasing.jpg', 'High-street retail showroom frontage: double-height glass, minimalist interior display, polished stone floor, warm lighting.'],
    ['services/service-hotels.jpg', 'Elegant banquet hall prepared for an event: chandeliers, round tables with ivory linen, high ceilings, warm ambient light, no guests.'],
    ['home/service-leasing.jpg', 'Modern multi-storey hospital or healthcare building: clean facade, landscaped entrance, ambulance bay, daylight.']
  ],
  'residential-property': [
    ['home/service-residential.jpg', 'Bespoke luxury villa with private pool and landscaped garden, contemporary architecture, golden hour.'],
    ['services/service-residential.jpg', 'Penthouse living room with floor-to-ceiling glass and a terrace overlooking the city skyline at dusk.'],
    ['home/brand-introduction.jpg', 'Luxury independent house on its own plot: two-storey contemporary facade, gated front, porch and lawn.'],
    ['home/business-perspective.jpg', 'Gated residential community: landscaped central green, uniform contemporary residences, security gate pavilion, tree-lined internal road.'],
    ['services/service-land.jpg', 'Open residential land parcel with clear boundary markers and an access road, ready for a custom home, soft morning light.']
  ],
  'commercial-property': [
    ['home/service-commercial.jpg', 'Grade-A office tower with glass curtain wall and stone podium, landscaped forecourt, clear sky.'],
    ['services/service-commercial.jpg', 'Campus-style commercial business park: several mid-rise office blocks around a landscaped central green.'],
    ['home/hero-commercial.jpg', 'Large modern shopping mall exterior with a glass atrium entrance and wide forecourt, evening lights.'],
    ['services/service-leasing.jpg', 'Flagship store on a premium high street: tall glass frontage, refined stone and brass details.'],
    ['home/service-leasing.jpg', 'Contemporary multi-speciality hospital building with clean facade, entrance canopy and landscaping, daylight.'],
    ['home/business-perspective.jpg', 'Premium institutional co-working hub interior: open-plan desks, meeting pods, timber and greenery, daylight.']
  ],
  'industrial-property': [
    ['home/hero-industrial.jpg', 'Grade-A logistics park: long warehouses with truck docks, wide hardstanding, aerial-oblique morning view.'],
    ['services/service-industrial.jpg', 'Insulated cold-storage facility: white insulated-panel building, refrigerated truck bays, clean apron.'],
    ['home/service-industrial.jpg', 'Modern manufacturing plant exterior: factory sheds, utility block, landscaped frontage, clear daylight.'],
    ['home/hero-industrial.jpg', 'Aerial view of an industrial corridor along a highway: clusters of factories and warehouses, connecting roads, farmland edge.'],
    ['services/service-land.jpg', 'Levelled industrial plot with boundary wall and road frontage inside an industrial estate, sheds in the background.'],
    ['services/service-industrial.jpg', 'Multi-storey industrial building with large loading bays and goods lifts, clean facade, daylight.']
  ],
  'exchange-property': [
    ['services/service-residential.jpg', 'Contemporary residential apartment building with balconies and landscaped entrance, warm evening light.'],
    ['services/service-commercial.jpg', 'Modern commercial space: ground-floor shops and offices above in a clean mixed-use block.'],
    ['services/service-industrial.jpg', 'Built industrial asset: functioning warehouse building with docks and yard, daylight.'],
    ['services/service-land.jpg', 'Plots and land parcels seen from above: clearly divided plots along a new internal road, open sky.']
  ],
  'land-plots': [
    ['services/service-land.jpg', 'Residential plots in an approved colony: paved internal roads, streetlights, plot markers, a few finished homes in the distance.'],
    ['home/hero-industrial.jpg', 'Land beside a national highway corridor: wide road frontage, open parcel, distant commercial buildings, morning light.'],
    ['services/service-exchange.jpg', 'Commercial land bank on the edge of a growing town: large levelled parcel with boundary fencing and road access.'],
    ['home/business-perspective.jpg', 'Lush Punjab agricultural farm land: wheat or mustard fields, tube-well, tree lines, wide open sky at golden hour.']
  ],
  'sick-property': [
    ['services/service-industrial.jpg', 'Closed industrial unit: shuttered but sound factory shed, quiet yard, weathered paint, potential for revival.'],
    ['services/service-sick-property.jpg', 'Stalled construction project: unfinished concrete frame of a mid-rise building, scaffolding, overcast sky — paused, not ruined.'],
    ['services/service-exchange.jpg', 'Bank-auctioned property: solid commercial building with closed shutters and a tidy forecourt, neutral daylight.'],
    ['services/service-commercial.jpg', 'Underperforming commercial building: partly vacant office block with dark floors, sound structure, dramatic sky.']
  ]
};

const services = SERVICES.flatMap((s) => {
  const [heroStandIn, heroPrompt] = HERO_PROMPTS[s.slug];
  const prompts = ASSET_PROMPTS[s.slug];
  if (!prompts || prompts.length !== s.targetAssets.length) {
    throw new Error(`[image-manifest] ${s.slug}: ${s.targetAssets.length} asset classes but ${prompts?.length ?? 0} prompts`);
  }
  return [
    { id: s.heroImage.replace(/^\/images\/|\.webp$/g, ''), page: s.title, section: 'Service page hero', ...SERVICE_HERO,
      prompt: heroPrompt, standIn: heroStandIn },
    ...s.targetAssets.map((a, i) => ({
      id: a.img.replace(/^\/images\/|\.webp$/g, ''), page: s.title, section: `Target Asset Classes — ${a.name.trim()}`, ...ASSET,
      prompt: prompts[i][1], standIn: prompts[i][0]
    }))
  ];
});

export const IMAGES = [...site, ...services];

// Reviewed but deliberately not regenerated
export const KEPT = [
  ['branding/logo.png', 'Brand logo — not a photograph'],
  ['founders/sunita-attri.jpg', 'Real person — use a real photograph, never a generated likeness'],
  ['founders/sushil-attri.jpg', 'Real person — use a real photograph, never a generated likeness'],
  ['founders/founder-placeholder.svg', 'Placeholder illustration']
];
