import React, { useState, useEffect } from 'react';
import { Badge } from '../components/Badge.jsx';
import { StatusCard } from '../components/StatusCard.jsx';
import { getHealth, getReadiness } from '../services/healthService.js';

export const DevStatusPage = () => {
  const [health, setHealth] = useState({ loading: true, data: null, error: null });
  const [readiness, setReadiness] = useState({ loading: true, data: null, error: null });
  const [lastCheck, setLastCheck] = useState(null);

  const fetchStatus = async () => {
    setHealth((prev) => ({ ...prev, loading: true, error: null }));
    setReadiness((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const healthRes = await getHealth();
      setHealth({ loading: false, data: healthRes, error: null });
    } catch (err) {
      setHealth({ loading: false, data: null, error: err.message });
    }

    try {
      const readyRes = await getReadiness();
      setReadiness({ loading: false, data: readyRes, error: null });
    } catch (err) {
      setReadiness({ loading: false, data: null, error: err.message });
    }

    setLastCheck(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const containerStyle = {
    maxWidth: '960px',
    margin: '40px auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const headerStyle = {
    borderBottom: '1px solid var(--surface-border)',
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const descStyle = {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginTop: '6px'
  };

  const refreshBtnStyle = {
    background: '#1a1d29',
    color: '#e2e8f0',
    border: '1px solid #2d3345',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)'
  };

  const disclaimerBannerStyle = {
    background: 'rgba(0, 210, 255, 0.05)',
    border: '1px solid rgba(0, 210, 255, 0.2)',
    borderRadius: '8px',
    padding: '14px 18px',
    fontSize: '0.85rem',
    color: '#bae6fd',
    lineHeight: '1.5'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            Technical Foundation Diagnostic
            <Badge variant="cyan">Section 02</Badge>
          </h1>
          <p style={descStyle}>
            Internal development environment diagnostic screen. Verifies React runtime, Vite dev proxy, Express REST API, and MongoDB connection probes.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <button style={refreshBtnStyle} onClick={fetchStatus}>
            ↻ Re-check Probes
          </button>
          {lastCheck && (
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              Last probe: {lastCheck}
            </span>
          )}
        </div>
      </header>

      <div style={disclaimerBannerStyle}>
        <strong>Note:</strong> This is a minimal infrastructure diagnostic screen for Section 02 verification. Public website layout, branding, property catalog, architectural visuals, and admin workflows are scheduled for subsequent phases.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Frontend Subsystem */}
        <StatusCard
          title="Frontend Subsystem"
          subtitle="React 19 + Vite 8 Runtime"
          status={<Badge variant="success">Operational</Badge>}
          details={{
            runtime: 'React 19.x (ESM)',
            bundler: 'Vite 8.x',
            router: 'React Router 7.x',
            clientPort: 5173,
            apiProxy: 'Vite /api -> http://localhost:5000'
          }}
        />

        {/* Backend Subsystem */}
        <StatusCard
          title="Backend Subsystem"
          subtitle="Express 5 REST API probe (/api/v1/health)"
          status={
            health.loading ? (
              <Badge variant="default">Checking...</Badge>
            ) : health.error ? (
              <Badge variant="danger">Unreachable</Badge>
            ) : (
              <Badge variant="success">Connected</Badge>
            )
          }
          details={health.data ? health.data : health.loading ? 'Querying backend...' : null}
          error={health.error}
        />

        {/* Database Subsystem */}
        <StatusCard
          title="Database Subsystem"
          subtitle="Mongoose & MongoDB probe (/api/v1/health/ready)"
          status={
            readiness.loading ? (
              <Badge variant="default">Probing...</Badge>
            ) : readiness.error ? (
              <Badge variant="danger">Probe Error</Badge>
            ) : readiness.data?.data?.database?.status === 'connected' ? (
              <Badge variant="success">Connected</Badge>
            ) : (
              <Badge variant="warning">{readiness.data?.data?.database?.status || 'Unconfigured'}</Badge>
            )
          }
          details={readiness.data ? readiness.data.data?.database : readiness.loading ? 'Probing connection...' : null}
          error={readiness.error}
        />
      </div>

      {/* Environment & Architecture Summary */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '20px 24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px', color: '#f0f2f8' }}>
          Configured Architecture Specifications
        </h3>
        <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.8' }}>
          <li><strong>Architecture:</strong> Decoupled MERN stack with npm workspaces (`client`, `server`).</li>
          <li><strong>Security:</strong> Helmet security headers, CORS origin enforcement, request limiters.</li>
          <li><strong>Resilience:</strong> Centralized async error handling, standardized JSON schema, zero credential leakage.</li>
          <li><strong>MotionSites Skill:</strong> Preserved in workspace `.agents/skills/motionsites-web-builder` for upcoming design phases.</li>
        </ul>
      </div>
    </div>
  );
};
