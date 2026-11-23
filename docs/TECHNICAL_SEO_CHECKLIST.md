# Technical SEO & Metadata Checklist

## 1. Page-Level Pre-Flight Metadata Checklist

Every public route (`/`, `/about`, `/contact`, `/services`, `/services/:slug`) must fulfill this verification checklist before release:

- [ ] **Document Title**:
  - Format: `[Page Subject / Service Name] | [Brand Name] - Luxury Real Estate Advisory`
  - Length: 50–60 characters.
  - Distinct and unique per route (no generic duplicate titles).
- [ ] **Meta Description**:
  - Concise, factual summary answering visitor intent (140–155 characters).
  - Includes primary service keyword without keyword stuffing.
- [ ] **Canonical Link**:
  - Exact match `<link rel="canonical" href="https://[domain]/[path]" />`.
  - Strictly self-referencing on canonical pages, lower-cased, no trailing slash ambiguity.
- [ ] **Robots Directive**:
  - Public pages: `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`.
  - Admin/Private pages: `<meta name="robots" content="noindex, nofollow" />`.
- [ ] **OpenGraph Metadata**:
  - `og:title`, `og:description`, `og:type` (`website` or `article`), `og:url`.
  - `og:image`: High-resolution preview image (1200x630px, aspect ratio 1.91:1, under 300KB).
  - `og:site_name`, `og:locale` (`en_US` or `en_IN`).
- [ ] **Twitter Card Metadata**:
  - `twitter:card` set to `summary_large_image`.
  - `twitter:title`, `twitter:description`, `twitter:image`.
- [ ] **Structured Data (JSON-LD)**:
  - Valid Schema.org JSON-LD script present in `<head>`.
  - Tested against Google Rich Results Test (zero syntax errors).
- [ ] **Semantic Heading Tree**:
  - Exactly one `<h1>` per page.
  - Logical hierarchy (`<h2>`, `<h3>`) with zero skipped levels.
  - No decorative elements styled as headings.
- [ ] **Image Optimization & Accessibility**:
  - Descriptive, contextual `alt` attribute for every content image.
  - Decorative images marked with empty `alt=""` and `aria-hidden="true"`.
  - Explicit `width` and `height` dimensions to prevent layout shifts (CLS).
- [ ] **Internal Linking & Navigation**:
  - Crawlable `<a>` tags with valid `href` attributes (no `href="javascript:void(0)"` or button fake links).
  - Clear descriptive anchor text (avoid "click here" or "learn more" without context).

---

## 2. Server & Header Verification Checklist

- [ ] **HTTP Status Codes**:
  - Valid routes return `200 OK`.
  - Non-existent routes return `404 Not Found` (no soft 404s).
  - Redirects use `301 Moved Permanently` for canonical enforcement.
- [ ] **Security & Crawl Headers**:
  - `X-Content-Type-Options: nosniff`.
  - `X-Frame-Options: SAMEORIGIN` (prevents malicious clickjacking).
  - `Referrer-Policy: strict-origin-when-cross-origin`.
- [ ] **Compression & Caching**:
  - Gzip / Brotli compression active on text assets (HTML, CSS, JS, SVG, JSON).
  - Static assets (`/assets/*`) served with long-term immutable cache headers (`Cache-Control: public, max-age=31536000, immutable`).
  - HTML documents served with `Cache-Control: no-cache` or short revalidation windows.
