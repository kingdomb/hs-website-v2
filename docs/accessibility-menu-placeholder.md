# TODO(a11y-menu): accessibility menu, come back to this

**Status: placeholder only. Not designed, not built.** The owner has decided the site needs a menu
where visitors choose accessibility adjustments for disabled access. Anything in the code or samples
marked `TODO(a11y-menu)` points here.

Target standard to design against: **WCAG 2.2 level AA**. The menu is an addition, not a substitute:
the base site must already meet AA without anyone touching the menu (overlay widgets that patch an
inaccessible page are widely criticised and do not remove legal or ethical responsibility).

## Why the new styling makes this more important

Neumorphism is the hardest of the styles we compared to make accessible. Plan for these from the
start rather than fixing them later:

| Risk in neumorphism | Why it matters | What the menu / base design should do |
|---|---|---|
| Edges are defined only by soft shadow on a same-color surface | WCAG 1.4.11 needs UI component boundaries at 3:1 against the background; a shadow does not count. Low-vision users cannot see where a button ends. | The base design should add the small edge contrast chosen from `samples/02-navbar-edge-variants/`. **High contrast mode** should replace soft shadows with solid 2px navy outlines. |
| Raised vs pressed vs inset is the only state cue | State is conveyed by shadow direction alone; invisible to many users. | Add a non-shadow cue (icon, weight, underline or fill) for selected, pressed, expanded, checked and disabled. |
| Text on same-hue soft surfaces | Muted grey-blue text on near-white can drop below 4.5:1. | Keep body text at 4.5:1 or better (verify every token); offer larger text and a stronger-text option. |
| Focus ring competes with soft shadows | The ring can disappear into the glow. | One strong, always-visible focus style (3px, high contrast, offset), never removed. Higher-thickness option in the menu. |
| Inset fields and toggles look flat | Hard to tell where to type or whether a switch is on. | Visible field borders; labelled on/off text for switches, not just knob position. |
| Clay puffiness and floating elements | Fine for contrast if edges are defined, but large shadows can hide neighbours and shift on hover. | Hover motion must not be required to understand anything. |
| Lots of new animation (owner's choice) | Motion can cause nausea, dizziness, distraction and reading problems. | Global **motion control** (see below) that also honours the operating system's reduce-motion setting by default. |

## What the menu should include (proposed, to confirm)

1. **Motion:** three levels, *Full*, *Gentle*, *None*. *None* stops parallax, blur or fade reveals,
   floating and breathing, sliding text, carousels and auto-rotating scripture. Pause and play on anything that moves
   for more than 5 seconds. Default follows `prefers-reduced-motion`.
2. **Contrast:** *Standard*, *Higher* (adds edges and darker text), *High* (outlines instead of soft
   shadows, near-black text on white). Default follows `prefers-contrast`.
3. **Text:** size steps up to 200% without breaking layout; line spacing; letter and word spacing;
   choice of a plain, highly legible font in place of the display serif (candidate: Atkinson
   Hyperlegible; optionally a dyslexia-friendly option). Layout must reflow, never scroll sideways.
4. **Focus and links:** thicker focus ring; always underline links; larger click and tap targets.
5. **Color:** do not rely on blue versus gold alone for meaning; optional color-blind-safe palette;
   light and dark option (only if a dark theme is designed; neumorphism in dark is a separate design task).
6. **Simplified layout:** switch off the overlapping photo collage and pinned or sticky sections; single
   calm column.
7. **Reading aid (optional):** reading guide or line highlight.
8. **Reset to defaults**, and **remember choices** (local storage; no account).
9. Link to an **accessibility statement** (what is supported, known gaps) and a way to **report a
   barrier** (email or form).

Not a menu item, but required alongside it: a **skip to content** link; proper landmarks and heading
order; visible labels on every form field; keyboard access to everything; captions and transcripts for
any video or audio; alt text on meaningful images; error messages that say what is wrong.

## Behavior and placement

- The menu button must be one of the first things in tab order, labelled ("Accessibility options"),
  present on every page, and reachable on mobile. Icon plus text, not icon alone.
- It opens a dialog or panel that traps focus, closes with Escape, and returns focus to its button.
- The panel itself must be fully accessible and must not depend on the very features it adjusts
  (it should stay legible even in High contrast or with motion off).
- Implementation idea: settings become attributes on `<html>` (for example `data-motion`,
  `data-contrast`, `data-text-scale`, `data-font`), and the design tokens react to them. Each
  neumorphic component needs a defined high-contrast form up front so the menu is a switch, not a rewrite.

## To decide (when we return to this)

- Which of the items above are in the first release (suggest: motion, contrast, text size and
  spacing, focus and links, reset and remember).
- Which navbar edge treatment becomes the base (affects how much extra "High" mode has to do).
- Whether to design a dark theme.
- Which legible font to offer.
- Who owns the accessibility statement and the barrier-report inbox.
- How the menu will be tested: automated checks (axe or Lighthouse), keyboard-only pass,
  screen reader pass (NVDA/VoiceOver), and ideally testing with disabled users.

## Where the placeholder lives

- This note.
- A visible placeholder control in the navbar of the animated sample, marked `TODO(a11y-menu)`
  (once that sample exists).
- In the repo, a `TODO(a11y-menu)` comment where the header is built, pointing back to this file.
