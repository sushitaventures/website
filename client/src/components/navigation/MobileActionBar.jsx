import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileActionBar.css';

// Phones only (CSS hides it from 901px). Slides up once the visitor scrolls past the
// first screen so Services and Enquire are always one thumb-tap away.
export const MobileActionBar = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname.startsWith('/contact') || pathname.startsWith('/admin')) return null;

  return (
    <nav className={`mab${visible ? ' is-visible' : ''}`} aria-label="Quick actions" aria-hidden={!visible}>
      <Link to="/#services-section" className="mab-link" tabIndex={visible ? 0 : -1}>
        Services
      </Link>
      <Link to="/contact" className="mab-cta" tabIndex={visible ? 0 : -1}>
        Enquire Now
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  );
};

export default MobileActionBar;
