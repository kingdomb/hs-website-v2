import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Accordion from '../ui/Accordion';
import Reveal from '../ui/Reveal';
import SalvationNotice from '../shared/SalvationNotice';
import { BELIEFS } from '../../data/beliefs';

const BeliefsSection = () => (
  <Section tone='band'>
    <Container className='max-w-3xl'>
      <SectionHeading eyebrow='What we believe' title='Our beliefs' />
      <Reveal variant='scale'><SalvationNotice className='mb-10' /></Reveal>
      <Reveal variant='up' delay={100}><Accordion items={BELIEFS} /></Reveal>
    </Container>
  </Section>
);
export default BeliefsSection;
