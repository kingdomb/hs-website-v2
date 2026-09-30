# Neumorphic v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the look of the site as neumorphism on white with a little clay, and add plentiful gentle animation, without changing content, routes, data or deployment.

**Architecture:** New design tokens and a small set of CSS component classes (`neu-*`, `clay-*`) in Tailwind; a single motion setting (`html[data-motion]`) that every hook and animation honours; a handful of new motion primitives (`Reveal` variants, `ScrollProgress`, `AmbientBackground`, `PageTransition`, `InteractiveCard`, `ScrollMarquee`); then every existing primitive, shell part, page and dialog is restyled on top of them.

**Tech Stack:** React 19, Vite 6, Tailwind v3.4, React Router 7, react-icons. **No new dependencies.**

**Spec:** `docs/superpowers/specs/2026-09-30-neumorphic-v2-design.md`

**Visual reference (read-only, not included in this repository):** the style sample pages (`index.html`, `base.css`, `themes.css`, `samples.js`). Open the `neumorphism` and `neu-clay` blocks in `themes.css` and the motion code in `samples.js` for values and behavior. The build here uses a *small amount* of clay: see Global Constraints.

## Global Constraints

- **Style:** neumorphism on `#eef1f6` is the base. Clay (puffy, saturated, inner light) is used **only** on: the primary call-to-action button (`clay-primary`), gold number/date badges (`clay-gold`), switch knobs, and the gold orb. Cards, nav, inputs, frames and secondary buttons are pure neumorphic. Do not apply clay to anything else.
- **Navbar = variant 0:** shadow only. **No outline, rim, ring or border** added to buttons or the nav.
- **Motion:** plentiful and gentle. **No per-letter or per-word animation.** No text spinning, flying, bouncing or typing in. Rise distances at most 24px; parallax under 60px; tilt at most 4 degrees; durations 0.6 to 1.4s with ease-out. Scroll-linked effects animate only `transform` and `opacity` (blur only on headings). Pointer effects only when `(hover: hover) and (pointer: fine)`. No autoplay that cannot be paused.
- **Motion setting:** `document.documentElement.dataset.motion` is `full` | `gentle` | `off`, initialised in `main.jsx` from `?motion=` or `prefers-reduced-motion`. Every hook, component and CSS animation must honour it. With `off`, everything is visible immediately and nothing moves.
- **Responsive convention (unchanged from v1):** mobile and tablet share one layout; only `lg:` (1024px) may change structure. No `sm:`, `md:`, `xl:`, `2xl:` anywhere in `src/`.
- **Tokens only:** colors, shadows, radii and keyframes come from `tailwind.config.js`; no hex or `bg-[#...]`/`shadow-[...]` in components (the CSS component classes in `index.css` may reference theme tokens).
- **No `position: fixed` inside an ancestor with `transform`, `filter` or `backdrop-filter`.** `AmbientBackground` and `ScrollProgress` are top-level siblings in `App`. Modals stay portaled; the mobile menu stays a sibling of the header.
- **`h-dvh`/`min-h-dvh`, never `h-screen`/`100vh`.** Header height is the single CSS variable `--header-h`.
- **No new runtime dependencies.** DRY and modular: shared behavior lives in hooks and `components/ui`, shared content in `src/data`.
- **Accessibility:** text contrast 4.5:1 or better (verify tokens); strong visible focus ring on every interactive element; a placeholder accessibility button marked `TODO(a11y-menu)` (Task 4). Known owner-accepted gap: shadow-only button edges do not meet non-text contrast; documented in Task 10.
- **Carried over from v1:** non-denominational; event-based (no service times); placeholders stay placeholders (Tithe.ly form id, email, address, socials, leaders); `robots noindex, nofollow`; no depiction of Jesus with a face; forms still discard submissions (owner decision pending; do not change behavior).
- **Git:** never `git add -A` or `git add .` (explicit paths only). Commit trailer: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Work on branch `site-refresh-v2`.
- **No unit-test framework exists; none is added.** Verification per task: `npx eslint <touched files>` (0 errors), `npm run build` passes, and the greps in the task. The controller does browser and screenshot checks.

## File Structure

**Create**
- `src/utils/motion.js`, `src/hooks/useMotionLevel.js`, `useScrollProgress.js`, `usePointerGlow.js`, `useTilt.js`, `useScrollSpy.js`, `useExitTransition.js`
- `src/components/ui/InteractiveCard.jsx`, `NeuFrame.jsx`, `ScrollMarquee.jsx`
- `src/components/layout/ScrollProgress.jsx`, `AmbientBackground.jsx`, `PageTransition.jsx`, `A11yMenuButton.jsx`
- `src/data/a11yPlanned.js`

**Modify:** `tailwind.config.js`, `src/index.css`, `src/main.jsx`, `src/App.jsx`, `src/utils/prefersReducedMotion.js`, `src/hooks/useReveal.js`, `useParallax.js`, `useRotation.js` (if it reads motion), `src/components/ui/*` (Button, Section, SectionHeading, Reveal, CardGrid, Accordion, Field, tones, fieldClasses), `src/components/layout/*` (Header, MobileMenu), `src/components/hero/PageHero.jsx`, and every page section, dialog and form listed in Tasks 5 to 8.

---

### Task 1: Foundation: tokens, neumorphic CSS classes, motion setting

**Files:**
- Modify: `tailwind.config.js`, `src/index.css`, `src/main.jsx`, `src/utils/prefersReducedMotion.js`, `index.html` (theme-color)
- Create: `src/utils/motion.js`, `src/hooks/useMotionLevel.js`

