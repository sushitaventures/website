import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090a0f', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#12141c', border: '1px solid #1e2230', borderRadius: '16px', padding: '36px 32px' }}>
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.02em' }}>
            Administrator Access
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#8b92a5', marginTop: '6px' }}>
            Sign in to manage approved website content & settings
          </p>
        </div>

        {errorMessage && (
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '8px', padding: '12px 14px', color: '#f87171', fontSize: '0.85rem', marginBottom: '20px' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
              Administrator Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@luxuryrealestate.com"
              style={{
                width: '100%',
                padding: '11px 14px',
                background: '#090a0f',
                border: '1px solid #2d3345',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{
                width: '100%',
                padding: '11px 14px',
                background: '#090a0f',
                border: '1px solid #2d3345',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: '#00d2ff',
              color: '#090a0f',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              marginTop: '6px',
              opacity: submitting ? 0.7 : 1
            }}
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1e2230', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
          Security notice: Authorized administrative access only. Session tokens are protected via HttpOnly cookies.
        </div>
      </div>
    </div>
  );
};
