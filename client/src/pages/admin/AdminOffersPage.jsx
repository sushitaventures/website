import { useEffect, useState } from 'react';
import { apiClient } from '../../services/apiClient.js';
import { PageHead, Switch, Chip, useToast, fmtDate } from '../../components/admin/AdminUI.jsx';

const EMPTY = { title: '', shortDescription: '', ctaLabel: '', ctaUrl: '', live: false, startDate: '', endDate: '' };

// The website shows an offer only when it is published AND active — one switch here sets both.
const isLive = (o) => o.active && o.status === 'published';

// Dates are picked in local time: "show from" starts at 00:00, "show until" lasts to 23:59.
const toInputDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const fromInputDate = (day, endOfDay) => (day ? new Date(`${day}T${endOfDay ? '23:59:59' : '00:00:00'}`).toISOString() : null);

const scheduleText = (o) => {
  const now = Date.now();
  if (o.startDate && new Date(o.startDate) > now) return `Starts ${fmtDate(o.startDate, false)}`;
  if (o.endDate && new Date(o.endDate) < now) return `Ended ${fmtDate(o.endDate, false)}`;
  if (o.endDate) return `Until ${fmtDate(o.endDate, false)}`;
  return '';
};

export const AdminOffersPage = () => {
  const [toast, toastNode] = useToast();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, offer = edit
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async () => {
    try {
      const res = await apiClient.get('/admin/offers');
      setOffers(res?.data?.offers || []);
    } catch (err) {
      toast(err.message || 'Could not load offers.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!editing) return;
    const onKey = (e) => e.key === 'Escape' && setEditing(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editing]);

  const openNew = () => { setForm(EMPTY); setEditing({}); };
  const openEdit = (o) => {
    setForm({
      title: o.title || '',
      shortDescription: o.shortDescription || '',
      ctaLabel: o.ctaLabel || '',
      ctaUrl: o.ctaUrl || '',
      live: isLive(o),
      startDate: toInputDate(o.startDate),
      endDate: toInputDate(o.endDate)
    });
    setEditing(o);
  };

  const toPayload = ({ live, ...f }) => ({
    ...f,
    startDate: fromInputDate(f.startDate, false),
    endDate: fromInputDate(f.endDate, true),
    active: live,
    status: live ? 'published' : 'draft'
  });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing?._id) await apiClient.patch(`/admin/offers/${editing._id}`, toPayload(form));
      else await apiClient.post('/admin/offers', toPayload(form));
      toast(editing?._id ? 'Offer saved.' : 'Offer created.');
      setEditing(null);
      load();
    } catch (err) {
      toast(err.message || 'Offer could not be saved.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleLive = async (o, on) => {
    setOffers((list) => list.map((x) => (x._id === o._id ? { ...x, active: on, status: on ? 'published' : x.status } : x)));
    try {
      await apiClient.patch(`/admin/offers/${o._id}`, on ? { active: true, status: 'published' } : { active: false });
      toast(on ? 'Offer is now showing on the website.' : 'Offer hidden from the website.');
    } catch (err) {
      toast(err.message, 'error');
      load();
    }
  };

  const remove = async (o) => {
    try {
      await apiClient.delete(`/admin/offers/${o._id}`);
      setOffers((list) => list.filter((x) => x._id !== o._id));
      toast('Offer deleted.');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  const liveCount = offers.filter(isLive).length;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="adm-page">
      <PageHead title="Offers" sub="An offer appears as a popup on the homepage. Only one is shown at a time — the most recently edited one that’s switched on.">
        <button className="adm-btn adm-btn-primary" onClick={openNew}>New offer</button>
      </PageHead>

      {liveCount > 1 && (
        <div className="adm-alert">{liveCount} offers are switched on. Visitors only see the most recently edited one.</div>
      )}

      <div className="adm-panel">
        {loading ? (
          [0, 1].map((i) => <div key={i} className="adm-skeleton" />)
        ) : offers.length === 0 ? (
          <div className="adm-empty">
            <strong>No offers yet</strong>
            Create an offer to show a popup to homepage visitors.
            <div><button className="adm-btn adm-btn-primary" onClick={openNew}>New offer</button></div>
          </div>
        ) : (
          offers.map((o) => (
            <div key={o._id} className="adm-offer">
              <div style={{ minWidth: 0, flex: '1 1 320px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <h3>{o.title}</h3>
                  {isLive(o) ? <Chip tone="green">On website</Chip> : <Chip>Hidden</Chip>}
                  {scheduleText(o) && <span className="adm-hint">{scheduleText(o)}</span>}
                </div>
                <p>{o.shortDescription}</p>
              </div>

              <div className="adm-offer-actions">
                <Switch id={`live-${o._id}`} checked={isLive(o)} onChange={(on) => toggleLive(o, on)} label={<span className="adm-hint">Show</span>} />
                <button className="adm-btn adm-btn-sm" onClick={() => openEdit(o)}>Edit</button>
                {confirmDelete === o._id ? (
                  <>
                    <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => remove(o)}>Delete offer</button>
                    <button className="adm-btn adm-btn-sm" onClick={() => setConfirmDelete(null)}>Keep</button>
                  </>
                ) : (
                  <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => setConfirmDelete(o._id)}>Delete</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <div className="adm-drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setEditing(null)}>
          <form className="adm-drawer" role="dialog" aria-modal="true" aria-labelledby="offer-drawer-title" onSubmit={save}>
            <h2 id="offer-drawer-title">{editing._id ? 'Edit offer' : 'New offer'}</h2>

            <div className="adm-form">
              <div className="adm-field">
                <label className="adm-label" htmlFor="of-title">Headline</label>
                <input id="of-title" className="adm-input" required maxLength={120} value={form.title} onChange={set('title')} placeholder="Festive offer on premium villas" autoFocus />
              </div>

              <div className="adm-field">
                <label className="adm-label" htmlFor="of-desc">Message</label>
                <textarea id="of-desc" className="adm-textarea" required maxLength={300} value={form.shortDescription} onChange={set('shortDescription')} placeholder="One or two sentences about the offer." />
                <span className="adm-hint">{form.shortDescription.length}/300</span>
              </div>

              <div className="adm-grid-2">
                <div className="adm-field">
                  <label className="adm-label" htmlFor="of-cta">Button text</label>
                  <input id="of-cta" className="adm-input" maxLength={50} value={form.ctaLabel} onChange={set('ctaLabel')} placeholder="Enquire now" />
                </div>
                <div className="adm-field">
                  <label className="adm-label" htmlFor="of-url">Button link</label>
                  <input id="of-url" className="adm-input" value={form.ctaUrl} onChange={set('ctaUrl')} placeholder="/contact" />
                </div>
              </div>

              <div className="adm-grid-2">
                <div className="adm-field">
                  <label className="adm-label" htmlFor="of-start">Show from</label>
                  <input id="of-start" type="date" className="adm-input" value={form.startDate} onChange={set('startDate')} />
                </div>
                <div className="adm-field">
                  <label className="adm-label" htmlFor="of-end">Show until</label>
                  <input id="of-end" type="date" className="adm-input" value={form.endDate} min={form.startDate || undefined} onChange={set('endDate')} />
                </div>
              </div>
              <span className="adm-hint" style={{ marginTop: -10 }}>Leave the dates empty to show it until you switch it off.</span>

              <Switch id="of-live" checked={form.live} onChange={(v) => setForm((f) => ({ ...f, live: v }))} label="Show on website" hint="Visitors see it as a popup on the homepage." />

              <div className="adm-field">
                <span className="adm-label">Preview</span>
                <div className="adm-preview">
                  <div className="adm-preview-card">
                    <h4>{form.title || 'Your headline'}</h4>
                    <p>{form.shortDescription || 'Your message appears here.'}</p>
                    {form.ctaLabel && <span>{form.ctaLabel}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="adm-drawer-foot">
              <button type="button" className="adm-btn" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>
                {saving ? 'Saving…' : editing._id ? 'Save offer' : 'Create offer'}
              </button>
            </div>
          </form>
        </div>
      )}

      {toastNode}
    </div>
  );
};
