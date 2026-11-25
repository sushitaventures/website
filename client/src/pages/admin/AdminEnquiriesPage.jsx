import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../../services/apiClient.js';
import { Badge } from '../../components/Badge.jsx';

const LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_discussion', label: 'In Discussion' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'archived', label: 'Archived' }
];

const MAIL_STATUS = {
  sent: { label: 'Mail sent', variant: 'success' },
  pending: { label: 'Sending…', variant: 'cyan' },
  failed: { label: 'Mail failed', variant: 'danger' },
  not_configured: { label: 'Mail not configured', variant: 'warning' }
};

const fmtDate = (d) =>
  d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

const ui = {
  page: { padding: '32px', maxWidth: '1200px', width: '100%', boxSizing: 'border-box' },
  card: { background: '#0d0f17', border: '1px solid #1e2230', borderRadius: '10px' },
  input: {
    background: '#090a0f',
    border: '1px solid #2d3345',
    color: '#f0f2f8',
    borderRadius: '8px',
    padding: '9px 12px',
    fontSize: '0.85rem'
  },
  btn: {
    background: 'transparent',
    border: '1px solid #2d3345',
    color: '#cbd5e1',
    padding: '7px 12px',
    borderRadius: '6px',
    fontSize: '0.78rem',
    cursor: 'pointer'
  },
  muted: { color: '#64748b', fontSize: '0.78rem' }
};

