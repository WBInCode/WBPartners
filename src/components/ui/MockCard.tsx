import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { scaleIn } from '../../hooks/useAnimations';

type MockCardVariant = 'default' | 'trade' | 'incode' | 'rent' | 'foundation';

interface MockCardProps {
  variant?: MockCardVariant;
  accentColor?: string;
  className?: string;
}

/**
 * MockCard komponent
 * - Karta z cieniem (shadow-xl)
 * - Zaokrąglone rogi (rounded-2xl)
 * - Tło białe/jasne
 * - Placeholder content (linie, kółka)
 * - Warianty dla różnych sekcji
 * - Animacja scale + fade - zawsze włączona
 */
export function MockCard({
  variant = 'default',
  accentColor,
  className,
}: MockCardProps) {
  // Get accent color based on variant
  const getAccentColor = (): string => {
    if (accentColor) return accentColor;
    switch (variant) {
      case 'trade': return 'var(--accent-trade)';
      case 'incode': return 'var(--accent-incode)';
      case 'rent': return 'var(--accent-rent)';
      case 'foundation': return 'var(--accent-foundation)';
      default: return 'var(--wb-primary)';
    }
  };

  const accent = getAccentColor();

  const cardContent = (
    <>
      {/* Header with circles */}
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <div 
          className="w-3 h-3 rounded-full opacity-60"
          style={{ backgroundColor: accent }}
        />
        <div 
          className="w-3 h-3 rounded-full opacity-30"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Title placeholder */}
      <div 
        className="h-6 rounded-md mb-3 w-3/4"
        style={{ backgroundColor: `color-mix(in srgb, ${accent} 20%, transparent)` }}
      />

      {/* Content placeholders - lines */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div 
          className="h-16 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)` }}
        >
          <div 
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: `color-mix(in srgb, ${accent} 30%, transparent)` }}
          />
        </div>
        <div 
          className="h-16 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)` }}
        >
          <div 
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: `color-mix(in srgb, ${accent} 30%, transparent)` }}
          />
        </div>
      </div>

      {/* Button placeholder */}
      <div 
        className="h-10 rounded-lg w-full"
        style={{ backgroundColor: accent, opacity: 0.8 }}
      />
    </>
  );

  const cardClasses = cn(
    // Card base
    'bg-white rounded-2xl shadow-xl',
    'p-6',
    'w-full max-w-sm',
    // Border accent
    'border border-gray-100',
    className
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cardClasses}
    >
      {cardContent}
    </motion.div>
  );
}
