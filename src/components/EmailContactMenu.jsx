import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Mail } from 'lucide-react';

const EMAIL = 'hernan.cs@hotmail.com';

function EmailContactMenu({ renderTrigger, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleToggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const defaultTrigger = (
    <button
      type="button"
      ref={triggerRef}
      onClick={handleToggleMenu}
      className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-950/50"
    >
      <div className="rounded-full bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400">
        <Mail size={16} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{EMAIL}</p>
      </div>
    </button>
  );

  return (
    <div ref={menuRef} className={className ?? 'relative'}>
      {renderTrigger ? renderTrigger({ isOpen, toggleMenu: handleToggleMenu, buttonRef: triggerRef }) : defaultTrigger}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 z-20 mt-2 min-w-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hernan.cs@hotmail.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <Mail size={14} />
              <span>Abrir en Gmail</span>
            </a>
            <a
              href="https://outlook.live.com/mail/0/deeplink/compose?to=hernan.cs@hotmail.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              <Mail size={14} />
              <span>Abrir en Outlook</span>
            </a>
            <button
              type="button"
              onClick={() => {
                handleCopyEmail();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? '¡Copiado!' : 'Copiar email'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EmailContactMenu;
