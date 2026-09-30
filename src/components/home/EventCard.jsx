import Reveal from '../ui/Reveal';
import ResponsiveImage from '../ui/ResponsiveImage';

const CARD = 'neu-raised-sm flex flex-col gap-5 p-5 lg:flex-row lg:items-center hover-glide focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500';

// On large screens the section shows the event photo beside the list; on smaller ones it sits on the card.
const EventCard = ({ title, date, month, location, image, href }) => {
  const body = (
    <>
      {image && (
        <div className='overflow-hidden rounded-2xl shadow-neu-inset lg:hidden'>
          <ResponsiveImage name={image} alt='' sizes='100vw' className='aspect-[16/10] w-full object-cover' />
        </div>
      )}
      <div className='flex items-center gap-5'>
        <Reveal variant='pop' delay={250} className='shrink-0'>
          <div className='clay-gold flex h-16 w-16 flex-col items-center justify-center rounded-2xl'>
            <span className='text-xs font-semibold uppercase leading-tight'>{month}</span>
            <span className='text-2xl font-bold leading-none'>{date}</span>
          </div>
        </Reveal>
        <div>
          <h3 className='font-display text-2xl font-semibold text-neu-ink'>{title}</h3>
          {location && <p className='mt-1 text-neu-muted'>{location}</p>}
        </div>
      </div>
    </>
  );
  // Only render a link when there is a real destination; '#' would just jump to the page top.
  if (!href || href === '#') return <article className={CARD}>{body}</article>;
  return <a href={href} className={CARD}>{body}</a>;
};
export default EventCard;