**Interfaces:**
- Produces: Tailwind colors `neu` (`DEFAULT #eef1f6`, `deep #e7ebf2`, `ink #1a2750`, `muted #4f5b82`, `shade #a3b1c6`); shadows `shadow-neu`, `shadow-neu-sm`, `shadow-neu-xs`, `shadow-neu-inset`, `shadow-neu-inset-sm`, `shadow-clay-royal`, `shadow-clay-gold`; radii `rounded-neu` (26px), `rounded-neu-lg` (36px); animations `animate-float`, `animate-breathe`, `animate-drift`, `animate-page-in`, `animate-kenburns`, `animate-fade-in`, `animate-fade-out`, `animate-pop-in`, `animate-pop-out`; CSS classes `.neu-raised`, `.neu-raised-sm`, `.neu-inset`, `.neu-press`, `.clay-primary`, `.clay-gold`, `.spotlight`, `.tilt`, `.reveal[data-variant]`; JS: `getMotionLevel()`, `setMotionLevel(level)`, `motionFactor()`, `subscribeMotion(cb)`, `initMotion()`, hook `useMotionLevel()`; `prefersReducedMotion()` now returns `getMotionLevel() === 'off'`.

- [ ] **Step 1: `tailwind.config.js`**: extend (keep every existing token) with:

```js
colors: {
  // ...existing navy / royal / gold / ivory
  neu: { DEFAULT: '#eef1f6', deep: '#e7ebf2', ink: '#1a2750', muted: '#4f5b82', shade: '#a3b1c6' },
},
boxShadow: {
  // ...existing glow
  neu: '12px 12px 26px rgba(163, 177, 198, 0.62), -12px -12px 26px #ffffff',
  'neu-sm': '7px 7px 15px rgba(163, 177, 198, 0.62), -7px -7px 15px #ffffff',
  'neu-xs': '4px 4px 9px rgba(163, 177, 198, 0.62), -4px -4px 9px #ffffff',
  'neu-inset': 'inset 7px 7px 14px rgba(163, 177, 198, 0.62), inset -7px -7px 14px #ffffff',
  'neu-inset-sm': 'inset 4px 4px 8px rgba(163, 177, 198, 0.62), inset -4px -4px 8px #ffffff',
  'clay-royal': '9px 10px 22px rgba(47, 84, 235, 0.35), -6px -6px 14px #ffffff, inset -6px -8px 14px rgba(20, 40, 150, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.5)',
  'clay-gold': '5px 6px 12px rgba(160, 110, 0, 0.32), -4px -4px 8px #ffffff, inset -4px -4px 8px rgba(160, 110, 0, 0.28), inset 4px 4px 8px rgba(255, 255, 255, 0.7)',
},
borderRadius: { neu: '26px', 'neu-lg': '36px' },
keyframes: {
  float: { '0%, 100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-12px) rotate(0.4deg)' } },
  breathe: { '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' }, '50%': { transform: 'scale(1.12)', filter: 'brightness(1.07)' } },
  drift: { '0%': { transform: 'translate3d(0, 0, 0) scale(1)' }, '100%': { transform: 'translate3d(6vw, 5vh, 0) scale(1.12)' } },
  'page-in': { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
  kenburns: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.07)' } },
  'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
  'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
  'pop-in': { from: { opacity: '0', transform: 'scale(0.94) translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
  'pop-out': { from: { opacity: '1', transform: 'none' }, to: { opacity: '0', transform: 'scale(0.96) translateY(6px)' } },
},
animation: {
  float: 'float 9s ease-in-out infinite',
  breathe: 'breathe 5.5s ease-in-out infinite',
  drift: 'drift 26s ease-in-out infinite alternate',
  'page-in': 'page-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
  kenburns: 'kenburns 18s ease-in-out infinite alternate',
  'fade-in': 'fade-in 0.25s ease-out both',
  'fade-out': 'fade-out 0.22s ease-in both',
  'pop-in': 'pop-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both',
  'pop-out': 'pop-out 0.22s ease-in both',
},
```

- [ ] **Step 2: `src/utils/motion.js`**

```js
// Single source of truth for motion. Default from the OS; ?motion=off|gentle|full forces it
// (used for screenshots); the future accessibility menu just calls setMotionLevel().
const LEVELS = ['full', 'gentle', 'off'];

export function getMotionLevel() {
  if (typeof document === 'undefined') return 'full';
  const v = document.documentElement.dataset.motion;
  return LEVELS.includes(v) ? v : 'full';
}
export function setMotionLevel(level) {
  if (LEVELS.includes(level)) document.documentElement.dataset.motion = level;
}
// 1 = full, 0.5 = gentle, 0 = off. Multiply distances and amplitudes by this.
export function motionFactor() {
  const level = getMotionLevel();
  return level === 'full' ? 1 : level === 'gentle' ? 0.5 : 0;
}
export function subscribeMotion(callback) {
  const mo = new MutationObserver(callback);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  return () => mo.disconnect();
}
export function initMotion() {
  if (typeof window === 'undefined') return;
  const forced = new URLSearchParams(window.location.search).get('motion');
  if (LEVELS.includes(forced)) { setMotionLevel(forced); return; }
  if (LEVELS.includes(document.documentElement.dataset.motion)) return; // set elsewhere (future menu)
  setMotionLevel(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'full');
}
```

- [ ] **Step 3: `src/hooks/useMotionLevel.js`**

```js
import { useSyncExternalStore } from 'react';
import { getMotionLevel, subscribeMotion } from '../utils/motion';

export default function useMotionLevel() {
  return useSyncExternalStore(subscribeMotion, getMotionLevel, () => 'full');
}
```

- [ ] **Step 4: `src/utils/prefersReducedMotion.js`** becomes a thin wrapper so existing hooks keep working:

```js
import { getMotionLevel } from './motion';

// Kept under its old name for existing imports: true when motion is switched off
// (by the OS reduce-motion setting, ?motion=off, or the future accessibility menu).
export default function prefersReducedMotion() {
  return getMotionLevel() === 'off';
}
```

