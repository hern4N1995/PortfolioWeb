import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  Pause,
  Maximize,
  X,
} from 'lucide-react';

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const isDesignProject = project.category === 'diseno';
  const mediaItems = Array.isArray(project.media) ? project.media : [];
  const currentMedia = mediaItems[currentMediaIndex] ?? mediaItems[0];
  const isSingleMedia = mediaItems.length <= 1;

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

  const openExpandedView = () => {
    setIsExpanded(true);
  };

  const closeExpandedView = () => {
    setIsExpanded(false);
  };

  const changeMedia = (direction) => {
    if (mediaItems.length <= 1) {
      return;
    }

    setCurrentMediaIndex((current) => {
      const nextIndex = (current + direction + mediaItems.length) % mediaItems.length;
      return nextIndex;
    });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const updateMatch = () => setIsMobile(mediaQuery.matches);
    updateMatch();
    mediaQuery.addEventListener('change', updateMatch);
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [project.id]);

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const cardVideo = videoRef.current;
    const modalVideo = modalVideoRef.current;

    if (cardVideo && modalVideo && currentMedia?.type === 'video') {
      const syncModalVideo = () => {
        modalVideo.currentTime = cardVideo.currentTime;
        modalVideo.play().catch(() => {});
      };

      if (modalVideo.readyState >= 2) {
        syncModalVideo();
      } else {
        modalVideo.addEventListener('loadedmetadata', syncModalVideo);
      }

      return () => {
        modalVideo.pause();
        modalVideo.removeEventListener('loadedmetadata', syncModalVideo);
      };
    }

    return undefined;
  }, [isExpanded, currentMedia?.type, currentMedia?.src]);

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeExpandedView();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        changeMedia(1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        changeMedia(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded, mediaItems.length]);

  const handleSpotlight = (event) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setSpotlight({ x: 0, y: 0 });
      }}
      onMouseMove={handleSpotlight}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-transparent"
        animate={{
          background: isHovering
            ? `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(34,211,238,0.16), transparent 70%)`
            : 'transparent',
          boxShadow: isHovering
            ? 'inset 0 0 0 1px rgba(34,211,238,0.25), 0 0 30px rgba(34,211,238,0.08)'
            : 'inset 0 0 0 1px transparent',
        }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative overflow-hidden">
        {isDesignProject ? (
          <>
            <div className="cursor-zoom-in" onClick={openExpandedView}>
              {currentMedia?.type === 'video' ? (
                <video
                  ref={videoRef}
                  src={currentMedia.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-56 w-full object-cover"
                />
              ) : (
                <img
                  src={currentMedia?.src}
                  alt={project.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}
            </div>

            {!isSingleMedia && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    changeMedia(-1);
                  }}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white shadow-lg transition hover:scale-105"
                  aria-label="Ver pieza anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    changeMedia(1);
                  }}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white shadow-lg transition hover:scale-105"
                  aria-label="Ver pieza siguiente"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
              {mediaItems.map((item, index) => (
                <span
                  key={`${project.id}-${item.src}`}
                  className={`h-2.5 w-2.5 rounded-full ${
                    index === currentMediaIndex ? 'bg-white shadow' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>

            <div className="absolute right-3 top-3 z-10">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openExpandedView();
                }}
                className="rounded-full bg-white/90 p-2.5 text-slate-900 shadow-lg transition hover:scale-105"
                aria-label="Ampliar diseño"
              >
                <Maximize size={16} />
              </button>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4"
                  onClick={closeExpandedView}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative w-full max-w-[90vw] max-h-[90vh] rounded-[1.5rem] bg-slate-950/90 p-2 shadow-2xl"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={closeExpandedView}
                      className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-900 shadow-lg transition hover:scale-105"
                      aria-label="Cerrar vista ampliada"
                    >
                      <X size={16} />
                    </button>

                    {!isSingleMedia && (
                      <>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            changeMedia(-1);
                          }}
                          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white shadow-lg transition hover:scale-105"
                          aria-label="Ver pieza anterior"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            changeMedia(1);
                          }}
                          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white shadow-lg transition hover:scale-105"
                          aria-label="Ver pieza siguiente"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    <div className="flex max-h-[90vh] items-center justify-center overflow-hidden rounded-[1.25rem]">
                      <AnimatePresence mode="wait" initial={false}>
                        {currentMedia?.type === 'video' ? (
                          <motion.video
                            key={currentMedia.src}
                            ref={modalVideoRef}
                            src={currentMedia.src}
                            autoPlay
                            controls
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                          />
                        ) : (
                          <motion.img
                            key={currentMedia?.src}
                            src={currentMedia?.src}
                            alt={project.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : project.video ? (
          <>
            <div className="cursor-zoom-in" onClick={openExpandedView}>
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
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4"
                  onClick={closeExpandedView}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative w-full max-w-[90vw] max-h-[90vh] rounded-[1.5rem] bg-slate-950/90 p-2 shadow-2xl"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={closeExpandedView}
                      className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-900 shadow-lg transition hover:scale-105"
                      aria-label="Cerrar vista ampliada"
                    >
                      <X size={16} />
                    </button>

                    <div className="flex max-h-[90vh] items-center justify-center overflow-hidden rounded-[1.25rem]">
                      <video
                        ref={modalVideoRef}
                        src={project.video}
                        autoPlay
                        controls
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}

        {project.liveUrl && !isDesignProject && (
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
        )}

        {project.video && isHovering && !isDesignProject && (
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
              onClick={openExpandedView}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-slate-900 shadow-lg transition hover:scale-105"
              aria-label="Ampliar video"
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
          {isDesignProject ? (
            project.client && (
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300">
                Cliente: {project.client}
              </span>
            )
          ) : (
            project.stack?.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300"
              >
                {tech}
              </span>
            ))
          )}
        </div>

        {!isDesignProject && (
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
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard;
