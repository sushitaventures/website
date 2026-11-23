# Analytics & Measurement Plan

## 1. Objective & Ethical Principles

This measurement plan establishes privacy-centric performance, organic search, and enquiry tracking.
- **Privacy First**: Fully compliant with GDPR, CCPA, and DPDP regulations. No third-party ad tracking pixels or intrusive fingerprinting.
- **No Unauthorized Account Creation**: All tracking tools require explicit founder configuration and verified credentials.

---

## 2. Organic Search & Indexation Architecture

1. **Google Search Console**:
   - Verification via DNS TXT record or HTML tag verification.
   - Immediate submission of `/sitemap.xml` upon launch.
   - Continuous monitoring of Index Coverage, Page Experience, and Core Web Vitals reports.
2. **Bing Webmaster Tools**:
   - Verification synchronized via Search Console import or DNS.
   - IndexNow API integration enabled on content publish events (Offer activation/updates) to trigger near-instant crawling on Bing and Yandex.
3. **Core Web Vitals & Real User Monitoring (RUM)**:
   - Integration with Google PageSpeed Insights and Chrome User Experience Report (CrUX) APIs for ongoing field performance telemetry.

---

## 3. High-Value Conversion & Interaction Tracking

Tracking focuses strictly on meaningful visitor engagement and business inquiries:

| Event Name | Trigger Condition | Parameters Collected |
| :--- | :--- | :--- |
| `enquiry_form_started` | Visitor focuses on first input in Contact or Service Enquiry form | `service_category`, `source_page` |
| `enquiry_form_submitted` | Successful response from `/api/v1/public/enquiries` | `service_category`, `budget_bracket_selected` |
| `offer_modal_viewed` | Visitor opens the high-priority exclusive offer modal | `offer_id`, `offer_title` |
| `offer_cta_clicked` | Visitor clicks primary action on an active offer | `offer_id`, `action_destination` |
| `video_showcase_played` | Visitor initiates playback on the homepage curated video showcase | `video_id`, `interaction_type` |
| `service_guide_downloaded` | Visitor requests/downloads exclusive advisory overview | `document_title`, `service_category` |

---

## 4. Privacy & Consent Framework

- Consent banner rendered only where legally mandated.
- Cookieless tracking or local anonymized session tokens used for basic conversion metrics.
- All lead submissions store explicit consent timestamps (`consent_given_at`, `privacy_policy_version_agreed`).
