# Environment Configuration Reference

This document details all environment variables across the client and server applications.

---

## 1. Security Principles

1. **Zero Secret Leakage:** Never commit `.env` files to source control. Only commit `.env.example` templates.
2. **Strict Boundary:** Variables without the `VITE_` prefix are strictly invisible to the client code.
3. **Fail-Fast in Production:** Production environments must validate that all mandatory parameters are set during startup.

---

## 2. Server Configuration (`server/.env`)

| Variable | Type | Default | Required in Prod? | Purpose | Security Notes |
|---|---|---|---|---|---|
| `NODE_ENV` | String | `development` | Yes | Defines application runtime mode (`development`, `production`, `test`). | Influences error stack trace display and strict validation. |
| `PORT` | Number | `5000` | No | Port on which the Express HTTP server listens. | Non-sensitive. |
| `CLIENT_ORIGIN` | String | `http://localhost:5173` | Yes | Allowed origin URL for CORS policy enforcement. | Prevents unauthorized cross-origin browser requests. |
| `MONGODB_URI` | String | `""` | Yes | MongoDB connection string (local URI or MongoDB Atlas SRV). | **CRITICAL SECRET.** Contains connection credentials. Never share or commit. |
| `LOG_LEVEL` | String | `info` | No | Logging verbosity (`debug`, `info`, `warn`, `error`). | Non-sensitive. |

---

## 3. Client Configuration (`client/.env`)

| Variable | Type | Default | Required in Prod? | Purpose | Security Notes |
|---|---|---|---|---|---|
| `VITE_API_BASE_URL` | String | `/api/v1` | No | Base path prefix for all backend API calls made by the client. | In development, points to relative `/api/v1` (proxied by Vite). In production, set to full API domain if decoupled. |

---

## 4. Setting Up MongoDB URI

### Local MongoDB
If running a local MongoDB daemon on standard port 27017:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/luxury_real_estate
```

### MongoDB Atlas
When connecting to a remote MongoDB Atlas cluster:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/luxury_real_estate?retryWrites=true&w=majority
```
