import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { BusinessProvider } from '../context/BusinessContext.jsx';
import { ProtectedRoute } from '../components/admin/ProtectedRoute.jsx';
import { SmoothScrollProvider } from '../components/common/SmoothScrollProvider.jsx';
import { HomePage } from '../pages/public/HomePage.jsx';

// Route-level code splitting: the home page ships in the main bundle; every other page
// (and the whole admin panel) is its own chunk, downloaded only when visited.
const named = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })));
const AboutPage = named(() => import('../pages/public/AboutPage.jsx'), 'AboutPage');
const ContactPage = named(() => import('../pages/public/ContactPage.jsx'), 'ContactPage');
const ServiceDetailPage = named(() => import('../pages/public/ServiceDetailPage.jsx'), 'ServiceDetailPage');
const DevStatusPage = named(() => import('../pages/DevStatusPage.jsx'), 'DevStatusPage');
const AdminLayout = named(() => import('../components/admin/AdminLayout.jsx'), 'AdminLayout');
const AdminLoginPage = named(() => import('../pages/admin/AdminLoginPage.jsx'), 'AdminLoginPage');
const AdminDashboardPage = named(() => import('../pages/admin/AdminDashboardPage.jsx'), 'AdminDashboardPage');
const AdminOffersPage = named(() => import('../pages/admin/AdminOffersPage.jsx'), 'AdminOffersPage');
const AdminVideoPage = named(() => import('../pages/admin/AdminVideoPage.jsx'), 'AdminVideoPage');
const AdminEnquiriesPage = named(() => import('../pages/admin/AdminEnquiriesPage.jsx'), 'AdminEnquiriesPage');

// Shown for the instant a page chunk loads — matches the dark page background, so no flash
const PageFallback = () => <div style={{ minHeight: '100vh', background: '#111412' }} aria-busy="true" />;

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
      textTransform: 'none',
      marginBottom: '1rem'
    }}>
      {category || 'Section Under Design'}
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
      textTransform: 'none',
      textDecoration: 'none'
    }}>
      <span>Return to Homepage</span>
    </Link>
  </div>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <BusinessProvider>
          <AuthProvider>
            <Suspense fallback={<PageFallback />}>
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
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
          </Route>

          {/* Unknown URLs: send visitors to the homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
            </Suspense>
      </AuthProvider>
    </BusinessProvider>
  </SmoothScrollProvider>
  </BrowserRouter>
  );
};
