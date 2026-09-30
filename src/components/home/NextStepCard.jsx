import InteractiveCard from '../ui/InteractiveCard';

const NextStepCard = ({ title, text, img, onClick }) => (
  <InteractiveCard
    as='button'
    type='button'
    onClick={onClick}
    className='flex h-full w-full items-center gap-4 p-4 text-left focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500'
  >
    {img && (
      <span className='neu-inset grid h-20 w-20 shrink-0 place-items-center overflow-hidden'>
        <img src={img} alt='' className='h-full w-full translate-y-[5%] object-contain p-2.5 mix-blend-multiply' />
      </span>
    )}
    <span>
      <span className='block font-display text-xl font-semibold leading-tight text-neu-ink'>{title}</span>
      <span className='block text-sm text-neu-muted'>{text}</span>
    </span>
  </InteractiveCard>
);
export default NextStepCard;
