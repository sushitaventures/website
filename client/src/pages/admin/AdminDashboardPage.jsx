import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../services/apiClient.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { Chip, timeAgo } from '../../components/admin/AdminUI.jsx';

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
};

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      apiClient.get('/admin/enquiries?limit=5'),
      apiClient.get('/admin/offers'),
      apiClient.get('/admin/homepage/video')
    ])
      .then(([leads, offers, video]) => {
        const list = offers?.data?.offers || [];
        setData({
          recent: leads.data.enquiries,
          byStatus: leads.data.summary.byStatus,
          failedMail: leads.data.summary.byMail.failed || 0,
          mailConfigured: leads.data.mailConfigured,
          liveOffers: list.filter((o) => o.active && o.status === 'published').length,
          totalOffers: list.length,
          video: video?.data?.config || null
        });
      })
      .catch((err) => setError(err.message || 'Could not load the overview.'));
  }, []);

  const newCount = data?.byStatus?.new || 0;
  const headline = !data
    ? ' '
    : newCount === 0
      ? 'You’re all caught up.'
      : `${newCount} new ${newCount === 1 ? 'enquiry is' : 'enquiries are'} waiting.`;

  const name = user?.email?.split('@')[0];

  return (
    <div className="adm-page">
      <p className="adm-hello">{greeting()}{name ? `, ${name}` : ''}</p>
      <h1 className="adm-headline" aria-live="polite">{headline}</h1>
      {data && (
        <div className="adm-headline-actions">
          <Link to="/admin/enquiries" className="adm-btn adm-btn-primary">
            {newCount ? 'Review enquiries' : 'Open enquiries'}
          </Link>
        </div>
      )}

      {error && <div className="adm-alert" style={{ marginTop: 24 }}>{error}</div>}

      {data && (
        <div className="adm-dash-grid">
          <section>
            <h2 className="adm-section-title">Latest enquiries</h2>
            <div className="adm-panel">
              {data.recent.length === 0 ? (
                <div className="adm-empty">
                  <strong>No enquiries yet</strong>
                  New contact-form submissions will appear here.
                </div>
              ) : (
                <ul className="adm-status-list">
                  {data.recent.map((e) => (
                    <li key={e._id}>
                      <div style={{ minWidth: 0 }}>
                        <strong>{e.fullName}</strong>
                        <span className="adm-hint">{e.lookingFor}, {e.city}</span>
                      </div>
                      <span className="adm-hint" style={{ whiteSpace: 'nowrap' }}>{timeAgo(e.createdAt)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section>
            <h2 className="adm-section-title">Website status</h2>
            <div className="adm-panel">
              <ul className="adm-status-list">
                <li>
                  <div>
                    <strong>Lead emails</strong>
                    <span className="adm-hint">
                      {!data.mailConfigured
                        ? 'Email isn’t set up on the server'
                        : data.failedMail
                          ? `${data.failedMail} failed — resend from Enquiries`
                          : 'Sending normally'}
                    </span>
                  </div>
                  <Chip tone={!data.mailConfigured || data.failedMail ? 'red' : 'green'}>
                    {!data.mailConfigured ? 'Off' : data.failedMail ? 'Needs attention' : 'OK'}
                  </Chip>
                </li>
                <li>
                  <div>
                    <strong>Offer popup</strong>
                    <span className="adm-hint">
                      {data.liveOffers ? `${data.liveOffers} offer showing on the homepage` : data.totalOffers ? 'No offer is switched on' : 'No offers created'}
                    </span>
                  </div>
                  <Link to="/admin/homepage/offers" className="adm-btn adm-btn-sm">Manage</Link>
                </li>
                <li>
                  <div>
                    <strong>Homepage film</strong>
                    <span className="adm-hint">
                      {data.video?.active ? data.video.title || 'Playing on the homepage' : 'Showing the photo instead'}
                    </span>
                  </div>
                  <Link to="/admin/homepage/video" className="adm-btn adm-btn-sm">Manage</Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
