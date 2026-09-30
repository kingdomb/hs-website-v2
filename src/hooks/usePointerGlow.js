// usePointerGlow: soft spotlight follows the pointer (fine pointers only)
import { useEffect } from 'react';
import useMotionLevel from './useMotionLevel';

export default function usePointerGlow(ref) {
  const level = useMotionLevel();
  useEffect(() => {
    const node = ref.current;
    if (!node || level === 'off' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      node.style.setProperty('--gx', `${e.clientX - r.left}px`);
      node.style.setProperty('--gy', `${e.clientY - r.top}px`);
    };
    node.addEventListener('pointermove', onMove, { passive: true });
    return () => node.removeEventListener('pointermove', onMove);
  }, [ref, level]);
}
