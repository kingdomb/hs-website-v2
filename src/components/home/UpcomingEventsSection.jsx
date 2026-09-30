import { useEffect, useRef, useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import NeuFrame from '../ui/NeuFrame';
import ResponsiveImage from '../ui/ResponsiveImage';
import EventCard from './EventCard';
import { EVENT_DEFS } from '../../data/events';
import { getUpcomingEventRows } from '../../utils/nextEvents';
import { mapEventsToCards } from '../../utils/mapEventsToCards';

// DB wiring later: pass `rows` from a fetch instead of the computed recurring events.
const UpcomingEventsSection = ({
  rows = getUpcomingEventRows(EVENT_DEFS),
  title = 'Serve with us',
  subtitle = 'Our homeless food outreach is every second Sunday, with community meals at Thanksgiving and Christmas. Bring a friend.',
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = rows.filter((r) => new Date(r.startsOn) >= today).slice(0, 3);
  const cards = mapEventsToCards(upcoming);
  // The photo beside the list follows the event nearest the middle of the viewport, or the one hovered/focused.
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.eventIndex))),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    list.querySelectorAll('[data-event-index]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cards.length]);
  return (
    <Section id='events' tone='base'>
      <Container>
        {cards.length > 0 ? (
          <div className='grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12'>
            <Reveal variant='mask' className='hidden lg:block'>
              <NeuFrame float>
                <div className='relative aspect-[4/3] w-full'>
                  {cards.map((c, i) => (
                    <ResponsiveImage
                      key={c.title}
                      name={c.image}
                      alt={i === active ? c.title : ''}
                      aria-hidden={i === active ? undefined : 'true'}
                      sizes='(min-width: 1024px) 560px, 100vw'
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                </div>
              </NeuFrame>
            </Reveal>
            <div>
              <SectionHeading eyebrow='Events' title={title} subtitle={subtitle} />
              <div ref={listRef} className='flex flex-col gap-6'>
                {cards.map((c, i) => (
                  <Reveal key={c.title} variant='right' delay={i * 100}>
                    <div data-event-index={i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                      <EventCard {...c} />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <SectionHeading eyebrow='Events' title={title} subtitle={subtitle} />
            <p className='text-center text-lg text-neu-muted'>Upcoming events will be posted here.</p>
          </>
        )}
      </Container>
    </Section>
  );
};
export default UpcomingEventsSection;
