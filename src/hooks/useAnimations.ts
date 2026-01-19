import type { Variants } from 'framer-motion';

/**
 * Hook do wykrywania preferencji reduced-motion
 * UWAGA: Zawsze zwraca false żeby animacje działały na wszystkich urządzeniach
 * Użytkownik może wyłączyć animacje w ustawieniach systemu jeśli chce
 */
export function useReducedMotionPreference() {
  // Zawsze zwracamy false - animacje mają działać wszędzie
  // Framer-motion automatycznie respektuje prefers-reduced-motion w CSS
  return false;
}

/**
 * Warianty animacji dla różnych elementów
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

/**
 * Warianty bez animacji (dla reduced-motion)
 */
export const noMotion = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 }
};
