import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Badge } from '../Badge.jsx';
import { useSeo } from '../../seo/useSeo.js';

export const AdminLayout = () => {
  useSeo('/admin', { noindex: true, title: 'Admin | Sushita Ventures' });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? '#00d2ff' : '#94a3b8',
    background: isActive ? 'rgba(0, 210, 255, 0.08)' : 'transparent',
    border: isActive ? '1px solid rgba(0, 210, 255, 0.2)' : '1px solid transparent',
    textDecoration: 'none',
    transition: 'all 0.15s ease'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#090a0f', color: '#f0f2f8' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', borderRight: '1px solid #1e2230', background: '#0d0f17', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e2230' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: '700', letterSpacing: '-0.01em', color: '#ffffff' }}>
            Luxury Estate CMS
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Administrative Console
          </span>
        </div>

        <nav style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <NavLink to="/admin" end style={navItemStyle}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/enquiries" style={navItemStyle}>
            📨 Leads &amp; Enquiries
          </NavLink>
          <NavLink to="/admin/homepage/offers" style={navItemStyle}>
            🏷️ Homepage Offers
          </NavLink>
          <NavLink to="/admin/homepage/video" style={navItemStyle}>
            🎬 YouTube Video
          </NavLink>
          
          <div style={{ margin: '20px 0 10px 0', borderTop: '1px solid #1e2230', paddingTop: '16px' }}>
            <span style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'none', letterSpacing: '0.05em', paddingLeft: '8px' }}>
              Public Navigation
            </span>
          </div>
          <NavLink to="/" style={navItemStyle}>
            🌐 View Dev Status
          </NavLink>
        </nav>

        {/* User bar */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1e2230', background: '#0a0b12', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '500', color: '#e2e8f0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {user?.email}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
              <Badge variant="default">{user?.role || 'admin'}</Badge>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #2d3345',
              color: '#94a3b8',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};
