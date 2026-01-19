import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { SECTIONS } from '../../constants/content';

interface ScrollIndicatorProps {
  activeSection?: string;
  onDotClick?: (sectionId: string) => void;
}

/**
 * ScrollIndicator komponent
 * - Fixed position po prawej stronie
 * - Pionowy układ kropek (6 kropek)
 * - Centrowanie w pionie
 * - Z-index ponad sekcjami
 * - Ukryty na mobile
 * - Animacje zawsze włączone
 */
export const ScrollIndicator = memo(function ScrollIndicator({ 
  activeSection = 'intro',
  onDotClick 
}: ScrollIndicatorProps) {
  const handleClick = useCallback((sectionId: string) => {
    onDotClick?.(sectionId);
  }, [onDotClick]);
  
  return (
    <div
      className={cn(
        // Ukryty na mobile, widoczny od lg
        'hidden lg:flex',
        // Fixed position po prawej
        'fixed right-4 lg:right-6',
        // Centrowanie w pionie
        'top-1/2 -translate-y-1/2',
        // Z-index ponad sekcjami
        'z-40',
        // Flex pionowy
        'flex-col items-center gap-3'
      )}
    >
      {SECTIONS.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => handleClick(section.id)}
          aria-label={`Przejdź do sekcji ${section.title}`}
          title={section.title}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          animate={activeSection === section.id ? {
            scale: [1, 1.2, 1],
            transition: { 
              duration: 2, 
              repeat: Infinity,
              ease: 'easeInOut'
            }
          } : {}}
          className={cn(
            // Podstawowy kształt - kropka
            'w-3 h-3 rounded-full',
            // Transition
            'transition-colors duration-300',
            // Focus
            'focus:outline-none focus:ring-2 focus:ring-[var(--wb-primary)] focus:ring-offset-2',
            // Aktywna vs nieaktywna
            activeSection === section.id
              ? 'bg-[var(--wb-primary)]'
              : 'bg-gray-300 hover:bg-gray-400'
          )}
        />
      ))}
    </div>
  );
});
