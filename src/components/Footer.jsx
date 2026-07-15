import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

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

  return (
    <footer className="border-t border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-950/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 text-center sm:px-6 lg:px-8"
      >
        <div>
          <p className="text-xl font-semibold text-slate-900 dark:text-white">Hernán Andrés Alegre</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Desarrollador Full-Stack | Analista de Datos
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          {links.map((link) => (
            <ScrollLink
              key={link.target}
              to={link.target}
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer transition hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/hernanalegre/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:hernan.cs@hotmail.com"
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {year} Hernán Alegre. Todos los derechos reservados.
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;
