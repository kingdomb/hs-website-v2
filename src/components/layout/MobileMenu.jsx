import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { isTopDismiss, popDismiss, pushDismiss } from '../../utils/dismissStack';
import useScrollLock from '../../hooks/useScrollLock';
import { NAV_LINKS, NAV_CTA } from '../../data/nav';
import Button from '../ui/Button';
import A11yMenuButton from './A11yMenuButton';

// Rendered as a SIBLING of <header> (never inside a transformed header pill).
const MobileMenu = ({ id, open, onClose, returnFocusRef }) => {
  const closeRef = useRef(null);
  // Keep the latest onClose in a ref so inline callers do not re-push the dismiss token every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const trigger = returnFocusRef?.current;
    closeRef.current?.focus();
    const token = {};
    pushDismiss(token);
    const onKey = (e) => e.key === 'Escape' && isTopDismiss(token) && onCloseRef.current();
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && onCloseRef.current();
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      popDismiss(token);
      mq.removeEventListener('change', onChange);
      trigger?.focus();
    };
  }, [open, returnFocusRef]);

  if (!open) return null;
  return (
    <div id={id} className='fixed inset-0 z-[60] flex flex-col bg-neu p-6 lg:hidden' role='dialog' aria-modal='true' aria-label='Menu'>
      <div className='flex items-center justify-end gap-3'>
        <A11yMenuButton />
        <button
          ref={closeRef}
          type='button'
          aria-label='Close menu'
          onClick={onClose}
          className='neu-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-neu text-neu-ink shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'
        >
          <FiX size={24} />
        </button>
      </div>
      <ul className='mt-8 flex flex-col gap-6 font-display text-4xl'>
        {NAV_LINKS.map((l, i) => (
          <li key={l.label} className='animate-page-in [animation-fill-mode:backwards]' style={{ animationDelay: `${i * 60}ms` }}>
            <Link to={l.to} onClick={onClose} className='block rounded-neu text-neu-ink hover:text-royal-600 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'>{l.label}</Link>
          </li>
        ))}
      </ul>
      <Button variant='primary' to={NAV_CTA.to} onClick={onClose} className='mt-auto'>{NAV_CTA.label}</Button>
    </div>
  );
};
export default MobileMenu;
