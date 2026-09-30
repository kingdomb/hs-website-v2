import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import TithelyGiveButton from '../shared/TithelyGiveButton';
import { GIVING } from '../../data/giving';

const WaysToGiveSection = () => (
  <Section tone='band' className='text-center'>
    <Container className='max-w-3xl'>
      <Reveal variant='scale' className='neu-raised rounded-neu-lg p-8 lg:p-14'>
        <SectionHeading eyebrow='Ways to give' title='Give online' subtitle={GIVING.enabled ? 'Use a debit or credit card to give once or set up recurring giving.' : 'Online giving is being set up. Please check back soon.'} />
        <TithelyGiveButton />
      </Reveal>
    </Container>
  </Section>
);
export default WaysToGiveSection;
