import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../utils';

/**
 * BackToTop - przycisk powrotu do góry strony
 * - Pojawia się po zescrollowaniu
 * - Animowane wejście/wyjście
 * - Działa z snap scroll containers
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Znajdź kontener z scroll snap
    const scrollContainer = document.querySelector('.snap-y');
    
    const toggleVisibility = () => {
      if (scrollContainer) {
        setIsVisible(scrollContainer.scrollTop > 400);
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    const container = scrollContainer || window;
    container.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check
    
    return () => container.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const introSection = document.getElementById('intro');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-6 right-6 z-50',
            'w-12 h-12 rounded-full',
            'bg-[var(--wb-primary)] text-white',
            'shadow-lg shadow-[var(--wb-primary)]/30',
            'flex items-center justify-center',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wb-primary)] focus-visible:ring-offset-2',
            'cursor-pointer'
          )}
          aria-label="Powrót na górę"
          title="Powrót na górę"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
