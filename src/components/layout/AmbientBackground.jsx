// AmbientBackground: soft colored glows drifting behind the page, shifting with scroll
const Blob = ({ className, style }) => (
  <div className='absolute' style={{ transform: 'translate3d(0, calc(var(--scroll-progress, 0) * -14vh), 0)' }}>
    <div className={`rounded-full blur-3xl animate-drift ${className}`} style={style} />
  </div>
);

const AmbientBackground = () => (
  <div aria-hidden='true' className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
    <div className='absolute -left-[10vw] -top-[8vw]'><Blob className='h-[46vw] w-[46vw] bg-royal-400/12' /></div>
    <div className='absolute -right-[8vw] top-[24vh]'><Blob className='h-[38vw] w-[38vw] bg-gold-300/20' style={{ animationDuration: '32s', animationDelay: '-6s' }} /></div>
    <div className='absolute bottom-[-14vw] left-[26vw]'><Blob className='h-[34vw] w-[34vw] bg-royal-500/[0.08]' style={{ animationDuration: '38s', animationDelay: '-12s' }} /></div>
  </div>
);
export default AmbientBackground;