- [ ] **Step 5: `src/main.jsx`**: import `initMotion` and call it **before** `ReactDOM.createRoot(...)`.

- [ ] **Step 6: `src/index.css`**: replace the file's body styles and reveal/reduced-motion blocks with the following (keep `@tailwind` lines and `--header-h`):

```css
@layer base {
  :root { --header-h: 4.5rem; }
  html { scroll-behavior: smooth; scroll-padding-top: calc(var(--header-h) + 1rem); }
  body { @apply bg-neu font-sans text-neu-ink antialiased; }
  h1, h2, h3 { @apply font-display; }
  img { @apply max-w-full; }
}

@layer components {
  .neu-raised { @apply rounded-neu bg-neu shadow-neu; }
  .neu-raised-sm { @apply rounded-neu bg-neu shadow-neu-sm; }
  .neu-inset { @apply rounded-neu bg-neu shadow-neu-inset; }
  .neu-press { transition: box-shadow 0.3s ease, transform 0.3s ease; }
  .neu-press:hover { transform: translateY(-2px); }
  .neu-press:active { transform: none; box-shadow: theme('boxShadow.neu-inset-sm'); }
  /* the only clay in the system */
  .clay-primary { color: #fff; background: linear-gradient(160deg, #86a0ff, #2f54eb); box-shadow: theme('boxShadow.clay-royal'); }
  .clay-primary:active { box-shadow: inset 6px 6px 12px rgba(20, 40, 150, 0.45), inset -4px -4px 10px rgba(134, 160, 255, 0.4); }
  .clay-gold { color: #4a3300; background: linear-gradient(160deg, #ffe89c, #e4b84d); box-shadow: theme('boxShadow.clay-gold'); }
  /* soft pointer spotlight (see hooks/usePointerGlow) */
  .spotlight { position: relative; }
  .spotlight::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity 0.4s ease;
    background: radial-gradient(340px circle at var(--gx, 50%) var(--gy, 50%), rgba(91, 123, 255, 0.10), transparent 62%);
  }
  .spotlight:hover::before { opacity: 1; }
  .tilt { transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.4s ease; }
  .tilt:hover { will-change: transform; }
}

/* Scroll reveal family (components/ui/Reveal.jsx). Whole elements only, never letters or words. */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 1s ease, transform 1s cubic-bezier(0.2, 0.7, 0.2, 1), filter 1.2s ease, clip-path 1.2s cubic-bezier(0.2, 0.7, 0.2, 1); transition-delay: var(--reveal-delay, 0ms); }
.reveal:not([data-shown='true']) { will-change: opacity, transform; }
.reveal[data-variant='scale'] { transform: scale(0.94); }
.reveal[data-variant='left'] { transform: translateX(-32px); }
.reveal[data-variant='right'] { transform: translateX(32px); }
.reveal[data-variant='blur'] { filter: blur(14px); transform: translateY(10px); }
.reveal[data-variant='mask'] { clip-path: inset(9% round 30px); transform: scale(1.05); }
.reveal[data-shown='true'] { opacity: 1; transform: none; filter: none; clip-path: inset(0 round 0); }
.reveal[data-variant='mask'][data-shown='true'] { clip-path: inset(0 round 30px); }

/* Motion off (OS reduce-motion, ?motion=off, or the future accessibility menu): nothing moves. */
html[data-motion='off'] .reveal { opacity: 1; transform: none; filter: none; clip-path: none; }
html[data-motion='off'] *, html[data-motion='off'] *::before, html[data-motion='off'] *::after {
  animation: none !important; transition: none !important; scroll-behavior: auto !important;
}
/* Gentle: entrances stay, continuous loops stop. */
html[data-motion='gentle'] .animate-float, html[data-motion='gentle'] .animate-breathe,
html[data-motion='gentle'] .animate-drift, html[data-motion='gentle'] .animate-kenburns { animation: none; }
@media (prefers-reduced-motion: reduce) {
  html:not([data-motion]) * , html:not([data-motion]) *::before, html:not([data-motion]) *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  html:not([data-motion]) .reveal { opacity: 1; transform: none; filter: none; clip-path: none; }
}
```

- [ ] **Step 7:** `index.html`: add `<meta name="theme-color" content="#eef1f6" />`. Keep `noindex`.

- [ ] **Step 8: Verify and commit.** `npx eslint tailwind.config.js src/utils src/hooks/useMotionLevel.js src/main.jsx` (0 errors); `npm run build` passes (the site will look half-converted until later tasks; that is expected). `git add tailwind.config.js src/index.css src/main.jsx src/utils/motion.js src/utils/prefersReducedMotion.js src/hooks/useMotionLevel.js index.html && git commit -m "feat(foundation): neumorphic tokens, css classes and motion setting"`.

---

### Task 2: Motion engine: hooks and effect components

**Files:**
- Create: `src/hooks/useScrollProgress.js`, `usePointerGlow.js`, `useTilt.js`, `useScrollSpy.js`, `useExitTransition.js`; `src/components/ui/InteractiveCard.jsx`, `NeuFrame.jsx`, `ScrollMarquee.jsx`; `src/components/layout/ScrollProgress.jsx`, `AmbientBackground.jsx`, `PageTransition.jsx`
- Modify: `src/hooks/useReveal.js`, `src/hooks/useParallax.js`, `src/components/ui/Reveal.jsx`, `src/components/ui/CardGrid.jsx`, `src/components/ui/SectionHeading.jsx`

