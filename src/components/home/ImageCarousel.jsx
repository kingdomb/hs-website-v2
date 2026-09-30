// ImageCarousel.jsx — items: [{ name, alt, caption?, focus? }] (name = ResponsiveImage name)
import { useEffect, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';
import ResponsiveImage from '../ui/ResponsiveImage';
import useRotation from '../../hooks/useRotation';

const ImageCarousel = ({ items = [], intervalMs = 6000 }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // fadeMs 0: the index changes at once and the new slide fades in over the previous one (a true crossfade).
  const { index, goTo } = useRotation(items.length, intervalMs, 0, hovered || focused || userPaused);
  const [tracked, setTracked] = useState({ current: index, previous: null });
  if (tracked.current !== index) setTracked({ current: index, previous: tracked.current });
  // Drop the old slide once the crossfade (1s) has finished.
  useEffect(() => {
    const t = setTimeout(() => setTracked((s) => (s.current === index && s.previous !== null ? { ...s, previous: null } : s)), 1100);
    return () => clearTimeout(t);
  }, [index]);
  if (!items.length) return null;
  const previous = tracked.previous !== null && tracked.previous !== index ? items[tracked.previous] : null;
  const { name, alt, caption, focus } = items[index];
  const btn =
    'neu-press flex h-9 w-9 items-center justify-center rounded-full bg-neu text-neu-ink shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500';
  const arrow = `absolute inset-y-0 my-auto ${btn}`;

  return (
    <div
      className='relative overflow-hidden rounded-[26px]'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {previous && (
        <ResponsiveImage
          key={previous.name}
          name={previous.name}
          alt=''
          aria-hidden='true'
          sizes='(min-width: 1024px) 560px, 100vw'
          style={{ objectPosition: previous.focus }}
          className='absolute inset-0 h-full w-full object-cover'
        />
      )}
      <ResponsiveImage
        key={name}
        name={name}
        alt={alt}
        sizes='(min-width: 1024px) 560px, 100vw'
        style={{ objectPosition: focus }}
        className={`relative aspect-[16/10] w-full object-cover ${previous ? 'animate-crossfade' : ''}`}
      />
      {caption && <div className='absolute inset-x-0 bottom-0 bg-neu/80 p-2 text-sm text-neu-ink'>{caption}</div>}
      <button type='button' aria-label='Previous image' onClick={() => goTo(index - 1)} className={`${arrow} left-2`}>‹</button>
      <button type='button' aria-label='Next image' onClick={() => goTo(index + 1)} className={`${arrow} right-2`}>›</button>
      <button
        type='button'
        aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
        onClick={() => setUserPaused((v) => !v)}
        className={`absolute right-2 top-2 ${btn}`}
      >
        {userPaused ? <FiPlay aria-hidden='true' /> : <FiPause aria-hidden='true' />}
      </button>
      <div className='absolute inset-x-0 bottom-3 flex justify-center gap-1'>
        {items.map((it, i) => (
          <button
            key={it.name}
            type='button'
            aria-label={`Show image ${i + 1}`}
            onClick={() => goTo(i)}
            className='flex items-center justify-center rounded-full p-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1px] focus-visible:outline-royal-500'
          >
            <span className={`block h-3 w-3 rounded-full bg-neu transition-shadow duration-300 ${i === index ? 'shadow-neu-inset-sm' : 'shadow-neu-xs'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;
