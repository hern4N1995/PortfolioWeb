import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Maximize,
  Pause,
  Play,
  X,
} from 'lucide-react';

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const media = project.media ?? (project.video ? [{ type: 'video', src: project.video }] : []);
  const currentMedia = media[currentMediaIndex] ?? media[0];
  const isWebProject = project.category === 'web';
  const previewIsVideo = currentMedia?.type === 'video';
  const hasMultipleMedia = media.length > 1;

  const clearAutoAdvance = () => {
    if (autoAdvanceTimerRef.current !== null) {
      window.clearInterval(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  const restartAutoAdvance = () => {
    clearAutoAdvance();

    if (hasMultipleMedia && !isExpanded) {
      autoAdvanceTimerRef.current = window.setInterval(() => {
        setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
      }, 4500);
    }
  };

  useEffect(() => {
    setCurrentMediaIndex(0);
    setIsPlaying(true);
  }, [project.id]);

  useEffect(() => {
    if (previewIsVideo) {
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentMediaIndex, previewIsVideo]);

  useEffect(() => {
    if (!hasMultipleMedia || isExpanded) {
      clearAutoAdvance();
      return undefined;
    }

    autoAdvanceTimerRef.current = window.setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 4500);

    return () => {
      clearAutoAdvance();
    };
  }, [hasMultipleMedia, isExpanded, media.length]);

  const togglePlayPause = (event) => {
    event.stopPropagation();

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
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

  const handlePrevMedia = (event) => {
    if (event) {
      event.stopPropagation();
    }

    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);

    if (hasMultipleMedia && !isExpanded) {
      restartAutoAdvance();
    }
  };

  const handleNextMedia = (event) => {
    if (event) {
      event.stopPropagation();
    }

    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);

    if (hasMultipleMedia && !isExpanded) {
      restartAutoAdvance();
    }
  };

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeExpandedView();
      }

      if (event.key === 'ArrowRight' && hasMultipleMedia) {
        handleNextMedia();
      }

      if (event.key === 'ArrowLeft' && hasMultipleMedia) {
        handlePrevMedia();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded, hasMultipleMedia]);

  useEffect(() => {
    if (!isExpanded || !previewIsVideo || !videoRef.current || !modalVideoRef.current) {
      return undefined;
    }

    const cardVideo = videoRef.current;
    const modalVideo = modalVideoRef.current;

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
  }, [isExpanded, currentMediaIndex, previewIsVideo]);

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
      <div className="relative">
        <div
          className="relative h-56 overflow-hidden"
          onClick={openExpandedView}
        >
          {previewIsVideo ? (
            <video
              ref={videoRef}
              src={currentMedia.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={currentMedia.src}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          )}

          {isHovering && previewIsVideo && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={togglePlayPause}
              className="absolute top-3 left-3 rounded-full bg-white/90 p-2.5 text-slate-900 shadow-lg transition hover:scale-105"
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </motion.button>
          )}

          {isWebProject && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-cyan-700 shadow-lg transition hover:scale-105"
              aria-label={`Ver proyecto ${project.title}`}
            >
              <ExternalLink size={18} />
            </a>
          )}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openExpandedView();
            }}
            className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 text-slate-900 shadow-lg transition hover:scale-105"
            aria-label="Ampliar contenido"
          >
            <Maximize size={18} />
          </button>

          {hasMultipleMedia && (
            <>
              <button
                type="button"
                onClick={handlePrevMedia}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white shadow-lg transition hover:bg-slate-900"
                aria-label="Anterior pieza"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNextMedia}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white shadow-lg transition hover:bg-slate-900"
                aria-label="Siguiente pieza"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {media.map((item, index) => (
              <span
                key={`${item.src}-${index}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === currentMediaIndex ? 'bg-cyan-500' : 'bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
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
          {isWebProject
            ? project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300"
                >
                  {tech}
                </span>
              ))
            : project.client && (
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                  Cliente: {project.client}
                </span>
              )}
        </div>

        {isWebProject ? (
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
        ) : null}
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
                className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 text-slate-900 shadow-lg transition hover:scale-105"
                aria-label="Cerrar modal"
              >
                <X size={16} />
              </button>

              {hasMultipleMedia && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevMedia}
                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white shadow-lg transition hover:bg-white/30"
                    aria-label="Anterior pieza"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMedia}
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white shadow-lg transition hover:bg-white/30"
                    aria-label="Siguiente pieza"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              <div className="flex max-h-[90vh] items-center justify-center overflow-hidden rounded-[1.25rem]">
                <AnimatePresence mode="wait">
                  {currentMedia.type === 'image' ? (
                    <motion.img
                      key={currentMedia.src}
                      src={currentMedia.src}
                      alt={`${project.title} pieza ampliada`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="max-h-[90vh] max-w-[90vw] object-contain"
                    />
                  ) : (
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
                      transition={{ duration: 0.25 }}
                      className="max-h-[90vh] max-w-[90vw] object-contain"
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default ProjectCard;
