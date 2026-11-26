import { useEffect, useState } from 'react';
import { apiClient } from '../../services/apiClient.js';
import { PageHead, Switch, Chip, useToast } from '../../components/admin/AdminUI.jsx';

const DEFAULT_TITLE = 'Spaces Shaped by Vision';

const videoIdFrom = (url) => {
  try {
    const u = new URL(url.trim());
    const id = u.hostname.includes('youtu.be')
      ? u.pathname.slice(1)
      : u.searchParams.get('v') || u.pathname.split(/\/(?:embed|shorts|live)\//)[1];
    return id && /^[\w-]{11}$/.test(id.slice(0, 11)) ? id.slice(0, 11) : null;
  } catch {
    return null;
  }
};

export const AdminVideoPage = () => {
  const [toast, toastNode] = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);
  const [form, setForm] = useState({ youtubeUrl: '', title: '', active: true });

  useEffect(() => {
    apiClient
      .get('/admin/homepage/video')
      .then((res) => {
        const c = res?.data?.config;
        if (c) {
          setSaved(c);
          setForm({ youtubeUrl: c.youtubeUrl || '', title: c.title || '', active: !!c.active });
        }
      })
      .catch((err) => toast(err.message || 'Could not load the film settings.', 'error'))
      .finally(() => setLoading(false));
  }, [toast]);

  const id = videoIdFrom(form.youtubeUrl);
  const urlInvalid = form.youtubeUrl.trim() !== '' && !id;
  const dirty = !saved
    ? form.youtubeUrl.trim() !== ''
    : form.youtubeUrl !== (saved.youtubeUrl || '') || form.title !== (saved.title || '') || form.active !== !!saved.active;

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // The homepage film always plays muted, on autoplay and on a loop
      const res = await apiClient.put('/admin/homepage/video', { ...form, autoplay: true, muted: true, loop: true });
      setSaved(res.data.config);
      toast(form.active ? 'Saved. The film is playing on the homepage.' : 'Saved. The homepage shows the photo instead.');
    } catch (err) {
      toast(err.message || 'Film settings could not be saved.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-page">
      <PageHead
        title="Homepage film"
        sub="A muted, looping YouTube film plays in the brand introduction on the homepage. When it’s off or the link doesn’t work, visitors see the photo instead."
      >
        {saved && (saved.active ? <Chip tone="green">Playing</Chip> : <Chip>Off</Chip>)}
      </PageHead>

      <div className="adm-video-grid">
        <form className="adm-panel adm-panel-pad adm-form" onSubmit={save}>
          <div className="adm-field">
            <label className="adm-label" htmlFor="vid-url">YouTube link</label>
            <input
              id="vid-url"
              className="adm-input"
              required
              disabled={loading}
              value={form.youtubeUrl}
              onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
              placeholder="https://www.youtube.com/watch?v=…"
              aria-invalid={urlInvalid}
              aria-describedby="vid-url-hint"
            />
            <span id="vid-url-hint" className="adm-hint" style={urlInvalid ? { color: 'var(--red)' } : undefined}>
              {urlInvalid ? 'This doesn’t look like a YouTube video link.' : 'Paste the link from the YouTube share button.'}
            </span>
          </div>

          <div className="adm-field">
            <label className="adm-label" htmlFor="vid-title">Title over the film</label>
            <input
              id="vid-title"
              className="adm-input"
              maxLength={80}
              disabled={loading}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder={DEFAULT_TITLE}
            />
            <span className="adm-hint">Leave empty to use “{DEFAULT_TITLE}”.</span>
          </div>

          <Switch
            id="vid-active"
            checked={form.active}
            disabled={loading}
            onChange={(v) => setForm((f) => ({ ...f, active: v }))}
            label="Play on homepage"
            hint="Switch off to show the photo instead."
          />

          <div>
            <button type="submit" className="adm-btn adm-btn-primary" disabled={loading || saving || urlInvalid || !dirty}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>

        <div>
          <span className="adm-label" style={{ display: 'block', marginBottom: 8 }}>Preview</span>
          <div className="adm-film">
            {id ? (
              <iframe
                key={id}
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                title="Film preview"
                allow="autoplay; encrypted-media"
                tabIndex={-1}
              />
            ) : (
              <div className="adm-film-empty">Paste a YouTube link to preview the film.</div>
            )}
            {id && <div className="adm-film-title">{form.title.trim() || DEFAULT_TITLE}</div>}
          </div>
        </div>
      </div>

      {toastNode}
    </div>
  );
};
