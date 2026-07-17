import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const links = [
  { label: 'Inicio', target: 'home' },
  { label: 'Sobre mí', target: 'about' },
  { label: 'Proyectos', target: 'projects' },
  { label: 'Experiencia', target: 'experience' },
  { label: 'Habilidades', target: 'skills' },
  { label: 'Educación', target: 'education' },
  { label: 'Contacto', target: 'contact' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.target))
      .filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-20% 0px -45% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/20 transition-transform hover:scale-105">
            <img
              src="/images/HAlogo.png"
              alt="Hernán Alegre"
              className="h-14 w-14 object-contain"
            />
          </div>
        </ScrollLink>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <motion.div key={link.target} whileHover={{ scale: 1.02 }}>
              <ScrollLink
                to={link.target}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="text-cyan-600 font-semibold dark:text-cyan-400"
                className={`group relative cursor-pointer overflow-hidden text-sm font-medium transition hover:text-cyan-600 dark:hover:text-cyan-400 ${
                  activeSection === link.target
                    ? 'text-cyan-600 font-semibold dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-cyan-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </ScrollLink>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:scale-105 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-cyan-400"
            aria-label="Alternar modo oscuro"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:scale-105 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
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
                  spy={true}
                  activeClass="text-cyan-600 font-semibold dark:text-cyan-400"
                  onClick={() => setMobileOpen(false)}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-slate-800 dark:hover:text-cyan-400 ${
                    activeSection === link.target
                      ? 'bg-cyan-50 text-cyan-600 font-semibold dark:bg-slate-800 dark:text-cyan-400'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
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
