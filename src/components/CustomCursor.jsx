import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  const springX = useSpring(0, { stiffness: 500, damping: 28 });
  const springY = useSpring(0, { stiffness: 500, damping: 28 });
  const springScale = useSpring(1, { stiffness: 400, damping: 20 });

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return undefined;
    }

    document.body.style.cursor = 'none';

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (event) => {
      const target = event.target;
      const interactiveElement = target instanceof Element
        ? target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, .interactive')
        : null;

      setIsInteractive(Boolean(interactiveElement));
      springScale.set(interactiveElement ? 1.35 : 1);
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget || !(event.relatedTarget instanceof Element)) {
        setIsInteractive(false);
        springScale.set(1);
      }
    };

    const handleMouseDown = () => {
      springScale.set(0.9);
    };

    const handleMouseUp = () => {
      springScale.set(isInteractive ? 1.35 : 1);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isInteractive, springScale]);

  useEffect(() => {
    springX.set(position.x);
    springY.set(position.y);
  }, [position.x, position.y, springX, springY]);

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[110] h-5 w-5 rounded-full border border-cyan-400/70 bg-cyan-400/20 backdrop-blur-sm transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ x: springX, y: springY, scale: springScale }}
    />
  );
}

export default CustomCursor;
