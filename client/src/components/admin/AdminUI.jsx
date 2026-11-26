import { useCallback, useEffect, useState } from 'react';

/** Page title row with optional actions on the right. */
export const PageHead = ({ title, sub, children }) => (
  <header className="adm-head">
    <div>
      <h1 className="adm-title">{title}</h1>
      {sub && <p className="adm-sub">{sub}</p>}
    </div>
    {children && <div style={{ display: 'flex', gap: 10 }}>{children}</div>}
  </header>
);

/** On/off switch with a label and optional hint. */
export const Switch = ({ id, checked, onChange, label, hint, disabled }) => (
  <label className="adm-switch" htmlFor={id}>
    <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
    <span className="adm-switch-track" aria-hidden="true" />
    <span>
      <span className="adm-label" style={{ display: 'block' }}>{label}</span>
      {hint && <span className="adm-hint">{hint}</span>}
    </span>
  </label>
);

export const Chip = ({ tone, children, title }) => (
  <span className={`adm-chip${tone ? ` adm-chip-${tone}` : ''}`} title={title}>{children}</span>
);

/** Short-lived confirmation / error message, bottom-right. */
export const useToast = () => {
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toast.type === 'error' ? 7000 : 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const show = useCallback((message, type = 'success') => setToast({ message, type, at: Date.now() }), []);

  const node = toast ? (
    <div className={`adm-toast${toast.type === 'error' ? ' adm-toast-error' : ''}`} role={toast.type === 'error' ? 'alert' : 'status'}>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button type="button" onClick={() => setToast(null)} aria-label="Dismiss">×</button>
    </div>
  ) : null;

  return [show, node];
};

export const fmtDate = (d, withTime = true) =>
  d
    ? new Date(d).toLocaleString('en-IN', withTime ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' })
    : '—';

/** "5 min ago", "Yesterday", or a date. */
export const timeAgo = (d) => {
  if (!d) return '';
  const mins = Math.round((Date.now() - new Date(d)) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return fmtDate(d, false);
};
