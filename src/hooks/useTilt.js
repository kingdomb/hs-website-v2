// useTilt: card leans slightly toward the pointer (max a few degrees, full motion only)
import { useEffect } from 'react';
import useMotionLevel from './useMotionLevel';

export default function useTilt(ref, max = 4) {
  const level = useMotionLevel();
  useEffect(() => {
    const node = ref.current;
    if (!node || max <= 0 || level !== 'full' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
    };
    const onLeave = () => { node.style.transform = ''; };
    node.addEventListener('pointermove', onMove, { passive: true });
    node.addEventListener('pointerleave', onLeave);
    return () => { node.removeEventListener('pointermove', onMove); node.removeEventListener('pointerleave', onLeave); onLeave(); };
  }, [ref, max, level]);
}