**Interfaces (Produces):**
- `useScrollProgress()`: sets `--scroll-progress` (0..1) on `<html>`
- `usePointerGlow(ref)`, `useTilt(ref, maxDeg = 4)`, `useScrollSpy(ids) => activeId | null`, `useExitTransition(open, ms = 220) => { mounted, closing }`
- `<Reveal variant='up'|'scale'|'left'|'right'|'blur'|'mask' delay as className>`
- `<InteractiveCard as className tilt>`: raised card with spotlight and tilt
- `<NeuFrame className float kenBurns>`: raised frame with an inset inner well for a photo
- `<ScrollMarquee>{children}</ScrollMarquee>`: children slide sideways as the band scrolls through view
- `<ScrollProgress />`, `<AmbientBackground />`, `<PageTransition>{children}</PageTransition>` (uses `useLocation().pathname` as key)
- `useParallax(factor)` now multiplies by `motionFactor()` and re-reads on motion change

- [ ] **Step 1: hooks**

```js
// hooks/useScrollProgress.js
import { useEffect } from 'react';
import useMotionLevel from './useMotionLevel';

export default function useScrollProgress() {
  const level = useMotionLevel();
  useEffect(() => {
    if (level === 'off') return undefined;
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [level]);
}
```

```js
// hooks/usePointerGlow.js: soft spotlight follows the pointer (fine pointers only)
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
```

```js
// hooks/useTilt.js: card leans slightly toward the pointer (max a few degrees, full motion only)
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
```

```js
// hooks/useScrollSpy.js: which section (by id) is in the middle of the viewport
import { useEffect, useMemo, useState } from 'react';

export default function useScrollSpy(ids, resetKey) {
  const [active, setActive] = useState(null);
  const key = useMemo(() => ids.join('|'), [ids]);
  useEffect(() => {
    const els = key.split('|').map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') { setActive(null); return undefined; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key, resetKey]);
  return active;
}
```

```js
// hooks/useExitTransition.js: keep an element mounted long enough to play its exit animation
import { useEffect, useState } from 'react';
import { motionFactor } from '../utils/motion';

export default function useExitTransition(open, ms = 220) {
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) { setMounted(true); return undefined; }
    const t = setTimeout(() => setMounted(false), motionFactor() === 0 ? 0 : ms);
    return () => clearTimeout(t);
  }, [open, ms]);
  return { mounted: open || mounted, closing: mounted && !open };
}
```

- [ ] **Step 2: update `useReveal`, `useParallax`**: both already use `prefersReducedMotion()` (now "motion is off"). In `useParallax`, multiply the offset by `motionFactor()` and add `useMotionLevel()` to the effect deps so a change re-runs it. In `useReveal`, no behavior change is needed beyond keeping the initial `shown` = motion off.

- [ ] **Step 3: `Reveal` gets `variant`** (default `'up'`), rendering `data-variant={variant}` on the element (CSS from Task 1 does the rest). `CardGrid` keeps staggered `Reveal` (`delay={i * 90}`) and gets an optional `variant` prop (default `'up'`) it passes down. `SectionHeading` becomes: a `Reveal variant='blur'` wrapper around the title block, plus a short gold-to-blue rule under the eyebrow that draws in (`scaleX` 0 to 1) when shown (implement with a `span` using `origin-left` and a transition keyed off the parent's `data-shown` via `group`/`group-data-[shown=true]:scale-x-100` classes). Tone prop stays for now (Task 3 renames tones).

- [ ] **Step 4: components**

```jsx
// ui/InteractiveCard.jsx
import { useRef } from 'react';
import usePointerGlow from '../../hooks/usePointerGlow';
import useTilt from '../../hooks/useTilt';

// Raised neumorphic card that lifts, leans toward the pointer and shows a soft spotlight.
const InteractiveCard = ({ as: Tag = 'div', tilt = true, className = '', children, ...rest }) => {
  const ref = useRef(null);
  usePointerGlow(ref);
  useTilt(ref, tilt ? 4 : 0);
  return (
    <Tag ref={ref} className={`neu-raised spotlight tilt ${className}`} {...rest}>
      {children}
    </Tag>
  );
};
export default InteractiveCard;
```

```jsx
// ui/NeuFrame.jsx: raised frame with an inset well; put a photo (ResponsiveImage) inside
const NeuFrame = ({ className = '', float = false, kenBurns = false, children }) => (
  <div className={`rounded-neu-lg bg-neu p-3 shadow-neu ${float ? 'animate-float' : ''} ${className}`}>
    <div className='overflow-hidden rounded-[26px] shadow-neu-inset'>
      <div className={kenBurns ? 'animate-kenburns' : ''}>{children}</div>
    </div>
  </div>
);
export default NeuFrame;
```

```jsx
// ui/ScrollMarquee.jsx: content slides sideways as the band crosses the screen
import { useEffect, useRef } from 'react';
import useMotionLevel from '../../hooks/useMotionLevel';

const ScrollMarquee = ({ className = '', children }) => {
  const wrap = useRef(null);
  const track = useRef(null);
  const level = useMotionLevel();
  useEffect(() => {
    const w = wrap.current; const t = track.current;
    if (!w || !t || level === 'off') return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = w.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const travel = Math.max(0, t.scrollWidth - window.innerWidth);
      t.style.setProperty('--mx', `${(-progress * travel * (level === 'gentle' ? 0.5 : 1)).toFixed(1)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [level]);
  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={track} className='flex w-max items-baseline gap-12 whitespace-nowrap' style={{ transform: 'translate3d(var(--mx, 0px), 0, 0)' }}>
        {children}
      </div>
    </div>
  );
};
export default ScrollMarquee;
```

```jsx
// layout/ScrollProgress.jsx: thin progress bar under the header (hidden when motion is off)
import useScrollProgress from '../../hooks/useScrollProgress';

