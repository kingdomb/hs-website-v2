# Site refresh v2: Neumorphism on white

Built originally on the `site-refresh-v2` branch, forked from v1; this repository starts from that version's final state. Same content, routes and data as v1; only the look and motion changed. No new dependencies.

## Look
- Neumorphic surfaces on white-blue `bg-neu`; clay is limited to the primary CTA, gold badges, switch knobs and the gold orb.
- Navbar variant 0 (shadow only, no edge outline). The other navbar variants explored during design are not included in this repository.
- Tokens: `shadow-neu-lg/-sm/-xs/-inset/-inset-sm/-band`, `rounded-neu(-lg)`, classes `neu-raised`, `neu-inset`, `neu-press`, `clay-primary`, `clay-gold`.
- Rule: an element's background must match the surface it sits on. Never use bare `shadow-neu`.

## Motion
- 30-item inventory in `docs/motion-inventory.md`.
- `html[data-motion]` is `full`, `gentle` or `off`. `?motion=` overrides it; the default follows prefers-reduced-motion.
- Reveal variants: up, scale, left, right, blur, mask, pop.
- The Encounter section uses a swipeable verse carousel (`VerseCarousel`) with pausable autoplay. It replaced the scroll-linked scripture line at the owner's request.

## Accessibility
- Contrast checked for text, including over the ambient background tint (worst case 4.52:1 for muted text).
- Known gaps, accepted by the owner for now:
  - Shadow-only button edges fail WCAG 1.4.11 non-text contrast.
  - Decorative infinite loops have no on-page pause (WCAG 2.2.2) until the accessibility menu exists.
- The accessibility menu is a placeholder (`TODO(a11y-menu)`). Planned contents are in `src/data/a11yPlanned.js` and `docs/accessibility-menu-placeholder.md`.

## Verification
Lint 0/0, build passes, width sweeps clean, dialogs and Escape stack checked, hero-load flicker measured frame by frame.

## Deployment
Published to GitHub Pages from the `gh-pages` branch of `kingdomb/hs-website-v2`:
https://kingdomb.github.io/hs-website-v2/. Run `npm run deploy` to rebuild and republish.
Vite `base` is `/hs-website-v2/` for builds only; `public/404.html` restores deep links.
`robots` is `noindex, nofollow` until the owner decides to go live.

## Status
Complete as a version; the accessibility menu is still a placeholder and the content placeholders
(Tithe.ly form ID, contact details, socials) still need real values.
