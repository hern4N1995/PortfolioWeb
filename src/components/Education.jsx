import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';

const academic = [
  {
    title: 'Licenciatura en Sistemas de Información',
    subtitle: 'UNNE',
    year: 'En curso',
  },
  {
    title: 'Bachiller en Humanidades y Ciencias Sociales',
    subtitle: 'Dr. René Favaloro',
    year: '2013',
  },
];

const certifications = [
  {
    title: 'Data Analytics con Power BI',
    subtitle: '2024',
  },
  {
    title: 'Introducción a la Ciencia de Datos (Pandas & NumPy)',
    subtitle: 'Argentina Programa 4.0 · 2023',
  },
  {
    title: 'Diseño e Integración Web (HTML+CSS)',
    subtitle: 'CIVET · 2020',
  },
  {
    title: 'Community Manager',
    subtitle: 'Municipalidad de Corrientes · 2021',
  },
  {
    title: 'Armado y Reparación de PC',
    subtitle: 'IAC · 2012',
  },
];

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
          Educación y certificaciones
        </p>
        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Formación académica y formación continua
          </h2>
          <div className="hidden h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 sm:block" />
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400">
              <GraduationCap size={18} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Formación Académica
            </h3>
          </div>

          <div className="mt-6 space-y-4">
            {academic.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <Award size={18} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Certificaciones y Cursos
            </h3>
          </div>

          <div className="mt-6 space-y-3">
            {certifications.map((item) => (
              <div
                key={item.title}
                className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
