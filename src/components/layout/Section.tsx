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
        // Base styles - min-height zamiast fixed height dla lepszej responsywności
        'min-h-screen overflow-hidden snap-start',
        // Flex centering
        'flex items-center justify-center',
        // Responsive padding: mobile (16px) → tablet (32px) → desktop (48px)
        'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
        // Dodatkowy padding po prawej dla scroll indicator na desktop
        'lg:pr-20',
        // Padding top dla sticky header - responsywny
        'pt-[72px] pb-8 md:pb-12',
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
