import { getMotionLevel } from './motion';

// Kept under its old name for existing imports: true when motion is switched off
// (by the OS reduce-motion setting, ?motion=off, or the future accessibility menu).
export default function prefersReducedMotion() {
  return getMotionLevel() === 'off';
}
