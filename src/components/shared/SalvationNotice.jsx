import { SALVATION_NOTICE } from '../../data/site';

const SalvationNotice = ({ className = '' }) => (
  <aside
    className={`rounded-neu bg-neu p-5 text-lg leading-relaxed text-neu-ink shadow-neu-inset ${className}`}
  >
    {SALVATION_NOTICE}
  </aside>
);
export default SalvationNotice;
