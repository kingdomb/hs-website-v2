import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import NeuFrame from '../ui/NeuFrame';
import InteractiveCard from '../ui/InteractiveCard';
import ResponsiveImage from '../ui/ResponsiveImage';
import { SITE } from '../../data/site';

const reasons = [
  { title: 'Give your time and talent', body: 'Serve alongside us at an encounter or in community outreach across Atlanta.' },
  { title: 'Give your treasure', body: `Your gifts help ${SITE.name} host encounters, serve our neighbors, and share the gospel.` },
];

const WhyWeGiveSection = () => (
  <Section tone='base'>
    <Container className='flex flex-col items-center gap-12 lg:flex-row'>
      <Reveal variant='mask' className='w-full lg:w-1/2'>
        <NeuFrame float>
          <ResponsiveImage name='meals-handout' alt='Volunteers handing out meals' sizes='(min-width: 1024px) 520px, 100vw' className='aspect-[4/3] w-full object-cover' />
        </NeuFrame>
      </Reveal>
      <Reveal variant='right' delay={120} className='w-full lg:w-1/2'>
        <h2 className='mb-4 text-4xl font-semibold'>Why we give</h2>
        <p className='mb-8 text-lg'>Giving is worship. God has given us everything, and we joyfully give back.</p>
        <ol role='list' className='m-0 flex list-none flex-col gap-5 p-0'>
          {reasons.map((r, i) => (
            <InteractiveCard as='li' key={r.title} className='flex items-start gap-4 rounded-neu p-5'>
              <Reveal variant='pop' delay={200 + i * 120} className='shrink-0'>
                <span className='clay-gold flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold' aria-hidden='true'>{i + 1}</span>
              </Reveal>
              <div>
                <h3 className='text-2xl font-semibold'>{r.title}</h3>
                <p className='text-neu-muted'>{r.body}</p>
              </div>
            </InteractiveCard>
          ))}
        </ol>
      </Reveal>
    </Container>
  </Section>
);
export default WhyWeGiveSection;
