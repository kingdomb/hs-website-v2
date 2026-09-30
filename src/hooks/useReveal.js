import { useEffect, useRef, useState } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';
import useMotionLevel from './useMotionLevel';

export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', immediate = false, hold = false } = {}) {
  const ref = useRef(null);
  const level = useMotionLevel();
  const [shown, setShown] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );

  // Above-the-fold content: skip the observer, start hidden on the first commit and flip to shown
  // two frames later so the CSS transition plays from the first paint.
  useEffect(() => {
    if (!immediate || shown || hold) return undefined;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setShown(true)); });
    return () => { cancelAnimationFrame(r1); if (r2) cancelAnimationFrame(r2); };
  }, [immediate, shown, hold]);

  useEffect(() => {
    const node = ref.current;
    if (immediate || shown || !node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown, threshold, rootMargin, immediate]);

  // With motion off everything is visible immediately (also when the setting changes at runtime).
  return [ref, shown || level === 'off'];
}
