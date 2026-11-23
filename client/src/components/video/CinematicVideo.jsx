import React, { useState, useEffect } from 'react';
import { homepageApi } from '../../services/homepageApi.js';
import './CinematicVideo.css';

export const CinematicVideo = () => {
  const [videoConfig, setVideoConfig] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchVideoConfig = async () => {
      const data = await homepageApi.getVideo();
      if (isMounted) {
        setVideoConfig(data);
        setHasLoaded(true);
      }
    };

    fetchVideoConfig();
    return () => { isMounted = false; };
  }, []);

  // Determine embed URL: if admin configured a video use it; otherwise use temporary high-end showcase
  const embedUrl = videoConfig?.embedUrl
    ? `${videoConfig.embedUrl}&autoplay=${isPlaying ? 1 : 0}&mute=1`
    : null;

  const posterImage = '/images/hero/hero-slide-3.jpg';

  // If no video is configured in production, hide gracefully or show illustrative preview
  if (hasLoaded && !videoConfig?.active && !videoConfig?.embedUrl) {
    return (
      <section id="video-showcase-section" className="video-showcase-root" aria-label="Curated Architectural Film">
        <div className="video-showcase-container">
          <header className="video-header">
            <span className="video-eyebrow">CINEMATIC PERSPECTIVE</span>
            <h2 className="video-heading">Our Stories</h2>

          </header>

          <div className="video-frame-wrapper">
            <div
              className="video-poster-facade"
              style={{ backgroundImage: `url(${posterImage})` }}
              role="region"
              aria-label="Architectural Showcase Preview"
            >
              <div className="video-poster-scrim" />
              <div className="video-play-trigger" aria-label="Preview video showcase">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="video-caption-bar">
            <span>CURATED ARCHITECTURAL VISION</span>
            <span>Architectural Perspective</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="video-showcase-section"
      className="video-showcase-root"
      aria-label="Curated Architectural Film"
    >
      <div className="video-showcase-container">
        <header className="video-header">
          <span className="video-eyebrow">CINEMATIC PERSPECTIVE</span>
          <h2 className="video-heading">
            {videoConfig?.title || 'Architecture Beyond the Ordinary.'}
          </h2>
          <p className="video-description">
            {videoConfig?.description || 'Explore a curated visual perspective on architecture, spaces, and property environments. From commercial structures to distinctive developments, every space presents a different possibility.'}
          </p>
        </header>

        <div className="video-frame-wrapper">
          {/* Façade: User clicks or interacts to activate iframe */}
          {!isPlaying ? (
            <div
              className="video-poster-facade"
              style={{ backgroundImage: `url(${posterImage})` }}
              onClick={() => setIsPlaying(true)}
              role="button"
              tabIndex={0}
              aria-label="Play curated architectural film"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPlaying(true);
                }
              }}
            >
              <div className="video-poster-scrim" />
              <div className="video-play-trigger">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          ) : (
            <iframe
              className="video-iframe-element"
              src={embedUrl || `https://www.youtube-nocookie.com/embed/${videoConfig?.videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
              title="Curated Architectural Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        <div className="video-caption-bar">
          <span>CURATED ARCHITECTURAL VISION</span>
          <span>{videoConfig?.videoId ? `Showcase ID: ${videoConfig.videoId}` : 'Privacy-Enhanced Embed'}</span>
        </div>
      </div>
    </section>
  );
};