export const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [summary, setSummary] = useState({ byStatus: {}, byMail: {} });
  const [mailConfigured, setMailConfigured] = useState(true);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [expanded, setExpanded] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [mailStatus, setMailStatus] = useState('');
  const [page, setPage] = useState(1);

  // Who receives lead emails (stored server-side; default contact@sushitaventures.com)
  const [recipients, setRecipients] = useState(null);
  const [recipientsDraft, setRecipientsDraft] = useState('');
  const [savingRecipients, setSavingRecipients] = useState(false);

  // Debounce the search box
  useEffect(() => {
    const t = setTimeout(() => { setSearch(q); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search.trim()) params.set('q', search.trim());
      if (status) params.set('status', status);
      if (mailStatus) params.set('mailStatus', mailStatus);
      const res = await apiClient.get(`/admin/enquiries?${params}`);
      setEnquiries(res.data.enquiries);
      setSummary(res.data.summary);
      setMailConfigured(res.data.mailConfigured);
      setMeta(res.meta);
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to load enquiries' });
    } finally {
      setLoading(false);
    }
  }, [page, search, status, mailStatus]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    apiClient
      .get('/admin/enquiries/settings/recipients')
      .then((res) => {
        setRecipients(res.data);
        setRecipientsDraft(res.data.recipients.join(', '));
      })
      .catch((err) => setNotice({ type: 'error', message: err.message || 'Failed to load recipients' }));
  }, []);

  const saveRecipients = async (ev) => {
    ev.preventDefault();
    setSavingRecipients(true);
    try {
      const res = await apiClient.put('/admin/enquiries/settings/recipients', { recipients: recipientsDraft });
      setRecipients(res.data);
      setRecipientsDraft(res.data.recipients.join(', '));
      setNotice({ type: 'success', message: 'Lead notification recipients saved.' });
    } catch (err) {
      setNotice({ type: 'error', message: err.message });
    } finally {
      setSavingRecipients(false);
    }
  };

  const replaceRow = (updated) =>
    setEnquiries((rows) => rows.map((r) => (r._id === updated._id ? { ...r, ...updated } : r)));

  const changeLeadStatus = async (id, next) => {
    setBusyId(id);
    try {
      const res = await apiClient.patch(`/admin/enquiries/${id}`, { status: next });
      replaceRow(res.data.enquiry);
      setNotice({ type: 'success', message: 'Lead status updated.' });
    } catch (err) {
      setNotice({ type: 'error', message: err.message });
    } finally {
      setBusyId(null);
    }
  };

  const resend = async (id) => {
    setBusyId(id);
    try {
      const res = await apiClient.post(`/admin/enquiries/${id}/resend-email`, {});
      replaceRow(res.data.enquiry);
      setNotice({ type: 'success', message: 'Notification email sent.' });
    } catch (err) {
      if (err.details?.enquiry) replaceRow(err.details.enquiry);
      setNotice({ type: 'error', message: err.message });
    } finally {
      setBusyId(null);
    }
  };

  const total = Object.values(summary.byStatus).reduce((a, b) => a + b, 0);
  const mailProblems = (summary.byMail.failed || 0) + (summary.byMail.not_configured || 0);
  const cards = [
    { label: 'Total leads', value: total },
    { label: 'New', value: summary.byStatus.new || 0, color: '#00d2ff' },
    { label: 'Emails sent', value: summary.byMail.sent || 0, color: '#10b981' },
    { label: 'Emails not delivered', value: mailProblems, color: mailProblems ? '#f43f5e' : undefined }
  ];

  return (
    <div style={ui.page}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 6px' }}>Leads &amp; Enquiries</h1>
        <p style={ui.muted}>Contact-form submissions and the delivery status of each notification email.</p>
      </header>

      {!mailConfigured && (
        <div style={{ ...ui.card, borderColor: 'rgba(245, 158, 11, 0.35)', background: 'rgba(245, 158, 11, 0.08)', padding: '12px 16px', marginBottom: '20px', color: '#fbbf24', fontSize: '0.85rem' }}>
          Email is not configured on the server. Leads are still saved here, but no notification emails go out until
          SMTP_HOST, SMTP_USER and SMTP_PASS are set in <code>server/.env</code>.
        </div>
      )}

      {notice.message && (
        <div
          role="status"
          style={{
            ...ui.card,
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            color: notice.type === 'error' ? '#f87171' : '#34d399',
            borderColor: notice.type === 'error' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)'
          }}
        >
          <span>{notice.message}</span>
          <button style={{ ...ui.btn, padding: '2px 8px' }} onClick={() => setNotice({ type: '', message: '' })} aria-label="Dismiss">✕</button>
        </div>
      )}

      {/* Lead email recipients */}
      <form onSubmit={saveRecipients} style={{ ...ui.card, padding: '16px', marginBottom: '20px' }}>
        <label htmlFor="lead-recipients" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
          Send new leads to
        </label>
        <p style={{ ...ui.muted, margin: '0 0 10px' }}>
          Every contact-form submission is emailed to these addresses. Separate multiple addresses with commas (up to 10).
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <input
            id="lead-recipients"
            type="text"
            inputMode="email"
            value={recipientsDraft}
            onChange={(e) => setRecipientsDraft(e.target.value)}
            placeholder="contact@sushitaventures.com"
            disabled={!recipients}
            style={{ ...ui.input, flex: '1 1 320px' }}
          />
          <button
            type="submit"
            disabled={!recipients || savingRecipients || recipientsDraft.trim() === recipients.recipients.join(', ')}
            style={{ ...ui.btn, background: '#00d2ff', borderColor: '#00d2ff', color: '#090a0f', fontWeight: 600 }}
          >
            {savingRecipients ? 'Saving…' : 'Save'}
          </button>
        </div>
        {recipients && (
          <p style={{ ...ui.muted, margin: '8px 0 0' }}>
            {recipients.isDefault
              ? 'Using the default inbox.'
              : `Last changed ${fmtDate(recipients.updatedAt)}${recipients.updatedBy ? ` by ${recipients.updatedBy}` : ''}.`}
          </p>
        )}
      </form>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {cards.map((c) => (
          <div key={c.label} style={{ ...ui.card, padding: '16px' }}>
            <div style={ui.muted}>{c.label}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: c.color || '#f0f2f8', marginTop: '4px' }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <input
          type="search"
          placeholder="Search name, email, phone, city…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ ...ui.input, flex: '1 1 260px' }}
          aria-label="Search leads"
        />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={ui.input} aria-label="Filter by lead status">
          <option value="">All lead statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select value={mailStatus} onChange={(e) => { setMailStatus(e.target.value); setPage(1); }} style={ui.input} aria-label="Filter by mail status">
          <option value="">All mail statuses</option>
          {Object.entries(MAIL_STATUS).map(([v, m]) => <option key={v} value={v}>{m.label}</option>)}
        </select>
        <button style={ui.btn} onClick={load}>↻ Refresh</button>
      </div>

      {/* List */}
      <div style={{ ...ui.card, overflow: 'hidden' }}>
        {loading && <p style={{ ...ui.muted, padding: '24px' }}>Loading leads…</p>}
        {!loading && enquiries.length === 0 && (
          <p style={{ ...ui.muted, padding: '24px' }}>No enquiries match these filters yet.</p>
        )}

        {!loading && enquiries.map((e) => {
          const mail = MAIL_STATUS[e.mail?.status] || MAIL_STATUS.pending;
          const isOpen = expanded === e._id;
          return (
            <div key={e._id} style={{ borderBottom: '1px solid #1e2230', padding: '16px 18px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 18px' }}>
                <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{e.fullName}</div>
                  <div style={ui.muted}>{fmtDate(e.createdAt)} · {e.city}</div>
                </div>
                <div style={{ flex: '1 1 220px', minWidth: 0, fontSize: '0.82rem', lineHeight: 1.6 }}>
                  <a href={`mailto:${e.email}`} style={{ color: '#00d2ff', textDecoration: 'none', wordBreak: 'break-all' }}>{e.email}</a>
                  <br />
                  <a href={`tel:${e.phoneNumber}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{e.phoneNumber}</a>
                </div>
                <div style={{ flex: '0 1 170px', fontSize: '0.82rem', color: '#cbd5e1' }}>{e.lookingFor}</div>
                <select
                  value={e.status}
                  disabled={busyId === e._id}
                  onChange={(ev) => changeLeadStatus(e._id, ev.target.value)}
                  style={{ ...ui.input, padding: '6px 10px' }}
                  aria-label={`Lead status for ${e.fullName}`}
                >
                  {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <span title={e.mail?.error || ''}>
                  <Badge variant={mail.variant}>{mail.label}</Badge>
                </span>
                <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                  {e.mail?.status !== 'sent' && (
                    <button style={ui.btn} disabled={busyId === e._id} onClick={() => resend(e._id)}>
                      {busyId === e._id ? 'Sending…' : 'Resend email'}
                    </button>
                  )}
                  <button style={ui.btn} onClick={() => setExpanded(isOpen ? null : e._id)} aria-expanded={isOpen}>
                    {isOpen ? 'Hide' : 'Details'}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div style={{ marginTop: '14px', padding: '14px', background: '#090a0f', borderRadius: '8px', fontSize: '0.84rem', lineHeight: 1.6 }}>
                  <div style={ui.muted}>Requirement</div>
                  <p style={{ margin: '4px 0 14px', whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>{e.requirement || '—'}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    <div><div style={ui.muted}>Mail attempts</div>{e.mail?.attempts ?? 0}</div>
                    <div><div style={ui.muted}>Last attempt</div>{fmtDate(e.mail?.lastAttemptAt)}</div>
                    <div><div style={ui.muted}>Delivered</div>{fmtDate(e.mail?.sentAt)}</div>
                    <div><div style={ui.muted}>Source</div>{e.source}</div>
                  </div>
                  {e.mail?.error && (
                    <p style={{ margin: '12px 0 0', color: '#f87171' }}>Mail error: {e.mail.error}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {meta.pages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
          <span style={ui.muted}>{meta.total} leads · page {meta.page} of {meta.pages}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={ui.btn} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← Previous</button>
            <button style={ui.btn} disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)}>Next →</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiriesPage;
