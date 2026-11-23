# Contact Us & Enquiry Architecture Requirements

**Last Updated:** 2026-11-22  
**Status:** Approved Initial Scope  
**Related Documents:** [WEBSITE_SITEMAP.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/WEBSITE_SITEMAP.md), [OPEN_QUESTIONS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/OPEN_QUESTIONS.md)

---

## 1. Overview & Source Attribution

These requirements capture the luxury enquiry intake framework derived from the initial handwritten reference shared for the Contact Us interface.

The Contact Us page serves as the primary transaction and advisory intake portal for the firm.

---

## 2. Contact Form Field Structure

| Field Name | Technical Key | Initial Status | Field Type | Placeholder / Guidance | Validation Considerations (Pending) |
|---|---|---|---|---|---|
| **Name** | `fullName` | **Required** | Single-line Text | "Full Name" | Min 2 chars, trim whitespace |
| **Phone Number** | `phoneNumber` | **Required** | Tel Input | "Phone Number (with country code)" | E.164 standard / regex; international vs. domestic |
| **Email** | `email` | **To be confirmed** | Email Input | "Email Address" | Standard RFC 5322 email regex |
| **City** | `city` | **To be confirmed** | Single-line Text | "City / Region" | Free text vs. pre-populated city selector |
| **Looking For** | `categoryInterest`| **Required** | Dropdown / Selectable Chips | "Select Asset or Service Category" | Must match verified business categories |

---

## 3. "Looking For" Category Options

The initial 8 selectable categories based on verified project scope:

1. **Residential** *(Includes reference concepts: Independent Houses, Flats)*
2. **Commercial**
3. **Industrial**
4. **Land / Plots**
5. **Hotels**
6. **Leasing**
7. **Exchange Property**
8. **Sick Property** *(Terminology flagged: "Sick Property" vs. "Sell Property")*

### Critical Architectural Observations:
- **Residential in Form vs. Navigation:** Notice that **Residential** is explicitly listed in the Contact reference options (alongside Independent houses & Flats), yet it was not present as an individual subpage in the primary Services navigation dropdown. This discrepancy is formally documented in [OPEN_QUESTIONS.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/OPEN_QUESTIONS.md).
- **Secondary Granularity:** Additional concepts from the reference image include *Independent houses* and *Flats* under Residential, and *Selling Property* under Exchange/Disposition. When the original reference image is resupplied, we will determine if a dynamic secondary sub-category selector is required based on the primary category chosen.

---

## 4. Conceptual Enquiry Data Model

```json
{
  "enquiryId": "uuid-v4",
  "contact": {
    "fullName": "String (Required)",
    "phoneNumber": "String (Required, E.164 format)",
    "email": "String (Optional / TBC)",
    "city": "String (Optional / TBC)"
  },
  "interest": {
    "primaryCategory": "residential | commercial | industrial | land_plots | hotels | leasing | exchange_property | sick_property",
    "subCategory": "independent_house | flat | null (TBC)",
    "enquiryType": "buy | sell | lease | exchange | advisory (TBC)"
  },
  "metadata": {
    "sourcePage": "String (/contact, /services/commercial, etc.)",
    "utmParameters": {
      "source": "String",
      "campaign": "String"
    },
    "consentGiven": "Boolean (Required)",
    "submittedAt": "ISO8601 Timestamp",
    "ipAddress": "String (Hashed/Anonymized for privacy)",
    "status": "new | contacted | qualified | closed (Admin tracking)"
  }
}
```
*Note: Conceptual only. No database models or collections are implemented in this phase.*

---

## 5. Privacy, Consent & Discretion Standards

1. **Explicit Consent Checkbox:** A dedicated checkbox stating: *"I agree to receive confidential property communications and accept the privacy terms."*
2. **Luxury Discretion Guarantee:** Prominent microcopy assuring high-net-worth visitors that *"All inquiries are handled with strict institutional confidentiality. Your information is never shared with third-party brokers."*
3. **No Public Tracking / Spam Protection:** Server-side rate limiting and invisible CAPTCHA / bot detection (without intrusive user challenges) to preserve a frictionless luxury experience.

---

## 6. Submission Confirmation & Notification Architecture

- **Client-Side UX:** On successful submission, transition the form container into an elegant confirmation state:
  - *"Thank you for your inquiry. A senior advisory partner will connect with you discreetly within 24 business hours."*
  - Display enquiry reference number.
- **Server-Side Dispatch (To be implemented in backend phase):**
  - Instant transactional confirmation email to client (if email provided).
  - Internal notification alert to the founders / designated advisory desk.

---

## 7. Open Questions Flagged for Founder Approval

1. **Mandatory vs. Optional Fields:** Should `email` and `city` be mandatory for form submission, or kept optional to lower friction for high-net-worth callers?
2. **Phone Number Formatting:** What primary country format should be prioritized (e.g., India +91, UAE +971, UK +44, US +1)?
3. **Residential Classification:** Should Residential properties be elevated to a top-level service page or remain solely an inquiry category?
4. **Distressed Asset Terminology:** Formal sign-off on "Sick Property" vs. "Sell Property".
