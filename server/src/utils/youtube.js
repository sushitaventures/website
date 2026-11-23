/**
 * Robust YouTube URL parser and validator
 */

const ALLOWED_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtube-nocookie.com'
]);

const VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

export const parseYouTubeUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isValid: false,
      error: 'YouTube URL must be a non-empty string'
    };
  }

  const trimmed = rawUrl.trim();

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      isValid: false,
      error: 'Invalid URL format'
    };
  }

  // Check protocol
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      isValid: false,
      error: 'URL must use HTTP or HTTPS protocol'
    };
  }

  // Check hostname
  const hostname = parsed.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(hostname)) {
    return {
      isValid: false,
      error: `Unsupported domain: ${hostname}. Only official YouTube domains are allowed.`
    };
  }

  let videoId = null;

  if (hostname === 'youtu.be') {
    // Format: https://youtu.be/VIDEO_ID
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      videoId = pathParts[0];
    }
  } else if (parsed.pathname === '/watch') {
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    videoId = parsed.searchParams.get('v');
  } else if (parsed.pathname.startsWith('/embed/')) {
    // Format: https://www.youtube.com/embed/VIDEO_ID
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      videoId = parts[1];
    }
  } else if (parsed.pathname.startsWith('/v/')) {
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      videoId = parts[1];
    }
  }

  if (!videoId || !VIDEO_ID_REGEX.test(videoId)) {
    return {
      isValid: false,
      error: 'Could not extract a valid 11-character YouTube video ID'
    };
  }

  const canonicalUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;

  return {
    isValid: true,
    videoId,
    canonicalUrl,
    embedUrl
  };
};
