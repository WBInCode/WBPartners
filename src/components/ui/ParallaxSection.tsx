import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Siła efektu parallax (0-100), domyślnie 30 */
  strength?: number;
  /** Kierunek parallax */
  direction?: 'up' | 'down';
}

/**
 * ParallaxSection - wrapper dodający efekt parallax na scroll
 * - Używa Framer Motion useScroll i useTransform
 * - Konfigurowalny strength i direction
 * - Smooth animations
 */
export function ParallaxSection({
  children,
  className,
  strength = 30,
  direction = 'up',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform wartość: gdy scrollujemy, element przesuwa się w przeciwnym kierunku
  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [strength * multiplier, -strength * multiplier]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxLayer - warstwa z własnym przesunięciem parallax
 * Używane wewnątrz sekcji dla różnych warstw tła/contentu
 */
interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /** Przesunięcie warstwy (większe = wolniejsze scrollowanie) */
  offset?: number;
  /** Czy to warstwa tła (absolute positioning) */
  isBackground?: boolean;
}

export function ParallaxLayer({
  children,
  className,
  offset = 50,
  isBackground = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`${isBackground ? 'absolute inset-0 -z-10' : ''} ${className || ''}`}
    >
      {children}
    </motion.div>
  );
}
