import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { NAV_LINKS, NAV_CTA } from '../../data/nav';
import { SITE } from '../../data/site';
import logo from '../../assets/hs-letter-logo-nav.png';
import Button from '../ui/Button';
import useScrollSpy from '../../hooks/useScrollSpy';
import MobileMenu from './MobileMenu';
import A11yMenuButton from './A11yMenuButton';

const SPY_IDS = ['encounter', 'events', 'next-steps'];
const FINE_POINTER = () => typeof window.matchMedia === 'function' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const hashOf = (to) => (to.includes('#') ? to.split('#')[1] : null);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState(null);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState(null); // { i, x, w } of the link under the pointer
  const menuId = useId();
  const openBtn = useRef(null);
  const listRef = useRef(null);
  const closeMenu = useCallback(() => setOpen(false), []);
  const { pathname, hash } = useLocation();
  const spy = useScrollSpy(SPY_IDS, pathname);

  const activeIndex = pathname === '/'
    ? NAV_LINKS.findIndex((l) => spy && hashOf(l.to) === spy)
    : NAV_LINKS.findIndex((l) => l.to === pathname);

  useEffect(() => {
    let raf = 0;
    const update = () => { raf = 0; setScrolled(window.scrollY > 24); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Slide the indicator to the active link: re-measure on active change, route change and resize.
  useLayoutEffect(() => {
    const measure = () => {
      setHover(null);
      const el = activeIndex >= 0 ? listRef.current?.children[activeIndex] : null;
      if (!el || !el.offsetWidth) { setIndicator(null); return; }
      setIndicator((prev) => (prev && prev.x === el.offsetLeft && prev.w === el.offsetWidth ? prev : { x: el.offsetLeft, w: el.offsetWidth }));
    };
    measure();
    // enable the slide transition only after the first measured paint
    const raf = requestAnimationFrame(() => setReady(true));
    let live = true;
    document.fonts?.ready.then(() => { if (live) measure(); });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [activeIndex, pathname]);

  // Logo: same behavior on every route and size: go home, or scroll to top if already there.
  const onLogo = (e) => {
    if (pathname === '/' && !hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className='fixed inset-x-0 top-0 z-50 h-header px-4 lg:px-8'>
        <div
          data-scrolled={scrolled}
          className='header-pill neu-raised-sm mx-auto mt-2 flex h-[calc(100%-0.5rem)] max-w-6xl items-center justify-between rounded-full px-4 transition-[transform,box-shadow] duration-[400ms] data-[scrolled=true]:scale-[0.985] data-[scrolled=true]:shadow-neu-xs lg:px-6'
        >
          <Link to='/' onClick={onLogo} className='h-full rounded-full py-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'>
            <img src={logo} alt={SITE.name} className='h-full w-auto' />
          </Link>
          <nav aria-label='Main' className='relative hidden lg:block'>
            <span
              aria-hidden='true'
              className={`pointer-events-none absolute inset-y-0 left-0 rounded-full shadow-neu-inset-sm ${ready ? 'transition-[transform,width,opacity] duration-500 ease-out' : ''} ${indicator ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: indicator?.w ?? 0, transform: `translateX(${indicator?.x ?? 0}px)` }}
            />
            <span
              aria-hidden='true'
              className={`pointer-events-none absolute inset-y-0 left-0 rounded-full shadow-neu-xs transition-[transform,width,opacity] duration-300 ease-out ${hover && hover.i !== activeIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: hover?.w ?? 0, transform: `translateX(${hover?.x ?? 0}px)` }}
            />
            <ul ref={listRef} className='flex items-center' onMouseLeave={() => setHover(null)} onBlur={() => setHover(null)}>
              {NAV_LINKS.map((l, i) => (
                <li
                  key={l.label}
                  className='relative'
                  onMouseEnter={(e) => { if (FINE_POINTER()) setHover({ i, x: e.currentTarget.offsetLeft, w: e.currentTarget.offsetWidth }); }}
                >
                  <Link
                    to={l.to}
                    aria-current={i === activeIndex ? (pathname === '/' && hashOf(l.to) ? 'location' : 'page') : undefined}
                    className='block rounded-full px-4 py-2 font-medium text-neu-muted transition-colors hover:text-neu-ink focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex items-center gap-3'>
            <A11yMenuButton />
            <div className='hidden lg:block'>
              <Button variant='accent' to={NAV_CTA.to} className='!py-2.5'>{NAV_CTA.label}</Button>
            </div>
            <button
              ref={openBtn}
              type='button'
              aria-label='Open menu'
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen(true)}
              className='neu-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-neu text-neu-ink shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500 lg:hidden'
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu id={menuId} open={open} onClose={closeMenu} returnFocusRef={openBtn} />
    </>
  );
};
export default Header;
