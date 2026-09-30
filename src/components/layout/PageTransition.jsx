// PageTransition: soft fade-and-rise when the route changes (never on the very first load).
// Hash navigations use an opacity-only entrance so ScrollManager measures the final position.
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useMotionLevel from '../../hooks/useMotionLevel';

const PageTransition = ({ children }) => {
  const { pathname, hash } = useLocation();
  const level = useMotionLevel();
  const [current, setCurrent] = useState(pathname);
  const [entrance, setEntrance] = useState('');
  if (pathname !== current) {
    setCurrent(pathname);
    setEntrance(hash ? 'animate-fade-in' : 'animate-page-in');
  }
  return <div key={pathname} className={level === 'off' ? '' : entrance}>{children}</div>;
};
export default PageTransition;
