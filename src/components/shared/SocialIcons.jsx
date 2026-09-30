import { SOCIAL_LINKS } from '../../data/socials';

const SocialIcons = ({ size = 18, className = '' }) => {
  if (!SOCIAL_LINKS.length) return null;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} className='neu-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-neu text-royal-600 shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'>
          <Icon style={{ fontSize: size }} />
        </a>
      ))}
    </div>
  );
};
export default SocialIcons;
