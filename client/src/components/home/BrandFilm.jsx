import { useEffect, useRef, useState } from "react";
import { homepageApi } from "../../services/homepageApi.js";

const DEFAULT_TITLE = "Spaces Shaped by Vision";

/**
 * Background film for the brand-intro frame, driven by Admin → Video.
 *
 * Made to read as a cinematic loop, not a YouTube player:
 * - no controls, branding, captions, keyboard or pointer interaction;
 * - the iframe is scaled past the frame edges to crop YouTube's corner chrome;
 * - it stays invisible until YouTube reports "playing", so the spinner and title bar
 *   are never seen — the poster photo underneath shows until then. If autoplay is
 *   blocked (e.g. iOS low-power mode) or no video is set, the poster simply stays.
 */
export const BrandFilm = () => {
  const [video, setVideo] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false); // deleted/private/invalid video → photo only
  const iframeRef = useRef(null);
  const stateRef = useRef(-1); // latest YouTube player state
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    let alive = true;
    homepageApi.getVideo().then((v) => alive && setVideo(v));
    return () => { alive = false; };
  }, []);

  // YouTube's postMessage API: after a "listening" handshake it streams player state.
  useEffect(() => {
    if (!video?.videoId) return;
    const onMessage = (e) => {
      if (!/^https:\/\/www\.youtube(-nocookie)?\.com$/.test(e.origin)) return;
      let data;
      try { data = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch { return; }
      const state = data?.info?.playerState ?? (data?.event === "onStateChange" ? data.info : undefined);
      if (data?.event === "onError") { setFailed(true); return; }
      if (state !== undefined) stateRef.current = state;
      if (state === 1) setPlaying(true);       // playing
      else if (state === 0) setPlaying(false); // ended (between loops) — show the poster, not YouTube's end screen
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [video?.videoId]);

  const post = (msg) =>
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(msg), "*");

  const handshake = () => post({ event: "listening", id: 1, channel: "widget" });

  // Starts muted (browsers only autoplay muted video); the visitor can turn sound on.
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    if (muted) {
      post({ event: "command", func: "unMute", args: [] });
      post({ event: "command", func: "setVolume", args: [80] });
      // Chrome pauses an embedded video the moment it's unmuted; resume it just after.
      // (Sending play at the same instant gets overridden — verified in-browser.)
      [300, 900].forEach((t) =>
        setTimeout(() => {
          if (stateRef.current !== 1) post({ event: "command", func: "playVideo", args: [] });
        }, t),
      );
    } else {
      post({ event: "command", func: "mute", args: [] });
    }
    setMuted(!muted);
  };

  const id = video?.videoId;
  const src = id && !failed
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}` +
      `&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&iv_load_policy=3&cc_load_policy=0` +
      `&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`
    : null;

  return (
    <>
      {src && !reducedMotion && (
        <div className={`brand-film${playing ? " is-playing" : ""}`} aria-hidden="true">
          <iframe
            ref={iframeRef}
            src={src}
            title="Sushita Ventures brand film"
            tabIndex={-1}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            onLoad={handshake}
          />
        </div>
      )}

      {/* Title overlay — reads as part of the site, sits above video and poster alike */}
      <div className="brand-film-overlay">
        <span className="brand-film-eyebrow">The Sushita Perspective</span>
        <h3 className="brand-film-title">{video?.title?.trim() || DEFAULT_TITLE}</h3>
        <span className="brand-film-rule" aria-hidden="true" />
      </div>

      {src && !reducedMotion && playing && (
        <button
          type="button"
          className="brand-film-sound"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5L6 9H3v6h3l5 4V5z" />
              <path d="M22 9l-6 6M16 9l6 6" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5L6 9H3v6h3l5 4V5z" />
              <path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
            </svg>
          )}
          <span>{muted ? "Sound on" : "Sound off"}</span>
        </button>
      )}
    </>
  );
};

export default BrandFilm;
