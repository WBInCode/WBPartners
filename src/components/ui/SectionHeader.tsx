import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { fadeInUp, useReducedMotionPreference } from '../../hooks/useAnimations';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  titleColor?: string;
  className?: string;
  /** Optional logo image source to display above the title */
  logoSrc?: string;
  /** Alt text for the logo */
  logoAlt?: string;
}

/**
 * SectionHeader komponent
 * - Props: title, subtitle, description, logoSrc
 * - Typografia responsywna
 * - Max-width dla description
 * - Spacing między elementami
 * - Animacje fade in + slide up
 * - Opcjonalne logo nad tytułem
 */
export function SectionHeader({
  title,
  subtitle,
  description,
  titleColor,
  className,
  logoSrc,
  logoAlt,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotionPreference();

  const animationProps = prefersReducedMotion 
    ? {} 
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.5 },
        variants: fadeInUp,
      };

  return (
    <div className={cn('mb-6 md:mb-8', className)}>
      {/* Logo - above title */}
      {logoSrc && (
        <motion.div
          {...animationProps}
          className="mb-4 md:mb-6"
        >
          <img 
            src={logoSrc} 
            alt={logoAlt || title} 
            className="h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain"
          />
        </motion.div>
      )}

      {/* Title - H1 */}
      <motion.h1
        {...animationProps}
        className={cn(
          // Responsywna typografia
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
          'font-bold',
          'mb-2 md:mb-4'
        )}
        style={titleColor ? { color: titleColor } : { color: 'var(--wb-primary)' }}
      >
        {title}
      </motion.h1>

      {/* Subtitle - H2 */}
      {subtitle && (
        <motion.h2
          {...animationProps}
          transition={{ delay: 0.1 }}
          className={cn(
            'text-base sm:text-lg md:text-xl lg:text-2xl',
            'text-[var(--wb-secondary)]',
            'mb-2 md:mb-4'
          )}
        >
          {subtitle}
        </motion.h2>
      )}

      {/* Description */}
      {description && (
        <motion.p
          {...animationProps}
          transition={{ delay: 0.2 }}
          className={cn(
            'text-sm sm:text-base md:text-lg',
            'text-gray-600',
            'max-w-2xl',
            'leading-relaxed'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
