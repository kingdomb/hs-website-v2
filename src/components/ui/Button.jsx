import { Link } from 'react-router-dom';
import { BTN_BASE, BTN_VARIANTS } from './buttonStyles';


export default function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const cls = `${BTN_BASE} ${BTN_VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type='button' className={cls} {...rest}>{children}</button>;
}
