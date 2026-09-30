// useExitTransition: keep an element mounted long enough to play its exit animation
import { useEffect, useState } from 'react';
import { motionFactor } from '../utils/motion';

export default function useExitTransition(open, ms = 220) {
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) { setMounted(true); return undefined; }
    const t = setTimeout(() => setMounted(false), motionFactor() === 0 ? 0 : ms);
    return () => clearTimeout(t);
  }, [open, ms]);
  const off = motionFactor() === 0;
  return { mounted: open || (mounted && !off), closing: mounted && !open && !off };
}
