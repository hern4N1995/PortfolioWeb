import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Pause, Maximize } from 'lucide-react';

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden">
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-56 w-full object-cover"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition duration-300 group-hover:opacity-100">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/90 p-3 text-cyan-700 shadow-lg transition hover:scale-105"
            aria-label={`Ver proyecto ${project.title}`}
          >
            <ExternalLink size={18} />
          </a>
        </div>

        {project.video && isHovering && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={togglePlayPause}
              className="absolute left-4 top-4 rounded-full bg-white/90 p-2.5 text-slate-900 shadow-lg transition hover:scale-105"
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleFullscreen}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-slate-900 shadow-lg transition hover:scale-105"
              aria-label="Ver en pantalla completa"
            >
              <Maximize size={16} />
            </motion.button>
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          {project.featured && (
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Destacado
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-600 dark:text-cyan-300"
          >
            <ExternalLink size={15} />
            Ver proyecto en vivo
          </a>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300"
              aria-label={`Ver repositorio de ${project.title}`}
            >
              <Github size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
