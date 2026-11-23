# Homepage YouTube Video Management Specification

**Document Version:** 1.0.0  
**Status:** Implemented & Verified (Section 04)  
**Last Updated:** 2026-11-22  
**Related Documents:** [ADMIN_PANEL.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/ADMIN_PANEL.md), [API_SPECIFICATION.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/API_SPECIFICATION.md)

---

## 1. Overview & Business Intent

The Homepage Video Management module enables administrators to configure and update the featured architectural film or promotional video displayed on the homepage without altering code or re-deploying the application.

---

## 2. YouTube URL Parsing & Strict Validation

To prevent malicious injection of arbitrary iframes, tracking pixels, or external video players, the server parses and sanitizes all input using `server/src/utils/youtube.js`:

### Approved Hostname Whitelist
Only URLs originating from the following official YouTube domains are accepted:
- `youtube.com`
- `www.youtube.com`
- `m.youtube.com`
- `youtu.be`
- `www.youtube-nocookie.com`

### Supported URL Formats
- Standard watch URLs: `https://www.youtube.com/watch?v=VIDEO_ID`
- Shortened URLs: `https://youtu.be/VIDEO_ID`
- Direct embed URLs: `https://www.youtube.com/embed/VIDEO_ID`
- URLs with timestamps or extra tracking parameters: `https://youtu.be/VIDEO_ID?t=15s`

### Video ID Enforcement
- The system extracts and enforces an exact **11-character alphanumeric string** (plus `-` and `_`).
- Any URL failing to yield a valid 11-character video ID is immediately rejected with HTTP 400.

### Privacy-Enhanced Embed Transformation
The server automatically transforms validated video IDs into privacy-enhanced embed endpoints:
```text
https://www.youtube-nocookie.com/embed/{videoId}?rel=0&modestbranding=1&playsinline=1
```
This minimizes third-party tracking cookies on the luxury brand's visitors until the user actively interacts with playback.

---

## 3. Data Schema (`HomepageVideoConfiguration`)

| Field | Type | Required? | Purpose |
|---|---|---|---|
| `youtubeUrl` | String | Yes | Canonical source URL (`https://www.youtube.com/watch?v=...`) |
| `videoId` | String | Yes | Extracted 11-character video identifier |
| `embedUrl` | String | Yes | Privacy-enhanced embed URL |
| `title` | String | No | Video title / accessible aria-label |
| `active` | Boolean | Yes | Master homepage visibility switch (default: `true`) |
| `autoplay` | Boolean | Yes | Viewport enter autoplay instruction (default: `true`) |
| `muted` | Boolean | Yes | Initial audio state (default: `true`) |
| `loop` | Boolean | Yes | Video loop parameter (default: `true`) |
| `updatedBy` | ObjectId | System | Ref: `AdminUser` audit record |
| `createdAt` / `updatedAt` | Date | System | Auto-managed timestamps |

---

## 4. Playback Standards & Browser Compliance

1. **Muted Autoplay Standard:** Modern web browsers (Chrome, Safari, Edge, Firefox, iOS/Android WebKit) strictly block unmuted autoplay. The video configuration defaults to `muted: true` so the video can play smoothly upon entering the viewport.
2. **Visitor Sound Controls:** Visitors are provided an explicit sound toggle on the UI to enable audio intentionally.
3. **Graceful Loading & Poster:** If network conditions delay iframe loading or autoplay is restricted by low-power mode, the player displays a high-resolution poster frame.
4. **No Raw HTML Execution:** The admin UI only accepts the URL string; raw administrator `<iframe src="...">` inputs are strictly prohibited.

---

## 5. API Contracts

### Administrative Endpoint (Session Auth Required)
- `GET /api/v1/admin/homepage/video`: Retrieves current video configuration and update history.
- `PUT /api/v1/admin/homepage/video`: Validates URL, updates or creates singleton configuration document.

### Public Endpoint (Unauthenticated, Read-Only)
- `GET /api/v1/public/homepage/video`:
  - If video is active: Returns `{ "success": true, "data": { "video": { "videoId": "...", "embedUrl": "...", "title": "...", "autoplay": true, "muted": true, "loop": true, "updatedAt": "..." } } }`.
  - If video is disabled / unconfigured: Returns `{ "success": true, "data": { "video": null } }`.
  - Strips all administrator credentials, user IDs, and internal audit fields.

---

## 6. Pending Homepage Design Decisions

The following presentation questions will be finalized during homepage visual design:
1. **Aspect Ratio & Frame:** Should the video be 16:9 fixed, 21:9 cinematic letterbox, or full-width bleed?
2. **Trigger Mechanism:** Should autoplay start on page load, or strictly when the video container enters 25% of the viewport?
3. **Sound Control Aesthetics:** Custom brand-styled mute/unmute floating pill vs. standard YouTube player chrome.
4. **Mobile Fallback:** Should the video display inline on mobile, or transform into a tap-to-expand modal?
