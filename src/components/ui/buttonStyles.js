// Shared button recipes: used by Button.jsx and fieldClasses.js so they never drift apart.
export const BTN_VARIANTS = {
  primary: 'clay-primary',
  secondary: 'bg-neu text-neu-ink shadow-neu-sm',
  accent: 'bg-neu text-royal-600 shadow-neu-sm [box-shadow:theme(boxShadow.neu-sm),inset_0_-3px_0_theme(colors.gold.400)]',
};
export const BTN_BASE =
  'neu-press inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-semibold focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500';
