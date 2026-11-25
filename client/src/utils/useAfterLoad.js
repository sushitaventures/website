import { useEffect, useState } from 'react';

/**
 * true once the page has finished loading and the browser is idle.
 * Gate non-critical work behind it (below-the-fold chunks, hidden slider images,
 * popups) so it never competes with the first paint / LCP for bandwidth or CPU.
 */
export const useAfterLoad = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId;
    let timer;
    const schedule = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
        : (timer = setTimeout(() => setReady(true), 300));
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      clearTimeout(timer);
    };
  }, []);

  return ready;
};
