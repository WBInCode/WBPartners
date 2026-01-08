import type { ReactNode } from 'react';
import { cn } from '../../utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  accentColor?: string;
  withGlow?: boolean;
  ariaLabel?: string;
}

/**
 * Bazowy komponent sekcji ze scroll snap
 * - 100vh wysokość (min-height na mobile dla bezpieczeństwa)
 * - snap-start dla scroll snap
 * - Responsywny padding dla wszystkich breakpointów
 * - Opcjonalny glow w kolorze akcentu
 * - Aria-label dla accessibility
 */
export function Section({
  id,
  children,
  className,
  accentColor,
  withGlow = false,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel || id}
      className={cn(
        // Base styles - fixed height dla snap scroll
        'h-screen overflow-hidden snap-start',
        // Flex centering
        'flex items-center justify-center',
        // Responsive padding: mobile (12px) → tablet (24px) → desktop (48px)
        'px-3 sm:px-4 md:px-6 lg:px-10 xl:px-16',
        // Dodatkowy padding po prawej dla scroll indicator na desktop
        'lg:pr-16',
        // Padding top dla sticky header - responsywny
        'pt-16 sm:pt-18 md:pt-20 pb-4 sm:pb-6 md:pb-8',
        // Custom classes
        className
      )}
      style={
        withGlow && accentColor
          ? {
              background: `radial-gradient(ellipse 80% 50% at 80% 50%, ${accentColor}15 0%, transparent 70%)`,
            }
          : undefined
      }
    >
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
