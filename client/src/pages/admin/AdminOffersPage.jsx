import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/apiClient.js';
import { Badge } from '../../components/Badge.jsx';

export const AdminOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [editingOffer, setEditingOffer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
    ctaLabel: '',
    ctaUrl: '',
    status: 'draft',
    active: false,
    startDate: '',
    endDate: ''
  });

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/offers');
      setOffers(res?.data?.offers || []);
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Failed to load offers' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const openCreateModal = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      imageUrl: '',
      ctaLabel: '',
      ctaUrl: '',
      status: 'draft',
      active: false,
      startDate: '',
      endDate: ''
    });
    setIsFormOpen(true);
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title || '',
      shortDescription: offer.shortDescription || '',
      fullDescription: offer.fullDescription || '',
      imageUrl: offer.imageUrl || '',
      ctaLabel: offer.ctaLabel || '',
      ctaUrl: offer.ctaUrl || '',
      status: offer.status || 'draft',
      active: !!offer.active,
      startDate: offer.startDate ? offer.startDate.slice(0, 10) : '',
      endDate: offer.endDate ? offer.endDate.slice(0, 10) : ''
    });
    setIsFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setNotification({ type: '', message: '' });

    try {
      if (editingOffer) {
        await apiClient.patch(`/admin/offers/${editingOffer._id}`, formData);
        setNotification({ type: 'success', message: 'Offer updated successfully.' });
      } else {
        await apiClient.post('/admin/offers', formData);
        setNotification({ type: 'success', message: 'New offer created successfully.' });
      }
      setIsFormOpen(false);
      fetchOffers();
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Save operation failed.' });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the offer "${title}"?`)) {
      return;
    }

    try {
      await apiClient.delete(`/admin/offers/${id}`);
      setNotification({ type: 'success', message: 'Offer deleted successfully.' });
      fetchOffers();
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Delete operation failed.' });
    }
  };

  const handleToggleActive = async (offer) => {
    try {
      await apiClient.patch(`/admin/offers/${offer._id}`, { active: !offer.active });
      fetchOffers();
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Status toggle failed.' });
    }
  };

  return (
    <div style={{ padding: '36px 40px', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.02em' }}>
            Homepage Offer Management
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#8b92a5', marginTop: '6px' }}>
            Create and publish promotional cards for visitors scrolling past the homepage hero.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{
            background: '#00d2ff',
            color: '#090a0f',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 18px',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          + Create New Offer
        </button>
      </div>

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

      {/* Offers Table / List */}
      {loading ? (
        <div style={{ color: '#8b92a5', fontFamily: 'var(--font-mono)', padding: '40px 0' }}>Loading offers...</div>
      ) : offers.length === 0 ? (
        <div style={{ background: '#12141c', border: '1px solid #1e2230', borderRadius: '12px', padding: '48px 24px', textAlign: 'center', color: '#8b92a5' }}>
          <p style={{ fontSize: '1rem', fontWeight: '500', color: '#cbd5e1' }}>No promotional offers created yet.</p>
          <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Click "+ Create New Offer" above to configure your first homepage offer.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {offers.map((offer) => (
            <div
              key={offer._id}
              style={{
                background: '#12141c',
                border: '1px solid #1e2230',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ maxWidth: '650px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#f8fafc' }}>{offer.title}</h3>
                  <Badge variant={offer.status === 'published' ? 'success' : offer.status === 'archived' ? 'default' : 'warning'}>
                    {offer.status}
                  </Badge>
                  <Badge variant={offer.active ? 'cyan' : 'default'}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>{offer.shortDescription}</p>
                {offer.ctaLabel && (
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginTop: '8px', display: 'inline-block' }}>
                    CTA: {offer.ctaLabel} → {offer.ctaUrl || '#'}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => handleToggleActive(offer)}
                  style={{
                    background: offer.active ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    border: `1px solid ${offer.active ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                    color: offer.active ? '#f87171' : '#34d399',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  {offer.active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => openEditModal(offer)}
                  style={{
                    background: '#1e2230',
                    border: '1px solid #2d3345',
                    color: '#e2e8f0',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer._id, offer.title)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #2d3345',
                    color: '#94a3b8',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ background: '#12141c', border: '1px solid #1e2230', borderRadius: '16px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ffffff', marginBottom: '20px' }}>
              {editingOffer ? 'Edit Offer' : 'Create New Offer'}
            </h2>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Exclusive Waterfront Villas Launch"
                  style={{ width: '100%', padding: '10px 12px', background: '#090a0f', border: '1px solid #2d3345', borderRadius: '6px', color: '#f8fafc', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                  Short Description * (Displayed in popup card)
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={300}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary text highlighting the offer's unique value..."
                  style={{ width: '100%', padding: '10px 12px', background: '#090a0f', border: '1px solid #2d3345', borderRadius: '6px', color: '#f8fafc', fontSize: '0.88rem', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                  Full Description (Optional extended details)
                </label>
                <textarea
                  rows={4}
                  maxLength={2000}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Full terms, specifications, or architectural notes..."
                  style={{ width: '100%', padding: '10px 12px', background: '#090a0f', border: '1px solid #2d3345', borderRadius: '6px', color: '#f8fafc', fontSize: '0.88rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                    CTA Label
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    value={formData.ctaLabel}
                    onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                    placeholder="e.g. Inquire Privately"
                    style={{ width: '100%', padding: '10px 12px', background: '#090a0f', border: '1px solid #2d3345', borderRadius: '6px', color: '#f8fafc', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                    CTA URL
                  </label>
                  <input
                    type="text"
                    value={formData.ctaUrl}
                    onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                    placeholder="e.g. /contact or https://..."
                    style={{ width: '100%', padding: '10px 12px', background: '#090a0f', border: '1px solid #2d3345', borderRadius: '6px', color: '#f8fafc', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                  Supporting Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.example.com/property-hero.jpg"
                  style={{ width: '100%', padding: '10px 12px', background: '#090a0f', border: '1px solid #2d3345', borderRadius: '6px', color: '#f8fafc', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: '#090a0f', border: '1px solid #2d3345', borderRadius: '6px', color: '#f8fafc', fontSize: '0.88rem' }}
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '28px' }}>
                  <input
                    type="checkbox"
                    id="activeToggle"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="activeToggle" style={{ fontSize: '0.88rem', color: '#f8fafc', cursor: 'pointer' }}>
                    Active (Enabled for homepage display)
                  </label>
                </div>
              </div>

              {/* Live Preview Panel */}
              <div style={{ marginTop: '12px', padding: '16px', background: '#090a0f', border: '1px dashed #2d3345', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Live Card Preview</span>
                <div style={{ marginTop: '10px', background: '#181b26', border: '1px solid #282e42', borderRadius: '10px', padding: '18px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff' }}>{formData.title || 'Offer Heading Preview'}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '6px' }}>{formData.shortDescription || 'Short description preview will appear here...'}</p>
                  {formData.ctaLabel && (
                    <div style={{ marginTop: '12px' }}>
                      <span style={{ display: 'inline-block', background: '#00d2ff', color: '#000', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                        {formData.ctaLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  style={{ background: 'transparent', border: '1px solid #2d3345', color: '#cbd5e1', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: '#00d2ff', color: '#090a0f', border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
