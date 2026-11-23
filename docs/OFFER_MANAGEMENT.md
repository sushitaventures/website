# Homepage Offer Management Specification

**Document Version:** 1.0.0  
**Status:** Implemented & Verified (Section 04)  
**Last Updated:** 2026-11-22  
**Related Documents:** [ADMIN_PANEL.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/ADMIN_PANEL.md), [API_SPECIFICATION.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/API_SPECIFICATION.md)

---

## 1. Overview & Business Intent

The Homepage Offer Management system governs promotional and announcement cards designed to appear after a visitor scrolls past the homepage hero section.

Administrators maintain complete authority over offer text, imagery, publication state, and active display without modifying source code.

---

## 2. Offer Data Schema

| Field | Type | Required? | Validation Rules | Purpose |
|---|---|---|---|---|
| `title` | String | Yes | Trimmed, max 120 characters | Primary offer heading |
| `shortDescription` | String | Yes | Trimmed, max 300 characters | Core summary displayed on the card |
| `fullDescription` | String | No | Trimmed, max 2000 characters | Extended specifications or terms |
| `imageUrl` | String | No | Valid URL scheme (`http://`, `https://`, `/`) | Supporting architectural visual |
| `ctaLabel` | String | No | Trimmed, max 50 characters | Call-to-action button text |
| `ctaUrl` | String | No | Valid URL or path (`/contact`, `https://`) | Button destination link |
| `status` | String | Yes | Enum: `['draft', 'published', 'archived']` | Editorial lifecycle state |
| `active` | Boolean | Yes | Default: `false` | Master public visibility toggle |
| `startDate` | Date | No | Valid ISO Date | Optional scheduled display start |
| `endDate` | Date | No | Valid ISO Date | Optional scheduled display expiry |
| `createdBy` | ObjectId | System | Ref: `AdminUser` | Audit creator record |
| `updatedBy` | ObjectId | System | Ref: `AdminUser` | Audit updater record |
| `createdAt` | Date | System | Auto-managed timestamp | Record creation time |
| `updatedAt` | Date | System | Auto-managed timestamp | Last modification time |

---

## 3. Publication & Visibility Workflow

To guarantee that incomplete work is never exposed to public visitors, the system enforces a strict 4-stage lifecycle:

```text
Draft State (Private)
  └─ Administrator creates or edits content (status = 'draft', active = false).
  └─ Invisible to public API.

Published State (Approved but dormant)
  └─ Administrator reviews and approves content (status = 'published', active = false).
  └─ Ready for campaign activation, but still invisible to public API.

Active State (Live on Homepage)
  └─ Administrator enables toggle (status = 'published', active = true, date window valid).
  └─ Retrieved by public homepage endpoint.

Archived State (Historical)
  └─ Expired or retired offer (status = 'archived', active = false).
  └─ Preserved in database for auditing, omitted from public API.
```

### Public Visibility Rule:
An offer is returned by `GET /api/v1/public/homepage/offers` **if and only if**:
1. `status === 'published'`
2. `active === true`
3. If `startDate` is specified: `startDate <= currentTime`
4. If `endDate` is specified: `endDate >= currentTime`

---

## 4. API Endpoints

### Administrative Endpoints (Session Authentication Required)
- `GET /api/v1/admin/offers`: Lists all offers (supports `?status=` and `?active=` filters).
- `GET /api/v1/admin/offers/:id`: Retrieves full details of a specific offer.
- `POST /api/v1/admin/offers`: Creates a new offer record.
- `PATCH /api/v1/admin/offers/:id`: Updates fields of an existing offer.
- `DELETE /api/v1/admin/offers/:id`: Permanently deletes an offer record.

### Public Endpoint (Unauthenticated, Read-Only)
- `GET /api/v1/public/homepage/offers`:
  - Returns only approved, active offers.
  - Strips internal administrative metadata (`createdBy`, `updatedBy`, `__v`).
  - Response contract:
    ```json
    {
      "success": true,
      "message": "Active published offers retrieved successfully",
      "data": {
        "offers": [
          {
            "_id": "...",
            "title": "...",
            "shortDescription": "...",
            "fullDescription": "...",
            "imageUrl": "...",
            "ctaLabel": "...",
            "ctaUrl": "...",
            "updatedAt": "..."
          }
        ],
        "count": 1
      }
    }
    ```

---

## 5. Pending Homepage Design Decisions (To Be Resolved in Page Design Phase)

The following UI/UX questions remain open for homepage design discussions:
1. **Single vs. Multiple Display:** Should only one featured offer appear at any time, or should multiple active offers be presented in a carousel or grid?
2. **Presentation Format:** Should the offer be a floating bottom-corner card, a modal backdrop popup, or an integrated section card?
3. **Scroll Trigger Threshold:** At what exact scroll distance beyond the hero should the card reveal itself (e.g. 100vh + 200px)?
4. **Session Dismissal:** Should dismissing the card suppress it for the remainder of the user's browser session, or reappear on subsequent page visits?
