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
 * - Pełna responsywność od 320px do 2560px+
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
        // Base styles - responsive height for snap scroll
        // Na bardzo małych urządzeniach używamy min-h zamiast h-screen dla bezpieczeństwa
        'min-h-screen h-screen overflow-hidden snap-start',
        // Flex centering
        'flex items-center justify-center',
        // Responsive padding: xs (8px) → sm (12px) → md (16px) → lg (24px) → xl (40px) → 2xl (64px)
        'px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16',
        // Dodatkowy padding po prawej dla scroll indicator na desktop
        'lg:pr-16 xl:pr-20',
        // Padding top dla sticky header - responsywny (mniejszy na telefonach)
        'pt-14 xs:pt-16 sm:pt-18 md:pt-20 lg:pt-24',
        // Padding bottom - responsywny
        'pb-2 xs:pb-3 sm:pb-4 md:pb-6 lg:pb-8',
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
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center">
        {children}
      </div>
    </section>
  );
}
