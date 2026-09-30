# Motion inventory (spec items 1 to 30)

Motion setting: `html[data-motion]` = `full` | `gentle` | `off` (`src/utils/motion.js`, set in `main.jsx`).
Global CSS guards in `src/index.css`: `off` disables every animation and transition (`*` rule, `!important`), shows every `.reveal` at rest, hides the progress bar and neutralises hover translates; `gentle` halves the reveal distances through the `--rise/--slide/--scale-from/--pop-from/--blur-from/--page-rise` variables and stops the loops (`animate-float|breathe|drift|kenburns`). Whole elements only; nothing animates per letter or per word.

Status legend: Implemented / Partial / Missing / N/A. "Fixed in 9B" notes the gap closed in this task.

| # | Item | Files | Trigger | Gentle | Off | Status |
|---|------|-------|---------|--------|-----|--------|
| 1 | Ambient drifting blobs, shifting with scroll | `layout/AmbientBackground.jsx`, `tailwind.config.js` (drift), `hooks/useScrollProgress.js` | Always; scroll sets `--scroll-progress` | Drift loop stops; scroll shift stays | Nothing moves; `--scroll-progress` removed | Implemented (also hero blobs now drift, 9B) |
| 2 | Scroll-progress bar under header | `layout/ScrollProgress.jsx`, `hooks/useScrollProgress.js` | Scroll (rAF, passive) | Same | Hidden (`.scroll-progress`) | Implemented |
| 3 | Page transition (fade and rise) | `layout/PageTransition.jsx`, keyframe `page-in` | Route change | Rise halves (`--page-rise`) | No animation | Implemented (gentle halving added, 9B) |
| 4 | Header depth change on scroll | `layout/Header.jsx` (`data-scrolled`, scale 0.985 plus lighter shadow, transition 400ms) | Scroll past 24px (rAF-throttled since 9B) | Same | Instant depth change, no scale (`.header-pill[data-scrolled='true'] { transform: none }`, scoped to the header pill by class) | Implemented (throttle and off rule, 9B) |
| 5 | Sliding pill behind active nav link | `layout/Header.jsx`, `hooks/useScrollSpy.js` | Scroll spy / route | Same | Position jumps, no transition | Implemented |
| 6 | Fade-up reveal | `ui/Reveal.jsx` (variant up), `hooks/useReveal.js`, `.reveal` CSS | Enters viewport (IO); `immediate` prop (above-the-fold hero Reveals) skips the observer and flips to shown two animation frames after the first commit so the transition plays from first paint | 12px rise | Visible at once (also on runtime switch, 9B) | Implemented |
| 7 | Fade-scale reveal | `Reveal` variant scale (About, Give, FAQs panels, inner hero panel) | Enters viewport | 0.97 start | Visible at once | Implemented |
| 8 | Slide from left or right in split layouts | `Reveal` left/right in Welcome, Vision, WhyWeGive, Events | Enters viewport | 16px | Visible at once | Implemented |
| 9 | Blur-to-sharp headlines (whole line) | `ui/SectionHeading.jsx`, `hero/PageHero.jsx` Title (variant blur) | Enters viewport | 7px blur | Visible at once, no filter | Implemented |
| 10 | Staggered children in grids and lists | `ui/CardGrid.jsx` (90ms steps), event list delays | Enters viewport | Same, halved distance | Visible at once | Implemented |
| 11 | Photo mask reveal (inset clip plus zoom-out) | `Reveal` variant mask: hero collage, inner hero photo, WhyWeGive, Events (hero ones added 9B) | Enters viewport | Same | Visible, `clip-path` open | Implemented |
| 12 | Eyebrow rule drawing in | `ui/SectionHeading.jsx` (rule now always rendered, also without an eyebrow) | Heading revealed | Same | Drawn at once (Reveal shown immediately) | Implemented (every heading, 9B) |
| 13 | Hero collage parallax | `hero/PageHero.jsx` CollageItem, `hooks/useParallax.js` | Scroll (rAF, passive); clamped to 56px in 9B | Half distance | No transform | Implemented |
| 14 | Frames floating gently | `ui/NeuFrame.jsx` `float` (hero collage, inner hero, Vision, WhyWeGive, Events; last four added 9B) | Always (loop) | Loop stops | No animation | Implemented |
| 15 | Slow zoom on framed photos | `NeuFrame` `kenBurns` (first collage frame, inner hero photo) | Always (loop) | Loop stops | No animation | Implemented |
| 16 | Orb breathing and glowing | `hero/PageHero.jsx` Orb (home and inner heroes), `pages/Faqs.jsx` orb; `animate-breathe` | Always (loop); orbs also pop in | Loop stops | No animation | Implemented (all three clay-gold orbs; blurred blobs use drift because filter animation would remove their blur) |
| 17 | Verse carousel (swipe/snap, pausable autoplay), replacing the scroll-linked line at the owner's request on 2026-09-30 | `ui/VerseCarousel.jsx`, `home/HowItWorksSection.jsx` | Autoplay about 9s; stops on hover, focus, touch, control use or the pause button | Same (smooth scroll) | No autoplay, no pause button, instant jumps | Implemented |
| 18 | Event photo beside the events list, swapping to the event in view (crossfade) | `home/UpcomingEventsSection.jsx` | Scroll, hover, focus; desktop (photos sit on the cards below `lg`) | Same | Same (swap is instant) | Implemented (replaces the pinned worship photo at the owner's request; column vertically centered) |
| 19 | Footer content easing in | `shared/Footer.jsx` (Reveal up), `src/components/shared/NewsletterSignupSection.jsx` | Enters viewport | 12px | Visible at once | Implemented |
| 20 | Cards lift and tilt toward the pointer | `ui/InteractiveCard.jsx`, `hooks/useTilt.js` (max 4deg, fine pointers) | Pointer move | Off (full only) | Off | Implemented (About panel now an InteractiveCard, 9B) |
| 21 | Soft spotlight follows pointer | `InteractiveCard`, `hooks/usePointerGlow.js`, `.spotlight` | Pointer move (fine pointers) | Same | Off (no listener; transitions none) | Implemented |
| 22 | Buttons press into inset, soft release | `.neu-press` in `index.css`, `ui/buttonStyles.js`, `.clay-primary:active` | Hover (lift 2px), active (inset) | Same | Hover lift removed; inset on active is a state change | Implemented (Tithely button gets `hover-lift`, 9B) |
| 23 | Nav link hover glide | `layout/Header.jsx` (hover pill glides between links, shadow only) | Mouse enter/leave, desktop; only for `(hover: hover) and (pointer: fine)`, measured from the hovered element at enter time, cleared on leave, blur and resize | Same | No transition (pill jumps) | Implemented (was colour change only; fixed 9B) |
| 24 | Accordion opens smoothly with icon turn | `ui/Accordion.jsx` (grid-rows transition, chevron rotate) | Click | Same | Instant | Implemented |
| 25 | Toggle knob glide | none | n/a | n/a | n/a | N/A: the site has no switch control (only native checkboxes and topic chips, whose inset shadow already transitions in `StartPrayerGroupForm.jsx`). If a switch is ever added, use `clay-gold`-style knob and `transition-transform`. |
| 26 | Input focus deepens inset, lights label | `ui/fieldClasses.js` FIELD (`transition-shadow`, `focus:shadow-neu-inset-sm`), LABEL (`group-focus-within:text-royal-600`), `ui/Field.jsx` (`group`) | Focus | Same | Instant | Implemented |
| 27 | Modals scale and fade in and out | `shared/Modal.jsx`, `hooks/useExitTransition.js`, keyframes fade/pop | Open/close | Same | No animation; unmount immediately | Implemented |
| 28 | Mobile menu overlay, staggered links | `layout/MobileMenu.jsx` (`animate-page-in`, 60ms steps) | Open | Rise halves | No animation | Implemented |
| 29 | Carousel crossfade | `home/ImageCarousel.jsx` (previous slide stays underneath, new one fades in 1s, `animate-crossfade`) | Auto rotation (pausable) or arrows/dots; previous slide unmounted after the 1s fade. Autoplay stops reactively whenever motion is `off`; under `gentle` it keeps running (content rotation with a pause control, not a decorative loop) | Same | Instant swap; autoplay does not run | Implemented (was fade-out then fade-in, fixed 9B) |
| 30 | Date and number badges pop in | `Reveal` variant pop: `EventCard`, `HowItWorksSection`, `WhyWeGiveSection` badges; orbs pop in heroes | Enters viewport | 0.75 start | Visible at once | Implemented |

## Additional full-site entrances (9B)

Heroes: eyebrow, subtitle, scripture and actions reveal in sequence; collage frames mask in; inner-hero panel scales in with the photo masked in and floating. About "Who we are" panel is an `InteractiveCard` (spotlight, no tilt). Vision, WhyWeGive and Events photos float. Every other section already had a Reveal (headings blur, panels scale, photos mask, split layouts slide, grids stagger).

## Motion-off hover and focus audit

`neu-press:hover`, `.hover-glide:hover` (EventCard) and `.hover-lift:hover` (Tithely button) are neutralised under `off` in `index.css`; `.hover-glide` and `.hover-lift` apply only for `(hover: hover) and (pointer: fine)`. InteractiveCard tilt is applied by JS only at `full`. No focus transforms exist.
