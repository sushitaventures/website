# Administration Panel Architecture & Console Specification

**Document Version:** 1.0.0  
**Status:** Implemented & Verified (Section 04)  
**Last Updated:** 2026-11-22  
**Related Documents:** [SECURITY.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/SECURITY.md), [OFFER_MANAGEMENT.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/OFFER_MANAGEMENT.md), [YOUTUBE_VIDEO_MANAGEMENT.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/YOUTUBE_VIDEO_MANAGEMENT.md)

---

## 1. Executive Summary & Objective

The Administration Panel (`/admin`) provides authorized operators with a secure, server-validated content management interface. It decouples ongoing content adjustments (promotional offers, featured architectural video) from source code deployment, enabling rapid updates while strictly protecting public website stability and brand integrity.

---

## 2. Logical Separation of Concerns

```text
Application Root
│
├── Public Web Application (Unauthenticated)
│   ├── Route: /
│   ├── Access: Anonymous Visitors
│   └── Scope: Brand exploration, service details, active offers, embedded video, enquiries
│
└── Administrative Application (Protected)
    ├── Route: /admin (Protected by Session Auth & ProtectedRoute)
    ├── Route: /admin/login (Dedicated authentication portal)
    ├── Access: Authorized Administrators Only
    └── Scope: Content publication, activation toggles, video configuration, audit records
```

---

## 3. Implemented Administrative Modules

### A. Authentication & Session Control
- **Portal:** `/admin/login`
- **Capabilities:** Email and password verification, rate-limited attempts, server-issued HttpOnly session cookie, session rotation upon login, secure logout with server-side session invalidation.

### B. Dashboard Console
- **Route:** `/admin`
- **Capabilities:** Immediate operational overview of total offers, published offers, active status indicators, and current homepage video state. Zero fake metrics or bloated dummy charts.

### C. Homepage Offer Management
- **Route:** `/admin/homepage/offers`
- **Capabilities:** Create, edit, draft, publish, activate/deactivate, delete promotional offer cards. Includes real-time live preview rendering matching future popup card proportions.

### D. Homepage YouTube Video Management
- **Route:** `/admin/homepage/video`
- **Capabilities:** Enter, validate, preview, and update the canonical YouTube video URL. Enables/disables homepage visibility and sets autoplay, muted, and loop parameters.

---

## 4. Protected Routing Architecture

Client-side route governance is enforced via React Router 7 and `ProtectedRoute`:
- Any attempt to visit `/admin` or nested routes without an active verified session immediately redirects the user to `/admin/login`, preserving the attempted destination in router state.
- **Defense in Depth:** Client-side route shielding is merely a UX convenience. Every underlying API route (`/api/v1/admin/*`) strictly validates session integrity on the Express server via `requireAdmin` middleware, immediately rejecting unauthorized requests with HTTP 401.

---

## 5. Extensibility for Future Modules

The administrative layout (`AdminLayout.jsx`) and API structure (`/api/v1/admin/*`) are engineered to accommodate subsequent business modules without refactoring core authentication:
- Property Inventory & Listing Management (`/admin/properties`)
- Services Content Editor (`/admin/services`)
- Contact Inquiries & Lead Inbox (`/admin/enquiries`)
- About Us & Founder Profiles Editor (`/admin/company`)
- SEO & Meta Tag Management (`/admin/seo`)
