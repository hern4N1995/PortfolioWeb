import { motion } from 'framer-motion';
import experience from '../data/experience';

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
          Experiencia laboral
        </p>
        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Trayectoria técnica y profesional
          </h2>
          <div className="hidden h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 sm:block" />
        </div>
      </motion.div>

      <div className="relative ml-3 border-l border-slate-200 pl-8 dark:border-slate-800 sm:ml-0 sm:pl-0">
        {experience.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative mb-10"
          >
            <span className="absolute -left-[1.5rem] top-2 h-4 w-4 rounded-full border-4 border-slate-50 bg-cyan-500 shadow-sm dark:border-slate-950" />
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.role}</p>
                  <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{item.company}</p>
                </div>
                <span className="inline-flex w-fit rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  {item.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
