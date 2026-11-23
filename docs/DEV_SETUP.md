# Developer Setup Guide

## 1. System Prerequisites

Before running the application, ensure the following tools are installed:

- **Node.js:** v20.x, v22.x, or v24.x LTS (current environment verified: Node `v24.14.1`).
- **npm:** v10.x or v11.x (current environment verified: npm `11.6.1`).
- **Git:** v2.40+ (current environment verified: git `2.47.1`).
- **MongoDB (Optional in Dev):** Local MongoDB instance or MongoDB Atlas connection URI. If omitted in development, the API runs in unconfigured database mode.

---

## 2. Initial Installation

From the project root:

```bash
npm install
```

This installs all dependencies across the root workspace, the `client` workspace, and the `server` workspace in one step.

---

## 3. Environment Setup

### Backend Environment (`server/.env`)
Copy the example file:
```bash
cp server/.env.example server/.env
```
Default values:
```env
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=
LOG_LEVEL=info
```
*Tip: If connecting to a local MongoDB instance, set `MONGODB_URI=mongodb://127.0.0.1:27017/luxury_real_estate`.*

### Frontend Environment (`client/.env`)
Copy the example file:
```bash
cp client/.env.example client/.env
```
Default value:
```env
VITE_API_BASE_URL=/api/v1
```

---

## 4. Running the Development Environment

### Start Both Frontend and Backend Concurrently
From the project root:
```bash
npm run dev
```
This launches:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:5173`

### Start Services Individually

To start only the backend:
```bash
npm run dev:server
```

To start only the frontend:
```bash
npm run dev:client
```

---

## 5. Building for Production

To build the client SPA for production:
```bash
npm run build
```
The compiled, minified assets will be emitted into `client/dist/`.

---

## 6. Probing Health & Verification

- **Frontend Diagnostic Screen:** Open `http://localhost:5173` in your browser.
- **Backend API Health Probe:**
  ```bash
  curl http://localhost:5000/api/v1/health
  ```
- **Backend Database Readiness Probe:**
  ```bash
  curl http://localhost:5000/api/v1/health/ready
  ```
- **Proxied Health Probe (via Vite):**
  ```bash
  curl http://localhost:5173/api/v1/health
  ```

---

## 7. Troubleshooting

- **Port in use (5000 or 5173):** Check if another instance of Node is running using `netstat -ano | findstr :5000` and terminate it, or change the `PORT` in `server/.env`.
- **Database probe reports "unconfigured":** This is expected in development when `MONGODB_URI` is blank. Add a valid URI to `server/.env` and restart the backend.
