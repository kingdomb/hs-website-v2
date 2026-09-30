// ScrollProgress: thin progress bar under the header (hidden via index.css when motion is off)
import useScrollProgress from '../../hooks/useScrollProgress';

const ScrollProgress = () => {
  useScrollProgress();
  return (
    <div aria-hidden='true' className='scroll-progress pointer-events-none fixed inset-x-0 top-header z-40 h-[3px]'>
      <div className='h-full origin-left bg-gradient-to-r from-royal-400 to-gold-400' style={{ transform: 'scaleX(var(--scroll-progress, 0))' }} />
    </div>
  );
};
export default ScrollProgress;
