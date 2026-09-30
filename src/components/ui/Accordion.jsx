import { useId, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Accordion = ({ items, headingLevel = 3 }) => {
  const [open, setOpen] = useState(null);
  const base = useId();
  const Heading = `h${headingLevel}`;

  return (
    <div className='flex flex-col gap-5'>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-${i}`;
        return (
          <div
            key={item.title}
            className={`rounded-neu bg-neu px-6 transition-shadow duration-300 ${isOpen ? 'shadow-neu-inset' : 'neu-raised-sm'}`}
          >
            <Heading className='m-0'>
              <button
                id={`${panelId}-btn`}
                type='button'
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className='flex w-full items-center justify-between gap-4 rounded-neu py-5 text-left font-display text-2xl font-semibold text-neu-ink focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-royal-500'
              >
                {item.title}
                <FiChevronDown className={`shrink-0 text-royal-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </Heading>
            <div
              id={panelId}
              role='region'
              aria-labelledby={`${panelId}-btn`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className='overflow-hidden'>
                <p className='pb-2 leading-relaxed text-neu-muted'>{item.body}</p>
                {item.refs && (
                  <p className='pb-5 text-sm font-medium text-royal-600'>{item.refs.join(' · ')}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
