// src/components/shared/Modal.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useScrollLock from '../../hooks/useScrollLock';
import { isTopDismiss, popDismiss, pushDismiss } from '../../utils/dismissStack';
import useExitTransition from '../../hooks/useExitTransition';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg', // e.g. "max-w-4xl" for wider dialogs
  showCloseButton = true, // show an "X" in the top-right
  closeOnOverlayClick = true, // click outside to close
}) {
  useScrollLock(isOpen);
  const { mounted, closing } = useExitTransition(isOpen);
  const panelRef = useRef(null);
  // Keep the latest onClose in a ref so inline callers do not re-push the dismiss token every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  // Focus management: move focus into the panel, trap Tab, restore on close/unmount.
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector('button[aria-label="Close"]')?.focus();
    if (panel && !panel.contains(document.activeElement)) panel.focus();
    const onTab = (e) => {
      if (e.key !== 'Tab' || !panel) return;
      const items = panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onTab);
    return () => {
      document.removeEventListener('keydown', onTab);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const token = {};
    pushDismiss(token);
    const onKey = (e) => {
      if (e.key === 'Escape' && isTopDismiss(token)) onCloseRef.current?.();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      popDismiss(token);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleWrapperMouseDown = (e) => {
    if (!closeOnOverlayClick) return;
    // Only close if they clicked the wrapper (the dark area), not the dialog panel
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-neu/60 p-4 backdrop-blur-md ${closing ? 'pointer-events-none animate-fade-out' : 'animate-fade-in'}`}
      inert={closing}
      role='dialog'
      aria-modal='true'
      aria-label={typeof title === 'string' ? title : undefined}
      onMouseDown={handleWrapperMouseDown}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative focus:outline-none w-full ${maxWidth} max-h-[90dvh] overflow-y-auto rounded-neu-lg bg-neu p-6 text-left text-neu-ink shadow-neu-lg ${closing ? 'animate-pop-out' : 'animate-pop-in'}`}
        // stop clicks inside the panel from closing
        onMouseDown={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className='mb-2 relative'>
            {title ? (
              <h2 className='font-display text-2xl font-semibold text-neu-ink pr-10'>
                {title}
              </h2>
            ) : null}
            {showCloseButton && (
              <button
                type='button'
                aria-label='Close'
                onClick={onClose}
                className='neu-press absolute -top-1 right-0 inline-flex items-center justify-center rounded-full bg-neu p-2 text-neu-ink shadow-neu-xs focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-royal-500'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  aria-hidden='true'
                >
                  <path
                    d='M4 4l12 12M16 4L4 16'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
