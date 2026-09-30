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
  setMotionLevel(typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'full');
}
