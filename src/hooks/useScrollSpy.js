// useScrollSpy: which section (by id) is in the middle of the viewport
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useScrollSpy(ids, resetKey) {
  const [active, setActive] = useState(null);
  const inView = useRef(new Set());
  const key = useMemo(() => ids.join('|'), [ids]);
  useEffect(() => {
    const els = key.split('|').map((id) => document.getElementById(id)).filter(Boolean);
    const set = inView.current;
    set.clear();
    if (!els.length || typeof IntersectionObserver === 'undefined') { setActive(null); return undefined; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) set.add(e.target.id); else set.delete(e.target.id); });
        setActive([...set].pop() ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key, resetKey]);
  return active;
}
