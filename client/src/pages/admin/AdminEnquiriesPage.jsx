import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../../services/apiClient.js';
import { PageHead, Chip, useToast, fmtDate, timeAgo } from '../../components/admin/AdminUI.jsx';

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_discussion', label: 'In discussion' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'archived', label: 'Archived' }
];
const statusLabel = (v) => STATUSES.find((s) => s.value === v)?.label || v;
const STATUS_TONE = { new: 'gold', contacted: undefined, in_discussion: 'amber', resolved: 'green', archived: undefined };

const MAIL = {
  sent: { label: 'Email sent', tone: 'green' },
  failed: { label: 'Email failed', tone: 'red' },
  not_configured: { label: 'Email off', tone: 'amber' },
  pending: { label: 'Sending', tone: undefined }
};

export const AdminEnquiriesPage = () => {
  const [toast, toastNode] = useToast();
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState({ byStatus: {}, byMail: {} });
  const [mailConfigured, setMailConfigured] = useState(true);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const [tab, setTab] = useState('');
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const [failedOnly, setFailedOnly] = useState(false);
  const [page, setPage] = useState(1);

  const [recipients, setRecipients] = useState(null);
  const [editingRecipients, setEditingRecipients] = useState(false);
  const [recipientsDraft, setRecipientsDraft] = useState('');

  useEffect(() => {
    const t = setTimeout(() => { setSearch(q.trim()); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.set('q', search);
      if (tab) params.set('status', tab);
      if (failedOnly) params.set('mailStatus', 'failed');
      const res = await apiClient.get(`/admin/enquiries?${params}`);
      setRows(res.data.enquiries);
      setSummary(res.data.summary);
      setMailConfigured(res.data.mailConfigured);
      setMeta(res.meta);
    } catch (err) {
      toast(err.message || 'Could not load enquiries.', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search, tab, failedOnly, toast]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    apiClient.get('/admin/enquiries/settings/recipients').then((res) => setRecipients(res.data)).catch(() => {});
  }, []);

  const replaceRow = (u) => setRows((list) => list.map((r) => (r._id === u._id ? { ...r, ...u } : r)));

  const setStatus = async (row, next) => {
    setBusyId(row._id);
    try {
      const res = await apiClient.patch(`/admin/enquiries/${row._id}`, { status: next });
      replaceRow(res.data.enquiry);
      setSummary((s) => ({
        ...s,
        byStatus: { ...s.byStatus, [row.status]: Math.max(0, (s.byStatus[row.status] || 1) - 1), [next]: (s.byStatus[next] || 0) + 1 }
      }));
      toast(`Marked as ${statusLabel(next).toLowerCase()}.`);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusyId(null);
    }
  };

  const resend = async (row) => {
    setBusyId(row._id);
    try {
      const res = await apiClient.post(`/admin/enquiries/${row._id}/resend-email`, {});
      replaceRow(res.data.enquiry);
      toast('Email sent to your team.');
    } catch (err) {
      if (err.details?.enquiry) replaceRow(err.details.enquiry);
      toast(err.message || 'Email could not be sent.', 'error');
    } finally {
      setBusyId(null);
    }
  };

  const saveRecipients = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.put('/admin/enquiries/settings/recipients', { recipients: recipientsDraft });
      setRecipients(res.data);
      setEditingRecipients(false);
      toast('Saved. New enquiries will be emailed there.');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const total = Object.values(summary.byStatus).reduce((a, b) => a + b, 0);
  const failed = summary.byMail.failed || 0;

  return (
    <div className="adm-page">
      <PageHead title="Enquiries" sub="Everyone who has filled in the contact form. Open an enquiry to see their requirement and update its progress." />

      {!mailConfigured && (
        <div className="adm-alert">
          Email isn’t set up on the server, so enquiries are saved here but your team isn’t emailed about them.
        </div>
      )}

      <div className="adm-tabs" role="tablist" aria-label="Filter by progress">
        <button role="tab" className="adm-tab" aria-selected={tab === ''} onClick={() => { setTab(''); setPage(1); }}>
          All<span>{total}</span>
        </button>
        {STATUSES.map((s) => (
          <button key={s.value} role="tab" className="adm-tab" aria-selected={tab === s.value} onClick={() => { setTab(s.value); setPage(1); }}>
            {s.label}<span>{summary.byStatus[s.value] || 0}</span>
          </button>
        ))}
      </div>

      <div className="adm-toolbar">
        <input
          type="search"
          className="adm-input"
          placeholder="Search by name, email, phone or city"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search enquiries"
        />
        {failed > 0 && (
          <button
            type="button"
            className={`adm-btn${failedOnly ? ' adm-btn-primary' : ''}`}
            aria-pressed={failedOnly}
            onClick={() => { setFailedOnly((v) => !v); setPage(1); }}
          >
            Email failed ({failed})
          </button>
        )}
      </div>

      <div className="adm-panel">
        {loading && rows.length === 0 ? (
          <>{[0, 1, 2].map((i) => <div key={i} className="adm-skeleton" />)}</>
        ) : rows.length === 0 ? (
          <div className="adm-empty">
            <strong>{search || tab || failedOnly ? 'No matching enquiries' : 'No enquiries yet'}</strong>
            {search || tab || failedOnly ? 'Try a different search or tab.' : 'Contact-form submissions will appear here.'}
          </div>
        ) : (
          rows.map((r) => {
            const isOpen = open === r._id;
            const mail = MAIL[r.mail?.status] || MAIL.pending;
            return (
              <div key={r._id} className={`adm-row${r.status === 'new' ? ' is-new' : ''}`}>
                <button type="button" className="adm-row-main" onClick={() => setOpen(isOpen ? null : r._id)} aria-expanded={isOpen}>
                  <div style={{ minWidth: 0 }}>
                    <div className="adm-row-name">{r.fullName}</div>
                    <div className="adm-row-meta">{timeAgo(r.createdAt)}</div>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div>{r.lookingFor}</div>
                    <div className="adm-row-meta">{r.city}</div>
                  </div>
                  <div>
                    {r.mail?.status === 'failed' ? <Chip tone="red">Email failed</Chip> : <span className="adm-row-meta">{r.phoneNumber}</span>}
                  </div>
                  <Chip tone={STATUS_TONE[r.status]}>{statusLabel(r.status)}</Chip>
                </button>

                {isOpen && (
                  <div className="adm-row-detail">
                    <div>
                      <dl>
                        <dt>Phone</dt><dd><a href={`tel:${r.phoneNumber}`}>{r.phoneNumber}</a></dd>
                        <dt>Email</dt><dd><a href={`mailto:${r.email}`}>{r.email}</a></dd>
                        <dt>City</dt><dd>{r.city}</dd>
                        <dt>Looking for</dt><dd>{r.lookingFor}</dd>
                        <dt>Received</dt><dd>{fmtDate(r.createdAt)}</dd>
                      </dl>
                      <div style={{ marginTop: 16 }}>
                        <span className="adm-label">Requirement</span>
                        <p className="adm-requirement">{r.requirement || 'No details given.'}</p>
                      </div>
                    </div>

                    <div className="adm-row-actions">
                      <div className="adm-field">
                        <label className="adm-label" htmlFor={`st-${r._id}`}>Progress</label>
                        <select
                          id={`st-${r._id}`}
                          className="adm-select"
                          value={r.status}
                          disabled={busyId === r._id}
                          onChange={(e) => setStatus(r, e.target.value)}
                        >
                          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </div>

                      <div className="adm-field">
                        <span className="adm-label">Team email</span>
                        <div><Chip tone={mail.tone}>{mail.label}</Chip></div>
                        {r.mail?.error && r.mail?.status !== 'sent' && <span className="adm-mail-error">{r.mail.error}</span>}
                        {r.mail?.status !== 'sent' && (
                          <button type="button" className="adm-btn adm-btn-sm" style={{ alignSelf: 'flex-start' }} disabled={busyId === r._id} onClick={() => resend(r)}>
                            {busyId === r._id ? 'Sending…' : 'Send again'}
                          </button>
                        )}
                      </div>

                      <a className="adm-btn adm-btn-gold" href={`tel:${r.phoneNumber}`}>Call {r.fullName.split(' ')[0]}</a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {meta.pages > 1 && (
        <div className="adm-pager">
          <span>Page {meta.page} of {meta.pages}</span>
          <div>
            <button className="adm-btn adm-btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
            <button className="adm-btn adm-btn-sm" disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </div>
      )}

      {recipients && (
        <div className="adm-recipients">
          {editingRecipients ? (
            <form onSubmit={saveRecipients}>
              <input
                className="adm-input"
                value={recipientsDraft}
                onChange={(e) => setRecipientsDraft(e.target.value)}
                aria-label="Email new enquiries to (separate addresses with commas)"
                placeholder="contact@sushitaventures.com"
                autoFocus
              />
              <button type="submit" className="adm-btn adm-btn-primary">Save</button>
              <button type="button" className="adm-btn" onClick={() => setEditingRecipients(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <span>New enquiries are emailed to <strong>{recipients.recipients.join(', ')}</strong></span>
              <button type="button" className="adm-link" onClick={() => { setRecipientsDraft(recipients.recipients.join(', ')); setEditingRecipients(true); }}>
                Change
              </button>
            </>
          )}
        </div>
      )}

      {toastNode}
    </div>
  );
};

export default AdminEnquiriesPage;
