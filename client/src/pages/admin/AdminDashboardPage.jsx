import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../services/apiClient.js';
import { Badge } from '../../components/Badge.jsx';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    loading: true,
    totalOffers: 0,
    publishedOffers: 0,
    activeOffers: 0,
    videoConfigured: false,
    videoActive: false,
    videoId: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [offersRes, videoRes] = await Promise.all([
          apiClient.get('/admin/offers'),
          apiClient.get('/admin/homepage/video')
        ]);

        const offers = offersRes?.data?.offers || [];
        const video = videoRes?.data?.config;

        setStats({
          loading: false,
          totalOffers: offers.length,
          publishedOffers: offers.filter((o) => o.status === 'published').length,
          activeOffers: offers.filter((o) => o.active).length,
          videoConfigured: !!video,
          videoActive: !!video?.active,
          videoId: video?.videoId || null
        });
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const cardStyle = {
    background: '#12141c',
    border: '1px solid #1e2230',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  return (
    <div style={{ padding: '36px 40px', maxWidth: '1200px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Administration Dashboard
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#8b92a5', marginTop: '6px' }}>
          Overview of active homepage content modules and publication status.
        </p>
      </header>

      {/* Primary Modules Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {/* Offers Module */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f8fafc' }}>
              Homepage Offers
            </h3>
            <Badge variant={stats.activeOffers > 0 ? 'success' : 'default'}>
              {stats.activeOffers} Active
            </Badge>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Promotional cards displayed after visitor scrolls past hero section.
          </p>

          <div style={{ display: 'flex', gap: '16px', margin: '8px 0', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: '#64748b' }}>Total: </span>
              <strong>{stats.totalOffers}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Published: </span>
              <strong style={{ color: '#10b981' }}>{stats.publishedOffers}</strong>
            </div>
          </div>

          <Link
            to="/admin/homepage/offers"
            style={{
              display: 'inline-block',
              background: '#1e2230',
              color: '#00d2ff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '500',
              textDecoration: 'none',
              textAlign: 'center',
              border: '1px solid #2d3345',
              marginTop: '4px'
            }}
          >
            Manage Offers →
          </Link>
        </div>

        {/* Video Module */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f8fafc' }}>
              Homepage Video
            </h3>
            <Badge variant={stats.videoActive ? 'success' : stats.videoConfigured ? 'warning' : 'default'}>
              {stats.videoActive ? 'Active' : stats.videoConfigured ? 'Disabled' : 'Unconfigured'}
            </Badge>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Seamless inline YouTube video experience for the homepage.
          </p>

          <div style={{ margin: '8px 0', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#64748b' }}>
            {stats.videoId ? (
              <span>Configured Video ID: <code style={{ color: '#a5b4fc' }}>{stats.videoId}</code></span>
            ) : (
              <span>No video URL currently saved</span>
            )}
          </div>

          <Link
            to="/admin/homepage/video"
            style={{
              display: 'inline-block',
              background: '#1e2230',
              color: '#00d2ff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '500',
              textDecoration: 'none',
              textAlign: 'center',
              border: '1px solid #2d3345',
              marginTop: '4px'
            }}
          >
            Configure Video →
          </Link>
        </div>
      </div>

      {/* Architectural Roadmap Notice */}
      <div style={{ background: '#0d0f17', border: '1px solid #1e2230', borderRadius: '12px', padding: '24px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
          Administrative Scope Governance
        </h4>
        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
          This console provides content management for confirmed Section 04 features. Future modules (Property Portfolio, Services Content, Enquiry Inbox, About Us Management, SEO Metadata) will be activated as their business specifications are approved.
        </p>
      </div>
    </div>
  );
};