const ScrollProgress = () => {
  useScrollProgress();
  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-x-0 top-header z-40 h-[3px] group-data-[motion=off]:hidden [html[data-motion=off]_&]:hidden'>
      <div className='h-full origin-left bg-gradient-to-r from-royal-400 to-gold-400' style={{ transform: 'scaleX(var(--scroll-progress, 0))' }} />
    </div>
  );
};
export default ScrollProgress;
```
(If the arbitrary-variant class does not compile in this Tailwind version, hide the bar with a small CSS rule in `index.css`: `html[data-motion='off'] .scroll-progress { display: none; }` and use a `scroll-progress` class instead. Do whichever works; do not leave both.)

```jsx
// layout/AmbientBackground.jsx: soft colored glows drifting behind the page, shifting with scroll
const Blob = ({ className, style }) => (
  <div className='absolute' style={{ transform: 'translate3d(0, calc(var(--scroll-progress, 0) * -14vh), 0)' }}>
    <div className={`rounded-full blur-3xl animate-drift ${className}`} style={style} />
  </div>
);

const AmbientBackground = () => (
  <div aria-hidden='true' className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
    <div className='absolute -left-[10vw] -top-[8vw]'><Blob className='h-[46vw] w-[46vw] bg-royal-400/20' /></div>
    <div className='absolute -right-[8vw] top-[24vh]'><Blob className='h-[38vw] w-[38vw] bg-gold-300/30' style={{ animationDuration: '32s', animationDelay: '-6s' }} /></div>
    <div className='absolute bottom-[-14vw] left-[26vw]'><Blob className='h-[34vw] w-[34vw] bg-royal-500/12' style={{ animationDuration: '38s', animationDelay: '-12s' }} /></div>
  </div>
);
export default AmbientBackground;
```

```jsx
// layout/PageTransition.jsx: soft fade-and-rise when the route changes
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  return <div key={pathname} className='animate-page-in'>{children}</div>;
};
export default PageTransition;
```

- [ ] **Step 5: Verify and commit.** eslint the new/changed files (0 errors), `npm run build`, grep: no `sm:/md:/xl:/2xl:` in the new files. Commit explicit paths: `feat(motion): hooks and effect components`.

---

### Task 3: Primitives restyle

**Files:** Modify `src/components/ui/tones.js`, `Section.jsx`, `Button.jsx`, `Accordion.jsx`, `Field.jsx`, `fieldClasses.js`, `SectionHeading.jsx`, `ResponsiveImage.jsx` (only if a frame prop is useful), `src/components/shared/Modal.jsx`; then update every caller that passes `tone=` or `variant=` to the new names.

**Interfaces (Produces):**
- Tones are renamed: `base` (page surface, `bg-neu text-neu-ink`) and `band` (slightly recessed band, `bg-neu-deep text-neu-ink`). Old `deep`/`light` become `base`, old `mid` becomes `band`. `TONES[tone].eyebrow` is `text-royal-600` for both.
- `<Button variant='primary'|'secondary'|'accent'>`: `primary` = clay royal (`clay-primary`), `secondary` = neumorphic raised, `accent` = neumorphic raised with royal text and a gold underline rim (`shadow-neu-sm` plus an inset gold bottom line; this is the nav-0 header button). Old `outline` maps to `secondary`; old `dark` is removed.
- `FIELD` (in `fieldClasses.js`) is the inset input recipe; `BTN_PRIMARY`/`BTN_SECONDARY` map to the new Button recipes.

- [ ] **Step 1:** rename tones and update `Section`/`SectionHeading` and all callers with a repository-wide search (`grep -rn "tone=" src`); no caller may still pass `deep`/`mid`/`light`.
- [ ] **Step 2: `Button`**:

```jsx
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'clay-primary',
  secondary: 'bg-neu text-neu-ink shadow-neu-sm',
  accent: 'bg-neu text-royal-600 shadow-neu-sm [box-shadow:theme(boxShadow.neu-sm),inset_0_-3px_0_theme(colors.gold.400)]',
};
const BASE =
  'neu-press inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500';

