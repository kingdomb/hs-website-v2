import { FiPlayCircle } from 'react-icons/fi';
import InteractiveCard from '../ui/InteractiveCard';

const WorshipOptionCard = ({ Icon = FiPlayCircle, title, description, link }) => (
  <InteractiveCard
    as='a'
    href={link}
    target='_blank'
    rel='noopener noreferrer'
    className='block h-full p-8 text-center focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'
  >
    <span className='neu-inset mx-auto mb-4 flex h-16 w-16 items-center justify-center'>
      <Icon className='text-3xl text-royal-600' aria-hidden='true' />
    </span>
    <h3 className='font-display text-xl font-semibold text-neu-ink'>{title}</h3>
    <p className='mt-2 text-sm text-neu-muted'>{description}</p>
  </InteractiveCard>
);
export default WorshipOptionCard;
