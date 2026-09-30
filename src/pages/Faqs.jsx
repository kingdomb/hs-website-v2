import PageHero from '../components/hero/PageHero';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import Accordion from '../components/ui/Accordion';
import SalvationNotice from '../components/shared/SalvationNotice';
import { FAQS } from '../data/faqs';

const Faqs = () => (
  <>
    <PageHero eyebrow='FAQs' title='Common questions' subtitle='Honest answers about the encounter, calling on the name of Jesus, and what Scripture says.' image='dove' />
    <Section tone='base' className='relative overflow-hidden'>
      <div aria-hidden='true' className='clay-gold animate-breathe absolute -right-16 top-16 hidden h-40 w-40 rounded-full lg:block' />
      <Container className='relative max-w-3xl'>
        <Reveal variant='scale'><SalvationNotice className='mb-10' /></Reveal>
        <Reveal variant='up' delay={100}><Accordion items={FAQS} headingLevel={2} /></Reveal>
      </Container>
    </Section>
  </>
);
export default Faqs;
