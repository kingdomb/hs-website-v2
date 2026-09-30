import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import InteractiveCard from '../ui/InteractiveCard';
import Reveal from '../ui/Reveal';
import VerseCarousel from '../ui/VerseCarousel';
import { ENCOUNTER_STEPS } from '../../data/encounter';
import { PRACTICE_VERSES } from '../../data/scripture';

const HowItWorksSection = () => (
  <Section id='encounter' tone='band'>
    <Container>
      <SectionHeading eyebrow='The encounter' title='Unhurried. Expectant. Open to Him.' subtitle='An encounter is a time set apart to call on the name of Jesus and make room for the Holy Spirit.' />
      <Reveal variant='scale' className='mb-14'>
        <VerseCarousel items={PRACTICE_VERSES} />
      </Reveal>
      <CardGrid min='17rem'>
        {ENCOUNTER_STEPS.map((step, i) => (
          <InteractiveCard key={step.title} className='h-full p-8'>
            <Reveal variant='pop' delay={200} className='inline-block'>
              <span className='clay-gold flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold'>{i + 1}</span>
            </Reveal>
            <h3 className='mt-4 font-display text-2xl font-semibold text-neu-ink'>{step.title}</h3>
            <p className='mt-3 text-neu-muted'>{step.body}</p>
          </InteractiveCard>
        ))}
      </CardGrid>
    </Container>
  </Section>
);
export default HowItWorksSection;
