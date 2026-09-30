import Reveal from './Reveal';
import { TONES } from './tones';

const SectionHeading = ({ eyebrow, title, subtitle, tone = 'base', className = '' }) => (
  <Reveal variant='blur' className={`group mx-auto mb-12 max-w-2xl text-center ${className}`}>
    {eyebrow && (
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${TONES[tone].eyebrow}`}>
        {eyebrow}
      </p>
    )}
    <span
      aria-hidden='true'
      className={`mx-auto mb-4 block h-[3px] w-12 origin-left scale-x-0 rounded-full bg-gradient-to-r from-gold-400 to-royal-400 transition-transform delay-300 duration-[900ms] ease-out group-data-[shown=true]:scale-x-100 ${eyebrow ? 'mt-2' : ''}`}
    />
    <h2 className='text-4xl font-semibold leading-tight lg:text-5xl'>{title}</h2>
    {subtitle && <p className='mt-4 text-lg opacity-80'>{subtitle}</p>}
  </Reveal>
);
export default SectionHeading;
