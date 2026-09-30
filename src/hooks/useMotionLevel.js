import { useSyncExternalStore } from 'react';
import { getMotionLevel, subscribeMotion } from '../utils/motion';

export default function useMotionLevel() {
  return useSyncExternalStore(subscribeMotion, getMotionLevel, () => 'full');
}
