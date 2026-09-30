// VerseCarousel: one verse per slide in a native scroll-snap track (touch swipe works as is).
// Autoplay is gentle (about 9s), stops on hover, focus, touch and any control use, can be paused with
// the button, and never runs when the motion setting is `off`.
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';
import useMotionLevel from '../../hooks/useMotionLevel';

const BTN =
  'neu-press flex h-10 w-10 items-center justify-center rounded-full bg-neu text-xl text-neu-ink shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500';
const AUTOPLAY_MS = 9000;

const VerseCarousel = ({ items = [], intervalMs = AUTOPLAY_MS, className = '' }) => {
  const level = useMotionLevel();
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const count = items.length;
  const autoplay = level !== 'off' && !userPaused && !hovered && !focused && count > 1;

  const lockUntil = useRef(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  // Neighbouring slides glide; wrapping (3rd <-> 1st) or a longer jump crossfades instead of scrolling
  // back through the slides in between. The observer is ignored while we move the track ourselves.
  const goTo = useCallback((i) => {
    const node = track.current;
    if (!node || !count) return;
    const next = (i + count) % count;
    if (next === activeRef.current) return;
    const left = next * node.clientWidth;
    setActive(next);
    if (level === 'off') { node.scrollTo({ left, behavior: 'auto' }); return; }
    if (Math.abs(next - activeRef.current) === 1) {
      lockUntil.current = performance.now() + 900;
      node.scrollTo({ left, behavior: 'smooth' });
      return;
    }
    lockUntil.current = performance.now() + 700;
    const fade = (from, to, duration) => node.animate([{ opacity: from }, { opacity: to }], { duration, easing: 'ease-in-out', fill: 'forwards' }).finished;
    fade(1, 0, 220)
      .then(() => { node.scrollTo({ left, behavior: 'auto' }); return fade(0, 1, 380); })
      .then(() => node.getAnimations().forEach((a) => a.cancel()))
      .catch(() => { node.scrollTo({ left, behavior: 'auto' }); });
  }, [count, level]);

  // Keep the active dot in sync with manual swipes.
  useEffect(() => {
    const node = track.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (performance.now() < lockUntil.current) return;
        entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.index)); });
      },
      { root: node, threshold: 0.6 }
    );
    [...node.children].forEach((slide) => io.observe(slide));
    return () => io.disconnect();
  }, [count]);

  useEffect(() => {
    if (!autoplay) return undefined;
    const t = setTimeout(() => goTo(active + 1), intervalMs);
    return () => clearTimeout(t);
  }, [autoplay, active, intervalMs, goTo]);

  if (!count) return null;
  const stop = () => setUserPaused(true);
  const arrow = `absolute inset-y-0 my-auto ${BTN}`;

  return (
    <div
      role='region'
      aria-roledescription='carousel'
      aria-label='Scripture'
      className={`neu-inset relative rounded-neu-lg px-2 py-8 lg:px-8 lg:py-14 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onTouchStart={stop}
    >
      <div
        ref={track}
        aria-live={autoplay ? 'off' : 'polite'}
        className='no-scrollbar flex snap-x snap-mandatory overflow-x-auto'
      >
        {items.map((item, i) => (
          <div
            key={item.ref}
            role='group'
            aria-roledescription='slide'
            aria-label={`${i + 1} of ${count}`}
            data-index={i}
            className='flex w-full min-w-full shrink-0 snap-center flex-col items-center justify-center px-12 text-center lg:px-24'
          >
            <p className='font-display text-2xl italic text-neu-ink lg:text-4xl'>&ldquo;{item.quote}&rdquo;</p>
            <p className='mt-4 text-sm font-semibold uppercase tracking-widest text-royal-600'>{item.ref}</p>
          </div>
        ))}
      </div>
      {count > 1 && (
        <>
          <button type='button' aria-label='Previous verse' onClick={() => { stop(); goTo(active - 1); }} className={`${arrow} left-2 lg:left-6`}>‹</button>
          <button type='button' aria-label='Next verse' onClick={() => { stop(); goTo(active + 1); }} className={`${arrow} right-2 lg:right-6`}>›</button>
          <div className='mt-6 flex items-center justify-center gap-1'>
            {items.map((item, i) => (
              <button
                key={item.ref}
                type='button'
                aria-label={`Show verse ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => { stop(); goTo(i); }}
                className='flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1px] focus-visible:outline-royal-500'
              >
                <span className={`block h-3 w-3 rounded-full bg-neu transition-shadow duration-300 ${i === active ? 'shadow-neu-inset-sm' : 'shadow-neu-xs'}`} />
              </button>
            ))}
            {level !== 'off' && (
              <button
                type='button'
                aria-label={userPaused ? 'Play verses' : 'Pause verses'}
                onClick={() => setUserPaused((v) => !v)}
                className='neu-press ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-neu text-sm text-neu-ink shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'
              >
                {userPaused ? <FiPlay aria-hidden='true' /> : <FiPause aria-hidden='true' />}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default VerseCarousel;
