import { useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { FIELD } from '../ui/fieldClasses';

const NewsletterSignupSection = () => {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault(); // TODO(owner): wire to a mailing-list provider; static hosting has no /subscribers endpoint
    setSent(true);
  };
  return (
    <Section tone='band' className='!py-14'>
      <Container>
        <Reveal className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='lg:w-1/2'>
            <h2 className='mb-2 font-display text-3xl text-neu-ink'>Stay in the loop</h2>
            <p className='text-neu-muted'>Get updates on encounters and outreach.</p>
          </div>
          <form onSubmit={onSubmit} className='flex flex-col gap-3 lg:w-1/2 lg:flex-row'>
            <label htmlFor='newsletter-email' className='sr-only'>Email address</label>
            <input
              id='newsletter-email' type='email' required placeholder='Your email'
              className={`${FIELD} !rounded-full`}
            />
            <Button variant='primary' type='submit' className='shrink-0'>Subscribe</Button>
          </form>
        </Reveal>
        {sent && <p role='status' className='mt-4 text-royal-600'>Thank you — newsletter signup is coming soon.</p>}
      </Container>
    </Section>
  );
};
export default NewsletterSignupSection;
