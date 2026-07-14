import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Mail } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import profileImage from '../assets/images/hernan.png';

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_35%)]" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
            Disponible para proyectos y colaboraciones
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl dark:text-white">
            Hernán Andrés Alegre
          </h1>

          <p className="mt-4 text-lg font-semibold text-cyan-600 sm:text-xl dark:text-cyan-400">
            Desarrollador Full-Stack | Técnico en Soporte IT | Analista de Datos
          </p>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            Estudiante avanzado de Licenciatura en Sistemas, con experiencia en desarrollo web, análisis de datos y soporte técnico en contextos públicos y privados.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ScrollLink
              to="projects"
              smooth={true}
              duration={500}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Ver proyectos
              <ArrowRight size={16} />
            </ScrollLink>

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <Download size={16} />
              Descargar CV
            </a>

            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              Contactarme
            </ScrollLink>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/hernanalegre/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 p-3 text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hernan.cs@hotmail.com"
              className="rounded-full border border-slate-300 p-3 text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm rounded-[2rem] border border-slate-200 bg-white/70 p-4 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-emerald-400/20" />
            <img
              src={profileImage}
              alt="Foto de perfil de Hernán Andrés Alegre"
              className="h-80 w-full rounded-[1.5rem] object-cover object-center sm:h-96"
            />
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
                Perfil
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Desarrollo con foco en productos útiles, interfaces claras y soluciones técnicas sostenibles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
