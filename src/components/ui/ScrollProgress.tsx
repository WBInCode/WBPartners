import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * ScrollProgress - pasek postępu przewijania na górze strony
 * Działa z kontenerami snap scroll
 */
export function ScrollProgress() {
  const scrollProgress = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);

    // Znajdź kontener z scroll snap
    const scrollContainer = document.querySelector('.snap-y');

    const updateProgress = () => {
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const progress = scrollTop / (scrollHeight - clientHeight);
        scrollProgress.set(Math.min(Math.max(progress, 0), 1));
      } else {
        // Fallback do window scroll
        const { scrollY, innerHeight } = window;
        const docHeight = document.documentElement.scrollHeight;
        const progress = scrollY / (docHeight - innerHeight);
        scrollProgress.set(Math.min(Math.max(progress, 0), 1));
      }
    };

    const container = scrollContainer || window;
    container.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial value

    return () => container.removeEventListener('scroll', updateProgress);
  }, [scrollProgress]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--wb-primary)] origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
