import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SplitText.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SplitText Component
 * Splits text into wrapped masked words or characters and animates them with GSAP and ScrollTrigger.
 */
export const SplitText = ({
  children,
  tag = 'h2',
  type = 'words',
  className = '',
  animation = 'reveal',
  delay = 0,
  duration = 1.05,
  stagger,
  trigger = true,
  start = 'top 88%',
  once = true,
  ease = 'power3.out',
  ...rest
}) => {
  const containerRef = useRef(null);

  const rawText = typeof children === 'string'
    ? children
    : React.Children.toArray(children)
        .map((child) => (typeof child === 'string' ? child : ''))
        .join('');

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const targets = containerRef.current.querySelectorAll(
        type === 'chars' ? '.split-char' : '.split-word'
      );
      if (!targets || targets.length === 0) return;

      const defaultStagger = type === 'chars' ? 0.025 : 0.055;
      const effectiveStagger = stagger !== undefined ? stagger : defaultStagger;

      // 'lcp-rise': for above-the-fold headlines that are the page's Largest Contentful Paint.
      // Words start partly visible (never opacity 0) so the heading counts as painted on the
      // first frame; they still rise and sharpen into place.
      const fromVars =
        animation === 'lcp-rise'
          ? { yPercent: 35, opacity: 0.4, rotateX: -20, transformOrigin: '50% 100% -20px' }
          : {
              yPercent: animation === 'fade-rise' ? 60 : 115,
              opacity: animation === 'reveal' ? 0.2 : 0,
              rotateX: animation === '3d-flip' ? -50 : -14,
              rotateY: animation === '3d-flip' ? 10 : 0,
              transformOrigin: '50% 100% -20px',
            };

      const toVars = {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        duration,
        ease,
        stagger: {
          amount: Math.min(targets.length * effectiveStagger, 0.9),
          from: 'start',
        },
        delay,
      };

      if (trigger) {
        toVars.scrollTrigger = {
          trigger: containerRef.current,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          once,
        };
      }

      gsap.fromTo(targets, fromVars, toVars);
    },
    { scope: containerRef, dependencies: [rawText, type, animation] }
  );

  const Tag = tag;

  if (type === 'chars') {
    const chars = rawText.split('');
    return (
      <Tag
        ref={containerRef}
        className={`split-text-root split-chars-mode ${className}`.trim()}
        {...rest}
      >
        <span className="split-sr">{rawText}</span>
        {chars.map((char, idx) => (
          <span key={idx} className="split-char-mask" aria-hidden="true">
            <span className="split-char">{char === ' ' ? '\u00A0' : char}</span>
          </span>
        ))}
      </Tag>
    );
  }

  const words = rawText.split(/\s+/).filter(Boolean);

  return (
    <Tag
      ref={containerRef}
      className={`split-text-root split-words-mode ${className}`.trim()}
      {...rest}
    >
      {/* Real spaces between words (not CSS margins) so the heading's text content reads
          correctly for crawlers, answer engines and screen readers — no ARIA needed. */}
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && ' '}
          <span className="split-word-wrapper">
            <span className="split-word-mask">
              <span className="split-word">{word}</span>
            </span>
          </span>
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default SplitText;
