# Security Architecture & Authentication Specification

**Document Version:** 1.0.0  
**Status:** Implemented & Verified (Section 04)  
**Last Updated:** 2026-11-22  
**Related Documents:** [ADMIN_PANEL.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/ADMIN_PANEL.md), [API_SPECIFICATION.md](file:///C:/Users/ASUS/OneDrive/Desktop/sushita/docs/API_SPECIFICATION.md)

---

## 1. Security Overview

Administrative access controls the public presentation of the luxury real estate brand. Consequently, the administrative interface follows enterprise defense-in-depth principles across transport, authentication, session lifecycle, and data validation layers.

---

## 2. Authentication & Credential Storage

### A. Password Hashing
- **Algorithm:** `bcrypt` with adaptive salt factor **12**.
- **Plaintext Ban:** Plaintext passwords are never logged, persisted, or stored in temporary variables.
- **Model Shielding:** The `AdminUser` Mongoose schema declares `passwordHash: { select: false }`. Standard queries automatically exclude the password hash unless explicitly requested by the authentication service.
- **Response Sanitization:** Password hashes are stripped before assembling API payloads.

### B. User Enumeration Defense
- Failed login attempts return an identical generic error message: `"Invalid email or password"`.
- Response timing is normalized to prevent timing-based side-channel enumeration of existing administrative email accounts.

### C. Administrator Provisioning
- **No Public Signup:** There is no registration endpoint (`/register` or `/signup`).
- **Protected CLI Command:** New administrators must be provisioned via the secure CLI command:
  ```bash
  npm run admin:create
  ```
- **Zero Default Credentials:** No hardcoded passwords or default administrative accounts exist in the repository.

---

## 3. Session Management Architecture

Rather than storing authentication tokens in vulnerable browser `localStorage` (which is susceptible to Cross-Site Scripting [XSS]), the platform uses **Server-Side Sessions stored in MongoDB with HttpOnly Cookies**:

```text
Browser Client                    Express Backend                    MongoDB
     │                                   │                              │
     ├─── POST /api/v1/admin/auth/login ─┼─────────────────────────────►│ Validate user
     │                                   ├── Generate 64-char hex ID ───┤
     │                                   │                              ├── Store AdminSession
     │                                   ├── Issue HttpOnly Cookie ─────┤ (expires in 24h, TTL)
     │◄── Set-Cookie: admin_session ─────┤                              │
     │                                   │                              │
     ├─── Subsequent Admin Requests ─────┼─────────────────────────────►│ Lookup session
     │    (Cookie automatically sent)    ├── Verified by requireAdmin ──┤ Check expiration
     │                                   │                              │
     ├─── POST /api/v1/admin/auth/logout ┼─────────────────────────────►│ Delete session
     │◄── Clear-Cookie: admin_session ───┤                              │ Session destroyed
```

### Cookie Configuration Standards:
- **`httpOnly: true`**: JavaScript cannot access the cookie via `document.cookie`, neutralizing XSS token theft.
- **`secure: env.isProduction`**: Enforces HTTPS transport in production deployments.
- **`sameSite: 'lax'`**: Protects against Cross-Site Request Forgery (CSRF) on cross-site requests.
- **`maxAge: 86400000`**: 24-hour expiration window.
- **`path: '/'`**: Scoped consistently across the origin.

### Session Lifecycle & Rotation:
- On every successful login, previous active sessions for the user account are deleted, rotating the session identifier.
- Sessions in MongoDB feature a native **Time-To-Live (TTL)** index (`expires: 0` on `expiresAt`), ensuring that expired sessions are automatically purged by the database engine.
- Upon logout, the session document is immediately deleted from MongoDB, and the browser cookie is cleared.

---

## 4. Rate Limiting & Brute-Force Defense

The login portal is protected by `loginRateLimiter` (`express-rate-limit`):
- **Window:** 15 minutes.
- **Threshold:** Maximum 10 login attempts per IP address within the window.
- **Response:** Exceeding the threshold triggers HTTP 429 with `{ "success": false, "error": { "code": "TOO_MANY_REQUESTS", "message": "Too many login attempts..." } }`.

---

## 5. Network & HTTP Hardening

1. **Helmet Security Headers:**
   - HSTS (HTTP Strict Transport Security)
   - X-Content-Type-Options: `nosniff`
   - X-Frame-Options: `SAMEORIGIN`
   - Content Security Policy (CSP) primitives
2. **CORS Whitelisting:**
   - Access restricted strictly to `CLIENT_ORIGIN` (`http://localhost:5173` in development).
   - Arbitrary origin requests are rejected.
3. **Payload Limits:**
   - JSON and URL-encoded body size limited to `10mb` to protect against denial-of-service payload floods.

---

## 6. Verification & Automated Test Results

The automated security test suite (`npm run test:admin`) executed **52 automated assertions** with 100% pass rate:
- Zero password leakage verified in API responses.
- Zero user enumeration verified on non-existent accounts.
- Unauthenticated access blocked on all 4 administrative routes (HTTP 401).
- Session invalidation verified upon logout (re-using old token returns HTTP 401).
- Hostname validation verified rejecting arbitrary external iframes.
