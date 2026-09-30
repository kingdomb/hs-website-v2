import { GIVING } from '../../data/giving';

const BASE = 'rounded-full px-10 py-3.5 text-lg font-bold focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500';

const TithelyGiveButton = ({ children = 'Give', className = '' }) =>
  GIVING.enabled ? (
    <button type='button' data-form={GIVING.tithelyFormId} className={`tithely-give-button clay-primary ${BASE} hover-lift ${className}`}>
      {children}
    </button>
  ) : (
    <button type='button' disabled className={`neu-inset cursor-not-allowed !rounded-full text-neu-muted ${BASE} ${className}`}>
      Giving coming soon
    </button>
  );
export default TithelyGiveButton;
