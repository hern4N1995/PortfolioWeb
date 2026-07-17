import { motion } from 'framer-motion';
import { BriefcaseBusiness, Cpu, Database, Sparkles } from 'lucide-react';

const stats = [
  {
    label: 'Años de experiencia',
    value: '3+ años',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Proyectos entregados',
    value: '3 proyectos',
    icon: Sparkles,
  },
  {
    label: 'Sectores trabajados',
    value: 'Público y privado',
    icon: Cpu,
  },
  {
    label: 'Especialidad',
    value: 'Datos y desarrollo',
    icon: Database,
  },
];

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
          Sobre mí
        </p>
        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Conectando tecnología, datos y soluciones prácticas
          </h2>
          <div className="hidden h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 sm:block" />
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[2rem] border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div className="rounded-[1.5rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-6">
            <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
              Estudiante avanzado de Licenciatura en Sistemas (UNNE) con experiencia técnica en el sector público y privado. Experiencia en desarrollo Full-Stack y análisis de datos, complementada con práctica en infraestructura tecnológica, redes y soporte IT. Orientado a la optimización de procesos mediante software y visualización de datos.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
