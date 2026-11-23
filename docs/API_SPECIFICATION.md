# API Specification Reference

**Document Version:** 1.0.0  
**Status:** Implemented & Verified (Section 04)  
**Last Updated:** 2026-11-22  
**Base URL:** `/api/v1`

---

## 1. Global Response Standards

All API responses strictly adhere to a standardized JSON schema:

### Success Response Contract
```json
{
  "success": true,
  "message": "Human-readable confirmation message",
  "data": { ... }
}
```

### Error Response Contract
```json
{
  "success": false,
  "error": {
    "code": "MACHINE_READABLE_ERROR_CODE",
    "message": "Human-readable error explanation",
    "details": null
  }
}
```

---

## 2. Infrastructure & Health Endpoints

### 2.1 Health Probe
- **Route:** `GET /api/v1/health`
- **Auth Required:** None (Public)
- **Response:**
  ```json
  {
    "success": true,
    "message": "API is operational",
    "data": {
      "status": "healthy",
      "uptimeSeconds": 142,
      "timestamp": "2026-11-22T08:36:44.122Z",
      "environment": "development"
    }
  }
  ```

### 2.2 Readiness Probe
- **Route:** `GET /api/v1/health/ready` or `GET /api/v1/ready`
- **Auth Required:** None (Public)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Service is ready",
    "data": {
      "ready": true,
      "status": "ready",
      "service": "luxury-real-estate-api",
      "environment": "development",
      "database": {
        "configured": true,
        "status": "connected",
        "name": "luxury_real_estate"
      }
    }
  }
  ```

---

## 3. Administrative Authentication Endpoints

### 3.1 Administrator Login
- **Route:** `POST /api/v1/admin/auth/login`
- **Auth Required:** None (Rate-limited: 10 attempts / 15 mins)
- **Request Body:**
  ```json
  {
    "email": "admin@luxuryrealestate.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response (200 OK):**
  - Sets `Set-Cookie: admin_session=...; HttpOnly; SameSite=Lax; Path=/`
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "673cf8...",
        "email": "admin@luxuryrealestate.com",
        "role": "admin",
        "lastLoginAt": "2026-11-22T09:00:00.000Z"
      },
      "sessionId": "64-character-hex-token"
    }
  }
  ```
- **Errors:** `400 VALIDATION_ERROR`, `401 INVALID_CREDENTIALS`, `429 TOO_MANY_REQUESTS`.

### 3.2 Administrator Logout
- **Route:** `POST /api/v1/admin/auth/logout`
- **Auth Required:** Optional (reads cookie or bearer token if present)
- **Response (200 OK):**
  - Clears `admin_session` cookie
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### 3.3 Current Administrator Profile
- **Route:** `GET /api/v1/admin/auth/me`
- **Auth Required:** Active Administrator Session
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Current administrator session retrieved",
    "data": {
      "user": {
        "id": "673cf8...",
        "email": "admin@luxuryrealestate.com",
        "role": "admin"
      }
    }
  }
  ```
- **Errors:** `401 UNAUTHORIZED`, `401 SESSION_EXPIRED`.

---

## 4. Administrative Offer Management Endpoints

*All endpoints under `/api/v1/admin/offers` require active Administrator Session authentication.*

### 4.1 List All Offers
- **Route:** `GET /api/v1/admin/offers`
- **Query Parameters:**
  - `status` (Optional): `'draft' | 'published' | 'archived'`
  - `active` (Optional): `'true' | 'false'`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Offers retrieved successfully",
    "data": {
      "offers": [ ... ],
      "count": 3
    }
  }
  ```

### 4.2 Get Offer by ID
- **Route:** `GET /api/v1/admin/offers/:id`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Offer retrieved successfully",
    "data": { "offer": { ... } }
  }
  ```
- **Errors:** `404 NOT_FOUND`.

### 4.3 Create New Offer
- **Route:** `POST /api/v1/admin/offers`
- **Request Body:**
  ```json
  {
    "title": "Waterfront Villa Launch",
    "shortDescription": "Exclusive residences with private yacht berths.",
    "fullDescription": "Optional detailed specifications...",
    "imageUrl": "https://images.example.com/villa.jpg",
    "ctaLabel": "Inquire Privately",
    "ctaUrl": "/contact",
    "status": "draft",
    "active": false,
    "startDate": null,
    "endDate": null
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Offer created successfully",
    "data": { "offer": { ... } }
  }
  ```
- **Errors:** `400 VALIDATION_ERROR`.

### 4.4 Update Offer
- **Route:** `PATCH /api/v1/admin/offers/:id`
- **Request Body:** Any subset of offer fields.
- **Response (200 OK):** Returns updated offer.

### 4.5 Delete Offer
- **Route:** `DELETE /api/v1/admin/offers/:id`
- **Response (200 OK):** `{ "success": true, "message": "Offer deleted successfully", "data": { "id": "..." } }`.

---

## 5. Administrative YouTube Video Management Endpoints

*All endpoints under `/api/v1/admin/homepage/video` require active Administrator Session authentication.*

### 5.1 Get Video Configuration
- **Route:** `GET /api/v1/admin/homepage/video`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Homepage video configuration retrieved",
    "data": {
      "config": {
        "_id": "...",
        "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "videoId": "dQw4w9WgXcQ",
        "embedUrl": "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&playsinline=1",
        "title": "Architectural Estate Tour",
        "active": true,
        "autoplay": true,
        "muted": true,
        "loop": true,
        "updatedAt": "2026-11-22T09:00:00.000Z"
      }
    }
  }
  ```

### 5.2 Update Video Configuration
- **Route:** `PUT /api/v1/admin/homepage/video`
- **Request Body:**
  ```json
  {
    "youtubeUrl": "https://youtu.be/dQw4w9WgXcQ",
    "title": "Architectural Estate Tour",
    "active": true,
    "autoplay": true,
    "muted": true,
    "loop": true
  }
  ```
- **Response (200 OK):** Returns updated configuration.
- **Errors:** `400 INVALID_YOUTUBE_URL`.

---

## 6. Public Homepage Content Endpoints

*These endpoints are completely unauthenticated and read-only, engineered for fast consumer consumption.*

### 6.1 Get Active Published Offers
- **Route:** `GET /api/v1/public/homepage/offers`
- **Auth Required:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Active published offers retrieved successfully",
    "data": {
      "offers": [
        {
          "_id": "673cf8...",
          "title": "Waterfront Villa Launch",
          "shortDescription": "Exclusive residences with private yacht berths.",
          "fullDescription": "Optional detailed specifications...",
          "imageUrl": "https://images.example.com/villa.jpg",
          "ctaLabel": "Inquire Privately",
          "ctaUrl": "/contact",
          "updatedAt": "2026-11-22T09:00:00.000Z"
        }
      ],
      "count": 1
    }
  }
  ```

### 6.2 Get Active Homepage Video
- **Route:** `GET /api/v1/public/homepage/video`
- **Auth Required:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Active homepage video configuration retrieved successfully",
    "data": {
      "video": {
        "videoId": "dQw4w9WgXcQ",
        "embedUrl": "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&playsinline=1",
        "title": "Architectural Estate Tour",
        "autoplay": true,
        "muted": true,
        "loop": true,
        "updatedAt": "2026-11-22T09:00:00.000Z"
      }
    }
  }
  ```
  *(Returns `"video": null` if unconfigured or marked inactive).*
