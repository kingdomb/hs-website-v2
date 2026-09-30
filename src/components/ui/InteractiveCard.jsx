import { useRef } from 'react';
import usePointerGlow from '../../hooks/usePointerGlow';
import useTilt from '../../hooks/useTilt';

// Raised neumorphic card that lifts, leans toward the pointer and shows a soft spotlight.
const InteractiveCard = ({ as: Tag = 'div', tilt = true, className = '', children, ...rest }) => {
  const ref = useRef(null);
  usePointerGlow(ref);
  useTilt(ref, tilt ? 4 : 0);
  return (
    <Tag ref={ref} className={`neu-raised spotlight tilt ${className}`} {...rest}>
      {children}
    </Tag>
  );
};
export default InteractiveCard;
