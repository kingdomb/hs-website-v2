import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import TithelyGiveButton from './TithelyGiveButton';
import { GIVING } from '../../data/giving';

const GiveSection = () => (
  <Section tone='base' className='text-center'>
    <Container>
      <Reveal variant='scale' className='neu-raised mx-auto max-w-3xl !rounded-neu-lg p-10 lg:p-14'>
        <h2 className='mb-8 font-display text-3xl font-semibold text-neu-ink lg:text-4xl'>Thank you for supporting our community.</h2>
        <TithelyGiveButton />
        {GIVING.enabled && (
          <p className='mt-8 text-sm text-neu-muted'>
            <a href={GIVING.formUrl} target='_blank' rel='noopener noreferrer' className='text-royal-600 underline'>View giving form</a>
            {' | '}
            <a href={GIVING.kioskUrl} target='_blank' rel='noopener noreferrer' className='text-royal-600 underline'>Open kiosk mode</a>
          </p>
        )}
      </Reveal>
    </Container>
  </Section>
);
export default GiveSection;
