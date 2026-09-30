// NeuFrame: raised frame with an inset well; put a photo (ResponsiveImage) inside
const NeuFrame = ({ className = '', float = false, floatDelay, kenBurns = false, children }) => (
  <div style={floatDelay ? { animationDelay: floatDelay } : undefined} className={`rounded-neu-lg bg-neu p-3 shadow-neu-lg ${float ? 'animate-float' : ''} ${className}`}>
    <div className='overflow-hidden rounded-[26px] shadow-neu-inset'>
      <div className={kenBurns ? 'animate-kenburns' : ''}>{children}</div>
    </div>
  </div>
);
export default NeuFrame;
