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
      data-theme="light" // Hint for some css logic
      className={cn(
        // Base styles - responsive height for snap scroll
        // Używamy min-h-screen zamiast h-screen, aby treść nie była ucinana na mobile
        'min-h-screen w-full relative snap-start',
        // Flex centering - ale z możliwością scrollowania na mobile
        'flex flex-col justify-center',
        // Responsive padding: xs (8px) → sm (12px) → md (16px) → lg (24px) → xl (40px) → 2xl (64px)
        'px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16',
        // Dodatkowy padding po prawej dla scroll indicator na desktop
        'lg:pr-16 xl:pr-20',
        // Padding top dla sticky header - responsywny (mniejszy na telefonach)
        'pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-24', // Większy top padding na mobile bo navbar
        // Padding bottom - responsywny
        'pb-16 xs:pb-16 sm:pb-12 md:pb-12 lg:pb-8', // Większy bottom padding na mobile
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