export default function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type='button' className={cls} {...rest}>{children}</button>;
}
```
(If the arbitrary `[box-shadow:...]` class is not accepted by the config, add a `.btn-accent` rule to the components layer in `index.css` instead. Keep it token-based and shadow-only: nav variant 0 means **no border/ring/outline**.) Active/pressed state comes from `.neu-press`; `clay-primary` has its own `:active` rule.

- [ ] **Step 3: `Accordion`**: each item is `neu-raised-sm` (radius `rounded-neu`); when open it swaps to `shadow-neu-inset` with a transition on `box-shadow`; title `text-neu-ink`; chevron `text-royal-600` with the existing rotate; body text `text-neu-muted`; refs line `text-royal-600`. Keep `headingLevel`, `inert`, `aria-labelledby`, the `grid-rows` animation. Remove the `tone` prop and the divide lines (spacing via `gap-5`).
- [ ] **Step 4: `Field` and `fieldClasses.js`**: inputs and textareas are inset wells: `FIELD = 'w-full rounded-2xl border-0 bg-neu px-5 py-4 text-neu-ink shadow-neu-inset placeholder:text-neu-muted/70 transition-shadow duration-300 focus:outline-none focus:shadow-neu-inset-sm focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-royal-500'`. The label turns `text-royal-600` when its field is focused (use `group` on the Field wrapper and `group-focus-within:text-royal-600`). `BTN_PRIMARY`/`BTN_SECONDARY` in `fieldClasses.js` reuse the Button recipes (import a shared constant from `Button.jsx` rather than duplicating strings).
- [ ] **Step 5: `Modal`**: use `useExitTransition(isOpen)`; render while `mounted`; overlay `bg-neu/60 backdrop-blur-md` with `animate-fade-in` (or `animate-fade-out` when `closing`); panel `rounded-neu-lg bg-neu p-6 text-neu-ink shadow-neu` with `animate-pop-in` (`animate-pop-out` when closing). Keep focus trap, Escape, overlay click, scroll lock, portal and all props. The close button becomes a small round neumorphic button (`neu-press rounded-full p-2 shadow-neu-xs`). Effects that depend on `isOpen` (focus, Escape, scroll lock) still use `isOpen`, not `mounted`.
- [ ] **Step 6: Verify and commit.** `npx eslint` on changed files; `npm run build`; `grep -rn "tone='deep'\|tone='mid'\|tone='light'\|variant='outline'\|variant='dark'" src` prints nothing; no `sm:/md:/xl:` in touched files. Commit `feat(ui): neumorphic primitives and animated modal`.

---

### Task 4: Shell: header (nav 0), menu, footer, accessibility placeholder

**Files:** Modify `src/components/layout/Header.jsx`, `MobileMenu.jsx`, `src/components/shared/Footer.jsx`, `src/App.jsx`, `src/components/shared/SocialIcons.jsx`. Create `src/components/layout/A11yMenuButton.jsx`, `src/data/a11yPlanned.js`.

**Interfaces:**
- Consumes: `useScrollSpy`, `ScrollProgress`, `AmbientBackground`, `PageTransition`, `Modal`, `Button`, `NAV_LINKS`, `NAV_CTA`.
- Produces: `<A11yMenuButton />` (button plus a "coming soon" dialog listing `A11Y_PLANNED`); `A11Y_PLANNED = [{ title, body }]`.

- [ ] **Step 1: `Header` (nav variant 0)**: the fixed strip `header` is transparent and has **no backdrop-blur** (h-header). Inside it a floating pill (`neu-raised-sm` rounded-full, max-w-6xl, `mt-2`) holds: logo (Link), desktop nav, `A11yMenuButton`, the accent CTA (`<Button variant='accent'>`), and the mobile menu button (round neumorphic, `aria-expanded` etc., unchanged behavior). Scroll behavior: at `scrollY > 24` the pill goes from `shadow-neu-sm` to `shadow-neu-xs` and scales to `0.985` (transition 400ms), controlled with a `data-scrolled` attribute. Desktop links: `text-neu-muted hover:text-neu-ink`, with a **sliding indicator**: a single absolutely positioned rounded-full `shadow-neu-inset-sm` span behind the links whose `transform: translateX()` and `width` are set from the active link's measured `offsetLeft`/`offsetWidth` and transition over 500ms. "Active" = on `/` the section id from `useScrollSpy(['encounter','events','next-steps'], pathname)` mapped from `NAV_LINKS` hashes; on other routes the link whose `to` equals `pathname`. No indicator when nothing is active. **No border, ring or outline on any header button.**
- [ ] **Step 2: `A11yMenuButton`** (placeholder, `TODO(a11y-menu)`):

```jsx
// TODO(a11y-menu): placeholder. The real accessibility menu is not built yet.
// See docs/accessibility-menu-placeholder.md
import { useState } from 'react';
import { MdAccessibilityNew } from 'react-icons/md';
import Modal from '../shared/Modal';
import { A11Y_PLANNED } from '../../data/a11yPlanned';

