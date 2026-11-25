import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInScale, defaultViewport } from '../../utils/motionVariants.js';
import { homepageApi } from '../../services/homepageApi.js';
import { SplitText } from '../common/SplitText.jsx';
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
            <span className="video-eyebrow">Cinematic Perspective</span>
            <SplitText tag="h2" animation="3d-flip" className="video-heading">
              Our Stories
            </SplitText>
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
            <span>Curated Architectural Vision</span>
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
          <span className="video-eyebrow">Cinematic Perspective</span>
          <SplitText tag="h2" animation="3d-flip" className="video-heading">
            Our Stories
          </SplitText>
        </header>

        <motion.div
          className="video-frame-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInScale}
        >
          {isPlaying && embedUrl ? (
            <div className="video-iframe-container">
              <iframe
                src={embedUrl}
                title="Curated Architectural Showcase Film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
            </div>
          ) : (
            <div
              className="video-poster-facade"
              style={{ backgroundImage: `url(${posterImage})` }}
              role="region"
              aria-label="Curated Architectural Film Play Area"
            >
              <div className="video-poster-scrim" />
              <button
                type="button"
                className="video-play-trigger"
                onClick={() => setIsPlaying(true)}
                aria-label="Play architectural showcase film"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            </div>
          )}
        </motion.div>

        <div className="video-caption-bar">
          <span>Curated Architectural Vision</span>
          <span>Architectural Perspective</span>
        </div>
      </div>
    </section>
  );
};
