import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/apiClient.js';
import { Badge } from '../../components/Badge.jsx';

export const AdminVideoPage = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    youtubeUrl: '',
    title: '',
    active: true,
    autoplay: true,
    muted: true,
    loop: true
  });

  const [previewEmbedUrl, setPreviewEmbedUrl] = useState('');

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/homepage/video');
      const data = res?.data?.config;
      if (data) {
        setConfig(data);
        setFormData({
          youtubeUrl: data.youtubeUrl || '',
          title: data.title || '',
          active: !!data.active,
          autoplay: !!data.autoplay,
          muted: !!data.muted,
          loop: !!data.loop
        });
        setPreviewEmbedUrl(data.embedUrl || '');
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Failed to load video configuration' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, youtubeUrl: url }));

    // Extract video ID for quick client preview
    let id = null;
    try {
      const parsed = new URL(url.trim());
      if (parsed.hostname.includes('youtu.be')) {
        id = parsed.pathname.slice(1);
      } else if (parsed.searchParams.has('v')) {
        id = parsed.searchParams.get('v');
      } else if (parsed.pathname.includes('/embed/')) {
        id = parsed.pathname.split('/embed/')[1];
      }
    } catch {}

    if (id && id.length === 11) {
      setPreviewEmbedUrl(`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`);
    } else {
      setPreviewEmbedUrl('');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setNotification({ type: '', message: '' });
    setSaving(true);

    try {
      const res = await apiClient.put('/admin/homepage/video', formData);
      setNotification({ type: 'success', message: 'Homepage YouTube video configuration updated successfully.' });
      setConfig(res.data.config);
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Failed to update video configuration.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '36px 40px', maxWidth: '1200px' }}>
      <header style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Homepage YouTube Video Management
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#8b92a5', marginTop: '6px' }}>
          Configure the seamless embedded YouTube video displayed after scrolling beyond the homepage hero.
        </p>
      </header>

      {notification.message && (
        <div
          style={{
            background: notification.type === 'error' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            border: `1px solid ${notification.type === 'error' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            borderRadius: '8px',
            padding: '12px 16px',
            color: notification.type === 'error' ? '#f87171' : '#34d399',
            fontSize: '0.88rem',
            marginBottom: '24px'
          }}
        >
          {notification.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.2fr)', gap: '32px' }}>
        {/* Form Configuration Card */}
        <div style={{ background: '#12141c', border: '1px solid #1e2230', borderRadius: '16px', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '600', color: '#f8fafc' }}>Video Settings</h2>
            <Badge variant={formData.active ? 'success' : 'default'}>
              {formData.active ? 'Visible on Homepage' : 'Hidden'}
            </Badge>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                YouTube Source URL *
              </label>
              <input
                type="text"
                required
                value={formData.youtubeUrl}
                onChange={handleUrlChange}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: '#090a0f',
                  border: '1px solid #2d3345',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '6px' }}>
                Supports standard watch links, shortened youtu.be links, and embed URLs.
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                Video Title / Accessible Label
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Architectural Tour: The Sapphire Estate"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: '#090a0f',
                  border: '1px solid #2d3345',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div style={{ borderTop: '1px solid #1e2230', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="activeVideo"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="activeVideo" style={{ fontSize: '0.88rem', color: '#f8fafc', cursor: 'pointer' }}>
                  Enable video visibility on public homepage
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="mutedVideo"
                  checked={formData.muted}
                  onChange={(e) => setFormData({ ...formData, muted: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="mutedVideo" style={{ fontSize: '0.88rem', color: '#cbd5e1', cursor: 'pointer' }}>
                  Muted playback by default (Recommended for browser autoplay policy)
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="autoplayVideo"
                  checked={formData.autoplay}
                  onChange={(e) => setFormData({ ...formData, autoplay: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="autoplayVideo" style={{ fontSize: '0.88rem', color: '#cbd5e1', cursor: 'pointer' }}>
                  Autoplay inline on viewport enter
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="loopVideo"
                  checked={formData.loop}
                  onChange={(e) => setFormData({ ...formData, loop: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="loopVideo" style={{ fontSize: '0.88rem', color: '#cbd5e1', cursor: 'pointer' }}>
                  Continuous looping
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                background: '#00d2ff',
                color: '#090a0f',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
                marginTop: '10px',
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? 'Validating & Saving...' : 'Save Video Configuration'}
            </button>
          </form>
        </div>

        {/* Live Embed Preview Card */}
        <div style={{ background: '#12141c', border: '1px solid #1e2230', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '600', color: '#f8fafc', marginBottom: '16px' }}>
            Live Privacy-Enhanced Preview
          </h2>

          {previewEmbedUrl ? (
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '10px', overflow: 'hidden', border: '1px solid #2d3345' }}>
              <iframe
                src={previewEmbedUrl}
                title={formData.title || 'YouTube video preview'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          ) : (
            <div style={{ flex: 1, minHeight: '240px', background: '#090a0f', border: '1px dashed #2d3345', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem', marginBottom: '8px' }}>▶️</span>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>No valid YouTube URL to preview</p>
              <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Enter a YouTube link on the left to render the embed preview.</p>
            </div>
          )}

          <div style={{ marginTop: '20px', fontSize: '0.78rem', color: '#64748b', lineHeight: '1.6' }}>
            <strong>Security & Privacy Protocol:</strong> The system automatically rewrites URLs to the privacy-enhanced <code>youtube-nocookie.com</code> domain with <code>rel=0</code> and <code>modestbranding=1</code> to minimize tracking cookies.
          </div>
        </div>
      </div>
    </div>
  );
};
