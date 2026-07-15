import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const links = [
  { label: 'Sobre mí', target: 'about' },
  { label: 'Experiencia', target: 'experience' },
  { label: 'Proyectos', target: 'projects' },
  { label: 'Habilidades', target: 'skills' },
  { label: 'Contacto', target: 'contact' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          offset={-80}
          className="cursor-pointer text-lg font-semibold tracking-wide text-slate-900 transition-colors dark:text-white"
        >
          <span className="rounded-full bg-cyan-500/10 px-3 py-2 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300">
            HA
          </span>
        </ScrollLink>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <ScrollLink
              key={link.target}
              to={link.target}
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:scale-105 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-cyan-400"
            aria-label="Alternar modo oscuro"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:scale-105 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95"
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <ScrollLink
                  key={link.target}
                  to={link.target}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setMobileOpen(false)}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                >
                  {link.label}
                </ScrollLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
