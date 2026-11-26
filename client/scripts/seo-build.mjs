/**
 * Post-build SEO/AEO step (runs after `vite build`, see package.json "build").
 *
 * For every public route it writes dist/<route>/index.html with:
 *  - route-specific <title>, description, canonical, robots, Open Graph, Twitter tags
 *  - JSON-LD (Organization/RealEstateAgent, WebSite, WebPage, Service, Breadcrumb, FAQPage)
 *  - the page's real text content in <noscript>, so crawlers and AI answer engines that
 *    don't execute JavaScript still read headings, copy, FAQs and internal links
 * and generates sitemap.xml, robots.txt and llms.txt.
 *
 * Site URL: VITE_SITE_URL (env or client/.env.production), default https://sushitaventures.com
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { SITE, SERVICES, PUBLIC_ROUTES, getRouteSeo } from '../src/seo/seoData.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const env = loadEnv('production', root, '');
const SITE_URL = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || SITE.defaultUrl).replace(/\/$/, '');

const esc = (v = '') =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// JSON inside <script>: neutralise "</script>" and HTML comment openers
const safeJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');
const abs = (p) => new URL(p, SITE_URL).href;
const A = SITE.address;
const ADDRESS = `${A.streetAddress}, ${A.addressLocality}, ${A.addressRegion} ${A.postalCode}`;

const rawTemplate = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Preload the self-hosted Latin Manrope file so headings paint in the final font
// (a late font swap re-renders the hero heading and pushes LCP back).
const fontFile = fs.readdirSync(path.join(dist, 'assets')).find((f) => /^manrope-latin-wght-normal-.*\.woff2$/.test(f));
const template = fontFile
  ? rawTemplate.replace(
      '<meta property="og:site_name"',
      `<link rel="preload" as="font" type="font/woff2" href="/assets/${fontFile}" crossorigin />
    <meta property="og:site_name"`
    )
  : rawTemplate;
if (!/<!-- seo:start[\s\S]*?<!-- seo:end -->/.test(template)) {
  throw new Error('index.html is missing the <!-- seo:start --> … <!-- seo:end --> block');
}

const headFor = (seo) => {
  const url = abs(seo.path);
  const image = abs(seo.image || SITE.ogImage);
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<script type="application/ld+json" id="ld-json">${safeJson(seo.jsonLd)}</script>`,
    // Start fetching the LCP image immediately, before CSS/JS are parsed
    ...(seo.lcpImage
      ? [`<link rel="preload" as="image" href="${esc(seo.lcpImage)}" fetchpriority="high"${seo.lcpImage.endsWith('.webp') ? ' type="image/webp"' : ''}${seo.lcpSrcset ? ` imagesrcset="${esc(seo.lcpSrcset)}" imagesizes="100vw"` : ''} />`]
      : [])
  ].join('\n    ');
};

const navLinks = () =>
  `<nav aria-label="Site"><ul>${[
    ['/', 'Home'],
    ['/about', 'About Sushita Ventures'],
    ['/contact', 'Contact'],
    ...SERVICES.map((s) => [`/services/${s.slug}`, s.title])
  ]
    .map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`)
    .join('')}</ul></nav>`;

const bodyFor = (seo) => {
  const parts = [`<h1>${esc(seo.h1)}</h1>`, ...seo.summary.map((p) => `<p>${esc(p)}</p>`)];

  if (seo.path === '/') {
    parts.push(
      '<h2>Our services</h2><ul>' +
        SERVICES.map((s) => `<li><a href="/services/${s.slug}">${esc(s.title)}</a> — ${esc(s.tagline)}</li>`).join('') +
        '</ul>'
    );
  }

  if (seo.service) {
    const s = seo.service;
    parts.push(
      `<h2>Target asset classes</h2><ul>${s.targetAssets.map((a) => `<li>${esc(a.name ?? a)}</li>`).join('')}</ul>`,
      `<h2>How we support your requirements</h2>${s.pillars
        .map((p) => `<h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>`)
        .join('')}`,
      `<h2>Our process</h2><ol>${s.advisoryProcess
        .map((p) => `<li><strong>${esc(p.title)}</strong> — ${esc(p.desc)}</li>`)
        .join('')}</ol>`
    );
  }

  if (seo.faqs) {
    parts.push(
      `<h2>Frequently asked questions</h2>${seo.faqs
        .map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`)
        .join('')}`
    );
  }

  parts.push(
    `<address>${esc(SITE.legalName)}, ${esc(ADDRESS)}. <a href="mailto:${SITE.email}">${SITE.email}</a></address>`,
    navLinks()
  );
  return `<noscript><main>${parts.join('\n')}</main></noscript>`;
};

const written = [];
for (const route of PUBLIC_ROUTES) {
  const seo = getRouteSeo(route, SITE_URL);
  const html = template
    .replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, headFor(seo))
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${bodyFor(seo)}`);
  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  // Also /about.html: hosts resolve "/about" either to about/index.html or about.html
  // (Vite preview, Vercel clean URLs). Same canonical, so search engines see one page.
  if (route !== '/') fs.writeFileSync(path.join(dist, `${route}.html`), html);
  written.push(route);
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === '/' ? '1.0' : r.startsWith('/services/') ? '0.8' : '0.7');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_ROUTES.map(
  (r) => `  <url><loc>${abs(r)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priority(r)}</priority></url>`
).join('\n')}
</urlset>
`
);

// robots.txt — open to search engines and AI answer engines; keep admin/dev out
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `# Sushita Ventures
User-agent: *
Allow: /
Disallow: /admin
Disallow: /status

# AI answer engines are welcome to read and cite public pages
User-agent: GPTBot
Allow: /
Disallow: /admin

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /
Disallow: /admin

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

// llms.txt — concise, link-rich summary for LLMs (https://llmstxt.org)
const home = getRouteSeo('/', SITE_URL);
fs.writeFileSync(
  path.join(dist, 'llms.txt'),
  `# ${SITE.name}

> ${home.description}

${SITE.legalName} — "${SITE.tagline}" Office: ${ADDRESS}, India. Email: ${SITE.email}.

## Services
${SERVICES.map((s) => `- [${s.title}](${abs(`/services/${s.slug}`)}): ${s.tagline}`).join('\n')}

## Company
- [About ${SITE.name}](${abs('/about')}): founders, vision, promise and values
- [Contact](${abs('/contact')}): enquiry form, office address and email

## Frequently asked questions
${home.faqs.map(({ q, a }) => `- **${q}** ${a}`).join('\n')}
`
);

console.log(`[seo-build] ${written.length} pages + sitemap.xml, robots.txt, llms.txt → ${SITE_URL}`);