const A11yMenuButton = ({ className = '' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type='button' aria-label='Accessibility options' aria-haspopup='dialog' onClick={() => setOpen(true)}
        className={`neu-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-neu text-royal-600 shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500 ${className}`}>
        <MdAccessibilityNew size={22} aria-hidden='true' />
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title='Accessibility options' maxWidth='max-w-2xl'>
        <p className='mb-4 text-neu-muted'>An accessibility menu is coming soon. Here is what we are planning to offer:</p>
        <ul className='space-y-3'>
          {A11Y_PLANNED.map((item) => (
            <li key={item.title} className='neu-inset px-5 py-4'>
              <p className='font-semibold'>{item.title}</p>
              <p className='text-sm text-neu-muted'>{item.body}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};
export default A11yMenuButton;
```
`src/data/a11yPlanned.js` exports `A11Y_PLANNED` with these entries (title, one-line body): Motion (full, gentle, none), Contrast (standard, higher, high), Text size and spacing, A legible font option, Stronger focus and underlined links, Simplified layout, Reset and remember choices, Accessibility statement and report a barrier. (Content comes from the placeholder note; do not invent others.) If `react-icons/md` lacks `MdAccessibilityNew`, use `FiUser` and say so in the report.
- [ ] **Step 3: `MobileMenu`**: overlay `bg-neu` (solid, no blur), links large `font-display text-4xl text-neu-ink` inside a column with **staggered entrance** (each item `animate-page-in` with `animation-delay` 60ms apart, computed inline), the CTA as `<Button variant='primary'>` at the bottom, `A11yMenuButton` beside the close button. Keep all existing behavior (fixed inset-0 sibling, scroll lock, Escape, focus move and return, auto-close at `lg`).
- [ ] **Step 4: `Footer`**: neumorphic: `bg-neu`, top edge separated by a soft inset band (`shadow-neu-inset-sm` strip) rather than a border; link columns and contact stay; a large soft wordmark (the existing logo image) sits in a `NeuFrame`-style raised tile; footer content uses `Reveal`. Placeholders ("Email coming soon", "Address coming soon") unchanged.
- [ ] **Step 5: `App.jsx`**: render `<AmbientBackground />` and `<ScrollProgress />` as the first children (siblings, not inside anything transformed), keep `ScrollManager` and `Header`, wrap `<Routes>` in `<PageTransition>`. Add a visually hidden **skip link** ("Skip to content") as the first focusable element targeting `<main id='main'>`.
- [ ] **Step 6: Verify and commit.** eslint, build, no breakpoint prefixes other than `lg:`, `grep -rn "TODO(a11y-menu)" src` shows the placeholder, and confirm no `border`, `ring`, or `outline` class other than the focus-visible outline on header buttons. Commit `feat(shell): neumorphic header, menu, footer and accessibility placeholder`.

---

### Task 5: Hero and welcome

**Files:** Modify `src/components/hero/PageHero.jsx`, `src/components/home/WelcomeSection.jsx`, `ImageCarousel.jsx`, `SectionTextBlock.jsx`, `src/components/shared/ScriptureRotator.jsx`, `SalvationNotice.jsx`, `src/pages/Home.jsx` (props only).

**Interfaces:** `PageHero` keeps `eyebrow, title, subtitle, image, size, actions, children` and adds `collage` (array of `{ name, alt? }`, max 3). With `collage` it renders the home layout; without it, the inner-page layout.

- [ ] **Step 1: home hero (`collage`)**: `min-h-dvh` section with `pt-header`, two columns at `lg:` (stacked on mobile, collage below copy at `h-[380px]`). Left: eyebrow, title (two lines: first line `Reveal variant='blur'`, second line italic `text-royal-600` with a 160ms later blur), subtitle (`text-neu-muted`), `children` (the scripture rotator), `actions` (Button `primary` + `secondary`). Right: 3 `NeuFrame`s of photos (`ResponsiveImage`, `aspect-[4/5]`, `object-cover`) absolutely positioned like the sample's `.a1 .a2 .a3` (left/top offsets), each wrapped in an element with `useParallax` (factors -0.06, 0.05, -0.03), with `float` and staggered animation delays, `kenBurns` on the largest; plus the **gold orb** (`clay-gold`, round, `animate-breathe`). Keep `loading='eager' fetchPriority='high'` on the first frame's image. All motion stops under motion off (already handled by hooks/CSS).
- [ ] **Step 2: inner-page hero (no `collage`)**: `min-h-[60dvh]`, centered copy with the same blur-in title, inside a large `neu-raised` panel (`rounded-neu-lg`, generous padding), one `NeuFrame` with the `image` on the right at `lg:` (above the copy on mobile), the orb accent smaller. No dark overlay, no full-bleed photo.
- [ ] **Step 3: `Home.jsx`** passes `collage={[{name:'woman-praying'},{name:'open-door'},{name:'surrender'}]}` (alt text: descriptive for the woman praying and the doorway and the kneeling silhouette, as in `WelcomeSection`'s existing alts).
- [ ] **Step 4: `WelcomeSection`**: two columns, carousel inside a `NeuFrame` with `Reveal variant='left'`, text with `Reveal variant='right'`; `SalvationNotice` becomes an inset band (`neu-inset`, `border-l` **not** allowed: use a gold dot with `animate-breathe` and no border); `SectionTextBlock` button uses `Button variant='secondary'`. `ImageCarousel`: image inside the frame's well, arrows and dots as small neumorphic round buttons (`shadow-neu-xs`, pressed inset when active dot), crossfade already present; pause button restyled the same way. `ScriptureRotator`: text `text-neu-ink`, ref `text-royal-600`, pause button neumorphic; fade unchanged.
- [ ] **Step 5: Verify and commit.** eslint, build, greps. Commit `feat(hero): neumorphic hero with animated photo collage and welcome section`.

---

### Task 6: Home sections

**Files:** Modify `src/components/home/HowItWorksSection.jsx`, `NextStepsSection.jsx`, `NextStepCard.jsx`, `src/components/shared/MoreNextStepsDialog.jsx`, `src/components/home/UpcomingEventsSection.jsx`, `EventCard.jsx`, `WorshipOptionsSection.jsx`, `WorshipOptionCard.jsx`, `src/components/shared/GiveSection.jsx`, `TithelyGiveButton.jsx`, `NewsletterSignupSection.jsx`; `src/pages/Home.jsx` (section order and the scripture marquee).

- [ ] **Step 1: `HowItWorksSection`** (`id='encounter'`, tone `band`): cards are `InteractiveCard`s in `CardGrid`; the step number becomes a `clay-gold` round badge that **pops in** when its card reveals (a `data-shown` driven `scale-0 → scale-100` transition with a soft spring `cubic-bezier(0.34,1.7,0.5,1)`); the verse blockquotes become `neu-inset` panels. Add above it a **`ScrollMarquee`** band (`PRACTICE_VERSES` texts in `font-display` large, `text-neu-ink`, refs small `text-royal-600`) sliding as you scroll.
- [ ] **Step 2: `NextStepsSection`/`NextStepCard`/`MoreNextStepsDialog`**: `NextStepCard` is an `InteractiveCard as='button'` (still a real button with `onClick`, full width, text-left) with its icon image in a small inset well; hover glide; dialogs use the new Modal.
- [ ] **Step 3: events** (`id='events'`): two columns at `lg:` with a **pinned** left `NeuFrame` photo (`sticky top-[calc(var(--header-h)+2rem)]`, `Reveal variant='mask'`) and the list on the right; each `EventCard` is a `neu-raised-sm` row that slides in from the right (`Reveal variant='right'`, staggered) with a `clay-gold` date badge (pops in); hover: glide 6px right. Non-link cards (`href` empty or `#`) stay `<article>`.
- [ ] **Step 4: `WorshipOptionsSection`/`Card`**: neumorphic, icon in an inset well; unchanged empty-state copy.
- [ ] **Step 5: `GiveSection`/`TithelyGiveButton`**: the enabled button is `clay-primary`; the disabled "Giving coming soon" is `neu-inset` with muted text; section is a `neu-raised` centered panel with `Reveal variant='scale'`.
- [ ] **Step 6: `NewsletterSignupSection`**: `band` tone; input `FIELD`; submit `Button` (secondary or primary per Global Constraints: use `primary` here as the key action).
- [ ] **Step 7: Verify and commit.** eslint, build, greps; every `Section` has a valid new tone. Commit `feat(home): neumorphic home sections with pinned photo, marquee and badges`.

---

### Task 7: About, FAQs and Give pages

**Files:** Modify `src/pages/About.jsx`, `Faqs.jsx`, `Give.jsx`; `src/components/about/BeliefsSection.jsx`, `VisionSection.jsx`, `LeadershipSection.jsx`; `src/components/give/WhyWeGiveSection.jsx`, `WaysToGiveSection.jsx`, `TithelyAppSection.jsx`; `src/components/faq/FaqDialogButton.jsx`.

- [ ] Restyle all of these to the neumorphic system using the inner-page hero, `band`/`base` tones, `Accordion` (new look), `NeuFrame` for photos (with `Reveal variant='mask'`), `InteractiveCard` for cards, `Reveal` variants (left/right alternating in split layouts), and `Button` variants. FAQs page: accordion items `headingLevel={2}`. About: vision accordion beside a framed photo; leadership grid hidden when empty (unchanged). Give: neutral panels; disabled giving state unchanged in behavior. `FaqDialogButton` uses `Button variant='secondary'` and the new Modal (the salvation notice inside stays an inset band).
- [ ] Verify: eslint, build, greps (no leftover dark-only classes: `grep -rn "bg-navy-9\|bg-navy-8\|bg-navy-950\|text-ivory-50\|from-navy\|bg-ivory" src` should be empty except where a specific reason is written next to it); commit `feat(pages): neumorphic about, faqs and give pages`.

---

### Task 8: Forms and dialogs

**Files:** Modify `src/components/home/PrayerRequestForm.jsx`, `src/components/shared/NextStepForm.jsx`, `PhoneVerify.jsx`, `PrayerGroupDialog.jsx`, `PrayerGroupCard.jsx`, `StartPrayerGroupForm.jsx`, `src/components/ui/Field.jsx` (if not finished in Task 3).

- [ ] Restyle only (no logic, props, handlers, validation or text changes): inputs use `FIELD` inset wells; primary submit buttons use `Button variant='primary'` (or the `BTN_PRIMARY` constant), secondary/close use `secondary`; error text keeps `text-red-700`; the verified state text `font-medium text-royal-600`; dialog headers and logos sit in the new Modal; cards use `neu-raised-sm`. Field labels turn royal on focus (via `Field`).
- [ ] Verify: eslint, build, `sm:/md:/xl:` grep clean, diff contains only className/import changes (list any non-className change in the report and justify it). Commit `feat(forms): neumorphic forms and dialogs`.

---

### Task 9: Motion audit and polish

**Files:** any file needed; produce `docs/motion-inventory.md` in the repo.

- [ ] For each numbered item (1 to 30) in the spec's Motion inventory, find where it is implemented and record it in `docs/motion-inventory.md` as a table: item, file, how it is triggered, how it behaves under `gentle` and `off`. Any item with no implementation gets implemented now with the existing hooks/classes (do not add dependencies). Known likely gaps to check: #4 header depth change (Task 4), #12 eyebrow rule draw (Task 2), #22 button press release, #23 nav link hover glide, #25 toggle knob glide, #26 input focus deepen and label light, #29 carousel crossfade, #30 badge pop.
- [ ] Audit rules by grep: no per-letter or per-word animation (`split(''`, `.map` over characters or words with animation classes); no `transition-all`; scroll-linked handlers all `passive` and rAF-throttled; every `animate-*` loop has a `data-motion` gentle/off rule (Task 1 CSS covers `float`, `breathe`, `drift`, `kenburns`, page-in via off rule; confirm nothing else loops).
- [ ] Verify: eslint, build. Commit `feat(motion): motion inventory and gap fixes`.

---

### Task 10: Verification and documentation (controller-led)

- [ ] Static gates over `src/`: `grep -rn -E "\b(sm|md|xl|2xl):" src` empty; hex/`bg-[#`/`h-screen`/`100vh` empty; `npm run lint` and `npm run build` clean.
- [ ] Contrast script (Python) computing ratios for: `neu-ink` on `neu`, `neu-muted` on `neu` and `neu-deep`, `royal-600` on `neu`, white on the `clay-primary` gradient endpoints, `#4a3300` on the `clay-gold` gradient. All text pairs must be 4.5:1 or better (large text 3:1); record results in the v2 doc; fix tokens if any fail.
- [ ] Headless Chrome screenshots (`?motion=off`) of `/`, `/about`, `/faqs`, `/give` at 390 and 1280 widths; width sweep 360/600/768/900/1024/1280 for horizontal overflow; open each dialog and the mobile menu; run with motion `full` and confirm reveals fire in a real (visible) tab where possible.
- [ ] Write `docs/site-refresh-v2.md` in the repo (what it is, tokens, the clay rule, nav 0, motion inventory pointer, motion setting, accessibility placeholder and the recorded contrast gap, open decisions). Commit docs.
- [ ] Final whole-branch review, then hand the branch back to the owner (no merge, no push, no tag until asked).

---

## Self-review

**Spec coverage:** neumorphism plus small clay (Global Constraints, Tasks 1, 3, 5, 6); nav variant 0 (Task 4); plentiful gentle motion, all 30 inventory items (Tasks 1, 2, 4, 5, 6, 9); no per-letter animation (Global Constraints, Task 9 audit); motion setting and `?motion=` (Task 1); accessibility placeholder with `TODO(a11y-menu)` (Task 4, note outside repo); contrast gap recorded (Task 10); all four pages and dialogs (Tasks 5 to 8); no new dependencies (Global Constraints); STYLES docs and repo doc (Task 10).
**Placeholders:** none. Task 3 and 4 name two fallback options for Tailwind arbitrary-class quirks and require choosing exactly one.
**Consistency:** tone names `base`/`band` introduced in Task 3 and used in Tasks 5 to 7; `Button` variants `primary`/`secondary`/`accent` used consistently; `InteractiveCard`, `NeuFrame`, `Reveal variant` names match Task 2's interfaces.
