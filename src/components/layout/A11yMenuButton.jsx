// TODO(a11y-menu): placeholder. The real accessibility menu is not built yet.
// See docs/accessibility-menu-placeholder.md
import { useState } from 'react';
import { MdAccessibilityNew } from 'react-icons/md';
import Modal from '../shared/Modal';
import { A11Y_PLANNED } from '../../data/a11yPlanned';

const A11yMenuButton = ({ className = '' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type='button' aria-label='Accessibility options' aria-haspopup='dialog' onClick={() => setOpen(true)}
        className={`neu-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-neu text-royal-600 shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-royal-500 ${className}`}>
        <MdAccessibilityNew size={22} aria-hidden='true' />
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title='Accessibility options' maxWidth='max-w-2xl'>
        <p className='mb-4 text-neu-muted'>An accessibility menu is coming soon. Here is what we are planning to offer:</p>
        <ul className='space-y-3'>
          {A11Y_PLANNED.map((item) => (
            <li key={item.title} className='neu-inset px-5 py-4'>
              <p className='font-semibold'>{item.title}</p>
              <p className='text-sm text-neu-muted'>{item.body}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};
export default A11yMenuButton;
