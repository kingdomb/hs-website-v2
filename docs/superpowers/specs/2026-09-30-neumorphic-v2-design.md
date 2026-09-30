# Site refresh v2 — neumorphic build with plentiful gentle motion

Date: 2026-09-30
Branch: `site-refresh-v2` (forked from `main` at `5e9cae9`, tag `site-refresh-v2-start`)
Status: approved direction (owner), ready to plan and build
Exploration record: the style samples were kept outside this repository and are not included
(direction notes, the seven-style comparison sample, the navbar edge variants, the accessibility placeholder note).
The v1 write-up is `docs/site-refresh-v1.md`.

## Goal

Replace v1's dark-and-ivory, traditional look with a **neumorphic** site on white: smoother, more relaxing and
inviting, modern, appealing to a younger audience, and **alive with animation** so it no longer feels like a
static website. Content, routes, data modules, forms and deployment setup are unchanged.

## Owner decisions (binding)

1. **Style:** neumorphism (soft extruded surfaces, mostly white) as the base, with **a small amount of clay**
   mixed in. This is *not* the full "Neu + Clay" look from the samples.
2. **Built in the real repo** on branch `site-refresh-v2`.
3. **Navbar = variant 0:** button and bar depth from shadow only. **No edge outline/rim** on buttons.
4. **Animation: plentiful but not dramatic.** Many small, soft, slow motions across the whole site. No text
   or letters spinning, flying, bouncing or typing into frame. Headlines and paragraphs appear as whole lines.
5. **An accessibility menu is required.** It is a **placeholder** in this build, marked `TODO(a11y-menu)`, with
   the full to-do in `docs/accessibility-menu-placeholder.md`.
6. Keep the brand: royal blue and gold from the logo, navy text, Cormorant Garamond headings, Inter body.
7. Everything carried over from v1: non-denominational, event-based, placeholders stay placeholders
   (Tithe.ly form id, email, address, socials, leaders), noindex, no depiction of Jesus with a face.

## Visual language

- **Surface:** one soft off-white, `#eef1f6`, for the page and for most components. Depth comes from paired
  light and dark shadows (light source top-left). Text is navy `#1a2750` (muted `#4f5b82`).
- **Three depths:** *raised* (cards, nav, frames), *inset* (inputs, notice band, toggles' tracks, open accordion),
  *flat* (page). Pressed = raised becomes inset.
- **Small amount of clay** (the only puffy, saturated things): the **primary call-to-action button**
  (royal-blue gradient with inner light), the **number and date badges** (gold), **switch knobs**, and the
  **gold orb**. Cards, nav, inputs and secondary buttons stay pure neumorphic.
- **Photos** sit inset inside a raised frame. Because the page is white, the dark full-bleed hero image of v1 goes
  away; the hero becomes copy plus a small collage of framed photos.
- Section rhythm comes from slightly recessed bands and soft gradient glows, not from dark blocks.
- Gold appears as a thin accent (primary button rim, badges, the orb, the progress bar), never as large fills.

## Motion inventory (all gentle; each respects the motion setting)

Global: (1) ambient soft blobs drifting behind the page and shifting with scroll; (2) thin scroll-progress bar
under the header; (3) page-to-page transition (soft fade and rise); (4) header depth changes as you scroll;
(5) sliding pill indicator behind the active nav link (scroll-spy).

Reveal family (whole elements, never per-letter): (6) fade-up; (7) fade-scale; (8) slide from left or right in
split layouts; (9) blur-to-sharp on headlines (whole line); (10) staggered children in grids and lists;
(11) photo mask reveal (soft inset clip plus slight zoom-out); (12) eyebrow rule drawing itself in.

Ambient and scroll-linked: (13) hero photo collage drifting at different speeds (parallax); (14) frames floating
gently; (15) slow zoom on framed photos; (16) orb breathing and glowing; (17) verse carousel (swipe/snap, pausable autoplay), replacing the scroll-linked line at the owner's request on 2026-09-30; (18) pinned photo beside the events list; (19) footer content easing in.

Interactive: (20) cards lift and tilt slightly toward the pointer (fine pointers only); (21) a soft spotlight
follows the pointer across cards; (22) buttons press into inset with a soft release; (23) nav link hover
glide; (24) accordion opens smoothly with icon turn; (25) toggle knob glide; (26) input focus deepens the inset
and lights the label; (27) modals scale and fade in and out; (28) mobile menu overlay with staggered links;
(29) carousel crossfade; (30) date and number badges pop in with a soft spring.

Rules: animate `transform` and `opacity` for anything scroll-linked (blur only on headings, briefly); cap
distances (rise 24px, parallax under 60px, tilt under 4 degrees); durations 0.6 to 1.4s with ease-out curves;
pointer effects only where `(hover: hover) and (pointer: fine)`; no autoplay that cannot be paused.

## Motion setting (also the hook for the future accessibility menu)

A single source of truth: `document.documentElement.dataset.motion` = `full` | `gentle` | `off`.
Default comes from `prefers-reduced-motion` (`off` when set, otherwise `full`). `?motion=off` in the URL
forces off (used for screenshots and printing). `gentle` keeps entrances but halves distances and stops
continuous loops. `off` shows everything immediately with no movement. Every hook and every CSS animation
honours it (see plan Task 1).

## Accessibility (this build)

- Placeholder accessibility button in the header (`TODO(a11y-menu)`) opening a small "coming soon" dialog that
  lists what is planned. Present on desktop and mobile, keyboard reachable, early in tab order.
- Base design must still meet WCAG 2.2 AA for text (verify token contrast). **Known, owner-accepted gap:**
  navbar variant 0 defines button edges by shadow only, which does not satisfy the 3:1 non-text boundary
  contrast; the future High-contrast mode is responsible for outlines (see the placeholder note). Record this in
  the v2 doc.
- Focus rings stay strong and visible; state is never conveyed by shadow alone where a simple extra cue is
  cheap (for example a check icon on a switch, text on expanded state is already `aria-expanded`).

## What does not change

Routes, data modules and content, image pipeline, forms' behaviour (still discard submissions; owner decision
pending), GitHub Pages configuration, `noindex`, the one-breakpoint convention (`lg:` only), tokens-only rule
(new tokens go in `tailwind.config.js`), DRY and modular structure.

## Constraints

- **No new runtime dependencies.** All motion is native CSS and small hooks. (Smooth-scroll inertia libraries
  were considered and rejected for now.)
- No `position: fixed` inside an ancestor with `transform`, `filter` or `backdrop-filter` (the ambient
  background and progress bar are top-level siblings; the mobile menu and modals stay as they are).
- Performance: nothing that triggers layout on scroll; rAF-throttled scroll handlers; `will-change` only on
  actively moving layers.

## Verification

Lint and build clean; width sweep 360 to 1280 (no horizontal overflow); the four routes; reduced-motion and
`?motion=off` check (everything visible, nothing moving); headless-Chrome screenshots of each page for visual
review; contrast check of text tokens; keyboard pass on header, menu, dialogs; the existing flows (Next Steps
dialogs, FAQ dialog, forms, mobile menu) still work.

## Out of scope

Building the real accessibility menu; the navbar edge-contrast options (variants 1 to 9 are kept for
reference only); backend for forms; indexing; a dark theme.
