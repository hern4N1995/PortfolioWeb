import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import EmailContactMenu from './EmailContactMenu';

const links = [
  { label: 'Inicio', target: 'home' },
  { label: 'Sobre mí', target: 'about' },
  { label: 'Proyectos', target: 'projects' },
  { label: 'Experiencia', target: 'experience' },
  { label: 'Habilidades', target: 'skills' },
  { label: 'Educación', target: 'education' },
  { label: 'Contacto', target: 'contact' },
];

function Footer() {
  const year = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState('home');

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
    <footer className="border-t border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-950/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-6xl flex-col px-6 py-12 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-3 md:items-start md:gap-8">
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            {links.map((link) => (
              <ScrollLink
                key={link.target}
                to={link.target}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="text-cyan-600 font-semibold dark:text-cyan-400"
                className={`cursor-pointer transition hover:text-cyan-600 dark:hover:text-cyan-400 ${
                  activeSection === link.target
                    ? 'text-cyan-600 font-semibold dark:text-cyan-400'
                    : ''
                }`}
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>

          <div className="mt-2 flex flex-col items-center justify-center gap-3 text-center">
            <p></p>
            
            
            <p className="text-xl font-semibold text-slate-900 dark:text-white">Hernán Andrés Alegre</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Desarrollador Full-Stack | Técnico en Soporte IT | Analista de Datos 
            </p>
            <p></p>
            <p></p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {year} Hernán Alegre. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <p></p>
            <p></p>
            <p></p>
            <a
              href="https://www.linkedin.com/in/hernanalegre/"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <EmailContactMenu
              className="relative w-fit"
              renderTrigger={({ toggleMenu, buttonRef }) => (
                <button
                  type="button"
                  ref={buttonRef}
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </button>
              )}
            />
            <a
              href="https://wa.me/5493794142880"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="WhatsApp"
            >
              <Phone size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
