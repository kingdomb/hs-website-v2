// Shared form-control classes: inset wells and the Button recipes.
import { BTN_BASE as BASE, BTN_VARIANTS } from './buttonStyles';

export const FIELD =
  'w-full rounded-2xl border-0 bg-neu px-5 py-4 text-neu-ink shadow-neu-inset placeholder:text-neu-muted disabled:cursor-not-allowed disabled:opacity-60 transition-shadow duration-300 focus:outline-none focus:shadow-neu-inset-sm focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-royal-500';
export const LABEL = 'mb-2 block text-sm font-medium text-neu-muted transition-colors duration-300 group-focus-within:text-royal-600';
export const BTN_BASE = BASE;
export const BTN_PRIMARY = `${BASE} ${BTN_VARIANTS.primary} disabled:cursor-not-allowed disabled:opacity-60`;
export const BTN_SECONDARY = `${BASE} ${BTN_VARIANTS.secondary} disabled:cursor-not-allowed disabled:opacity-60`;
