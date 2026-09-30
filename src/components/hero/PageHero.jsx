import { useCallback, useState } from 'react';
import useParallax from '../../hooks/useParallax';
import ResponsiveImage from '../ui/ResponsiveImage';
import Container from '../ui/Container';
import NeuFrame from '../ui/NeuFrame';
import Reveal from '../ui/Reveal';

// Title: pass `title` (first line) and optionally `titleAccent` (second line, italic royal blue, blur-in 160ms later).
const Title = ({ title, titleAccent, className = '' }) => (
  <h1 className={`font-semibold leading-[1.05] text-neu-ink ${className}`}>
    <Reveal immediate as='span' variant='blur' className='block'>{title}</Reveal>
    {titleAccent && ' '}
    {titleAccent && (
      <Reveal immediate as='span' variant='blur' delay={160} className='block italic text-royal-600'>{titleAccent}</Reveal>
    )}
  </h1>
);

// Positions and motion for the three collage frames (a1 large, a2 small top-right, a3 bottom-center).
const SLOTS = [
  { pos: 'left-[2%] top-[4%] w-[52%]', factor: -0.06, delay: '0s', kenBurns: true },
  { pos: 'right-[2%] top-0 w-[34%]', factor: 0.05, delay: '-3s', kenBurns: false },
  { pos: 'bottom-0 left-[38%] w-[36%]', factor: -0.03, delay: '-6s', kenBurns: false },
];

const CollageItem = ({ slot, item, first, index }) => {
  const ref = useParallax(slot.factor);
  // Hold the entrance until the photo has loaded (an errored image counts as ready, never leave it hidden).
  const [ready, setReady] = useState(false);
  const imgRef = useCallback((node) => {
    if (node && node.complete) setReady(true);
  }, []);
  return (
    <div ref={ref} className={`absolute ${slot.pos}`}>
      <Reveal immediate hold={!ready} variant='mask' delay={100 + index * 100}>
        <NeuFrame float floatDelay={slot.delay} kenBurns={slot.kenBurns} className='hero-layer w-full'>
          <ResponsiveImage
            ref={imgRef}
            name={item.name}
            alt={item.alt || ''}
            sizes='(min-width: 1024px) 320px, 55vw'
            loading='eager'
            {...(first ? { fetchPriority: 'high' } : {})}
            onLoad={() => setReady(true)}
            onError={() => setReady(true)}
            className='aspect-[4/5] w-full object-cover'
          />
        </NeuFrame>
      </Reveal>
    </div>
  );
};

const Orb = ({ className }) => (
  <div aria-hidden='true' className={`clay-gold hero-layer animate-breathe rounded-full ${className}`} />
);

const Actions = ({ actions, center }) =>
  actions ? (
    <Reveal immediate delay={420} className={`mt-8 flex flex-col gap-4 lg:flex-row ${center ? 'items-center justify-center' : 'lg:items-center'}`}>{actions}</Reveal>
  ) : null;

const HomeHero = ({ eyebrow, title, titleAccent, subtitle, actions, children, collage }) => (
  <section className='relative isolate flex min-h-dvh items-center overflow-hidden pt-header'>
    <div aria-hidden='true' className='pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 animate-drift rounded-full bg-royal-500/10 blur-3xl' style={{ animationDuration: '30s' }} />
    <div aria-hidden='true' className='pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 animate-drift rounded-full bg-gold-400/10 blur-3xl' style={{ animationDuration: '36s', animationDelay: '-9s' }} />
    <Container className='grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-16'>
      <div>
        {eyebrow && <Reveal immediate as='p' className='mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-royal-600'>{eyebrow}</Reveal>}
        <Title title={title} titleAccent={titleAccent} className='text-5xl lg:text-7xl' />
        {subtitle && <Reveal immediate as='p' delay={300} className='mt-6 max-w-xl text-lg text-neu-muted lg:text-xl'>{subtitle}</Reveal>}
        {children && <Reveal immediate delay={360}>{children}</Reveal>}
        <Actions actions={actions} />
      </div>
      <div className='relative h-[max(380px,72vw)] lg:h-[560px]'>
        {collage.slice(0, 3).map((item, i) => (
          <CollageItem key={item.name} slot={SLOTS[i]} item={item} first={i === 0} index={i} />
        ))}
        <Reveal immediate variant='pop' delay={500} className='absolute bottom-[12%] right-[6%]'>
          <Orb className='h-16 w-16 lg:h-24 lg:w-24' />
        </Reveal>
      </div>
    </Container>
  </section>
);

const InnerHero = ({ eyebrow, title, titleAccent, subtitle, image, actions, children }) => (
  <section className='relative isolate flex min-h-[60dvh] items-center overflow-hidden pt-header'>
    <Container className='py-12'>
      <Reveal immediate variant='scale' className='neu-raised relative grid items-center gap-10 rounded-neu-lg p-8 lg:grid-cols-[1fr_320px] lg:p-16'>
        <Reveal immediate variant='mask' delay={200} className='mx-auto w-full max-w-xs lg:order-2'>
          <NeuFrame float kenBurns className='hero-layer w-full'>
            <ResponsiveImage name={image} alt='' sizes='(min-width: 1024px) 320px, 80vw' loading='eager' fetchPriority='high' className='aspect-[4/5] w-full object-cover' />
          </NeuFrame>
        </Reveal>
        <div className='text-center lg:order-1'>
          {eyebrow && <Reveal immediate as='p' className='mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-royal-600'>{eyebrow}</Reveal>}
          <Title title={title} titleAccent={titleAccent} className='mx-auto max-w-4xl text-4xl lg:text-6xl' />
          {subtitle && <Reveal immediate as='p' delay={300} className='mx-auto mt-6 max-w-2xl text-lg text-neu-muted lg:text-xl'>{subtitle}</Reveal>}
          {children && <Reveal immediate delay={360}>{children}</Reveal>}
          <Actions actions={actions} center />
        </div>
        <Reveal immediate variant='pop' delay={600} className='absolute right-6 top-6'>
          <Orb className='h-8 w-8 lg:h-12 lg:w-12' />
        </Reveal>
      </Reveal>
    </Container>
  </section>
);

// `size` is accepted for backward compatibility; the layout now follows `collage` (home) vs none (inner).
// eslint-disable-next-line no-unused-vars
const PageHero = ({ image = 'hero-dove', size, collage, ...props }) =>
  collage && collage.length ? <HomeHero collage={collage} {...props} /> : <InnerHero image={image} {...props} />;
export default PageHero;
