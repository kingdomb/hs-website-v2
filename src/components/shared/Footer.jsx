import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/nav';
import { SITE } from '../../data/site';
import logo from '../../assets/hs-logo-combo.png';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SocialIcons from './SocialIcons';

const LINK = 'rounded-full text-neu-ink hover:text-royal-600 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500';

const Footer = () => (
  <footer className='text-neu-ink'>
    <div aria-hidden='true' className='h-3 shadow-neu-inset-sm' />
    <Container className='py-14'>
      <Reveal className='flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between'>
        <div className='rounded-neu-lg bg-neu p-6 shadow-neu-lg'>
          <img src={logo} alt={SITE.name} className='max-h-40 w-auto opacity-90' />
        </div>
        <div className='grid gap-8 text-center lg:grid-cols-3 lg:text-left'>
          <div>
            <h2 className='mb-2 text-xl'>Explore</h2>
            <ul className='space-y-1 text-sm'>
              {NAV_LINKS.map((l) => (
                <li key={l.label}><Link to={l.to} className={LINK}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='mb-2 text-xl'>Address</h2>
            {SITE.address ? (
              <p className='text-sm'>
                {SITE.address.lines.map((line) => (<span key={line} className='block'>{line}</span>))}
                {SITE.address.mapUrl && (
                  <a href={SITE.address.mapUrl} target='_blank' rel='noopener noreferrer' className='text-royal-600 underline'>View map</a>
                )}
              </p>
            ) : (
              <p className='text-sm text-neu-muted'>Address coming soon</p>
            )}
          </div>
          <div>
            <h2 className='mb-2 text-xl'>Contact</h2>
            <ul className='space-y-1 text-sm'>
              <li><a href={SITE.phone.href} className={LINK}>{SITE.phone.display}</a></li>
              <li>{SITE.email ? <a href={`mailto:${SITE.email}`} className={LINK}>{SITE.email}</a> : <span className='text-neu-muted'>Email coming soon</span>}</li>
            </ul>
            <SocialIcons className='mt-4 justify-center lg:justify-start' />
          </div>
        </div>
      </Reveal>
    </Container>
    <div className='bg-neu-deep py-3 text-center text-sm text-neu-muted shadow-neu-inset-sm'>
      © {new Date().getFullYear()} {SITE.name}. All rights reserved.
    </div>
  </footer>
);
export default Footer;
