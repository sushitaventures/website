# Architecture Documentation — Luxury Real Estate MERN Platform

## 1. High-Level Architecture Overview

This project implements a decoupled, modern MERN architecture structured as an npm workspaces monorepo:

```
luxury-real-estate (root workspace)
├── client/   (React 19, Vite 8, React Router 7, SPA frontend)
├── server/   (Node.js 24, Express 5, Mongoose 9, RESTful API backend)
├── docs/     (System architecture, developer guides, technical decisions)
└── .agents/  (MotionSites Web Builder skill and design methodology)
```

The system strictly decouples the client user interface from the server-side business logic and data persistence layers.

---

## 2. Frontend Architecture (`client/`)

- **Runtime & Bundler:** React 19 SPA bundled with Vite 8.
- **Routing:** React Router 7 handling client-side navigation.
- **Centralized API Layer:** `services/apiClient.js` provides a centralized HTTP transport wrapper around standard `fetch`, standardizing error handling, headers, timeouts, and JSON unwrapping.
- **Modular Directory Organization:**
  - `src/components/`: Reusable, generic UI primitives (Badges, Cards, Loaders).
  - `src/features/`: Domain-specific business logic (reserved for properties, inquiries, etc.).
  - `src/layouts/`: Common layout frames (reserved for future public and admin shells).
  - `src/pages/`: Route-level entry screens (e.g., `DevStatusPage.jsx` during foundation).
  - `src/routes/`: Router registration and route configuration (`AppRoutes.jsx`).
  - `src/services/`: External API consumers and centralized HTTP clients.
  - `src/styles/`: Global CSS tokens and resets.
- **Development Proxy:** Vite proxies all `/api` requests to `http://localhost:5000`, eliminating cross-origin complications during local development.

---

## 3. Backend Architecture (`server/`)

- **Framework:** Express 5 running on Node.js 24 (ES Modules native).
- **Layered Pattern:**
  - **Routes (`routes/`):** Route definition and parameter mapping only. Zero business logic.
  - **Controllers (`controllers/`):** Request validation, parameter extraction, calling service methods, formatting responses. Zero direct database queries.
  - **Services (`services/`):** Domain logic, transaction coordination, and business operations.
  - **Models (`models/`):** Mongoose schemas and data persistence rules.
  - **Middlewares (`middlewares/`):** Cross-cutting concerns (security headers, CORS, request logging, centralized 404, error recovery).
  - **Config (`config/`):** Typed environment access and database lifecycle management.
- **Response Normalization:** All responses follow a consistent schema:
  - Success: `{ "success": true, "message": "...", "data": { ... } }`
  - Failure: `{ "success": false, "error": { "code": "...", "message": "...", "details": ... } }`

---

## 4. Database Integration & Resilience (`server/src/config/database.js`)

- **Driver:** Mongoose 9.x.
- **Connection Isolation:** Connection logic is completely decoupled from Express route handlers.
- **Honest Resilience:**
  - In development mode (`NODE_ENV=development`), if `MONGODB_URI` is blank or unconfigured, the application logs a clear warning and stays online without crashing. Health probes return HTTP 200, while readiness probes report `{ "status": "unconfigured" }`.
  - In production mode (`NODE_ENV=production`), missing database configuration triggers an immediate fatal startup error to prevent serving invalid states.
- **Graceful Lifecycle:** Handles `SIGINT` and `SIGTERM` signals, terminating Mongoose connections cleanly before exiting the process.

---

## 5. Security & Isolation Boundaries

1. **Environment Segregation:** Server secrets (MongoDB URIs, API keys) never touch Vite or client bundles. Client code only accesses `VITE_`-prefixed variables.
2. **HTTP Hardening:** Helmet automatically sets secure headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options).
3. **CORS Governance:** Access is restricted to `CLIENT_ORIGIN` (`http://localhost:5173` in local development).
4. **Information Leakage Prevention:** Stack traces and internal database errors are completely suppressed in production API responses.
