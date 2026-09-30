import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import InteractiveCard from '../ui/InteractiveCard';
import CardGrid from '../ui/CardGrid';
import { LEADERS } from '../../data/leaders';

const LeadershipSection = () => {
  if (!LEADERS.length) return null;
  return (
    <Section tone='band'>
      <Container>
        <SectionHeading eyebrow='Leadership' title='Meet our ministry leaders' />
        <CardGrid min='12rem'>
          {LEADERS.map((l) => (
            <InteractiveCard key={l.name} className='h-full p-6 text-center'>
              {l.photo && <img src={l.photo} alt={l.name} className='mx-auto h-32 w-32 rounded-full object-cover' loading='lazy' />}
              <p className='mt-4 font-display text-xl font-semibold'>{l.name}</p>
              <p className='text-sm text-neu-muted'>{l.role}</p>
            </InteractiveCard>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};
export default LeadershipSection;
