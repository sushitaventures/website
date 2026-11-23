# Database Schema Reference

**Document Version:** 1.0.0  
**Status:** Implemented & Verified (Section 04)  
**Last Updated:** 2026-11-22  
**Database Engine:** MongoDB / Mongoose 9.x

---

## 1. Schema Entity Relationship Overview

```text
AdminUser (1) ───◄ has many ──── (N) AdminSession
    │
    ├─── (1) ───◄ created / updated ──── (N) Offer
    │
    └─── (1) ───◄ updated ────────────── (1) HomepageVideoConfiguration
```

---

## 2. Model Definitions

### 2.1 `AdminUser` Model
Collection: `adminusers`

| Field | Type | Modifiers / Validation | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto-generated Primary Key | - | Unique identifier |
| `email` | String | `required`, `unique`, `lowercase`, `trim`, email regex | - | Administrator login identifier |
| `passwordHash` | String | `required`, `select: false` | - | Salted bcrypt password hash |
| `role` | String | `enum: ['admin', 'superadmin']` | `'admin'` | Permission tier |
| `lastLoginAt` | Date | - | `null` | Timestamp of most recent authentication |
| `createdAt` | Date | Managed by timestamps | - | Account creation timestamp |
| `updatedAt` | Date | Managed by timestamps | - | Profile last modified timestamp |

**Indexes:**
- `{ email: 1 }` (Unique)

---

### 2.2 `AdminSession` Model
Collection: `adminsessions`

| Field | Type | Modifiers / Validation | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto-generated Primary Key | - | Unique identifier |
| `sessionId` | String | `required`, `unique`, indexed | - | Cryptographically random 64-char hex token |
| `userId` | ObjectId | `required`, `ref: 'AdminUser'`, indexed | - | Foreign key to `AdminUser` |
| `email` | String | `required` | - | Denormalized administrator email |
| `userAgent` | String | - | `""` | Client User-Agent header for audit tracking |
| `ipAddress` | String | - | `""` | Client IP address |
| `expiresAt` | Date | `required`, **TTL index** (`expires: 0`) | - | Session expiry (auto-purged by MongoDB) |
| `lastActiveAt` | Date | - | `Date.now` | Last request timestamp |
| `createdAt` / `updatedAt` | Date | Managed by timestamps | - | Timestamps |

**Indexes:**
- `{ sessionId: 1 }` (Unique)
- `{ userId: 1 }`
- `{ expiresAt: 1 }` (TTL: `expireAfterSeconds: 0`)

---

### 2.3 `Offer` Model
Collection: `offers`

| Field | Type | Modifiers / Validation | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto-generated Primary Key | - | Unique identifier |
| `title` | String | `required`, `trim`, max 120 chars | - | Offer heading |
| `shortDescription` | String | `required`, `trim`, max 300 chars | - | Card summary |
| `fullDescription` | String | `trim`, max 2000 chars | `""` | Detailed description |
| `imageUrl` | String | `trim`, URL scheme validator | `""` | Architectural image URL |
| `ctaLabel` | String | `trim`, max 50 chars | `""` | Action button text |
| `ctaUrl` | String | `trim`, URL scheme validator | `""` | Destination path |
| `status` | String | `enum: ['draft', 'published', 'archived']`, indexed | `'draft'` | Publication lifecycle status |
| `active` | Boolean | indexed | `false` | Homepage visibility switch |
| `startDate` | Date | - | `null` | Optional start schedule |
| `endDate` | Date | - | `null` | Optional expiration schedule |
| `createdBy` | ObjectId | `ref: 'AdminUser'` | `null` | Creator reference |
| `updatedBy` | ObjectId | `ref: 'AdminUser'` | `null` | Modifier reference |
| `createdAt` / `updatedAt` | Date | Managed by timestamps | - | Timestamps |

**Compound Indexes:**
- `{ status: 1, active: 1, startDate: 1, endDate: 1 }` (Optimized for public homepage queries)

---

### 2.4 `HomepageVideoConfiguration` Model
Collection: `homepagevideoconfigurations`

| Field | Type | Modifiers / Validation | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto-generated Primary Key | - | Unique identifier |
| `youtubeUrl` | String | `required`, `trim` | - | Canonical source link |
| `videoId` | String | `required`, `trim`, 11 chars | - | Normalized video ID |
| `embedUrl` | String | `required`, `trim` | - | Privacy-enhanced embed URL |
| `title` | String | `trim`, max 150 chars | `""` | Video title / aria-label |
| `active` | Boolean | - | `true` | Homepage display toggle |
| `autoplay` | Boolean | - | `true` | Autoplay flag |
| `muted` | Boolean | - | `true` | Muted playback flag |
| `loop` | Boolean | - | `true` | Loop flag |
| `updatedBy` | ObjectId | `ref: 'AdminUser'` | `null` | Modifier reference |
| `createdAt` / `updatedAt` | Date | Managed by timestamps | - | Timestamps |
