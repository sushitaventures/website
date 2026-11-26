import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useSeo } from '../../seo/useSeo.js';
import { apiClient } from '../../services/apiClient.js';
import './admin.css';

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const NAV = [
  { to: '/admin', end: true, label: 'Overview', icon: <><path d="M3 12l9-8 9 8" /><path d="M5 10v10h14V10" /></> },
  { to: '/admin/enquiries', label: 'Enquiries', icon: <><path d="M4 4h16v12H5.5L4 17.5z" /><path d="M8 9h8M8 12h5" /></>, badge: true },
  { to: '/admin/homepage/offers', label: 'Offers', icon: <><path d="M20 12l-8 8-8-8V4h8z" /><circle cx="8" cy="8" r="1.5" /></> },
  { to: '/admin/homepage/video', label: 'Homepage film', icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9.5v5l4.5-2.5z" /></> }
];

export const AdminLayout = () => {
  useSeo('/admin', { noindex: true, title: 'Admin | Sushita Ventures' });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [newLeads, setNewLeads] = useState(0);

  // New-lead count for the sidebar; refreshed on every page change
  useEffect(() => {
    apiClient
      .get('/admin/enquiries?limit=1')
      .then((res) => setNewLeads(res?.data?.summary?.byStatus?.new || 0))
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="adm">
      <aside className="adm-side">
        <NavLink to="/admin" className="adm-brand">
          <img src="/images/branding/logo.png" alt="" />
          <div>
            <strong>Sushita Ventures</strong>
            <span>Admin</span>
          </div>
        </NavLink>

        <nav className="adm-nav" aria-label="Admin">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              <Icon d={item.icon} />
              {item.label}
              {item.badge && newLeads > 0 && (
                <span className="adm-count" aria-label={`${newLeads} new`}>{newLeads}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="adm-user">
          <div className="adm-user-email" title={user?.email}>{user?.email}</div>
          <div className="adm-user-actions">
            <a href="/" target="_blank" rel="noopener noreferrer">View website</a>
            <button type="button" onClick={handleLogout}>Sign out</button>
          </div>
        </div>
      </aside>

      <main className="adm-main">
        <Outlet />
      </main>
    </div>
  );
};
