import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useSeo } from '../../seo/useSeo.js';
import '../../components/admin/admin.css';

export const AdminLoginPage = () => {
  useSeo('/admin/login', { noindex: true, title: 'Admin Sign In | Sushita Ventures' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    if (result.success) navigate(from, { replace: true });
    else setErrorMessage(result.error || 'Email or password is incorrect.');
  };

  return (
    <div className="adm adm-login">
      <div className="adm-login-art" aria-hidden="true">
        <div>
          <img src="/images/branding/logo.png" alt="" />
          <p>Where trust builds wealth.</p>
        </div>
      </div>

      <div className="adm-login-form">
        <div>
          <h1 className="adm-title">Sign in</h1>
          <p className="adm-sub" style={{ marginBottom: 28 }}>Manage enquiries, offers and the homepage film.</p>

          {errorMessage && <div className="adm-login-error" role="alert">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="adm-form">
            <div className="adm-field">
              <label className="adm-label" htmlFor="adm-email">Email</label>
              <input
                id="adm-email"
                className="adm-input"
                type="email"
                required
                autoComplete="username"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="adm-field">
              <label className="adm-label" htmlFor="adm-password">Password</label>
              <div className="adm-pw">
                <input
                  id="adm-password"
                  className="adm-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="adm-btn adm-btn-primary" disabled={submitting} style={{ padding: '12px', marginTop: 4 }}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
