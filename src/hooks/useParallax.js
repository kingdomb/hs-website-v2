// useParallax.js — translate an element by scrollY * factor (rAF-throttled, off under reduced motion)
import { useEffect, useRef } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';
import { motionFactor } from '../utils/motion';
import useMotionLevel from './useMotionLevel';

const MAX_SHIFT = 56; // parallax always stays under 60px

export default function useParallax(factor = 0.12) {
  const ref = useRef(null);
  const level = useMotionLevel();
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (prefersReducedMotion()) { node.style.transform = ''; return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.round(window.scrollY * factor * motionFactor());
      node.style.transform = `translate3d(0, ${Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, y))}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      node.style.transform = '';
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor, level]);
  return ref;
}
