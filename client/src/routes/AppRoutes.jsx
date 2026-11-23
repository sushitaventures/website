import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { ProtectedRoute } from '../components/admin/ProtectedRoute.jsx';
import { AdminLayout } from '../components/admin/AdminLayout.jsx';
import { HomePage } from '../pages/public/HomePage.jsx';
import { AboutPage } from '../pages/public/AboutPage.jsx';
import { ContactPage } from '../pages/public/ContactPage.jsx';
import { ServiceDetailPage } from '../pages/public/ServiceDetailPage.jsx';
import { DevStatusPage } from '../pages/DevStatusPage.jsx';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage.jsx';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage.jsx';
import { AdminOffersPage } from '../pages/admin/AdminOffersPage.jsx';
import { AdminVideoPage } from '../pages/admin/AdminVideoPage.jsx';

/**
 * Temporary Section Placeholder Component
 * Clarifies that full individual service, about, and contact pages will be developed in future sections
 */
const SectionPlaceholder = ({ title, category }) => (
  <div style={{
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: 'var(--color-bg-canvas)',
    color: 'var(--color-text-primary)'
  }}>
    <span style={{
      fontSize: '0.75rem',
      letterSpacing: '0.2em',
      color: 'var(--color-text-accent)',
      textTransform: 'uppercase',
      marginBottom: '1rem'
    }}>
      {category || 'SECTION UNDER DESIGN'}
    </span>
    <h1 style={{
      fontFamily: 'var(--font-family-serif)',
      fontSize: '2.5rem',
      marginBottom: '1rem',
      fontWeight: '500'
    }}>
      {title}
    </h1>
    <p style={{
      maxWidth: '540px',
      color: 'var(--color-text-secondary)',
      lineHeight: '1.6',
      marginBottom: '2rem'
    }}>
      This dedicated section will be implemented in subsequent phases following founder discovery.
    </p>
    <Link to="/" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.85rem 1.75rem',
      border: '1px solid var(--color-border-medium)',
      color: 'var(--color-text-primary)',
      fontSize: '0.8rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      textDecoration: 'none'
    }}>
      <span>Return to Homepage</span>
    </Link>
  </div>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Cinematic Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Public About Us Page */}
          <Route path="/about" element={<AboutPage />} />

          {/* Public Contact Us Page */}
          <Route path="/contact" element={<ContactPage />} />
          {/* Public Services Detail Pages */}
          <Route path="/services/:slug" element={<ServiceDetailPage />} />

          {/* Diagnostic Probe Route preserved */}
          <Route path="/status" element={<DevStatusPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Console */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="homepage/offers" element={<AdminOffersPage />} />
            <Route path="homepage/video" element={<AdminVideoPage />} />
          </Route>

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', marginTop: '100px', color: '#8b92a5', fontFamily: 'var(--font-mono)' }}>
                <h2>404 — Not Found</h2>
                <p style={{ marginTop: '10px' }}>The requested route does not exist.</p>
                <Link to="/" style={{ color: '#c5a880', display: 'inline-block', marginTop: '16px' }}>
                  Return to Homepage
                </Link>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
