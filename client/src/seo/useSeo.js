import { useEffect } from 'react';
import { SITE, getRouteSeo } from './seoData.js';

export const SITE_URL = (import.meta.env.VITE_SITE_URL || SITE.defaultUrl).replace(/\/$/, '');

// Create-or-update a head element so the build-time tags (scripts/seo-build.mjs) are reused, never duplicated.
const upsert = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (attr, key, content) => {
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute('content', content);
};

/**
 * Keep <head> in sync with the current route.
 * @param {string} path - route path, e.g. "/about"
 * @param {{noindex?: boolean, title?: string}} [opts] - noindex for admin/404/dev pages
 */
export const useSeo = (path, opts = {}) => {
  const { noindex = false, title: titleOverride } = opts;

  useEffect(() => {
    const seo = getRouteSeo(path, SITE_URL);
    const title = titleOverride || seo?.title || SITE.name;
    const description = seo?.description || SITE.tagline;
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;
    const image = new URL(seo?.image || SITE.ogImage, SITE_URL).href;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex || !seo ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    }).href = url;

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    const ld = upsert('script#ld-json', () => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = 'ld-json';
      return s;
    });
    ld.textContent = seo && !noindex ? JSON.stringify(seo.jsonLd) : '';
  }, [path, noindex, titleOverride]);
};
