import { useEffect } from 'react';
import useMotionLevel from './useMotionLevel';

export default function useScrollProgress() {
  const level = useMotionLevel();
  useEffect(() => {
    const root = document.documentElement;
    if (level === 'off') { root.style.removeProperty('--scroll-progress'); return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); root.style.removeProperty('--scroll-progress'); if (raf) cancelAnimationFrame(raf); };
  }, [level]);
}
