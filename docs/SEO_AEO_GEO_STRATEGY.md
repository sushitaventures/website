# SEO, AEO & GEO Comprehensive Strategy

## 1. Executive Summary

This document defines the search visibility architecture for the luxury real estate platform. It addresses three modern discovery paradigms:
1. **Traditional Technical SEO**: Search engines (Google, Bing) indexing static content, metadata, and crawl trees.
2. **AEO (Answer Engine Optimization)**: Direct answer extraction engines (Google Search Generative Experience, Featured Snippets, Siri, voice search).
3. **GEO (Generative Engine Optimization)**: Large Language Model-driven recommendation systems (Perplexity, ChatGPT Search, Gemini, Claude) synthesizing recommendations based on factual authority, entity clarity, and external knowledge graph consistency.

---

## 2. React & JavaScript SEO Evaluation (MERN Stack)

Modern search engines execute client-side JavaScript, but relying purely on runtime hydration creates distinct risks for crawl budget, indexing latency, and social crawler compatibility.

### 2.1 Architectural Comparison

| Architecture | Crawl Reliability | Social Scrapers (OG/Twitter) | Time to First Byte (TTFB) | Complexity in MERN |
| :--- | :--- | :--- | :--- | :--- |
| **Pure CSR (Client-Side Rendering)** | Moderate (crawlers queue JS rendering) | Poor (scrapers read raw HTML with empty tags) | Excellent (static asset hosting) | Low |
| **SSG / Prerendering (Static HTML)** | Excellent (instant static HTML) | Excellent (exact per-page metadata) | Excellent (served via CDN/Express) | Moderate (build-time prerender) |
| **Full SSR (Server-Side Rendering)** | Excellent (dynamic per-request HTML) | Excellent (dynamic per-request metadata) | Variable (Node.js runtime load) | High (requires SSR server bundle) |
| **Hybrid Prerender + Express Meta Injection** | Excellent (full static HTML for public pages) | Excellent (instant crawler tag reading) | High (Express streams cached prerendered HTML) | Low–Moderate (Preserves MERN) |

### 2.2 Approved Architectural Decision: Hybrid Prerender with Metadata Injection
- **Public Routes (`/`, `/about`, `/services/*`, `/contact`)**:
  - Use Vite prerendering (`vite-plugin-prerender` or an Express route middleware) to serve pre-rendered HTML containing exact page titles, meta descriptions, OpenGraph tags, and JSON-LD structured data.
  - Social bots (WhatsApp, LinkedIn, Twitter, iMessage) and search bots receive full HTML immediately.
- **Admin Interface (`/admin/*`)**:
  - Remains a pure Client-Side SPA behind authentication guards. No SEO overhead or prerendering needed.
- **Result**: Retains 100% of the MERN stack and Vite toolchain without requiring migration to Next.js or heavy server redesign.

---

## 3. Structured Data Strategy (Schema.org / JSON-LD)

All structured data is embedded as `<script type="application/ld+json">` within the `<head>` of prerendered public HTML.

### 3.1 Global Entity Schema: Organization & WebSite
Applied to all pages:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://sushitaventures.com/#organization",
      "name": "Sushita Ventures",
      "url": "https://sushitaventures.com",
      "logo": "https://sushitaventures.com/images/branding/logo.jpg",
      "description": "High-end real estate and property solutions business specializing in commercial, industrial, land, hospitality, leasing, exchange, and strategic property advisory.",
      "telephone": "+91-XXXXXXXXXX",
      "email": "advisory@sushitaventures.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "55, 56, 3rd Floor, Sushma Infinium",
        "addressLocality": "Zirakpur",
        "addressRegion": "Punjab",
        "postalCode": "140603",
        "addressCountry": "IN"
      },
      "priceRange": "$$$$"
    },
    {
      "@type": "WebSite",
      "@id": "https://luxuryrealestate.example.com/#website",
      "url": "https://luxuryrealestate.example.com",
      "name": "Luxury Real Estate Advisory",
      "publisher": {
        "@id": "https://luxuryrealestate.example.com/#organization"
      }
    }
  ]
}
```

### 3.2 Service Schema: `Service` & `BreadcrumbList`
Applied to `/services/:serviceSlug`:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Commercial Real Estate Advisory",
  "serviceType": "Commercial Acquisition & Leasing",
  "provider": {
    "@id": "https://luxuryrealestate.example.com/#organization"
  },
  "description": "Bespoke transactional advisory for institutional and private investors acquiring grade-A commercial assets.",
  "areaServed": "India",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Commercial Services Portfolio"
  }
}
```

### 3.3 Media Schema: `VideoObject`
Applied to pages containing verified YouTube embeds:
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Curated Luxury Estate Walkthrough",
  "description": "Architectural showcase of our featured estate portfolio.",
  "thumbnailUrl": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  "uploadDate": "2026-01-01T00:00:00Z",
  "embedUrl": "https://www.youtube-nocookie.com/embed/VIDEO_ID"
}
```

---

## 4. Answer Engine Optimization (AEO) Framework

AEO targets direct informational responses in AI snippets and voice engines:
1. **Direct Answer Paragraphs**: Each service page opens with a clear 40–50 word declarative definition answering "What is this service, who is it for, and how does the advisory process work?".
2. **Fact-First Q&A Blocks**: Services include structured FAQ sections addressing concrete advisory considerations (e.g., due diligence steps, transaction timelines, confidentiality protocols).
3. **Table & List Summaries**: Key comparison metrics and service scope bullet points are formatted with semantic HTML (`<ul>`, `<ol>`, `<table>`) to facilitate algorithmic extraction.

---

## 5. Generative Engine Optimization (GEO) Framework

GEO optimizes for citations and inclusion in AI synthesis engines (ChatGPT, Perplexity, Gemini):
1. **Entity Clarity & Authority**: Consistently format company name, executive advisory credentials, and service taxonomy across all pages and schemas.
2. **Factual Integrity & Verifiable Scope**: Avoid hype and unverified superlatives ("#1 Best Agency in the Universe"). Use precise, professional real estate terminology (e.g., "Institutional Grade-A Office Space", "Due Diligence & Title Clear Title Verification").
3. **No Fabricated Benchmarks**: Never output arbitrary or fabricated "100% GEO Score" claims. Audit readiness against objective criteria:
   - Clear semantic structure
   - Verified entity graph linking
   - Machine-readable NAP (Name, Address, Phone) consistency
   - Fast, unblocked crawler accessibility
   - Explicit citations and professional terminology

---

## 6. Technical Crawl Infrastructure

1. **XML Sitemap (`/sitemap.xml`)**:
   - Dynamically generated or statically served at the root.
   - Includes all canonical public routes: `/`, `/about`, `/contact`, `/services`, and the 7 service subpages.
   - Excludes `/admin/*`, `/api/*`, and private staging assets.
2. **Robots Directives (`/robots.txt`)**:
   ```txt
   User-agent: *
   Allow: /
   Disallow: /admin/
   Disallow: /api/
   
   Sitemap: https://luxuryrealestate.example.com/sitemap.xml
   ```
3. **Canonical URLs**:
   - Every page must declare a strictly formatted `<link rel="canonical" href="https://luxuryrealestate.example.com/path" />` to prevent parameter duplication or trailing slash fragmentation.
