import useReveal from '../../hooks/useReveal';

const Reveal = ({ as: Tag = 'div', delay = 0, variant = 'up', immediate = false, hold = false, className = '', children, ...rest }) => {
  const [ref, shown] = useReveal({ immediate, hold });
  return (
    <Tag
      ref={ref}
      data-shown={shown}
      data-variant={variant}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};
export default Reveal;
