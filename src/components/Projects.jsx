import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';

const categories = [
  { key: 'web', label: 'Desarrollo Web' },
  { key: 'diseno', label: 'Diseño Gráfico' },
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState('web');
  const filteredProjects = projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
          Proyectos
        </p>
        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Proyectos que combinan producto, código y contexto real
          </h2>
          <div className="hidden h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 sm:block" />
        </div>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Algunos de los proyectos en los que trabajé, combinando desarrollo full-stack y diseño visual con resultados palpables.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((category) => {
          const isActive = category.key === activeCategory;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Projects;
